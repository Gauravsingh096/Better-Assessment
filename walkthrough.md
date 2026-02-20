# Technical Walkthrough - Pulse

## 1. System Structure
Pulse follows a clean **Separation of Concerns**:
- **Domain Models**: Defined with SQLAlchemy, emphasizing data integrity via Enums for status.
- **Service Layer**: All business logic (like upvoting and status transition checks) lives in `services/`. This ensures that any interface (HTTP API, CLI, or test runner) behaves identically.
- **Validation Boundary**: Pydantic schemas in `schemas/` act as a "firewall" for the API, catching malformed data before it reaches logic layers.
- **Frontend**: A modern React SPA using Vite, with a focus on CSS variables for theme consistency and Framer Motion for micro-animations.

## 2. AI Usage & Guidance
This project was built with the assistance of an AI agent (Antigravity). To protect system integrity:
- **Constraints**: See `ai_guidance/rules.md`. The AI was instructed to prioritize "Simple > Clever" and enforce strict validation.
- **Review Process**: Every line of generated code was verified against the provided assessment criteria, specifically targeting "Interface Safety" and "Change Resilience".

## 3. Correctness & Error Handling
- **Invalid States**: Transition rules (e.g., preventing recovery from "Declined" to "Completed" without review) are enforced at the service level.
- **Fail-Safe**: The API returns structured JSON error messages (400 for validation, 404 for missing resources) instead of leaking raw database errors.

## 4. Risks & Extension Approach
### Risks
- **Concurrency**: Currently, upvotes use simple increment. For high-traffic use, database-level atomic increments (`F` expressions) should be used.
- **Authentication**: The system currently assumes an open internal team environment. Adding JWT auth would be the next logical step.

### Extension
- **Audit Trails**: Adding a `StatusLog` table to track WHO changed WHAT status and WHEN.
- **Comments**: Expanding the `Feedback` model to have a one-to-many relationship with `Comments`.
- **Search**: Integrating PostgreSQL Full-Text Search for large volumes of feedback.

## 5. Verification
A suite of `pytest` tests in `backend/tests/` verifies the core business rules. Running `pytest` confirms that invalid state transitions are blocked as expected.
