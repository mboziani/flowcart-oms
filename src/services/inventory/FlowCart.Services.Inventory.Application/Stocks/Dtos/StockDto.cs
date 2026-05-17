namespace FlowCart.Services.Inventory.Application.Stocks.Dtos;

public record StockDto(Guid Id, Guid ProductId, Guid WarehouseId, int Quantity, int ReservedQuantity, int AvailableQuantity);
