# Skill: Modern Application Interface Design

This skill defines the visual and functional standards for building "astonishing" yet professional web application interfaces using Next.js and Tailwind CSS. It bridges the gap between raw data and user experience.

## Purpose
To transform functional specifications into intuitive, accessible, and visually cohesive user interfaces. The goal is to reduce cognitive load while providing a polished, "production-ready" aesthetic that builds trust with the user.

## Design Principles
*   **Minimalism with Depth**: Use ample whitespace to separate concerns. Create depth not through heavy textures, but through subtle borders, soft shadows, and layered surfaces (z-index) to indicate hierarchy.
*   **Typography-Driven Hierarchy**: Leverage a distinct type scale (e.g., distinct H1 vs H2 vs Body) to guide the user's eye. Use weight (Bold vs Regular) and color (Zinc-900 vs Zinc-500) rather than just size to denote importance.
*   **Intentional Color System**:
    *   **Primary**: A single brand color (e.g., Indigo/Violet) for primary actions (Save, Submit).
    *   **Neutral**: A robust gray scale (Slate/Zinc) for structural elements (text, borders, backgrounds).
    *   **Functional**: Red (Destructive), Amber (Warning), Green (Success) used sparingly for status feedback only.
*   **Micro-Interactions**: Interfaces must feel "alive." All interactive elements (buttons, links, cards) must have clear `hover`, `active`, and `focus` states. Transitions should be fast (e.g., `duration-200 ease-in-out`).

## Layout Patterns
*   **The Application Shell**:
    *   **Sidebar/Navigation**: Fixed position, ensuring navigation is always accessible. Distinct active states for the current route.
    *   **Main Content Area**: Scrollable, contained within a max-width wrapper (e.g., `max-w-7xl`) to prevent content from stretching too wide on large screens.
*   **Dashboard/Grid View**:
    *   Responsive Grid layouts using Tailwind (e.g., `grid-cols-1 md:grid-cols-3`) for item collections.
    *   Cards should have consistent padding, border-radius (e.g., `rounded-xl`), and a subtle border stroke (`border-zinc-200`) instead of heavy shadows.
*   **Master-Detail Flow**:
    *   Avoid navigating away for simple edits. Use **Slide-overs** or **Modals** for Create/Update operations to preserve the context of the list view.
*   **Empty States**:
    *   Never show a blank page. If no data exists, display a centered illustration/icon, a helpful message, and a clear "Create New" call-to-action button.

## Component Patterns
*   **Buttons**:
    *   **Primary**: Solid background color, white text.
    *   **Secondary**: Outline or ghost style (`bg-transparent`, `border`, `hover:bg-zinc-50`).
    *   **Destructive**: Red text or background, distinct from normal actions.
*   **Forms**:
    *   Labels must be visible and placed above inputs.
    *   Inputs require clear borders (`border-zinc-300`) and focus rings (`ring-2`).
    *   Validation errors should appear immediately below the specific field in red text.
*   **Data Display**:
    *   Tables should have distinct headers with a subtle background (`bg-zinc-50`).
    *   Rows should highlight on hover to track reading position.
    *   Dates and IDs should use a monospace or tabular-nums font variant for readability.
*   **Feedback/Toasts**:
    *   Transient messages (Success/Error) should appear at the edge of the screen (bottom-right or top-center) and disappear automatically.

## Accessibility Basics
*   **Keyboard Navigation**: All interactive elements must be reachable via `Tab` and show a visible focus indicator (e.g., Tailwind's `focus:ring`).
*   **Contrast**: Text color must pass WCAG AA standards against the background (e.g., avoid light gray text on white backgrounds).
*   **Semantic HTML**: Use `<button>` for actions, `<a>` for navigation, `<header>`, `<main>`, and `<footer>` for layout structure.
*   **Screen Readers**:
    *   Icon-only buttons must have an `aria-label` (e.g., "Delete Item").
    *   Loading states must use `aria-busy` or appropriate status roles.