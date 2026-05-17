using FlowCart.Services.Inventory.Application.Stocks.Commands.AddStock;
using FlowCart.Services.Inventory.Domain.Entities;
using FlowCart.Services.Inventory.Domain.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace FlowCart.Services.Inventory.UnitTests.Application.Handlers;

public class AddStockCommandHandlerTests
{
    private readonly Mock<IStockRepository> _stockRepositoryMock;
    private readonly Mock<IWarehouseRepository> _warehouseRepositoryMock;
    private readonly Mock<IStockMovementRepository> _movementRepositoryMock;
    private readonly AddStockCommandHandler _handler;

    public AddStockCommandHandlerTests()
    {
        _stockRepositoryMock = new Mock<IStockRepository>();
        _warehouseRepositoryMock = new Mock<IWarehouseRepository>();
        _movementRepositoryMock = new Mock<IStockMovementRepository>();

        _handler = new AddStockCommandHandler(
            _stockRepositoryMock.Object,
            _warehouseRepositoryMock.Object,
            _movementRepositoryMock.Object
        );
    }

    [Fact]
    public async Task Handle_Should_CreateNewStock_WhenStockDoesNotExist()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var warehouseId = Guid.NewGuid();
        var command = new AddStockCommand(productId, warehouseId, 50, "Initial stock");

        var warehouse = new Warehouse(warehouseId, "Main Warehouse", "Location A");
        _warehouseRepositoryMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);

        _stockRepositoryMock.Setup(x => x.GetByProductAndWarehouseAsync(productId, warehouseId))
            .ReturnsAsync((Stock?)null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeEmpty();

        _stockRepositoryMock.Verify(x => x.AddAsync(It.Is<Stock>(s => 
            s.ProductId == productId && 
            s.WarehouseId == warehouseId && 
            s.Quantity == 50)), Times.Once);

        _movementRepositoryMock.Verify(x => x.AddAsync(It.Is<StockMovement>(m => 
            m.Quantity == 50 && 
            m.Type == MovementType.Inbound && 
            m.Reason == "Initial stock")), Times.Once);
    }

    [Fact]
    public async Task Handle_Should_ThrowKeyNotFoundException_WhenWarehouseDoesNotExist()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var warehouseId = Guid.NewGuid();
        var command = new AddStockCommand(productId, warehouseId, 50, "Initial stock");

        _warehouseRepositoryMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync((Warehouse?)null);

        // Act
        var act = () => _handler.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }
}
