using Models;
using Utilities.Responses;
namespace API.Interfaces
{
    public interface IProductMainCategoryService
    {
        public Task<List<ProductMainCategory>> SelectAll();
        public Task<List<ProductMainCategory>> SelectWithPaging(int page, int pageSize);
        public Task<ProductMainCategory> FindItem(int id);
        public Task<List<ProductMainCategory>> FindAll(string title);
        public Task<List<ProductMainCategory>> FindWithPaging(string title, int page, int pageSize);
        public Task<ProductMainCategory> Insert(ProductMainCategory item);
        public Task<ProductMainCategory> Update(int ProductMainCategoryID, ProductMainCategory item);
        public Task<bool> Delete(int id);
        public Task<List<ProductMainCategory>> SearchProductMain(string title);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
