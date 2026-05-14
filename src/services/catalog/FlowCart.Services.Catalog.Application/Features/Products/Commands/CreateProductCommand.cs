using MediatR;

namespace FlowCart.Services.Catalog.Application.Features.Products.Commands;

public record CreateProductCommand(
    string Name,
    string Description,
    string SKU,
    decimal Price,
    Guid CategoryId,
    Guid BrandId
) : IRequest<Guid>;