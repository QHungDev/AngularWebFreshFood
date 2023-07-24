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
        public IActionResult Post(Order item)
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
        public IActionResult Put(int ID, Order item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int ID)
        {
            return Ok();
        }

    }
}
