using FlowCart.Services.Order.Application.DTOs;
using FlowCart.Services.Order.Application.IntegrationEvents;
using FlowCart.Services.Order.Application.Interfaces;
using FlowCart.Services.Order.Domain.Entities;
using MassTransit;
using MediatR;

namespace FlowCart.Services.Order.Application.Features.Orders.Commands;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, OrderDto>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IPublishEndpoint _publishEndpoint;

    public CreateOrderHandler(IOrderRepository orderRepository, IPublishEndpoint publishEndpoint)
    {
        _orderRepository = orderRepository;
        _publishEndpoint = publishEndpoint;
    }

    public async Task<OrderDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = new Domain.Entities.Order
        {
            UserId = request.UserId,
            ShippingAddress = request.ShippingAddress,
            Status = Domain.Enums.OrderStatus.Pending,
            TotalAmount = request.Items.Sum(i => i.UnitPrice * i.Quantity),
            OrderItems = request.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                UnitPrice = i.UnitPrice,
                Quantity = i.Quantity
            }).ToList()
        };

        var savedOrder = await _orderRepository.AddAsync(order, cancellationToken);

        // Publish integration event
        await _publishEndpoint.Publish(new OrderPlacedEvent
        {
            OrderId = savedOrder.Id,
            UserId = savedOrder.UserId,
            TotalAmount = savedOrder.TotalAmount,
            PlacedAt = DateTime.UtcNow
        }, cancellationToken);

        return new OrderDto(
            savedOrder.Id,
            savedOrder.UserId,
            savedOrder.ShippingAddress,
            savedOrder.Status,
            savedOrder.TotalAmount,
            savedOrder.OrderItems.Select(i => new OrderItemDto(
                i.Id,
                i.ProductId,
                i.ProductName,
                i.UnitPrice,
                i.Quantity,
                i.TotalPrice
            )).ToList()
        );
    }
}
