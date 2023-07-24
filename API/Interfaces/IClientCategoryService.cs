using Models;

namespace API.Interfaces
{
    public interface IClientCategoryService
    {
        public Task<List<ClientCategory>> SelectAll();
        public Task<List<ClientCategory>> SelectWithPaging(int page, int pagesize);
        public Task<ClientCategory> FindItem(int id);
        public Task<List<ClientCategory>> FindAll(string title);
        public Task<List<ClientCategory>> FindWithPaging(string title, int page, int pagesize);
        public Task<ClientCategory> Insert(ClientCategory item);
        public Task<ClientCategory> Update(int id, ClientCategory item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
