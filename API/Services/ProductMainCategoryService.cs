using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Utilities.Responses;

namespace API.Services
{
    public class ProductMainCategoryService : IProductMainCategoryService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ProductMainCategoryService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.ProductMainCategories.FindAsync(id);

            if (item == null)
                return false;

            _context.ProductMainCategories.Remove(item);

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

        public async Task<List<ProductMainCategory>> FindAll(string title)
        {
            var data = await _context.ProductMainCategories
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<ProductMainCategory> FindItem(int id)
        {
            var item = await _context.ProductMainCategories.FindAsync(id);
            return item;
        }

        public async Task<List<ProductMainCategory>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductMainCategories
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }
        
        public async Task<List<ProductMainCategory>> SearchProductMain(string title)
        {
            var data = await _context.ProductMainCategories.Where(x => x.Title.Contains(title)).ToListAsync();

            return data;
        }

        public async Task<ProductMainCategory> Insert(ProductMainCategory item)
        {
            if (item == null)
                return null;

            _context.ProductMainCategories.Add(item);

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

        public async Task<List<ProductMainCategory>> SelectAll()
        {
            var data = await _context.ProductMainCategories.ToListAsync();
            return data;
        }

        public async Task<List<ProductMainCategory>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductMainCategories
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductMainCategory> Update(int ProductMainCategoryID, ProductMainCategory item)
        {
            var existItem = await _context.ProductMainCategories.FindAsync(ProductMainCategoryID);

            if (existItem == null)
                return null;

            existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Position = item.Position;
            existItem.Status = item.Status;
            // existItem.CreateTime = item.CreateTime;
            // existItem.CreateBy = item.CreateBy;
            
            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.ProductMainCategories.FindAsync(id);

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
