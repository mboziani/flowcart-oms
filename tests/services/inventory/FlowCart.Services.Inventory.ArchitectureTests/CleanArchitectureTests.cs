using FluentAssertions;
using NetArchTest.Rules;
using Xunit;

namespace FlowCart.Services.Inventory.ArchitectureTests;

public class CleanArchitectureTests
{
    private const string DomainNamespace = "FlowCart.Services.Inventory.Domain";
    private const string ApplicationNamespace = "FlowCart.Services.Inventory.Application";
    private const string InfrastructureNamespace = "FlowCart.Services.Inventory.Infrastructure";
    private const string ApiNamespace = "FlowCart.Services.Inventory.API";

    [Fact]
    public void Domain_Should_Not_Have_Dependency_On_Other_Projects()
    {
        var assembly = typeof(Domain.Entities.Warehouse).Assembly;

        var otherProjects = new[]
        {
            ApplicationNamespace,
            InfrastructureNamespace,
            ApiNamespace
        };

        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(otherProjects)
            .GetResult();

        result.IsSuccessful.Should().BeTrue($"Domain layer should not depend on: {string.Join(", ", otherProjects)}");
    }

    [Fact]
    public void Application_Should_Not_Have_Dependency_On_Infrastructure_Or_Api()
    {
        var assembly = typeof(Application.DependencyInjection).Assembly;

        var otherProjects = new[]
        {
            InfrastructureNamespace,
            ApiNamespace
        };

        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(otherProjects)
            .GetResult();

        result.IsSuccessful.Should().BeTrue($"Application layer should not depend on: {string.Join(", ", otherProjects)}");
    }
}
