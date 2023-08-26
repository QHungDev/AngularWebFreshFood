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

        [HttpPost("cancelOrder/{orderID}")]
        public async Task<IActionResult> Post(int orderID)
        {            
            if (orderID == null || orderID == 0)
            {
                return BadRequest();
            }

            var response = await _service.CancelOrder(orderID);

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

        [HttpGet("getOrderByClient/{client}")]
        public async Task<IActionResult> Get(string client)
        {
            var response = await _service.FindAllByClient(client);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpGet("changeConfirmStatus/{id}")]
        public async Task<IActionResult> ChangeConfirmStatus(int id)
        {
            return Ok(await _service.ChangeConfirmStatus(id));
        }

        [HttpPut("put")]
        public async Task<IActionResult> Put(int orderID,Order item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Update(orderID,item);
            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

    }
}
