using FlowCart.Services.Catalog.Domain.Common;

namespace FlowCart.Services.Catalog.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public decimal Price { get; set; }
    
    // Foreign Keys
    public Guid CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
    
    public Guid BrandId { get; set; }
    public virtual Brand Brand { get; set; } = null!;
}