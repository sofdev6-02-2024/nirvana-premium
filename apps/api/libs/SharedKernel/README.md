# Shared Kernel - Tu Primera Chamba

The Shared Kernel module provides common functionality and utilities used across
_Tu Primera Chamba_’s microservices. This includes shared models, error handling
classes, and any reusable components essential for consistent logic and
interactions between services.

## Features

- **Shared Models**: Common models used across services (e.g., User, Job).
- **Utility Classes**: Includes helper functions and utilities.
- **Error Handling**: Standard error and exception handling classes for unified
  responses.
- **Data Transfer Objects (DTOs)**: Provides common data structures for API
  communication.

## Installation

To add `shared-kernel` as a dependency in a microservice:

1. Navigate to the specific microservice directory, e.g., `api-gateway` or
   `users-jobs-service`.

2. Add a project reference to `shared-kernel`:

   ```bash
   dotnet add reference ../shared-kernel/shared-kernel.csproj
   ```
