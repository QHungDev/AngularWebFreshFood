using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/product-category")]
    [ApiController]
    public class ProductCategoryAPIController : ControllerBase
    {
        private IProductCategoryService _service;
        public ProductCategoryAPIController(IProductCategoryService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public IActionResult Post(ProductCategory item)
        {
            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var response = await _service.SelectAll();

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int ID)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int ID, ProductCategory item)
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
