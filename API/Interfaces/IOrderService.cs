﻿using Models;

namespace API.Interfaces
{
    public interface IOrderService
    {
        public Task<List<Order>> SelectAll();
        public Task<List<Order>> SelectWithPaging(int page, int pageSize);
        public Task<Order> FindItem(int id);
        public Task<List<Order>> FindAll(string fullName);
        public Task<List<Order>> FindWithPaging(string fullName, int page, int pageSize);
        public Task<Order> Insert(Order item);
        public Task<Order> Update(int id, Order item);
        public Task<bool> Delete(int id);
    }
}
