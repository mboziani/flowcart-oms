namespace FlowCart.Services.Inventory.Domain.Entities;

public class Stock
{
    public Guid Id { get; private set; }
    public Guid ProductId { get; private set; }
    public Guid WarehouseId { get; private set; }
    public int Quantity { get; private set; }
    public int ReservedQuantity { get; private set; }

    public int AvailableQuantity => Quantity - ReservedQuantity;

    private Stock() { } // EF Core

    public Stock(Guid id, Guid productId, Guid warehouseId, int quantity)
    {
        Id = id;
        ProductId = productId;
        WarehouseId = warehouseId;
        Quantity = quantity;
        ReservedQuantity = 0;
    }

    public void AddStock(int amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive", nameof(amount));
        Quantity += amount;
    }

    public void RemoveStock(int amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive", nameof(amount));
        if (AvailableQuantity < amount) throw new InvalidOperationException("Insufficient stock");
        Quantity -= amount;
    }

    public void ReserveStock(int amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive", nameof(amount));
        if (AvailableQuantity < amount) throw new InvalidOperationException("Insufficient stock to reserve");
        ReservedQuantity += amount;
    }

    public void ConfirmReservation(int amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive", nameof(amount));
        if (ReservedQuantity < amount) throw new InvalidOperationException("Not enough reserved stock to confirm");
        ReservedQuantity -= amount;
        Quantity -= amount;
    }
}
