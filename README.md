# 📌 RealEstateFlow — Full-Stack Real Estate Lead Platform

A production-ready **full-stack real estate lead management platform** built with **Next.js**, **Node.js**, **Prisma**, and **MySQL (Docker)**.  
This monorepo contains:

- **client/** → Next.js + React + TypeScript frontend  
- **server/** → Express + TypeScript backend  
- Fully typed API layers, reusable UI components, and clean architecture.

---

## 🚀 Features

### Frontend (Next.js)
- React + Next.js (Pages Router + App Router)
- TypeScript everywhere
- Centralized Axios API client (`src/lib/api.ts`)
- Modular UI components
- Redux-ready global store
- Scalable folder structure

### Backend (Node + Express)
- REST API with Express
- Prisma ORM + MySQL
- Typed route handlers
- Modular routes + controllers
- Environment-based configuration

### Dev Environment
- Docker Compose (MySQL + Adminer)
- Hot reload for both client & server

---

# 🧩 Project Structure

```
realestateflow/
│
├── client/                     # Next.js Frontend
│   ├── src/
│   │   ├── pages/              # Pages Router
│   │   ├── app/                # App Router
│   │   ├── components/         # UI components
│   │   ├── models/             # TS models (Lead, etc.)
│   │   ├── lib/                # Axios API client + helpers
│   │   ├── store/              # Redux store + slices
│   │   └── styles/             # Global CSS
│   └── package.json
│
├── server/                     # Express + Prisma Backend
│   ├── src/
│   │   ├── routes/             # leads.ts, auth.ts, etc.
│   │   └── index.ts            # Main entry point
│   ├── prisma/
│   │   └── schema.prisma       # Prisma schema
│   └── package.json
│
├── docker-compose.yml          # MySQL + Adminer
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## 1️⃣ Start MySQL (Docker)

From the project root:

```sh
docker compose up -d
```

This starts:

- **MySQL** → `localhost:3306`
- **Adminer** → `localhost:8080`

---

## 2️⃣ Backend Setup (server)

```sh
cd server
npm install
```

Generate Prisma client:

```sh
npx prisma generate
```

Run migrations (optional):

```sh
npx prisma migrate dev
```

Start the backend:

```sh
npm run dev
```

Backend runs at:

👉 http://localhost:4000

---

## 3️⃣ Frontend Setup (client)

```sh
cd client
npm install
npm run dev
```

Frontend runs at:

👉 http://localhost:3000

---

# 🔐 Environment Variables

### server/.env

```env
DATABASE_URL="mysql://reflow:reflowpass@127.0.0.1:3306/realestateflow_dev"
PORT=4000
JWT_SECRET=replace_with_real_secret
```

### client/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

# 📡 API Overview

Base URL:

```
http://localhost:4000/api
```

### Leads Endpoints

```
GET    /api/leads
POST   /api/leads
GET    /api/leads/:id
PUT    /api/leads/:id
DELETE /api/leads/:id
```

More routes in `server/src/routes/`.

---

# 🧪 Scripts

### Client scripts

```sh
npm run dev
npm run build
npm run start
npm run lint
```

### Server scripts

```sh
npm run dev
npm run build
npm start
npx prisma generate
npx prisma migrate dev
```

### Docker

```sh
docker compose up -d
docker compose down
docker ps
```

---

# 🔥 Roadmap

- [ ] Create/Edit Lead UI  
- [ ] Authentication (JWT or NextAuth)  
- [ ] Move API to RTK Query  
- [ ] Add Zod validation  
- [ ] Pagination + filtering functionality  
- [ ] Unit tests (Vitest + MSW)  
- [ ] Deployment  
  - Frontend → Vercel  
  - Backend → Render / Railway  

---

# 👤 Author

**Anil Kumar Nettem**  
Frontend Engineer  
(Add GitHub + LinkedIn)

