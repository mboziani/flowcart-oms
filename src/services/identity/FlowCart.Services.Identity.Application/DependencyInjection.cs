using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FlowCart.Services.Identity.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        // Add validators, automapper, etc.
        return services;
    }
}