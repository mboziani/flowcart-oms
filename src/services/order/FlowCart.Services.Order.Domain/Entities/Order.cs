using FlowCart.Services.Order.Domain.Common;
using FlowCart.Services.Order.Domain.Enums;

namespace FlowCart.Services.Order.Domain.Entities;

public class Order : BaseEntity
{
    public Guid UserId { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public decimal TotalAmount { get; set; }
    
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
