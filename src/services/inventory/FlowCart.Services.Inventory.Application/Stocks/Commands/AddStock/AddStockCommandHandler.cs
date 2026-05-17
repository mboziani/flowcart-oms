using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Commands.AddStock;

public class AddStockCommandHandler : IRequestHandler<AddStockCommand, Guid>
{
    private readonly IStockRepository _stockRepository;
    private readonly IWarehouseRepository _warehouseRepository;
    private readonly IStockMovementRepository _movementRepository;

    public AddStockCommandHandler(
        IStockRepository stockRepository, 
        IWarehouseRepository warehouseRepository, 
        IStockMovementRepository movementRepository)
    {
        _stockRepository = stockRepository;
        _warehouseRepository = warehouseRepository;
        _movementRepository = movementRepository;
    }

    public async Task<Guid> Handle(AddStockCommand request, CancellationToken cancellationToken)
    {
        var warehouse = await _warehouseRepository.GetByIdAsync(request.WarehouseId);
        if (warehouse == null)
        {
            throw new KeyNotFoundException($"Warehouse with ID {request.WarehouseId} not found.");
        }

        var stock = await _stockRepository.GetByProductAndWarehouseAsync(request.ProductId, request.WarehouseId);

        if (stock == null)
        {
            stock = new Stock(Guid.NewGuid(), request.ProductId, request.WarehouseId, request.Quantity);
            await _stockRepository.AddAsync(stock);
        }
        else
        {
            stock.AddStock(request.Quantity);
            await _stockRepository.UpdateAsync(stock);
        }

        var movement = new StockMovement(
            Guid.NewGuid(), 
            stock.Id, 
            MovementType.Inbound, 
            request.Quantity, 
            request.Reason
        );
        
        await _movementRepository.AddAsync(movement);

        return stock.Id;
    }
}
