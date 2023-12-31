﻿using Models;
using Utilities.Requests;
using Utilities.Responses;

namespace API.Interfaces
{
    public interface IProductService
    {
        public Task<List<Product>> SelectAll();
        public Task<List<Product>> SearchProducts(string title);
        public Task<List<Product>> GetSellToday();
        public Task<List<Product>> GetAllWithCreateTime();
        public Task<List<Product>> GetAllWithQuantity();
        public Task<List<Product>> SelectWithPaging(int page, int pageSize);
        public Task<PagingResponse<Product>> SelectWithPagingAndTotal(int page, int pageSize);
        public Task<Product> FindItem(int id);
        public Task<List<Product>> FindAll(string title);
        public Task<List<Product>> FindWithPaging(string title, int page, int pageSize);
        public Task<Product> Insert(Product item);
        public Task<Product> Update(int productID,Product item);
        public Task<Product> ChangeSellToday(int id);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
        public Task<GitResponseModel> UploadImageAsync(IFormFile file, string folderSource);

        public Task<RequestSupply> InsertRequestSupply(RequestSupply item);
        public Task<List<RequestSupplyProduct>> GetRequestSupply();
        public Task<RequestSupply> ApproveRequestSupply(int id);
    }
}
