using MediatR;

namespace FlowCart.Services.Inventory.Application.Stocks.Commands.ReserveStock;

public record ReserveStockCommand(Guid ProductId, Guid WarehouseId, int Quantity) : IRequest<bool>;
