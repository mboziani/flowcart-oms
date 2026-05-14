using FlowCart.Services.Catalog.Application.DTOs;
using MediatR;

namespace FlowCart.Services.Catalog.Application.Features.Products.Queries;

public record GetProductsQuery() : IRequest<IReadOnlyList<ProductDto>>;