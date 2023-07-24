using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ContactCategoryService : IContactCategoryService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ContactCategoryService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.ContactCategories.FindAsync(id);

            if (item == null)
                return false;

            _context.ContactCategories.Remove(item);

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

        public async Task<List<ContactCategory>> FindAll(string title)
        {
            var data = await _context.ContactCategories
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<ContactCategory> FindItem(int id)
        {
            var item = await _context.ContactCategories.FindAsync(id);
            return item;
        }

        public async Task<List<ContactCategory>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ContactCategories
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ContactCategory> Insert(ContactCategory item)
        {
            if (item == null)
                return null;

            _context.ContactCategories.Add(item);

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

        public async Task<List<ContactCategory>> SelectAll()
        {
            var data = await _context.ContactCategories.ToListAsync();
            return data;
        }

        public async Task<List<ContactCategory>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ContactCategories
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ContactCategory> Update(int id, ContactCategory item)
        {
            var existItem = await _context.ContactCategories.FindAsync(id);

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
            var item = await _context.ContactCategories.FindAsync(id);

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
