using NetArchTest.Rules;
using Xunit;

namespace FlowCart.Services.Order.ArchitectureTests;

public class LayerTests
{
    private const string DomainNamespace = "FlowCart.Services.Order.Domain";
    private const string ApplicationNamespace = "FlowCart.Services.Order.Application";
    private const string InfrastructureNamespace = "FlowCart.Services.Order.Infrastructure";
    private const string ApiNamespace = "FlowCart.Services.Order.API";

    [Fact]
    public void Domain_Should_Not_Have_Dependencies_On_Other_Layers()
    {
        // Arrange
        var assembly = typeof(Domain.Common.BaseEntity).Assembly;
        
        // Act
        var result = Types.InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(ApplicationNamespace, InfrastructureNamespace, ApiNamespace)
            .GetResult();

        // Assert
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
