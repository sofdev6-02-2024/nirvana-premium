# API Gateway - Tu Primera Chamba

The API Gateway is the main entry point for all external requests to the _Tu
Primera Chamba_ API. It manages routing, handles initial authentication, and
forwards requests to the appropriate microservices.

## Features

- **Centralized Routing**: Routes requests to the appropriate internal
  microservices.
- **Authentication**: Verifies JWT tokens and authorizes requests.
- **Rate Limiting**: Manages API usage to ensure platform stability.
- **Logging**: Captures request and error logs for monitoring.
