using Utilities.Requests;
using Utilities.Responses;
using Models;

namespace API.Interfaces
{
    public interface IAccountCategoryService
    {
        public Task<List<AccountCategory>> SelectAll();
        public Task<List<AccountCategory>> SelectWithPaging(int page, int pageSize);
        public Task<AccountCategory> FindItem(string id);
        public Task<List<AccountCategory>> FindAll(string fullName);
        public Task<List<AccountCategory>> FindWithPaging(string fullName, int page, int pageSize);
        public Task<AccountCategory> Insert(AccountCategory item);
        public Task<AccountCategory> Update(AccountCategory item);
        public Task<bool> Delete(string id);
        public Task<bool> UpdateStatus(string id, bool status);
    }
}