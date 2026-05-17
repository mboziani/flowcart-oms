using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using FlowCart.Services.Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FlowCart.Services.Inventory.Infrastructure.Repositories;

public class StockRepository : IStockRepository
{
    private readonly InventoryDbContext _context;

    public StockRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<Stock?> GetByIdAsync(Guid id)
    {
        return await _context.Stocks.FindAsync(id);
    }

    public async Task<Stock?> GetByProductAndWarehouseAsync(Guid productId, Guid warehouseId)
    {
        return await _context.Stocks
            .FirstOrDefaultAsync(s => s.ProductId == productId && s.WarehouseId == warehouseId);
    }

    public async Task<IReadOnlyList<Stock>> ListByWarehouseAsync(Guid warehouseId)
    {
        return await _context.Stocks
            .Where(s => s.WarehouseId == warehouseId)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Stock>> ListByProductAsync(Guid productId)
    {
        return await _context.Stocks
            .Where(s => s.ProductId == productId)
            .ToListAsync();
    }

    public async Task AddAsync(Stock stock)
    {
        await _context.Stocks.AddAsync(stock);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Stock stock)
    {
        _context.Entry(stock).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}
