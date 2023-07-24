using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleAPIController : ControllerBase
    {
        private IArticleService _service;
        public ArticleAPIController(IArticleService service)
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

        [HttpGet("get/{page}/{pageSize}")]
        public async Task<IActionResult> Get(int page, int pageSize)
        {
            var response = await _service.SelectWithPagingAndTotal(page, pageSize);

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

        [HttpPost("post")]
        public async Task<IActionResult> Post(Article item)
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
        public async Task<IActionResult> Put(Article item)
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var response = await _service.Delete(id);

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
