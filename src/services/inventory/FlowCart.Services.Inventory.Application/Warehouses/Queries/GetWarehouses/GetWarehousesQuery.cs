using FlowCart.Services.Inventory.Application.Warehouses.Dtos;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Warehouses.Queries.GetWarehouses;

public record GetWarehousesQuery() : IRequest<IReadOnlyList<WarehouseDto>>;
