using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class PictureCategoryService : IPictureCategoryService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public PictureCategoryService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.PictureCategories.FindAsync(id);

            if (item == null)
                return false;

            _context.PictureCategories.Remove(item);

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

        public async Task<List<PictureCategory>> FindAll(string title)
        {
            var data = await _context.PictureCategories
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<PictureCategory> FindItem(int id)
        {
            var item = await _context.PictureCategories.FindAsync(id);
            return item;
        }

        public async Task<List<PictureCategory>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.PictureCategories
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<PictureCategory> Insert(PictureCategory item)
        {
            if (item == null)
                return null;

            _context.PictureCategories.Add(item);

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

        public async Task<List<PictureCategory>> SelectAll()
        {
            var data = await _context.PictureCategories.ToListAsync();
            return data;
        }

        public async Task<List<PictureCategory>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.PictureCategories
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<PictureCategory> Update(int id, PictureCategory item)
        {
            var existItem = await _context.PictureCategories.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Position = item.Position;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.CreateBy = item.CreateBy;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.PictureCategories.FindAsync(id);

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
