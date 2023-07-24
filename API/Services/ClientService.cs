using API.Interfaces;
using Utilities.Requests;
using Utilities.Responses;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ClientService : IClientService
    {
        //khởi tạo DBContext theo mô hình DI
        private readonly DBContext _context;
        public ClientService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Clients.FindAsync(id);

            if (item == null)
                return false;

            _context.Clients.Remove(item);

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

        public async Task<List<Client>> FindAll(string fullName)
        {
            var data = await _context.Clients
                                     .Where(x => x.FullName.Contains(fullName))
                                     .ToListAsync();

            return data;
        }

        public async Task<Client> FindItem(int id)
        {
            var data = await _context.Clients.FindAsync(id);
            return data;
        }

        public async Task<List<Client>> FindWithPaging(string fullName, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Clients
                               .Where(x => x.FullName.Contains(fullName))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Client> Insert(Client item)
        {
            if (item == null)
                return null;

            _context.Clients.Add(item);

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

        public async Task<List<Client>> SelectAll()
        {
            var data = await _context.Clients.ToListAsync();
            return data;
        }

        public async Task<List<Client>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Clients
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Client> Update(int id, Client item)
        {
            var existItem = await _context.Clients.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.Email = item.Email;
            existItem.Password = item.Password;
            existItem.FullName = item.FullName;
            existItem.Mobile = item.Mobile;
            existItem.Address = item.Address;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.ClientCategoryID = item.ClientCategoryID;

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

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Clients.FindAsync(id);

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
            var data = await _context.Clients.FirstOrDefaultAsync(x => x.Email == item.Username && x.Password == item.Password && x.Status == true);

            if (data == null)
                return null;

            var response = new LoginResponse()
            {
                Username = data.Email,
                Fullname = data.FullName
            };

            return response;
        }
    }
}
