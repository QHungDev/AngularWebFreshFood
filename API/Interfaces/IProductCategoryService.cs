using Models;

namespace API.Interfaces
{
    public interface IProductCategoryService
    {
        public Task<List<ProductCategory>> SelectAll();
        public Task<List<ProductCategory>> SelectWithPaging(int page, int pageSize);
        public Task<ProductCategory> FindItem(int id);
        public Task<List<ProductCategory>> FindAll(string title);
        public Task<List<ProductCategory>> FindWithPaging(string title, int page, int pageSize);
        public Task<ProductCategory> Insert(ProductCategory item);
        public Task<ProductCategory> Update(int id, ProductCategory item);
        public Task<bool> Delete(int id);
        public Task<List<ProductCategory>> SearchProductCate(string title);

        public Task<bool> UpdateStatus(int id, bool status);
    }
}
