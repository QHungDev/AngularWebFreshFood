using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class AccountCategoryService : IAccountCategoryService
    {
        private readonly DBContext _context;
        public AccountCategoryService(DBContext context)
        {
            _context = context;
        }

        public async Task<List<AccountCategory>> SelectAll()
        {
            var data = await _context.AccountCategories.ToListAsync();
            return data;
        }

        public async Task<List<AccountCategory>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.AccountCategories
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<AccountCategory> FindItem(string id)
        {
            var data = await _context.AccountCategories.FindAsync(id);
            return data;
        }

        public async Task<List<AccountCategory>> FindAll(string title)
        {
            var data = await _context.AccountCategories
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }
        
        public async Task<List<AccountCategory>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.AccountCategories
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }
 
        public async Task<AccountCategory> Insert(AccountCategory item)
        {
            if (item == null)
                return null;

            _context.AccountCategories.Add(item);

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

        public async Task<AccountCategory> Update(AccountCategory item)
        {
            var existItem = await _context.AccountCategories.FindAsync(item.AccountCategoryID);

            if (existItem == null)
                return null;

            existItem.Title = item.Title;
            existItem.Status = item.Status;

            try
            {
                await _context.SaveChangesAsync();
                return existItem;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> Delete(string id)
        {
            var item = await _context.AccountCategories.FindAsync(id);

            if (item == null)
                return false;

            _context.AccountCategories.Remove(item);

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

        public async Task<bool> UpdateStatus(string id, bool status)
        {
            var item = await _context.AccountCategories.FindAsync(id);

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
