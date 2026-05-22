# Testing Standards

## 1. Unit Testing
- Use **xUnit** as the primary testing framework.
- Use **FluentAssertions** for readable assertions.
- Use **NSubstitute** or **Moq** for mocking dependencies.
- Follow the AAA (Arrange, Act, Assert) pattern strictly.
- Focus on testing Domain logic and Application Use Cases (MediatR handlers).

## 2. Integration Testing
- Use **Testcontainers** to spin up real SQL Server or RabbitMQ instances for reliable integration tests.
- Alternatively, use WebApplicationFactory to test API endpoints end-to-end in-memory.

## 3. Architecture Tests
- Use **NetArchTest.Rules** to enforce Clean Architecture layer boundaries automatically during CI.
- Examples: Domain should not reference Application. Application should not reference Infrastructure.
