# Frontend (Next.js & React) Standards

## 1. Next.js App Router Conventions
- Use React Server Components (RSC) by default. Only add `'use client'` at the top of the file when interactivity or browser APIs (like `useState`, `useEffect`, `onClick`) are required.
- Place data fetching logic in Server Components where possible to minimize client-side javascript.
- Keep routing structures clean using the App Router folder conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

## 2. Styling (TailwindCSS v4)
- Use Utility-first classes provided by Tailwind CSS. Avoid writing custom CSS files unless strictly necessary.
- Combine classes cleanly, and use component abstraction (e.g. creating reusable buttons or cards in your `components/` folder) to avoid repeating long class strings.

## 3. Turborepo Workspace
- Keep shared logic in the workspace packages (`@flowcart/api-sdk`, `@flowcart/types`, `@flowcart/ui`).
- Ensure no circular dependencies between packages.
- Apps like `admin-web` and `mobile-app` should consume the shared packages rather than duplicating types or UI components.
