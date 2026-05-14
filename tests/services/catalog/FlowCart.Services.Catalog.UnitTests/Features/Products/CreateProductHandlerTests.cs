using FlowCart.Services.Catalog.Application.Features.Products.Commands;
using FlowCart.Services.Catalog.Application.Features.Products.Handlers;
using FlowCart.Services.Catalog.Domain.Entities;
using FlowCart.Services.Catalog.Domain.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace FlowCart.Services.Catalog.UnitTests.Features.Products;

public class CreateProductHandlerTests
{
    private readonly Mock<IProductRepository> _mockRepo;
    private readonly CreateProductHandler _handler;

    public CreateProductHandlerTests()
    {
        _mockRepo = new Mock<IProductRepository>();
        _handler = new CreateProductHandler(_mockRepo.Object);
    }

    [Fact]
    public async Task Handle_Should_AddProductToRepository_When_RequestIsValid()
    {
        // Arrange
        var command = new CreateProductCommand(
            Name: "Test Product",
            Description: "Description",
            SKU: "SKU-123",
            Price: 99.99m,
            CategoryId: Guid.NewGuid(),
            BrandId: Guid.NewGuid()
        );

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeEmpty();
        _mockRepo.Verify(x => x.AddAsync(It.IsAny<Product>()), Times.Once);
    }
}
