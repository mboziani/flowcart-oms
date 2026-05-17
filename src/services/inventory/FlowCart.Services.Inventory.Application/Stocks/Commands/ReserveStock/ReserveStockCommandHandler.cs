using FlowCart.Services.Inventory.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Commands.ReserveStock;

public class ReserveStockCommandHandler : IRequestHandler<ReserveStockCommand, bool>
{
    private readonly IStockRepository _stockRepository;

    public ReserveStockCommandHandler(IStockRepository stockRepository)
    {
        _stockRepository = stockRepository;
    }

    public async Task<bool> Handle(ReserveStockCommand request, CancellationToken cancellationToken)
    {
        var stock = await _stockRepository.GetByProductAndWarehouseAsync(request.ProductId, request.WarehouseId);
        if (stock == null)
        {
            return false;
        }

        try
        {
            stock.ReserveStock(request.Quantity);
            await _stockRepository.UpdateAsync(stock);
            return true;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
    }
}
