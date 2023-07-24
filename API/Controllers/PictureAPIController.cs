using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/picture")]
    [ApiController]
    public class PictureAPIController : ControllerBase
    {
        private IPictureService _service;
        public PictureAPIController(IPictureService service)
        {
            _service = service;
        }

        [HttpPost("post")]
        public IActionResult Post(Picture item)
        {
            return Ok();
        }

        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int id)
        {
            return Ok();
        }

        [HttpPut("put")]
        public IActionResult Put(int ID, Picture item)
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
    }
}
