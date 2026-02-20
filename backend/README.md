# ⚡ Pulse - Minimalist Team Feedback Tracker

> **Built for the Better Software Associate Software Engineer Assessment.**
> Pulse is a high-integrity feedback portal designed for 0→1 development environments.

---

## 🚀 Project Overview
Pulse allows rapid-growth teams to manage feature requests with **industrial-grade reliability**. It focuses on state-integrity and boundary-safety, ensuring that your feedback pipeline remains clean as you scale.

## 🛠️ Tech Stack
- **Backend**: Python 3.11+ | Flask | SQLAlchemy (PostgreSQL)
- **Frontend**: React (Vite) | Framer Motion | Vanilla CSS
- **Integrity**: Pydantic (Input Validation) | Pytest (Logic Verification)

---

## 🧠 Key Technical Decisions

### 1. 🛡️ Boundary-First Validation
We utilize **Pydantic** at the API entry point. This creates a schema-strict "firewall" that prevents malformed or malicious data from ever reaching the domain logic or database layers.

### 2. �� Strict State Machine
Feedback lifecycles are governed by a central service layer. Status transitions (e.g., *Pending* → *In Review* → *Planned*) are enforced by business rules, preventing invalid states (like skipping the review phase).

### 3. 🧩 Change Resilience
By decoupling **DB Models** from **API Schemas**, the internal database architecture can evolve without causing breaking changes to the frontend or external consumers.

### 4. 🔭 Proactive Observability
Every state change is structured and verifiable. The system is built to fail-fast with diagnostic error messages, making it easy to identify issues in a live production environment.

---

## 📂 System Structure
`	ext
/backend
  ├── app/
  │   ├── models/    - SQLAlchemy Data Definitions
  │   ├── schemas/   - Pydantic Validation Schemas
  │   ├── routes/    - Thin API Controllers
  │   └── services/  - Hexagonal Business Logic
/frontend
  ├── src/
  │   ├── components/ - Periodic UI Elements
  │   ├── hooks/      - Encapsulated Global State
  │   └── index.css   - Design System & Tokens
/ai_guidance         - Rules & AI Constraints
`

---

## 🛠️ Installation & Setup

### 1. 🐘 Database Setup
Pulse requires **PostgreSQL**.
1. Create a database: `CREATE DATABASE pulse_db;`
2. Configure your credentials in `backend/.env` (use `.env.example` as a template).

### 2. 🐍 Backend
`powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python run.py
`

### 3. ⚛️ Frontend
`powershell
cd frontend
npm install
npm run dev
`

---

## 🧪 Verification & Testing
To run the logic verification suite:
`powershell
cd backend
python -m pytest tests/test_feedback.py
`

---

*Verified for Better Software Assessment 2026*