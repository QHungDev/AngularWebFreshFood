using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/account-category")]
    [ApiController]
    public class AccountCategoryAPIController : ControllerBase
    {
        private IAccountCategoryService _service;
        public AccountCategoryAPIController(IAccountCategoryService service)
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
        public async Task<IActionResult> Get(string id)
        {
            var response = await _service.FindItem(id);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(AccountCategory item)
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

        [HttpPut("put")]
        public async Task<IActionResult> Put(AccountCategory item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Update(item);

            if(response == null)
                return UnprocessableEntity();

            return Ok(response);
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

    }
}
