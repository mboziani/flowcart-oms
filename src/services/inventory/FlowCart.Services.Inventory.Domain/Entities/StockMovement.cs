namespace FlowCart.Services.Inventory.Domain.Entities;

public enum MovementType
{
    Inbound,
    Outbound,
    Adjustment
}

public class StockMovement
{
    public Guid Id { get; private set; }
    public Guid StockId { get; private set; }
    public MovementType Type { get; private set; }
    public int Quantity { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string Reason { get; private set; } = string.Empty;

    private StockMovement() { } // EF Core

    public StockMovement(Guid id, Guid stockId, MovementType type, int quantity, string reason)
    {
        Id = id;
        StockId = stockId;
        Type = type;
        Quantity = quantity;
        Reason = reason;
        CreatedAt = DateTime.UtcNow;
    }
}
