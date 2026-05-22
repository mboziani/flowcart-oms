using FlowCart.Services.Order.Application.DTOs;
using MediatR;

namespace FlowCart.Services.Order.Application.Features.Orders.Commands;

public record CreateOrderCommand(
    Guid UserId,
    string ShippingAddress,
    List<CreateOrderItemCommand> Items
) : IRequest<OrderDto>;

public record CreateOrderItemCommand(
    Guid ProductId,
    string ProductName,
    decimal UnitPrice,
    int Quantity
);
