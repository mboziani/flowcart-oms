using FlowCart.Services.Inventory.Application.Warehouses.Dtos;
using FlowCart.Services.Inventory.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Warehouses.Queries.GetWarehouses;

public class GetWarehousesQueryHandler : IRequestHandler<GetWarehousesQuery, IReadOnlyList<WarehouseDto>>
{
    private readonly IWarehouseRepository _repository;

    public GetWarehousesQueryHandler(IWarehouseRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<WarehouseDto>> Handle(GetWarehousesQuery request, CancellationToken cancellationToken)
    {
        var warehouses = await _repository.ListAllAsync();
        
        return warehouses
            .Select(w => new WarehouseDto(w.Id, w.Name, w.Location, w.IsActive))
            .ToList()
            .AsReadOnly();
    }
}
