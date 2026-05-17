using FlowCart.Services.Inventory.Application.Stocks.Commands.AddStock;
using FlowCart.Services.Inventory.Application.Stocks.Commands.ReserveStock;
using FlowCart.Services.Inventory.Application.Stocks.Dtos;
using FlowCart.Services.Inventory.Application.Stocks.Queries.GetStockByProduct;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FlowCart.Services.Inventory.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockController : ControllerBase
{
    private readonly IMediator _mediator;

    public StockController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("product/{productId:guid}")]
    [ProducesResponseType(typeof(IReadOnlyList<StockDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<StockDto>>> GetStockByProduct(Guid productId)
    {
        var result = await _mediator.Send(new GetStockByProductQuery(productId));
        return Ok(result);
    }

    [HttpPost("add")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Guid>> AddStock([FromBody] AddStockCommand command)
    {
        try
        {
            var id = await _mediator.Send(command);
            return Ok(id);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost("reserve")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<bool>> ReserveStock([FromBody] ReserveStockCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
}
