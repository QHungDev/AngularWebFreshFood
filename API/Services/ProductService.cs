using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Utilities.Requests;
using Utilities.Responses;

namespace API.Services
{
    public class ProductService : IProductService 
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
         private IWebHostEnvironment myEnvironment;
        public ProductService(DBContext context,IWebHostEnvironment environment)
        {
             myEnvironment = environment;
            _context = context;
        }
        public async Task<List<Product>> SearchProducts(string title)
        {
            var data = await _context.Products.Where(x => x.Title == title).ToListAsync();

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
    }
}
