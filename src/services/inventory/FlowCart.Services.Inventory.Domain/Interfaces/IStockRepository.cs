using FlowCart.Services.Inventory.Domain.Entities;

namespace FlowCart.Services.Inventory.Domain.Interfaces;

public interface IStockRepository
{
    Task<Stock?> GetByIdAsync(Guid id);
    Task<Stock?> GetByProductAndWarehouseAsync(Guid productId, Guid warehouseId);
    Task<IReadOnlyList<Stock>> ListByWarehouseAsync(Guid warehouseId);
    Task<IReadOnlyList<Stock>> ListByProductAsync(Guid productId);
    Task AddAsync(Stock stock);
    Task UpdateAsync(Stock stock);
}
