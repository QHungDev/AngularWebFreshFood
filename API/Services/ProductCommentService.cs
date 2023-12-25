using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class ProductCommentService : IProductCommentService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public ProductCommentService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.ProductComments.FindAsync(id);

            if (item == null)
                return false;

            _context.ProductComments.Remove(item);

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

        public async Task<List<ProductComment>> FindAll(int clientID)
        {
            var data = await _context.ProductComments
                                     .Where(x => x.ClientID.Equals(clientID))
                                     .ToListAsync();

            return data;
        }

        public async Task<ProductComment> FindItem(int id)
        {
            var item = await _context.ProductComments.FindAsync(id);
            return item;
        }

        public async Task<List<ProductCommentList>> GetAllByProduct(int id)
        {
            var item = await _context.ProductComments.Where(x => x.ProductID == id).OrderByDescending(x => x.ProductCommentID)
                                                    .Select(x => new ProductCommentList(){
                                                        ProductCommentID = x.ProductCommentID,
                                                        Content = x.Content,
                                                        Status = x.Status,
                                                        CreateTime = x.CreateTime,
                                                        ClientID = x.ClientID,
                                                        ClientName = _context.Clients.Where(y => y.ClientID == x.ClientID).FirstOrDefault().FullName,
                                                        ProductID = x.ProductID,
                                                        Rate = x.Rate
                                                    }).ToListAsync();
            return item;
        }

        public async Task<List<ProductComment>> FindWithPaging(int clientID, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductComments
                               .Where(x => x.ClientID.Equals(clientID))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductComment> Insert(ProductComment item)
        {
            if (item == null)
                return null;

            item.CreateTime = DateTime.Now;

            _context.ProductComments.Add(item);

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

        public async Task<List<ProductComment>> SelectAll()
        {
            var data = await _context.ProductComments.ToListAsync();
            return data;
        }

        public async Task<List<ProductComment>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.ProductComments
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<ProductComment> Update(int id, ProductComment item)
        {
            var existItem = await _context.ProductComments.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.Content = item.Content;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.ClientID = item.ClientID;
            existItem.ProductID = item.ProductID;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.ProductComments.FindAsync(id);

            if (item == null)
                return false;

            item.Status = status;

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
    }
}
