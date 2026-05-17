using MediatR;

namespace FlowCart.Services.Inventory.Application.Warehouses.Commands.CreateWarehouse;

public record CreateWarehouseCommand(string Name, string Location) : IRequest<Guid>;
