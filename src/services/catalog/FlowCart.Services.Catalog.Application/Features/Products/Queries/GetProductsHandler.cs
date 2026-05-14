using FlowCart.Services.Catalog.Application.DTOs;
using FlowCart.Services.Catalog.Application.Features.Products.Queries;
using FlowCart.Services.Catalog.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Catalog.Application.Features.Products.Queries;

public class GetProductsHandler : IRequestHandler<GetProductsQuery, IReadOnlyList<ProductDto>>
{
    private readonly IProductRepository _productRepository;

    public GetProductsHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IReadOnlyList<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _productRepository.ListAllAsync();
        
        return products.Select(p => new ProductDto(
            p.Id,
            p.Name,
            p.Description,
            p.SKU,
            p.Price,
            p.Category?.Name ?? "N/A",
            p.Brand?.Name ?? "N/A"
        )).ToList();
    }
}
