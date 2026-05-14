using FlowCart.Services.Catalog.Domain.Interfaces;
using FlowCart.Services.Catalog.Infrastructure.Persistence;
using FlowCart.Services.Catalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FlowCart.Services.Catalog.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CatalogDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("CatalogConnection")));

        services.AddScoped<IProductRepository, ProductRepository>();

        return services;
    }
}