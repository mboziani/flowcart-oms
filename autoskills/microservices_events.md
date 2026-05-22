# Microservices & Event-Driven Standards

## 1. Database-per-Service
- Each microservice must own its database schema and data.
- Services cannot access another service's database directly. All communication must occur via APIs (synchronous) or Events (asynchronous).

## 2. Event-Driven Communication
- Prefer asynchronous messaging using **MassTransit** and **RabbitMQ** for state changes across services to ensure eventual consistency.
- Define shared Events (e.g., `ProductCreatedEvent`) clearly using C# `record` types.
- Consider the **Outbox Pattern** when saving to the database and publishing an event simultaneously to guarantee message delivery in high-reliability scenarios.

## 3. Synchronous Communication & Resilience
- When synchronous HTTP calls are necessary (e.g., a service fetching data from another service via API Gateway or directly), use strongly-typed `HttpClient` instances.
- Always apply **Polly** policies (Retries, Circuit Breaker, Timeouts) to prevent cascading failures in a microservices environment.
