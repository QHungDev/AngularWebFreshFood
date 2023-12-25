using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using API.Interfaces;

namespace API.Controllers
{
    [Route("api/product-vote")]
    [ApiController]
    public class ProductVoteAPIController : ControllerBase
    {
        private IProductVoteService _service;
        public ProductVoteAPIController(IProductVoteService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(ProductVote item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Insert(item);

            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var response = await _service.SelectAll();

            if (response == null)
                return NotFound();

            return Ok(response);
        }
        [HttpGet("getAllByProduct/{id}")]
        public async Task<IActionResult> GetAllByProduct(int id)
        {
            var response = await _service.GetAllByProduct(id);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int clientID, int productID)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int clientID, int productID, ProductVote item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int clientID, int productID)
        {
            return Ok();
        }
    }
}
