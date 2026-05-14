namespace FlowCart.Services.Catalog.Application.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string Description,
    string SKU,
    decimal Price,
    string CategoryName,
    string BrandName
);