using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class PictureService : IPictureService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public PictureService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Pictures.FindAsync(id);

            if (item == null)
                return false;

            _context.Pictures.Remove(item);

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

        public async Task<List<Picture>> FindAll(string title)
        {
            var data = await _context.Pictures
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<Picture> FindItem(int id)
        {
            var item = await _context.Pictures.FindAsync(id);
            return item;
        }

        public async Task<List<Picture>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Pictures
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Picture> Insert(Picture item)
        {
            if (item == null)
                return null;

            _context.Pictures.Add(item);

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

        public async Task<List<Picture>> SelectAll()
        {
            var data = await _context.Pictures.ToListAsync();
            return data;
        }

        public async Task<List<Picture>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Pictures
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Picture> Update(int id, Picture item)
        {
            var existItem = await _context.Pictures.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Position = item.Position;
            existItem.Url     = item.Url;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.PictureCategoryID = item.PictureCategoryID;
            existItem.CreateBy = item.CreateBy;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Pictures.FindAsync(id);

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
