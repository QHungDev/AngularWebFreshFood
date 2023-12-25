using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Org.BouncyCastle.Asn1.Eac;

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
        public async Task<IActionResult> Post(Client item)
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

        [HttpGet("getWithEmail/{email}")]
        public async Task<IActionResult> GetWithEmail(string email)
        {
            var response = await _service.SelectWithEmail(email);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpPut("put")]
        public async Task<IActionResult> Put(ClientUpdate item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Update(item);

            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpPut("UpdatePoint/{id}/{point}/{bonus}")]
        public async Task<IActionResult> UpdatePoint(int id, double point, double bonus)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var response = await _service.UpdatePoint(id, point, bonus);

            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpPut("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ClientUpdate item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.ForgotPassword(item);

            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
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
