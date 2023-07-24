using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public OrderService(DBContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Orders.FindAsync(id);

            if (item == null)
                return false;

            _context.Orders.Remove(item);

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

        public async Task<List<Order>> FindAll(string fullName)
        {
            var data = await _context.Orders
                                     .Where(x => x.FullName.Contains(fullName))
                                     .ToListAsync();

            return data;
        }

        public async Task<Order> FindItem(int id)
        {
            var item = await _context.Orders.FindAsync(id);
            return item;
        }

        public async Task<List<Order>> FindWithPaging(string fullName, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Orders
                               .Where(x => x.FullName.Contains(fullName))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Order> Insert(Order item)
        {
            if (item == null)
                return null;

            _context.Orders.Add(item);

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

        public async Task<List<Order>> SelectAll()
        {
            var data = await _context.Orders.ToListAsync();
            return data;
        }

        public async Task<List<Order>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Orders
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Order> Update(int id, Order item)
        {
            var existItem = await _context.Orders.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.FullName = item.FullName;
            existItem.Mobile = item.Mobile;
            existItem.Address = item.Address;
            existItem.Total = item.Total;
            existItem.Bonus = item.Bonus;
            existItem.Amount = item.Amount;
            existItem.CreateTime = item.CreateTime;

            existItem.OrderStatus = item.OrderStatus;
            existItem.ConfirmStatus = item.ConfirmStatus;
            existItem.ChargeStatus = item.ChargeStatus;
            existItem.DeliveStatus = item.DeliveStatus;
            existItem.ClientID = item.ClientID;

            await _context.SaveChangesAsync();
            return existItem;
        }
    }
}
