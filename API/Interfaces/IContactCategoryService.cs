using Models;

namespace API.Interfaces
{
    public interface IContactCategoryService
    {
        public Task<List<ContactCategory>> SelectAll();
        public Task<List<ContactCategory>> SelectWithPaging(int page, int pageSize);
        public Task<ContactCategory> FindItem(int id);
        public Task<List<ContactCategory>> FindAll(string title);
        public Task<List<ContactCategory>> FindWithPaging(string title, int page, int pageSize);
        public Task<ContactCategory> Insert(ContactCategory item);
        public Task<ContactCategory> Update(int id, ContactCategory item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
