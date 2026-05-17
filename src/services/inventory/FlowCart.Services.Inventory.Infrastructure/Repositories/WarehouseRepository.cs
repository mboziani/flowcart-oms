using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using FlowCart.Services.Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FlowCart.Services.Inventory.Infrastructure.Repositories;

public class WarehouseRepository : IWarehouseRepository
{
    private readonly InventoryDbContext _context;

    public WarehouseRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<Warehouse?> GetByIdAsync(Guid id)
    {
        return await _context.Warehouses.FindAsync(id);
    }

    public async Task<IReadOnlyList<Warehouse>> ListAllAsync()
    {
        return await _context.Warehouses.ToListAsync();
    }

    public async Task AddAsync(Warehouse warehouse)
    {
        await _context.Warehouses.AddAsync(warehouse);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Warehouse warehouse)
    {
        _context.Entry(warehouse).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Warehouse warehouse)
    {
        _context.Warehouses.Remove(warehouse);
        await _context.SaveChangesAsync();
    }
}
