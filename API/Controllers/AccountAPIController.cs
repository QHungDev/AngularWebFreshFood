using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountAPIController : ControllerBase
    {
        private IAccountService _service;
        public AccountAPIController(IAccountService service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("searchall")]
        public async Task<IActionResult> SearchAccounts(string username)
        {
            var data = await _service.SearchAccounts(username);
            return Ok(data);
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
        public async Task<IActionResult> Get(string id)
        {
            var response = await _service.FindItem(id);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(Account item)
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

        [HttpPut]
        [Route("updateitem")]
        public async Task<IActionResult> UpdateAccount(string username, Account item)
        {
            var data = await _service.UpdateAccount(username, item);
            if (data == null)
                return BadRequest();

            return Ok(data);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string ID)
        {
            if (string.IsNullOrEmpty(ID))
            {
                return BadRequest();
            }

            var response = await _service.Delete(ID);

            if (!response)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpPatch("path/{id}/{status}")]
        public async Task<IActionResult> Path(string ID, bool status)
        {
            if (string.IsNullOrEmpty(ID))
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
