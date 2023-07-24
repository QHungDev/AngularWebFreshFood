using Models;

namespace API.Interfaces
{
    public interface IArticleCategoryService
    {
        public Task<List<ArticleCategory>> SelectAll();
        public Task<List<ArticleCategory>> SelectWithPaging(int page, int pageSize);
        public Task<ArticleCategory> FindItem(int id);
        public Task<List<ArticleCategory>> FindAll(string title);
        public Task<List<ArticleCategory>> FindWithPaging(string title, int page, int pageSize);
        public Task<ArticleCategory> Insert(ArticleCategory item);
        public Task<ArticleCategory> Update(ArticleCategory item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
