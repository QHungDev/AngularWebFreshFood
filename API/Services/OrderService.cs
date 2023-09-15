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

        public async Task<List<Order>> FindAllByClient(string client)
        {
            var ClientID = _context.Clients.Where(x => x.Email == client).FirstOrDefault().ClientID;
            var data = await _context.Orders
                                     .Where(x => x.ClientID == ClientID)
                                     .ToListAsync();

            return data;
        }

        public async Task<Order> FindItem(int id)
        {
            var data = await _context.Orders.FindAsync(id);
            return data;
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
            
            // var email = item.FullName;
            // var client = _context.Clients.Where(x => x.Email == email).FirstOrDefault();
            // item.ClientID = client.ClientID;
            // item.FullName = client.FullName;
            // item.Mobile = client.Mobile;
            // item.Address = client.Address;

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
            var data = await _context.Orders
                                    .Select(x => new Order
                                    {
                                        OrderID = x.OrderID,
                                        FullName = x.FullName,
                                        Mobile = x.Mobile,
                                        Address = x.Address,
                                        Total = x.Total,
                                        Bonus = x.Bonus,
                                        Amount = x.Amount,
                                        CreateTime = x.CreateTime,
                                        OrderStatus = x.OrderStatus,
                                        ConfirmStatus = x.ConfirmStatus,
                                        ChargeStatus = x.ChargeStatus,
                                        DeliveStatus = x.DeliveStatus,
                                        ClientID = x.ClientID,
                                        OrderDetails = _context.OrderDetails.Where(y => y.OrderID == x.OrderID).ToList()
                                    }).ToListAsync();
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

        public async Task<Order> Update(int orderID, Order item)
        {
            if (item == null)
                return null;
            item.OrderID = orderID;
            
            var existItem = await _context.Orders.FirstOrDefaultAsync(x => x.OrderID == item.OrderID);
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

        public async Task<Order> CancelOrder(int orderID)
        {
            var existItem = await _context.Orders.FirstOrDefaultAsync(x => x.OrderID == orderID);
            if (existItem == null)
                return null;

            // existItem.FullName = item.FullName;
            // existItem.Mobile = item.Mobile;
            // existItem.Address = item.Address;
            // existItem.Total = item.Total;
            // existItem.Bonus = item.Bonus;
            // existItem.Amount = item.Amount;
            // existItem.CreateTime = item.CreateTime;

            existItem.OrderStatus = 3;
            // existItem.ConfirmStatus = item.ConfirmStatus;
            // existItem.ChargeStatus = item.ChargeStatus;
            existItem.DeliveStatus = 4;
            // existItem.ClientID = item.ClientID;

            await _context.SaveChangesAsync();
            return existItem;
        }
        

        public async Task<Order> ChangeConfirmStatus(int id)
        {
            var existItem = await _context.Orders.FindAsync(id);

            if (existItem == null)
                return null;

            // existItem.FullName = existItem.FullName;
            // existItem.Mobile = existItem.Mobile;
            // existItem.Address = existItem.Address;
            // existItem.Total = existItem.Total;
            // existItem.Bonus = existItem.Bonus;
            // existItem.Amount = existItem.Amount;
            // existItem.CreateTime = existItem.CreateTime;

            // existItem.OrderStatus = existItem.OrderStatus;
            existItem.ConfirmStatus = !existItem.ConfirmStatus;
            // existItem.ChargeStatus = existItem.ChargeStatus;
            // existItem.DeliveStatus = existItem.DeliveStatus;
            // existItem.ClientID = existItem.ClientID;

            await _context.SaveChangesAsync();
            return existItem;
        }
        
    }
}
