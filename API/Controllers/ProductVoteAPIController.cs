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
        public IActionResult Post(ProductVote item)
        {
            return Ok();
        }

        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok();
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
