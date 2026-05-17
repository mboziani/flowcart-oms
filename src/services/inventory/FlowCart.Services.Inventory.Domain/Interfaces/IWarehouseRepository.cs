using FlowCart.Services.Inventory.Domain.Entities;

namespace FlowCart.Services.Inventory.Domain.Interfaces;

public interface IWarehouseRepository
{
    Task<Warehouse?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<Warehouse>> ListAllAsync();
    Task AddAsync(Warehouse warehouse);
    Task UpdateAsync(Warehouse warehouse);
    Task DeleteAsync(Warehouse warehouse);
}
