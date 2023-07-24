using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public OrderDetailService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int orderID, int productID)
        {
            var item = await _context.OrderDetails.FindAsync(orderID, productID);

            if (item == null)
                return false;

            _context.OrderDetails.Remove(item);

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

        public async Task<List<OrderDetail>> FindAll(double prcice)
        {
            var data = await _context.OrderDetails
                                     .Where(x => x.Price == prcice)
                                     .ToListAsync();

            return data;
        }

        public async Task<OrderDetail> FindItem(int orderID, int productID)
        {
            var item = await _context.OrderDetails.FindAsync(orderID, productID);
            return item;
        }
        
        public async Task<List<OrderDetail>> FindWithPaging(double price, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.OrderDetails
                               .Where(x => x.Price == price)
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<OrderDetail> Insert(OrderDetail item)
        {
            if (item == null)
                return null;

            _context.OrderDetails.Add(item);

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

        public async Task<List<OrderDetail>> SelectAll()
        {
            var data = await _context.OrderDetails.ToListAsync();
            return data;
        }

        public async Task<List<OrderDetail>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.OrderDetails
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<OrderDetail> Update(int orderID, int productID, OrderDetail item)
        {
            var existItem = await _context.OrderDetails.FindAsync(orderID, productID);

            if (existItem == null)
                return null;

            existItem.Quantity = item.Quantity;
            existItem.Price = item.Price;

            await _context.SaveChangesAsync();
            return existItem;
        }
    }
}
