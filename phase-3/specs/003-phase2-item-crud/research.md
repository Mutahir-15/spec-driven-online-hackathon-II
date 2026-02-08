# Research & Decisions: Phase 2 Item CRUD

**Date**: 2026-01-12
**Status**: Complete

## 1. UI Component Strategy
**Decision**: Custom "Premium" Component Set based on Shadcn/UI Design Patterns.
**Rationale**:
*   To achieve the "astonishing but professional" goal without heavy external runtime dependencies, we will implement a set of atomic components (Button, Input, Card, Modal) using **Tailwind CSS** and **Radix UI Primitives** (or accessible HTML/React hooks equivalent if strict "no deps" is preferred, but Radix is industry standard for accessibility).
*   *Correction*: To strictly adhere to "No external backend frameworks" and minimal dependencies, we will build **pure Tailwind** components that mimic the aesthetic of premium libraries, ensuring full control and zero extra bundle bloat.
*   **Styling**: Use a refined color palette (Slate/Zinc), subtle borders, consistent border-radius (rounded-md), and micro-interactions (hover states, focus rings).

**Alternatives Considered**:
*   *Material UI / Chakra*: Too heavy, opinionated, and often looks "generic".
*   *Raw HTML/CSS*: Too slow to build "premium" feel from scratch.

## 2. Data Fetching & State
**Decision**: Hybrid Server/Client Strategy.
**Rationale**:
*   **Read Operations (List, Detail)**: Performed in **Next.js Server Components** via `fetch` to FastAPI. This ensures fast First Contentful Paint (FCP) and SEO friendliness.
*   **Write Operations (Create, Update, Delete)**: Performed via **Client Components** using `fetch`.
*   **State**: Local state (`useState`) for forms. URL Search Params for filtering/pagination (if applicable). No global state manager (Redux/Zustand) is needed for simple CRUD.

## 3. Interaction & feedback
**Decision**: Optimistic UI + Toast Notifications.
**Rationale**:
*   To meet the "premium" feel, actions must feel instant.
*   **Loading**: Skeleton screens instead of generic spinners.
*   **Feedback**: Toast notifications (success/error) anchored to the bottom-right.

## 4. Design System Basics
*   **Typography**: `Inter` (Next.js default) or system sans-serif.
*   **Colors**:
    *   Primary: Indigo-600 (Actionable)
    *   Surface: White / Slate-50
    *   Text: Slate-900 (Primary), Slate-500 (Secondary)
    *   Destructive: Red-600
*   **Spacing**: 4px grid (Tailwind default).

## 5. API Integration Pattern
**Decision**: Typed Fetch Wrapper.
**Rationale**:
*   Create a `lib/api.ts` utility that wraps `fetch`.
*   Handles base URL, default headers (Content-Type), and error parsing.
*   Ensures consistent communication with FastAPI.
