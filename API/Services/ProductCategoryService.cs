using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ProductCategoryService : IProductCategoryService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ProductCategoryService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.ProductCategories.FindAsync(id);

            if (item == null)
                return false;

            _context.ProductCategories.Remove(item);

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

        public async Task<List<ProductCategory>> FindAll(string title)
        {
            var data = await _context.ProductCategories
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<ProductCategory> FindItem(int id)
        {
            var item = await _context.ProductCategories.FindAsync(id);
            return item;
        }
        

        public async Task<List<ProductCategory>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductCategories
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductCategory> Insert(ProductCategory item)
        {
            if (item == null)
                return null;

            _context.ProductCategories.Add(item);

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

        public async Task<List<ProductCategory>> SearchProductCate(string title)
        {
            var data = await _context.ProductCategories.Where(x => x.Title.Contains(title)).ToListAsync();

            return data;
        }

        public async Task<List<ProductCategory>> SelectAll()
        {
            var data = await _context.ProductCategories.ToListAsync();
            return data;
        }

        public async Task<List<ProductCategory>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductCategories
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductCategory> Update(int id, ProductCategory item)
        {
            var existItem = await _context.ProductCategories.FindAsync(id);

            if (existItem == null)
                return null;

            // existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Position = item.Position;
            existItem.Status = item.Status;
            // existItem.CreateTime = item.CreateTime;
            // existItem.CreateBy = item.CreateBy;
            existItem.ProductMainCategoryID = item.ProductMainCategoryID;
            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.ProductCategories.FindAsync(id);

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
