using FlowCart.Services.Identity.Domain.Interfaces;
using FlowCart.Services.Identity.Infrastructure.Identity;
using FlowCart.Services.Identity.Infrastructure.Persistence;
using FlowCart.Services.Identity.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FlowCart.Services.Identity.Infrastructure.Services;
using FlowCart.Services.Identity.Application.Interfaces;

namespace FlowCart.Services.Identity.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<IdentityApplicationUser, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IIdentityService, IdentityService>();
        
        


        return services;
    }
}