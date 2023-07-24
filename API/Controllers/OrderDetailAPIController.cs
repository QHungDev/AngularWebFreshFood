using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/order-detail")]
    [ApiController]
    public class OrderDetailAPIController : ControllerBase
    {
        private IOrderDetailService _service;
        public OrderDetailAPIController(IOrderDetailService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public IActionResult Post(OrderDetail item)
        {
            return Ok();
        }

        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int orderID, int productID)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int orderID, int productID, OrderDetail item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int orderID, int productID)
        {
            return Ok();
        }
    }
}
