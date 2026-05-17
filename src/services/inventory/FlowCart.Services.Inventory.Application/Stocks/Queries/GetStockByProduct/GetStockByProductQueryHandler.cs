using FlowCart.Services.Inventory.Application.Stocks.Dtos;
using FlowCart.Services.Inventory.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Queries.GetStockByProduct;

public class GetStockByProductQueryHandler : IRequestHandler<GetStockByProductQuery, IReadOnlyList<StockDto>>
{
    private readonly IStockRepository _repository;

    public GetStockByProductQueryHandler(IStockRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<StockDto>> Handle(GetStockByProductQuery request, CancellationToken cancellationToken)
    {
        var stocks = await _repository.ListByProductAsync(request.ProductId);

        return stocks
            .Select(s => new StockDto(s.Id, s.ProductId, s.WarehouseId, s.Quantity, s.ReservedQuantity, s.AvailableQuantity))
            .ToList()
            .AsReadOnly();
    }
}
