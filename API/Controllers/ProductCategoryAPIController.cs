using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/product-category")]
    [ApiController]
    public class ProductCategoryAPIController : ControllerBase
    {
        private IProductCategoryService _service;
        private IWebHostEnvironment myEnvironment;
        private DBContext _context;
        public ProductCategoryAPIController(IProductCategoryService service, DBContext context,IWebHostEnvironment environment)
        {
             myEnvironment = environment;
             _context = context;
            _service = service;
        }

        [HttpGet("{imageAvatar}")]
        public async Task<ActionResult> GetImg([FromRoute] string imageAvatar){
            string folderSave = "FileUploads\\ProductCategory\\Avatar\\";
            string path = myEnvironment.WebRootPath+folderSave;
            var filePath = path + imageAvatar;
            if(System.IO.File.Exists(filePath)){
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b,"image/jpg");
            }
            return Ok();
        }
         [HttpPost("UploadImage")]
        public async Task<ActionResult> UploadImage(int productCategoryID)
        {
            if (productCategoryID == 0)
            {
                productCategoryID = _context.ProductCategories.OrderByDescending(x => x.ProductCategoryID).First().ProductCategoryID;
            }
            bool Result = false;

            var fileImg = Request.Form.Files;

            var Files = Request.Form.Files;
            //string urlName ="";
            var item = await _context.ProductCategories.FindAsync(productCategoryID);  
            foreach (IFormFile source in Files)
            {
                //string rootFolder = myEnvironment.WebRootPath;
                string FileName = source.FileName;
                // FileName = Guid.NewGuid() + ".jpg";
                string folderSave = "FileUploads\\ProductCategory\\Avatar\\";
                try
                {
                    if (!System.IO.Directory.Exists(folderSave))
                        System.IO.Directory.CreateDirectory(folderSave);
                    //string folderDownload = $"{rootFolder}/{folderSave}".Replace("/", "\\")+FileName;
                    string Filepath = myEnvironment.WebRootPath+folderSave+FileName;
                    string FileUrl ="/FileUploads/ProductCategory/Avatar/"+FileName;

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
        [HttpPost("post")]
        public IActionResult Post(ProductCategory item)
        {
            return Ok();
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

        
        [HttpPut("put")]
       public async Task<IActionResult> Put(int productCategoryID, ProductCategory item)
        {
             if (item == null)
            {
                return BadRequest();
            }

            var response = await _service.Update(productCategoryID,item);
            if (response == null)
                return UnprocessableEntity();

            return Ok(response);
        }

        [HttpDelete("delete/{id}")]
        // public IActionResult Delete(int ID)
        // {
        //     return Ok();
        // }

        public async Task<IActionResult> Delete(int id)
        {
            
            if(id <= 0)
            {
                return BadRequest();;
            }

            var countProduct = _context.Products.Where(x => x.ProductCategoryID == id).ToList().Count;
            if (countProduct > 0)
            {
                object data = new {
                                    status = false,
                                    message = "Có " + countProduct + " sản phẩm cùng thể loại!"
                                  };
                return Ok(data);
            }
            var response = await _service.Delete(id);
            if (!response)
                return UnprocessableEntity();
            return Ok(response);
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
