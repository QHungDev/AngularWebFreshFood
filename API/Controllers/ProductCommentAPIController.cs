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
        public async Task<IActionResult> Post(ProductComment item)
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

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _service.FindItem(id);

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
