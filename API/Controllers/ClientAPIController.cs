using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientAPIController : ControllerBase
    {
        private IClientService _service;
        public ClientAPIController(IClientService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public IActionResult Post(Client item)
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
        public IActionResult Put(int ID, Client item)
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
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Login(item);

            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }
    }
}
