using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Utilities.Requests;
using Utilities.Responses;
using Newtonsoft.Json;
using RestSharp;
namespace API.Services
{
    public class ProductService : IProductService 
    {
        private readonly IConfiguration _configuration;
        private DBContext _context;
        private IWebHostEnvironment myEnvironment;
        public ProductService(IConfiguration configuration, DBContext context,IWebHostEnvironment environment)
        {
            _configuration = configuration;
             myEnvironment = environment;
            _context = context;
        }
        public async Task<List<Product>> SearchProducts(string title)
        {
            // var data = await _context.Products.Where(x => x.Title == title).ToListAsync();
            var data = await _context.Products.Where(x => x.Title.Contains(title)).ToListAsync();

            return data;
        }
        public async Task<List<Product>> GetSellToday()
        {
            var data = await _context.Products.Where(x => x.IsSellToday == true).ToListAsync();

            return data;
        }
        public async Task<List<Product>> GetAllWithCreateTime()
        {
            var data = await _context.Products.Where(x => x.IsSellToday == false).OrderByDescending(x => x.CreateTime).Take(4).ToListAsync();

            return data;
        }

        public async Task<List<Product>> GetAllWithQuantity()
        {
            var data = await _context.Products.Where(x => x.IsSellToday == false).OrderBy(x => x.Quantity).Take(4).ToListAsync();

            return data;
        }
        public async Task<bool> Delete(int id)
        {
            var item = await _context.Products.FindAsync(id);

            if (item == null)
                return false;

            _context.Products.Remove(item);

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Product>> FindAll(string title)
        {
            var data = await _context.Products
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<Product> FindItem(int id)
        {
            var data = await _context.Products.FindAsync(id);
            return data;
        }
        

        public async Task<List<Product>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Products
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Product> Insert(Product item)
        {   
            
            if (item == null)
                return null;
            
            _context.Products.Add(item);

            try
            {
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<Product>> SelectAll()
        {
            var data = await _context.Products.ToListAsync();
            return data;
        }

        public async Task<List<Product>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Products
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }
        public async Task<PagingResponse<Product>> SelectWithPagingAndTotal(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Products
                               .Include(x => x.ProductCategory)
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            var total = _context.Products.Count();

            var result = new PagingResponse<Product>();
            result.Data = data;
            result.Total = total;

            return result;
        }

        public async Task<Product> Update(int productID,Product item)
        {
            
            if (item == null)
                return null;
            
            item.ProductID = productID;

            var existItem = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == item.ProductID);

            if (existItem == null)
                return null;
            
            
            // existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Specification = item.Specification;
            existItem.Content = item.Content;
            existItem.Warranty = item.Warranty;
            existItem.Accessories = item.Accessories;
            existItem.Price = item.Price;
            existItem.OldPrice = item.OldPrice;
            existItem.Quantity = item.Quantity;
            existItem.ImageList = item.ImageList;
            existItem.Position = item.Position;
            existItem.Status = item.Status;
            //existItem.CreateTime = item.CreateTime;
            existItem.ProductCategoryID = item.ProductCategoryID;
            //existItem.CreateBy = item.CreateBy;
            // existItem.IsSellToday = item.IsSellToday;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<Product> ChangeSellToday(int id)
        {
            
            var existItem = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == id);

            if (existItem == null)
                return null;
            
            existItem.IsSellToday = !existItem.IsSellToday;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Products.FindAsync(id);

            if (item == null)
                return false;

            item.Status = status;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<GitResponseModel> UploadImageAsync(IFormFile file, string folderSource)
        {
            var fileName = ToFileName(file);
            var commit = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt").Replace("/", "_");

            await using MemoryStream ms = new();
            await file.CopyToAsync(ms);

            var fileBytes = ms.ToArray();

            RestRequest request = new() { Method = Method.Put };

            request.AddHeader("Authorization", "Token " + _configuration["GithubAPI:AccessToken"]);
            request.AddHeader("accept", "application/vnd.github.v3+json");
            request.AddJsonBody(
                new
                {
                    message = commit,
                    content = Convert.ToBase64String(fileBytes),
                    branch = _configuration["GithubAPI:Branch"]
                });

            var client = new RestClient($"{_configuration["GithubAPI:BaseUrl"]}/{folderSource}/{fileName}");

            var response = await client.ExecuteAsync(request);
            var jsonGit = response.Content?.Replace("download_url", "downloadUrl");

            if (jsonGit == null)
            {
                return new GitResponseModel { Success = false };
            }

            var resGit = JsonConvert.DeserializeObject<GitResponseModel>(jsonGit);

            if (resGit == null)
            {
                return new GitResponseModel { Success = false };
            }

            resGit.Success = true;

            return resGit;
        }
        private string ToFileName(IFormFile file)
        {
            var stringName = "";
            var ticks = DateTime.UtcNow.Ticks;
            var fileName = file.FileName.Split('.').First();

            if (file.FileName.EndsWith(".png") || file.FileName.EndsWith(".PNG"))
            {
                stringName = fileName + "_" + ticks + ".png";
            }
            else if (file.FileName.EndsWith(".jpg") || file.FileName.EndsWith(".JPG"))
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }
            else if (file.FileName.EndsWith(".jpeg") || file.FileName.EndsWith(".JPEG"))
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }
            else if (file.FileName.EndsWith(".gif") || file.FileName.EndsWith(".GIF"))
            {
                stringName = fileName + "_" + ticks + ".gif";
            }
            else if (file.FileName.EndsWith(".webp") || file.FileName.EndsWith(".WEBP"))
            {
                stringName = fileName + "_" + ticks + ".webp";
            }
            else
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }

            return stringName;
        }

        //Request Supply
        public async Task<RequestSupply> InsertRequestSupply(RequestSupply item)
        {   
            
            if (item == null)
                return null;
            
            item.CreateTime = DateTime.Now;
            
            _context.RequestSupplies.Add(item);

            try
            {
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<RequestSupplyProduct>> GetRequestSupply()
        {
            var data = await _context.RequestSupplies.Where(x => x.Status == false)
            .Select(x => new RequestSupplyProduct
            {
                ID = x.ID,
                ProductID = x.ProductID,
                CreateBy = x.CreateBy,
                CreateTime = x.CreateTime,
                Supplier = x.Supplier,
                QuantityRequestSupply = x.QuantityRequestSupply,
                UnitPrice = x.UnitPrice,
                Total = x.Total,
                Status = x.Status,

                Avatar = _context.Products.Where(y => y.ProductID == x.ProductID).FirstOrDefault().Avatar,
                Title = _context.Products.Where(y => y.ProductID == x.ProductID).FirstOrDefault().Title,
                Price = _context.Products.Where(y => y.ProductID == x.ProductID).FirstOrDefault().Price,
                Quantity = _context.Products.Where(y => y.ProductID == x.ProductID).FirstOrDefault().Quantity,
            }).ToListAsync();

            return data;
        }

        public async Task<RequestSupply> ApproveRequestSupply(int id)
        {
            
            var existItem = await _context.RequestSupplies.FirstOrDefaultAsync(x => x.ID == id);
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == existItem.ProductID);

            if (existItem == null)
                return null;
            if (product == null)
                return null;
            
            existItem.Status = !existItem.Status;
            product.Quantity = product.Quantity + existItem.QuantityRequestSupply;

            await _context.SaveChangesAsync();
            return existItem;
        }

    }
}
