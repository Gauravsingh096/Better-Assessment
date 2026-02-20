# AI Guidance & Constraints

This document outlines the rules and standards enforced by the AI agent during the development of this project.

## 1. Coding Standards
- **Keep it Simple**: No over-engineering. Favor readability over "clever" one-liners.
- **Strict Validation**: All external inputs must be validated at the boundary (API level).
- **Type Safety**: Use Python type hints and Pydantic schemas for data integrity.
- **Service Layer**: Business rules must reside in the service layer, not in routes.

## 2. Security & Safety
- **No Manual SQL**: Use SQLAlchemy ORM to prevent SQL injection.
- **Interface Safety**: Validate all incoming JSON against expected schemas.
- **Fail Fast**: Return meaningful HTTP errors (400, 404) rather than letting the app crash.

## 3. Architecture
- **Layered Structure**:
    - `models/`: Database schema definitions.
    - `schemas/`: Validation and serialization logic.
    - `services/`: Core logic and state machine.
    - `routes/`: Minimal controller logic.

## 4. Verification
- **Automated Tests**: Core business logic must be verifiable via Pytest.
- **State Integrity**: Prevent invalid transitions at the domain level.
