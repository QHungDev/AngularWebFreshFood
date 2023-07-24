using Models;
using Utilities.Responses;

namespace API.Interfaces
{
    public interface IArticleService
    {
        public Task<List<Article>> SelectAll();
        public Task<List<Article>> SelectWithPaging(int page, int pageSize);
        public Task<PagingResponse<Article>> SelectWithPagingAndTotal(int page, int pageSize);
        public Task<Article> FindItem(int id);
        public Task<List<Article>> FindAll(string title);
        public Task<List<Article>> FindWithPaging(string title, int page, int pageSize);
        public Task<Article> Insert(Article item);
        public Task<Article> Update(Article item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
