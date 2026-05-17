using FlowCart.Services.Inventory.Domain.Entities;
using FluentAssertions;
using Xunit;

namespace FlowCart.Services.Inventory.UnitTests.Domain;

public class StockTests
{
    [Fact]
    public void Constructor_Should_InitializeStockCorrectly()
    {
        // Arrange
        var id = Guid.NewGuid();
        var productId = Guid.NewGuid();
        var warehouseId = Guid.NewGuid();
        var initialQuantity = 100;

        // Act
        var stock = new Stock(id, productId, warehouseId, initialQuantity);

        // Assert
        stock.Id.Should().Be(id);
        stock.ProductId.Should().Be(productId);
        stock.WarehouseId.Should().Be(warehouseId);
        stock.Quantity.Should().Be(initialQuantity);
        stock.ReservedQuantity.Should().Be(0);
        stock.AvailableQuantity.Should().Be(initialQuantity);
    }

    [Fact]
    public void AddStock_Should_IncreaseQuantity_WhenAmountIsPositive()
    {
        // Arrange
        var stock = new Stock(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), 100);

        // Act
        stock.AddStock(50);

        // Assert
        stock.Quantity.Should().Be(150);
        stock.AvailableQuantity.Should().Be(150);
    }

    [Fact]
    public void AddStock_Should_ThrowArgumentException_WhenAmountIsZeroOrNegative()
    {
        // Arrange
        var stock = new Stock(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), 100);

        // Act
        var actZero = () => stock.AddStock(0);
        var actNegative = () => stock.AddStock(-10);

        // Assert
        actZero.Should().Throw<ArgumentException>();
        actNegative.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void ReserveStock_Should_IncreaseReservedQuantityAndDecreaseAvailableQuantity()
    {
        // Arrange
        var stock = new Stock(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), 100);

        // Act
        stock.ReserveStock(30);

        // Assert
        stock.Quantity.Should().Be(100);
        stock.ReservedQuantity.Should().Be(30);
        stock.AvailableQuantity.Should().Be(70);
    }

    [Fact]
    public void ReserveStock_Should_ThrowInvalidOperationException_WhenInsufficientStockAvailable()
    {
        // Arrange
        var stock = new Stock(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), 100);

        // Act
        var act = () => stock.ReserveStock(120);

        // Assert
        act.Should().Throw<InvalidOperationException>();
    }
}
