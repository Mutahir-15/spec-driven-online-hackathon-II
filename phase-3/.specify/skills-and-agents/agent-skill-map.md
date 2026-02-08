# Agent-Skill Mapping

This document maps the **AI-Native Development Skills Library** to the defined **Sub-Agents**, establishing which tools each agent uses to fulfill its role.

## 1. The Spec Architect
*   **Specification Synthesis** → To convert user intent into structured requirements and acceptance criteria.
*   **Decision Documentation** → To record architectural trade-offs during the initial design phase.

## 2. The Schema Engineer
*   **Schema Architecting** → To design SQLModel structures, relationships, and data integrity rules.
*   **Decision Documentation** → To justify choices regarding data normalization or performance optimizations.

## 3. The Backend Artisan
*   **API Contract Design** → To define and implement the FastAPI endpoints and Pydantic DTOs.
*   **Integration Orchestration** → To ensure logic correctly processes data before sending it to the client or DB.
*   **Decision Documentation** → To document logic patterns or service-layer architectural choices.

## 4. The Interface Crafter
*   **Component Composition** → To build modular and accessible React/Next.js UI elements.
*   **Integration Orchestration** → To connect the frontend components to the backend API services securely.
*   **Decision Documentation** → To record UI/UX patterns or client-side state management decisions.

## 5. The Quality Sentinel
*   **Test Harnessing** → To write and execute Pytest and Jest tests that validate the system against the spec.
*   **Decision Documentation** → To document testing strategies or coverage exemptions.
