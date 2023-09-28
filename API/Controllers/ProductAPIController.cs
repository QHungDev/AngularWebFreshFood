using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductAPIController : ControllerBase
    {
        
        private IWebHostEnvironment myEnvironment;
        private DBContext _context;
        private IProductService _service;
        public ProductAPIController(DBContext context,IProductService service,IWebHostEnvironment environment)
        {
             myEnvironment = environment;
             _context = context;
            _service = service;
        }
        // private string SaveImage(string base64)
        // {
        //     base64 = base64.Replace("data:image/jpeg;base64,", string.Empty);
        //     base64 = base64.Replace("data:image/jpg;base64,", string.Empty);
        //     base64 = base64.Replace("data:image/gif;base64,", string.Empty);
        //     base64 = base64.Replace("data:image/png;base64,", string.Empty);

        //     string rootFolder = myEnvironment.WebRootPath;
        //     string fileName = Guid.NewGuid() + ".jpg";
        //     byte[] bytes = Convert.FromBase64String(base64);
        //     string folderSave = $"/FileUploads/Account/Avatar/{fileName}";
        //     string folderDownload = $"{rootFolder}/{folderSave}".Replace("/", "\\");
        //     System.IO.File.WriteAllBytes(folderDownload, bytes);
        //     return folderSave;
        // }
        // [NonAction]
        // public string GetActualpath(string FileName)
        // {
        //     return myEnvironment.WebRootPath+"FileUploads\\Product\\Avatar\\"+FileName;
        // }
        [HttpGet("{imageAvatar}")]
        public async Task<ActionResult> GetImg([FromRoute] string imageAvatar){
            string folderSave = "FileUploads\\Product\\Avatar\\";
            string path = myEnvironment.WebRootPath+folderSave;
            var filePath = path + imageAvatar;
            if(System.IO.File.Exists(filePath)){
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b,"image/jpg");
            }
            return Ok();
        }
        [HttpGet("Content/{imageContent}")]
        public async Task<ActionResult> GetImgContent([FromRoute] string imageContent){
            string folderSave1 = "FileUploads\\Product\\Content\\";
            string path1 = myEnvironment.WebRootPath+folderSave1;
            var filePath1 = path1 +imageContent;
            if(System.IO.File.Exists(filePath1)){
                byte[] b1 = System.IO.File.ReadAllBytes(filePath1);
                return File(b1,"image/jpg");
            }
            return Ok();
        }
         [HttpPost("UploadImagev2")]
         public async Task<IActionResult> UploadImagev2(int productID,IFormFile imageFile)
        {
            if (productID == 0)
            {
               productID = _context.Products.OrderByDescending(x => x.ProductID).First().ProductID;
            }
            var folderName = "FileUploads";

            var res = await _service.UploadImageAsync(imageFile, folderName);
            var item = await _context.Products.FindAsync(productID); 
            var fileURL = res.Content?.DownloadUrl;
            item.Avatar = fileURL;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("UploadImage")]
        public async Task<ActionResult> UploadImage(int productID)
        {
           if (productID == 0)
           {
               productID = _context.Products.OrderByDescending(x => x.ProductID).First().ProductID;
           }
           bool Result = false;

           var fileImg = Request.Form.Files;

           var Files = Request.Form.Files;
           //string urlName ="";
           var item = await _context.Products.FindAsync(productID);
           foreach (IFormFile source in Files)
           {
               //string rootFolder = myEnvironment.WebRootPath;
               string FileName = source.FileName;
               // FileName = Guid.NewGuid() + ".jpg";
               string folderSave = "FileUploads\\Product\\Avatar\\";
               try
               {
                   if (!System.IO.Directory.Exists(folderSave))
                       System.IO.Directory.CreateDirectory(folderSave);
                   //string folderDownload = $"{rootFolder}/{folderSave}".Replace("/", "\\")+FileName;
                   string Filepath = myEnvironment.WebRootPath + folderSave + FileName;
                   string FileUrl = "/FileUploads/Product/Avatar/" + FileName;

                   if (System.IO.File.Exists(Filepath))
                       System.IO.File.Delete(Filepath);
                   using (FileStream stream = System.IO.File.Create(Filepath))
                   {

                       await source.CopyToAsync(stream);
                       if (stream != null)
                       {
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
        [HttpGet]
        [Route("searchall")]
        public async Task<IActionResult> SearchProducts(string title)
        {
            var data = await _service.SearchProducts(title);
            return Ok(data);
        }
        [HttpPost("post")]
        public async Task<IActionResult> Post(Product item)
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
        public async Task<IActionResult> Get(int id)
        {
            var response = await _service.FindItem(id);

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
        [HttpPut("put")]
        public async Task<IActionResult> Put(int productID,Product item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Update(productID,item);
            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if(id <= 0)
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
