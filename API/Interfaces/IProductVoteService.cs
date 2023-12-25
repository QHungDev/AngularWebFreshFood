using Models;

namespace API.Interfaces
{
    public interface IProductVoteService
    {
        public Task<List<ProductVote>> SelectAll();
        public Task<List<ProductVote>> SelectWithPaging(int page, int pageSize);
        public Task<ProductVote> FindItem(int clientID, int productID);
        public Task<List<ProductVote>> FindAll(int value);
        public Task<List<ProductCommentList>> GetAllByProduct(int clientID);
        public Task<List<ProductVote>> FindWithPaging(int value, int page, int pageSize);
        public Task<ProductVote> Insert(ProductVote item);
        public Task<ProductVote> Update(int clientID, int productID, ProductVote item);
        public Task<bool> Delete(int clientID, int productID);
    }
}
