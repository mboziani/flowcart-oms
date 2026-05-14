using FlowCart.Services.Catalog.Domain.Common;

namespace FlowCart.Services.Catalog.Domain.Entities;

public class Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}