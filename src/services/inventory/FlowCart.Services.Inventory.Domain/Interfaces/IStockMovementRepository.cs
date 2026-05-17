using FlowCart.Services.Inventory.Domain.Entities;

namespace FlowCart.Services.Inventory.Domain.Interfaces;

public interface IStockMovementRepository
{
    Task<IReadOnlyList<StockMovement>> ListByStockIdAsync(Guid stockId);
    Task AddAsync(StockMovement movement);
}
