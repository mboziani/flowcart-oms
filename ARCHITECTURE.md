# Architecture Overview - FlowCart OMS

This document provides a high-level overview of the architectural patterns and decisions governing the FlowCart Platform.

## 1. Clean Architecture

Each microservice follows the Clean Architecture pattern to ensure separation of concerns and maintainability.

- **Domain**: Core entities, value objects, and domain logic. No external dependencies.
- **Application**: Use cases, MediatR handlers, and interfaces.
- **Infrastructure**: Persistence (EF Core), Messaging (MassTransit), and external service implementations.
- **API**: HTTP endpoints, middleware, and dependency injection registration.

## 2. Microservices Blueprint

The system is a distributed ecosystem of autonomous services.

| Service | Responsibility | Stack |
| :--- | :--- | :--- |
| **Identity** | AuthN/AuthZ, IAM | ASP.NET Identity, JWT |
| **Catalog** | Products, Categories | SQL Server, Redis |
| **Inventory** | Stock, Warehousing | SQL Server, RabbitMQ |
| **Order** | Transactions, Saga | SQL Server, MassTransit |
| **Gateway** | Routing, Rate Limiting | YARP |

## 3. Communication Patterns

- **Synchronous**: REST API for client-to-service communication.
- **Asynchronous**: Event-driven communication between services using **RabbitMQ** and the **Outbox Pattern** to ensure eventual consistency.

## 4. Database Strategy

- **Database-per-Service**: Each service owns its data to ensure loose coupling.
- **SQL Server**: Primary relational store for transactional data.
- **Redis**: Distributed cache for performance-critical data.
