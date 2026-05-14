using FlowCart.Services.Catalog.Domain.Common;

namespace FlowCart.Services.Catalog.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    
    // Navigation
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}