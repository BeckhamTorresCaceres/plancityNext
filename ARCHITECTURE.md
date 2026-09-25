# PlanCity Architecture

PlanCity uses a feature-first architecture. Each business feature owns its components, hooks, types, services and local data.

## Rules

- Components do not declare feature `interface` or `type` contracts.
- Feature hooks live in `features/<feature>/hooks`.
- Feature types live in `features/<feature>/types`.
- Data/API access lives in `features/<feature>/services` and local mock data in `data`.
- Shared application UI belongs in `components/ui` when it is genuinely reusable across features.
- App Router files in `src/app` compose routes; business logic stays inside features.
- Tailwind is used for component styling.

## Current features

- `events`: public event discovery, event details and admin event table.
- `auth`: login, register and mobile authentication menu.
- `theme`: theme provider and theme toggle.
- `site-shell`: header, footer and route loader.
- `admin`: admin shell, sidebar and navigation.
- `dashboard`: admin overview statistics.
- `users`: admin users table and user filtering.
- `categories`: admin category statistics and cards.

## Route composition

```text
src/app
├── (site)
│   ├── page.tsx
│   └── events/[id]/page.tsx
└── admin
    ├── layout.tsx
    ├── page.tsx
    ├── events/page.tsx
    ├── users/page.tsx
    └── categories/page.tsx
```

The route layer only composes features. API integration can later replace the current mock services without moving UI components or hooks.
