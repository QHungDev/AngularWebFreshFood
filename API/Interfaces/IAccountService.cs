using Utilities.Requests;
using Utilities.Responses;
using Models;

namespace API.Interfaces
{
    public interface IAccountService
    {
        public Task<List<Account>> SelectAll();
        public Task<List<Account>> SelectWithPaging(int page, int pageSize);
        public Task<Account> FindItem(string id);
        public Task<List<Account>> SearchAccounts(string username);
        public Task<List<Account>> FindAll(string fullName);
        public Task<List<Account>> FindWithPaging(string fullName, int page, int pageSize);
        public Task<Account> Insert(Account item);
        public Task<bool> Delete(string id);
        public Task<Account> UpdateAccount(string username, Account item);
        public Task<bool> UpdateStatus(string id, bool status);
        public Task<LoginResponse> Login(LoginRequest item);
    }
}
