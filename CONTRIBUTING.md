# Contributing to Distribution Center built

Thank you for your interest in contributing to this API! Here are some
guidelines to help you get started.

## How to Report Bugs

If you find a bug, please open an issue on GitHub and include:

- A clear and descriptive title.
- Steps to reproduce the bug.
- Expected and actual behavior.
- Any relevant screenshots or log files.

## Getting Started

### Prerequisites

- [Dotnet SDK](https://dotnet.microsoft.com/download)
- [node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/sofdev6-02-2024/nirvana-premium.git
   cd nirvana-premium
   ```

2. Install the project dependencies.

   ```bash
   pnpm install
   ```

3. Enable Husky hooks.

   ```bash
   pnpm prepare
   ```

With these steps, you have the project set up and ready to start development.

## Common Commands

### Installation of Dependencies

Install all dependencies:

```bash
pnpm install
```

### Development

Start all services in development mode:

```bash
pnpm dev
```

### Building

Build all backend services:

```bash
pnpm build
```

### Build for Docker Compose environment

```bash
pnpm build:compose
```

### Build without restoring packages

```bash
pnpm build:norestore
```

### Database Operations

Reset and recreate the database:

```bash
pnpm reset:db
```

This command will:

1. Stop all Docker containers
2. Reset the database in users-jobs-service
3. Start Docker containers again

### Testing

Run backend tests:

```bash
pnpm test
```

### Code Quality

Run linting on client code:

```bash
pnpm lint
```

### Package Management

Restore backend packages:

```bash
pnpm restore
```

### Docker Operations

Stop all containers:

```bash
pnpm down
```

## Pull Request Process

When you are ready to submit your changes, follow these steps:

- You need to commit your changes using the `git commit` command - without a
  message the husky hooks will be in-charge of that.
- You need to create a new branch with a semantic prefix (e.g., `feature/`,
  `fix/`, `docs/`) and a descriptive name.
- Push your changes to the branch and open a pull request on GitHub.
- Wait for the maintainers to review your pull request.

## Pull Request Review Guidelines

All pull requests will be evaluated based on the following criteria:

1. **Semantic Commits:**

   - Ensure that commit messages follow semantic commit conventions as agreed
     upon by the team.

2. **Code Conventions:**

   - Adhere to all code conventions enforced by all Analyzers.
   - Follow additional coding rules and standards discussed and agreed upon by
     the team.

3. **Test Execution:**

   - Run all tests and ensure they pass successfully.
   - Use `pnpm test` for running tests.

4. **CI Model and Pipelines:**

   - The pull request must pass all stages of the Continuous Integration (CI)
     model and associated pipelines.
   - This includes using GitHub Actions for branch name enforcement
     (`deepakputhraya/action-branch-name@master`), semantic pull request checks
     (`amannn/action-semantic-pull-request@v5`), and commit message checking
     (`gsactions/commit-message-checker@v2`).

5. **Task or Feature Completion:**
   - The pull request should successfully complete the task or feature it is
     intended to address.

By adhering to these guidelines, we ensure that our codebase remains clean,
maintainable, and aligned with our project goals and standards.

## More Information

- If you have any questions about the UML diagrams, please visit the next link:
  [UML](https://drive.google.com/file/d/1dVLV4ie198BHpQiql4AHYCrFuKQagkJt/view?usp=sharing)

- If you have any questions about the ER diagrams, please visit the next link:
  [ER](https://app.eraser.io/workspace/We4tsBUnaS4cjPDOjva0)

- If you have any questions about the High level Architecture diagram, please
  visit the next link:
  [High Level Architecture](https://app.eraser.io/workspace/6EzVRNUynFZYHnx5UF9E)

- If you have any questions about the Sequences diagrams, please visit the next
  link: [Sequences](https://app.eraser.io/workspace/rLwT0ZG9RRwDy1hojV7r)

- If you need more information about the tasks of the project, please visit the
  next link: [ClickUp](https://app.clickup.com/9011403313/v/l/li/901105338858)

## License

By contributing to this API, you agree that your contributions will be licensed
under its [MIT License](LICENSE).

Thank you for your interest in contributing to this API! We look forward to your
contributions.
