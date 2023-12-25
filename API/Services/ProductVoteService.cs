using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ProductVoteService : IProductVoteService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ProductVoteService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int clientID, int productID)
        {
            var item = await _context.ProductVotes.FindAsync(clientID, productID);

            if (item == null)
                return false;

            _context.ProductVotes.Remove(item);

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<List<ProductCommentList>> GetAllByProduct(int id)
        {
            var item = await _context.ProductComments.Where(x => x.ProductID == id).OrderByDescending(x => x.ProductCommentID)
                                                    .Select(x => new ProductCommentList()
                                                    {
                                                        ProductCommentID = x.ProductCommentID,
                                                        Content = x.Content,
                                                        Status = x.Status,
                                                        CreateTime = x.CreateTime,
                                                        ClientID = x.ClientID,
                                                        ClientName = _context.Clients.Where(y => y.ClientID == x.ClientID).FirstOrDefault().FullName,
                                                        ProductID = x.ProductID
                                                    }).ToListAsync();
            return item;
        }
        public async Task<List<ProductVote>> FindAll(int value)
        {
            var data = await _context.ProductVotes
                                     .Where(x => x.Value == value)
                                     .ToListAsync();

            return data;
        }

        public async Task<ProductVote> FindItem(int clientID, int productID)
        {
            var item = await _context.ProductVotes.FindAsync(clientID, productID);
            return item;
        }

        public async Task<List<ProductVote>> FindWithPaging(int value, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductVotes
                               .Where(x => x.Value == value)
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductVote> Insert(ProductVote item)
        {
            if (item == null)
                return null;

            _context.ProductVotes.Add(item);

            try
            {
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<ProductVote>> SelectAll()
        {
            var data = await _context.ProductVotes.ToListAsync();
            return data;
        }

        public async Task<List<ProductVote>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductVotes
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductVote> Update(int clientID, int productID, ProductVote item)
        {
            var existItem = await _context.ProductVotes.FindAsync(clientID, productID);

            if (existItem == null)
                return null;

            existItem.CreateTime = item.CreateTime;
            existItem.Value = item.Value;

            await _context.SaveChangesAsync();
            return existItem;
        }
    }
}
