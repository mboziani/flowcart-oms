using FlowCart.Services.Order.Domain.Common;

namespace FlowCart.Services.Order.Domain.Entities;

public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }
    public virtual Order Order { get; set; } = null!;
    
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    
    public decimal TotalPrice => UnitPrice * Quantity;
}
