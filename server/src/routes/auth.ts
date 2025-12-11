import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
function normalizeExpiresIn(raw?: string | null): string | number {
  if (!raw) return "7d";
  let v = raw.toString().trim();
  // strip surrounding single or double quotes if present
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  // if it's a plain number string, return as number
  if (/^\d+$/.test(v)) {
    return parseInt(v, 10);
  }
  return v || "7d";
}

const JWT_EXPIRES_IN = normalizeExpiresIn(process.env.JWT_EXPIRES_IN);

function signToken(payload: object) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
  } catch (err) {
    console.error("Failed to sign JWT. expiresIn:", JSON.stringify(JWT_EXPIRES_IN), err);
    // fallback to safe default
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  }
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name || "", email, password: hashed, phone },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });

    const token = signToken({ id: user.id, email: user.email, name: user.name });
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const userSafe = { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role };
    const token = signToken(userSafe);
    res.json({ user: userSafe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;