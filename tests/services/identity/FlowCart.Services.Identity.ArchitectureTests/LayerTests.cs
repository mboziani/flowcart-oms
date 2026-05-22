using NetArchTest.Rules;
using Xunit;

namespace FlowCart.Services.Identity.ArchitectureTests;

public class LayerTests
{
    private const string DomainNamespace = "FlowCart.Services.Identity.Domain";
    private const string ApplicationNamespace = "FlowCart.Services.Identity.Application";
    private const string InfrastructureNamespace = "FlowCart.Services.Identity.Infrastructure";
    private const string ApiNamespace = "FlowCart.Services.Identity.API";

    [Fact]
    public void Domain_Should_Not_Have_Dependencies_On_Other_Layers()
    {
        var assembly = typeof(Domain.Entities.ApplicationUser).Assembly;
        
        var result = Types.InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(ApplicationNamespace, InfrastructureNamespace, ApiNamespace)
            .GetResult();

        Assert.True(result.IsSuccessful);
    }
    
    [Fact]
    public void Application_Should_Not_Have_Dependencies_On_Infrastructure_Or_Api()
    {
        var assembly = typeof(Application.DependencyInjection).Assembly;
        
        var result = Types.InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(InfrastructureNamespace, ApiNamespace)
            .GetResult();

        Assert.True(result.IsSuccessful);
    }
}
