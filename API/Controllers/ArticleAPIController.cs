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
        private IWebHostEnvironment myEnvironment;
        private DBContext _context;
        private IArticleService _service;
        public ArticleAPIController(IWebHostEnvironment environment,DBContext context,IArticleService service)
        {
            myEnvironment = environment;
             _context = context;
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
        [HttpGet("{imageAvatar}")]
        public async Task<ActionResult> GetImg([FromRoute] string imageAvatar){
            string folderSave = "FileUploads\\Article\\Avatar\\";
            string path = myEnvironment.WebRootPath+folderSave;
            var filePath = path + imageAvatar;
            if(System.IO.File.Exists(filePath)){
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b,"image/jpg");
            }
            return Ok();
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

         [HttpPost("UploadImage")]
        public async Task<ActionResult> UploadImage(int articleID)
        {
            if (articleID == 0)
            {
                articleID = _context.Articles.OrderByDescending(x => x.ArticleID).First().ArticleID;
            }
            bool Result = false;

            var fileImg = Request.Form.Files;

            var Files = Request.Form.Files;
            //string urlName ="";
            var item = await _context.Articles.FindAsync(articleID);  
            foreach (IFormFile source in Files)
            {
                //string rootFolder = myEnvironment.WebRootPath;
                string FileName = source.FileName;
                // FileName = Guid.NewGuid() + ".jpg";
                string folderSave = "FileUploads\\Article\\Avatar\\";
                try
                {
                    if (!System.IO.Directory.Exists(folderSave))
                        System.IO.Directory.CreateDirectory(folderSave);
                    //string folderDownload = $"{rootFolder}/{folderSave}".Replace("/", "\\")+FileName;
                    string Filepath = myEnvironment.WebRootPath+folderSave+FileName;
                    string FileUrl ="/FileUploads/Article/Avatar/"+FileName;

                    if (System.IO.File.Exists(Filepath))
                        System.IO.File.Delete(Filepath);
                    using (FileStream stream = System.IO.File.Create(Filepath))
                    {
                      
                        await source.CopyToAsync(stream);
                        if(stream != null){
                            //urlName = stream.Name;
                             item.Avatar = FileUrl;
                             await _context.SaveChangesAsync();
                        }    
                        Result = true;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return Ok();

        }

        [HttpPatch("path/{id}/{status}")]
        public async Task<IActionResult> Path(int id, bool status)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var response = await _service.UpdateStatus(id, status);

            if (!response)
                return UnprocessableEntity();

            return Ok(response);
        }
    }
}
