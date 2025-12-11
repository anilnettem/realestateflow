import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const prisma = new PrismaClient();

// GET all leads (public)
router.get("/", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// CREATE lead (public)
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, source, propertyId } = req.body;

    const lead = await prisma.lead.create({
      data: { name, phone, email, source, propertyId },
    });

    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create lead" });
  }
});

// UPDATE lead (token optional)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const lead = await prisma.lead.update({
      where: { id },
      data,
    });

    res.json(lead);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(500).json({ error: "Failed to update lead" });
  }
});

// DELETE lead (token optional)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await prisma.lead.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;