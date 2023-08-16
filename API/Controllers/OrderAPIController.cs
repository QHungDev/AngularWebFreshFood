using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderAPIController : ControllerBase
    {
        private IOrderService _service;
        public OrderAPIController(IOrderService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(Order item)
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
        public IActionResult Get(int ID)
        {
            return Ok();
        }

        [HttpGet("changeConfirmStatus/{id}")]
        public async Task<IActionResult> ChangeConfirmStatus(int id)
        {
            return Ok(await _service.ChangeConfirmStatus(id));
        }

        [HttpPut("put")]
        public IActionResult Put(int ID, Order item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

    }
}
