namespace FlowCart.Services.Order.Application.Interfaces;

public interface IOrderRepository
{
    Task<Domain.Entities.Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Domain.Entities.Order> AddAsync(Domain.Entities.Order order, CancellationToken cancellationToken = default);
}
