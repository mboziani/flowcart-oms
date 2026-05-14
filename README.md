# FlowCart OMS

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Architecture](https://img.shields.io/badge/architecture-Clean%20Architecture-orange.svg)]()

FlowCart OMS is a high-performance, event-driven Order Management System built with .NET 9+, following Clean Architecture principles and Microservices patterns.

## Architecture Overview

The system is designed as a distributed set of microservices communicating via an asynchronous event bus (RabbitMQ + MassTransit).

- **Identity Service**: Authentication, Authorization, and User Management (JWT + ASP.NET Identity).
- **Catalog Service**: (Sprint 02) Product, Category, and Brand management.
- **Inventory Service**: (Sprint 03) Real-time stock tracking and warehouse management.
- **Order Service**: (Sprint 04) High-concurrency order processing.
- **Notification Service**: (Sprint 05) Real-time alerts via SignalR and Email.

## Technology Stack

- **Backend**: .NET 9 / C#
- **Persistence**: SQL Server (EF Core), Redis (Caching)
- **Messaging**: RabbitMQ / MassTransit
- **API Gateway**: YARP (Yet Another Reverse Proxy)
- **Observability**: Seq (Logging), OpenTelemetry
- **DevOps**: Docker, Azure DevOps, GitHub Actions

## Getting Started

### Prerequisites
- Docker Desktop
- .NET 9 SDK
- Azure Data Studio / SSMS

### Local Development
1. Clone the repository.
2. Start the infrastructure:
   ```powershell
   docker-compose up -d
   ```
3. Navigate to the Identity Service and run:
   ```powershell
   cd src/services/identity/FlowCart.Services.Identity.API
   dotnet run
   ```

## Documentation
Detailed documentation for each sprint and architectural decision can be found in the [docs/](./docs/) folder.

---
*Maintained by the FlowCart Engineering Team.*
