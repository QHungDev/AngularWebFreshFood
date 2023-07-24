using Models;

namespace API.Interfaces
{
    public interface IProductCommentService
    {
        public Task<List<ProductComment>> SelectAll();
        public Task<List<ProductComment>> SelectWithPaging(int page, int pageSize);
        public Task<ProductComment> FindItem(int id);
        public Task<List<ProductComment>> FindAll(int clientID);
        public Task<List<ProductComment>> FindWithPaging(int clientID, int page, int pageSize);
        public Task<ProductComment> Insert(ProductComment item);
        public Task<ProductComment> Update(int id, ProductComment item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
