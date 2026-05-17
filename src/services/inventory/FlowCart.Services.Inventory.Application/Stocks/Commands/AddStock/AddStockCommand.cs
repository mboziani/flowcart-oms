using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Commands.AddStock;

public record AddStockCommand(Guid ProductId, Guid WarehouseId, int Quantity, string Reason) : IRequest<Guid>;
