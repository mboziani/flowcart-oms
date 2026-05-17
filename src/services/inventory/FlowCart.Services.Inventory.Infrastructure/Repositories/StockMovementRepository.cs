using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using FlowCart.Services.Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FlowCart.Services.Inventory.Infrastructure.Repositories;

public class StockMovementRepository : IStockMovementRepository
{
    private readonly InventoryDbContext _context;

    public StockMovementRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<StockMovement>> ListByStockIdAsync(Guid stockId)
    {
        return await _context.StockMovements
            .Where(m => m.StockId == stockId)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task AddAsync(StockMovement movement)
    {
        await _context.StockMovements.AddAsync(movement);
        await _context.SaveChangesAsync();
    }
}
