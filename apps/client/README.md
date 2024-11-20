# Frontend Development Guidelines

## 1. Project Setup (Updated)

### Running the Full Project

We are using **PNPM workspaces**, so you can run the entire project (both frontend
and backend) using the following command at the root level:

```bash
pnpm dev
```

This will start all services, including the frontend and backend microservices. The
frontend will be served on **port 3000**.

### Commands Specific to Frontend (Client Folder)

When working in the `apps/client/` folder (the frontend):

- Build: Builds the production version of the app.

  ```bash
  pnpm run build
  ```

- Development: Starts the app in development mode.

  ```bash
  pnpm run dev
  ```

- Start: Starts the app in production mode (after build).

  ```bash
  pnpm run start
  ```

- Linting: Runs ESLint to catch errors and code style issues.

  ```bash
  pnpm run lint
  ```

## 2. Utility Functions and Styling Conventions

### The `cn` Function

This utility function is used to intelligently merge class names, a common
requirement when working with **TailwindCSS**. It's a combination of `clsx` and
twMerge , which makes handling conditional and dynamic classes much more
efficient.

#### Code Example

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### Explanation

- `clsx`: A utility to conditionally apply classes. It takes multiple arguments (class
  strings, booleans, objects) and returns a single, flattened class string.

- `twMerge`: Specifically for TailwindCSS, it intelligently merges classes and
  removes duplicates (e.g., bg-red-500 bg-blue-500 will merge to just bg-blue-500).

This function gives you **the power of class management**, allowing you to merge,
conditionally apply, and avoid class conflicts in TailwindCSS, all in one line.

#### Example Use Case

```typescript
const buttonClass = cn(
    "p-4", // Always applied
    isPrimary && "bg-blue-500", // Conditionally applied
    isDisabled && "opacity-50 cursor-not-allowed" // Condition
ally applied
);
```

This will help keep your TailwindCSS class strings clean and avoid clutter."author": {

}

## 3. Folder and File Conventions (Updated)

### Top-Level Files

The top-level files at the root of the project are responsible for configuring the
application, managing dependencies, integrating middleware, and setting
environment variables.

| **File**             | **Description**                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| `next.config.js`     | Configuration file for Next.js (routing, build settings, etc.).         |
| `package.json`       | Project dependencies and scripts.                                       |
| `instrumentation.ts` | Used for OpenTelemetry and instrumentation.                             |
| `middleware.ts`      | Manages Next.js middleware (e.g., request handling, authorization).     |
| `.env`               | Global environment variables.                                           |
| `.env.local`         | Local environment variables (for dev).                                  |
| `.env.production`    | Environment variables for production builds.                            |
| `.env.development`   | Environment variables for development builds.                           |
| `.eslintrc.json`     | Configuration file for ESLint (code linting rules).                     |
| `.gitignore`         | Git ignore file, defines files/folders not to be committed to the repo. |
| `next-env.d.ts`      | TypeScript declaration file for Next.js.                                |
| `tsconfig.json`      | TypeScript configuration file.                                          |
| `jsconfig.json`      | JavaScript configuration file (optional, if not using TypeScript).      |

### App Router Folder Structure

Next.js uses a **file-based routing system** in the `app/` folder. Here's how file and
folder names determine routes and behavior:

| **File/Folder**            | **Usage**                                                              |
| -------------------------- | ---------------------------------------------------------------------- |
| `layout.js/.jsx/.tsx`      | Defines the layout for the page, wraps around child components.        |
| `page.js/.jsx/.tsx`        | Defines the actual page component. Each page file creates a new route. |
| `loading.js/.jsx/.tsx`     | Displays a loading UI when the page is fetching data.                  |
| `not-found.js/.jsx/.tsx`   | Custom 404 page for the route.                                         |
| `error.js/.jsx/.tsx`       | Handles errors on that specific page.                                  |
| `globalerror.js/.jsx/.tsx` | Global error UI across the app.                                        |
| `route.js/.ts`             | API routes specific to that folder (similar to the /api/ folder).      |
| `template.js/.jsx/.tsx`    | Re-rendered layout that is different from static layouts.              |
| `(folder)`                 | Parenthesis groups routes without creating a route itself.             |
| `_folder/`                 | Folders starting with\_ are private and not included in routing.       |

### Dynamic Routes

Next.js allows dynamic route segments to be created using square brackets:

| **Folder/File** | **Description**                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| `[folder]`      | Dynamic route segment (e.g., `/jobs/[id]`).                                     |
| `[...folder]`   | Catch-all route segment (e.g., `/jobs/[...params]` ).                           |
| `[[...folder]]` | Optional catch-all segment (captures routes like `/jobs` and `/jobs/specific`). |

### Pages Folder Routing (For Legacy Support)

- `\_app.js/.jsx/.tsx`: Custom app wrapper.
- `\_document.js/.jsx/.tsx`: Custom document wrapper.
- `\_error.js/.jsx/.tsx`: Custom error pages.
- `index.js/.jsx/.tsx`: Home page.
- **Dynamic Routes**: `[id].js` or `[...slug].js` to handle dynamic paths.

## 4. TailwindCSS Custom Styles

We are using **TailwindCSS** for styling. Tailwind offers utility classes for rapid
development, but custom styles or modifications can be added in the
`tailwind.config.js` file.

### Custom Styles in Tailwind

If you need to add or extend the Tailwind configuration:

- Extend colors, fonts, spacing, or other aspects in the `tailwind.config.js` file.

**Example** (tailwind.config.js):

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brandBlue: '#1E40AF',
        brandRed: '#EF4444',
      },
    },
  },
};
```

You can now use `bg-brandBlue` or `text-brandRed` in your components.

## 5. Shadcn UI and Component Usage

Shadcn UI is used to create consistent and customizable components.
Components come with `variants`, which allow you to apply different styles based
on the context.

### Example

```typescript
import { Button } from 'shadcn-ui';
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
```

Each variant defines a different style for the button, reducing duplication and
keeping the code DRY.

## 6. State Management with Zustand

For state management, we are using **Zustand**, a lightweight, flexible state library.

### Example Store

```typescript
import { create } from 'zustand';
const useJobStore = create((set) => ({
    jobs: [],
    addJob: (job) => set((state) => ({ jobs: [...state.jobs, jo
        b] })),
}));
export default useJobStore;
```

- **Store Location:** Place all Zustand stores in `stores/`.
- **Component Usage:** Use the store inside components to manage and access
  the state.

## 7. Integration and API Communication

When running the frontend locally on **port 3000**, the backend services (started
with Docker) run in the background. All communication is done via an **API
Gateway**, which can be accessed via Swagger:

- **API Gateway:** <http://localhost:9500/swagger/index.html>

Make sure the frontend fetches data from the appropriate endpoints defined in the
gateway.

## 8. Testing Approach (To Be Defined)

Testing is still to be defined but will cover:

- Unit tests (for functions, components).
- Integration tests (for pages, API interaction).
- End-to-end tests.

## 9. Frequently Asked Questions

- **Where is the Figma design?**</br>
  [Figma Design Link](https://www.figma.com/design/7bQbOxewSEhML4rOlDnLUn/Prototype?node-id=0-1&t=YAw1onLPJKxj6KAt-1)

- **How do I add a dependency?**</br>
  Go to `apps/client/` and run:

  ```bash
  pnpm add <dependency-name>
  ```
