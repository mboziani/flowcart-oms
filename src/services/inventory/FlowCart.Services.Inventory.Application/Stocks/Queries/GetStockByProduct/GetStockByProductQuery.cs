using FlowCart.Services.Inventory.Application.Stocks.Dtos;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Queries.GetStockByProduct;

public record GetStockByProductQuery(Guid ProductId) : IRequest<IReadOnlyList<StockDto>>;
