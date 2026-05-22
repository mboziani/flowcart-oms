using FlowCart.Services.Order.Domain.Enums;

namespace FlowCart.Services.Order.Application.DTOs;

public record OrderDto(
    Guid Id,
    Guid UserId,
    string ShippingAddress,
    OrderStatus Status,
    decimal TotalAmount,
    List<OrderItemDto> Items
);

public record OrderItemDto(
    Guid Id,
    Guid ProductId,
    string ProductName,
    decimal UnitPrice,
    int Quantity,
    decimal TotalPrice
);
