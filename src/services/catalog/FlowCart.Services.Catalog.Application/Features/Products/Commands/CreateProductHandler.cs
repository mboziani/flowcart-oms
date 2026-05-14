using FlowCart.Services.Catalog.Application.Features.Products.Commands;
using FlowCart.Services.Catalog.Domain.Entities;
using FlowCart.Services.Catalog.Domain.Interfaces;
using MediatR;

namespace FlowCart.Services.Catalog.Application.Features.Products.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly IProductRepository _productRepository;

    public CreateProductHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = request.Name,
            Description = request.Description,
            SKU = request.SKU,
            Price = request.Price,
            CategoryId = request.CategoryId,
            BrandId = request.BrandId
        };

        await _productRepository.AddAsync(product);
        return product.Id;
    }
}