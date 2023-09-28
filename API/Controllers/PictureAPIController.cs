using API.Interfaces;
using API.Services;
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
        private IWebHostEnvironment myEnvironment;
        public PictureAPIController(IWebHostEnvironment environment, IPictureService service)
        {
             myEnvironment = environment;
            _service = service;
        }
        [HttpGet("{imageAvatar}")]
        public async Task<ActionResult> GetImg([FromRoute] string imageAvatar){
            string folderSave = "FileUploads\\Carousel\\";
            string path = myEnvironment.WebRootPath+folderSave;
            var filePath = path + imageAvatar;
            if(System.IO.File.Exists(filePath)){
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b,"image/jpg");
            }
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile imageFile)
        {
            var folderName = "FileUploads";

            var res = await _service.UploadImageAsync(imageFile, folderName);

            return RedirectToAction("ResponseData", new { fileURL = res.Content?.DownloadUrl });
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
