using FluentAssertions;
using NetArchTest.Rules;
using Xunit;

namespace FlowCart.Services.Catalog.ArchitectureTests;

public class CleanArchitectureTests
{
    private const string DomainNamespace = "FlowCart.Services.Catalog.Domain";
    private const string ApplicationNamespace = "FlowCart.Services.Catalog.Application";
    private const string InfrastructureNamespace = "FlowCart.Services.Catalog.Infrastructure";
    private const string ApiNamespace = "FlowCart.Services.Catalog.API";

    [Fact]
    public void Domain_Should_Not_Have_Dependency_On_Other_Projects()
    {
        // Arrange
        // Using a type from Domain to get the assembly
        var assembly = typeof(Domain.Common.BaseEntity).Assembly;

        var otherProjects = new[]
        {
            ApplicationNamespace,
            InfrastructureNamespace,
            ApiNamespace
        };

        // Act
        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(otherProjects)
            .GetResult();

        // Assert
        result.IsSuccessful.Should().BeTrue($"Domain layer should not depend on: {string.Join(", ", otherProjects)}");
    }

    [Fact]
    public void Application_Should_Not_Have_Dependency_On_Infrastructure_Or_Api()
    {
        // Arrange
        var assembly = typeof(Application.DependencyInjection).Assembly;

        var otherProjects = new[]
        {
            InfrastructureNamespace,
            ApiNamespace
        };

        // Act
        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAll(otherProjects)
            .GetResult();

        // Assert
        result.IsSuccessful.Should().BeTrue($"Application layer should not depend on: {string.Join(", ", otherProjects)}");
    }
}
