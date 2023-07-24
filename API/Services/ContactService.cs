using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ContactService : IContactService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ContactService(DBContext context)
        {
            _context = context;
        }

        public async Task<List<Contact>> SelectAll()
        {
            var data = await _context.Contacts.ToListAsync();
            return data;
        }

        public async Task<List<Contact>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Contacts
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Contact> FindItem(int id)
        {
            var data = await _context.Contacts.FindAsync(id);
            return data;
        }

        public async Task<List<Contact>> FindAll(string fullName)
        {
            var data = await _context.Contacts
                                     .Where(x => x.FullName.Contains(fullName))
                                     .ToListAsync();

            return data;
        }

        public async Task<List<Contact>> FindWithPaging(string fullName, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Contacts
                               .Where(x => x.FullName.Contains(fullName))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Contact> Insert(Contact item)
        {
            if (item == null)
                return null;

            _context.Contacts.Add(item);

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
        
        public async Task<Contact> Update(int id, Contact item)
        {
            var existItem = await _context.Contacts.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.FullName = item.FullName;
            existItem.Email = item.Email;
            existItem.Mobile = item.Mobile;
            existItem.Address = item.Address;
            existItem.Content = item.Content;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.ApproveBy = item.ApproveBy;
            existItem.ContactCategoryID = item.ContactCategoryID;

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

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Contacts.FindAsync(id);

            if (item == null)
                return false;

            _context.Contacts.Remove(item);

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

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Contacts.FindAsync(id);

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
