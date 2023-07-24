using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/product-comment")]
    [ApiController]
    public class ProductCommentAPIController : ControllerBase
    {
        private IProductCommentService _service;
        public ProductCommentAPIController(IProductCommentService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public IActionResult Post(ProductComment item)
        {
            return Ok();
        }

        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int ID)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int ID, ProductComment item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int ID)
        {
            return Ok();
        }


        [HttpPatch("path/{id}/{status}")]
        public async Task<IActionResult> Path(int ID, bool status)
        {
            if (ID <= 0)
            {
                return BadRequest();
            }

            var response = await _service.UpdateStatus(ID, status);

            if (!response)
                return UnprocessableEntity();

            return Ok(response);
        }
    }
}
