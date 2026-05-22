# C# & Clean Architecture Standards

## 1. Clean Architecture Layers
- **Domain**: Contains core entities, value objects, and domain exceptions. **Must not** have dependencies on any other project or external frameworks (except .NET base class libraries).
- **Application**: Contains Use Cases (CQRS via MediatR), DTOs, and Interfaces (e.g., Repositories). Depends ONLY on the Domain layer.
- **Infrastructure**: Contains implementations of Application interfaces (EF Core DbContexts, external API clients, messaging providers). Depends on Application and Domain layers.
- **API**: The entry point. Registers DI, maps endpoints. Depends on Application and Infrastructure layers.

## 2. CQRS and MediatR
- Separate Read (Queries) and Write (Commands) operations.
- Each Command/Query should have its own specific Handler.
- Commands should not return entities. Return an ID, a success boolean, or a specific Result object.

## 3. C# Coding Conventions
- Use `Records` for DTOs, Commands, Queries, and Events for immutability.
- Avoid primitive obsession; use Value Objects (e.g., `Money`, `Sku`) in the Domain.
- Keep controllers lean. Controllers should merely map HTTP requests to MediatR commands/queries and return the corresponding HTTP status codes.
- Use `async/await` all the way down. Suffix asynchronous methods with `Async` (e.g., `GetProductByIdAsync`).
