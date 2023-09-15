using Utilities.Requests;
using Utilities.Responses;
using Models;

namespace API.Interfaces
{
    public interface IClientService
    {
        public Task<List<Client>> SelectAll();
        public Task<Client> SelectWithEmail(string Email);
        public Task<List<Client>> SelectWithPaging(int page, int pageSize);
        public Task<Client> FindItem(int id);
        public Task<List<Client>> FindAll(string fullName);
        public Task<List<Client>> FindWithPaging(string fullName, int page, int pageSize);
        public Task<Client> Insert(Client item);
        public Task<Client> Update(int id, Client item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
        public Task<LoginResponse> Login(LoginRequest item);
    }
}
