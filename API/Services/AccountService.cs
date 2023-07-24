using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class AccountService : IAccountService
    {
        private readonly DBContext _context;
        public AccountService(DBContext context)
        {
            _context = context;
        }

        public async Task<List<Account>> SelectAll()
        {
            var data = await _context.Accounts.ToListAsync();
            return data;
        }

        public async Task<List<Account>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Accounts
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Account> FindItem(string id)
        {
            var data = await _context.Accounts.FindAsync(id);
            return data;
        }
        public async Task<List<Account>> SearchAccounts(string username)
        {
            var data = await _context.Accounts.Where(x => x.Username == username).ToListAsync();

            return data;
        }
        public async Task<List<Account>> FindAll(string fullName)
        {
            var data = await _context.Accounts
                                     .Where(x => x.FullName.Contains(fullName))
                                     .ToListAsync();

            return data;
        }

        public async Task<List<Account>> FindWithPaging(string fullName, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Accounts
                               .Where(x => x.FullName.Contains(fullName))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Account> Insert(Account item)
        {
            if (item == null)
                return null;

            _context.Accounts.Add(item);

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

        public async Task<Account> UpdateAccount(string username, Account item)
        {
            if (item == null)
                return null;

            item.Username = username;

            var existItem = await _context.Accounts.FirstOrDefaultAsync(x => x.Username == item.Username);

            if (existItem == null)
                return null;

            existItem.Username = item.Username;
            existItem.Password = item.Password;
            existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.FullName = item.FullName;
            existItem.Email = item.Email;
            existItem.Mobile = item.Mobile;
            existItem.Address = item.Address;
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
            var item = await _context.Accounts.FindAsync(id);

            if (item == null)
                return false;

            _context.Accounts.Remove(item);

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
            var item = await _context.Accounts.FindAsync(id);

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

        public async Task<LoginResponse> Login(LoginRequest item)
        {
            var data = await _context.Accounts.FirstOrDefaultAsync(x => x.Username == item.Username && x.Password == item.Password && x.Status == true);

            if(data == null)
                return null;

            var response = new LoginResponse()
            {
                Username = data.Username,
                Fullname = data.FullName,
                Avatar = data.Avatar
            };

            return response;
        }
    }
}
