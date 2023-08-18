using Models;

namespace API.Interfaces
{
    public interface IOrderDetailService
    {
        public Task<List<OrderDetail>> SelectAll();
        public Task<List<OrderDetailProduct>> SelectAllWithOrderID(int orderID);
        public Task<List<OrderDetail>> SelectWithPaging(int page, int pageSize);
        public Task<OrderDetail> FindItem(int orderID, int productID);
        public Task<List<OrderDetail>> FindAll(double price);
        public Task<List<OrderDetail>> FindWithPaging(double price, int page, int pageSize);
        public Task<OrderDetail> Insert(OrderDetail item);
        public Task<OrderDetail> Update(int orderID, int productID, OrderDetail item);
        public Task<bool> Delete(int orderID, int productID);
    }
}
