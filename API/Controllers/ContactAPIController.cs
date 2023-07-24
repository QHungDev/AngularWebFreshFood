using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.Diagnostics.Contracts;

namespace API.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactAPIController : ControllerBase
    {
        private IContactService _service;
        public ContactAPIController(IContactService service)
        {
            _service = service;
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

        [HttpPost("post")]
        public IActionResult Post(Contact item)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int ID, Contact item)
        {
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int ID)
        {
            if (ID <= 0)
            {
                return BadRequest();
            }

            var response = await _service.Delete(ID);

            if (!response)
                return UnprocessableEntity();

            return Ok(response);
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
