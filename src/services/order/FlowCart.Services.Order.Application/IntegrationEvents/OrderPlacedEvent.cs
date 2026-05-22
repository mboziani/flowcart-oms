namespace FlowCart.Services.Order.Application.IntegrationEvents;

public record OrderPlacedEvent
{
    public Guid OrderId { get; init; }
    public Guid UserId { get; init; }
    public decimal TotalAmount { get; init; }
    public DateTime PlacedAt { get; init; }
}
