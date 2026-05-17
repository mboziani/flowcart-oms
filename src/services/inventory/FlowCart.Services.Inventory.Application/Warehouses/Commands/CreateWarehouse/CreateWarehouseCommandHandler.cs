using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Inventory.Application.Warehouses.Commands.CreateWarehouse;

public class CreateWarehouseCommandHandler : IRequestHandler<CreateWarehouseCommand, Guid>
{
    private readonly IWarehouseRepository _repository;

    public CreateWarehouseCommandHandler(IWarehouseRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateWarehouseCommand request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var warehouse = new Warehouse(id, request.Name, request.Location);

        await _repository.AddAsync(warehouse);

        return id;
    }
}
