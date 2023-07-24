using Models;

namespace API.Interfaces
{
    public interface IContactService
    {
        public Task<List<Contact>> SelectAll();
        public Task<List<Contact>> SelectWithPaging(int page, int pageSize);
        public Task<Contact> FindItem(int id);
        public Task<List<Contact>> FindAll(string fullName);
        public Task<List<Contact>> FindWithPaging(string fullName, int page, int pageSize);
        public Task<Contact> Insert(Contact item);
        public Task<Contact> Update(int id, Contact item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
