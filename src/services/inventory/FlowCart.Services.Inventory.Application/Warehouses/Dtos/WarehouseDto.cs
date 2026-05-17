namespace FlowCart.Services.Inventory.Application.Warehouses.Dtos;

public record WarehouseDto(Guid Id, string Name, string Location, bool IsActive);
