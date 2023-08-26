
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/product-main-category")]
    [ApiController]
    public class ProductMainCategoryAPIController : ControllerBase
    {
        private IProductMainCategoryService _service;
        private DBContext _context;

        public ProductMainCategoryAPIController(IProductMainCategoryService service, DBContext context)
        {
            _service = service;
            _context = context;

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

        [HttpPost("post")]
        public async Task<IActionResult> Post(ProductMainCategory item)
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
        public async Task<IActionResult> Put(int ProductMainCategoryID,ProductMainCategory item)
        {
           if (item == null)
           {
               return BadRequest();
           }

           var response = await _service.Update(ProductMainCategoryID,item);

           if (response == null)
               return UnprocessableEntity();

           return Ok(response);
        }

        [HttpGet]
        [Route("searchall")]
        public async Task<IActionResult> SearchProductMain(string title)
        {
            var data = await _service.SearchProductMain(title);
            return Ok(data);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            if(id <= 0)
            {
                return BadRequest();;
            }

            var countProductCate = _context.ProductCategories.Where(x => x.ProductMainCategoryID == id).ToList().Count;
            if (countProductCate > 0)
            {
                object data = new {
                                    status = false,
                                    message = "Có " + countProductCate + " loại sản phẩm cùng thể loại cấp cha!"
                                  };
                return Ok(data);
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
