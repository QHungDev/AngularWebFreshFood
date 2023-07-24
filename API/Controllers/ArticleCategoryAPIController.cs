using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/article-category")]
    [ApiController]
    public class ArticleCategoryAPIController : ControllerBase
    {
        private IArticleCategoryService _service;
        public ArticleCategoryAPIController(IArticleCategoryService service)
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
        public async Task<IActionResult> Get(int ID)
        {
            var response = await _service.FindItem(ID);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(ArticleCategory item)
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
        public async Task<IActionResult> Put(ArticleCategory item)
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
