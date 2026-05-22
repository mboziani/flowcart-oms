using FlowCart.Services.Order.Application.DTOs;
using FlowCart.Services.Order.Application.Features.Orders.Commands;
using FlowCart.Services.Order.Application.Interfaces;
using FluentAssertions;
using MassTransit;
using Moq;
using Xunit;
using FlowCart.Services.Order.Application.IntegrationEvents;

namespace FlowCart.Services.Order.UnitTests;

public class CreateOrderHandlerTests
{
    private readonly Mock<IOrderRepository> _orderRepositoryMock;
    private readonly Mock<IPublishEndpoint> _publishEndpointMock;
    private readonly CreateOrderHandler _handler;

    public CreateOrderHandlerTests()
    {
        _orderRepositoryMock = new Mock<IOrderRepository>();
        _publishEndpointMock = new Mock<IPublishEndpoint>();
        _handler = new CreateOrderHandler(_orderRepositoryMock.Object, _publishEndpointMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_SavesOrderAndPublishesEvent()
    {
        // Arrange
        var command = new CreateOrderCommand(
            Guid.NewGuid(),
            "123 Test St",
            new List<CreateOrderItemCommand>
            {
                new CreateOrderItemCommand(Guid.NewGuid(), "Test Product", 100m, 2)
            }
        );

        _orderRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Domain.Entities.Order>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Domain.Entities.Order order, CancellationToken token) => 
            {
                order.Id = Guid.NewGuid();
                return order;
            });

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.TotalAmount.Should().Be(200m); // 100 * 2
        result.ShippingAddress.Should().Be("123 Test St");

        _orderRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<Domain.Entities.Order>(), It.IsAny<CancellationToken>()), Times.Once);
        _publishEndpointMock.Verify(pub => pub.Publish(It.IsAny<OrderPlacedEvent>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}
