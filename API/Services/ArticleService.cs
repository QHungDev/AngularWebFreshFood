using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Utilities.Responses;

namespace API.Services
{
    public class ArticleService : IArticleService
    {
        private DBContext _context;
        public ArticleService(DBContext context)
        {
            _context = context;
        }

        public async Task<List<Article>> SelectAll()
        {
            var data = await _context.Articles
                                     .Include(x => x.ArticleCategory)
                                     .OrderByDescending(x => x.CreateTime)
                                     .Take(10)
                                     .ToListAsync();
            return data;
        }

        public async Task<List<Article>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Articles
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<PagingResponse<Article>> SelectWithPagingAndTotal(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Articles
                               .Include(x => x.ArticleCategory)
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            var total = _context.Articles.Count();

            var result = new PagingResponse<Article>();
            result.Data = data;
            result.Total = total;

            return result;
        }

        public async Task<Article> FindItem(int id)
        {
            var item = await _context.Articles.FindAsync(id);
            return item;
        }

        public async Task<List<Article>> FindAll(string title)
        {
            var data = await _context.Articles
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<List<Article>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Articles
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Article> Insert(Article item)
        {
            if (item == null)
                return null;

            _context.Articles.Add(item);

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

        public async Task<Article> Update(Article item)
        {
            var existItem = await _context.Articles.FindAsync(item.ArticleID);

            if (existItem == null)
                return null;

            // existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Content = item.Content;
            existItem.Position = item.Position;
            existItem.Status = item.Status;
            // existItem.CreateTime = item.CreateTime;
            existItem.ArticleCategoryID = item.ArticleCategoryID;
            // existItem.CreateBy = item.CreateBy;

            try
            {
                await _context.SaveChangesAsync();
                return existItem;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Articles.FindAsync(id);

            if (item == null)
                return false;

            _context.Articles.Remove(item);

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

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Articles.FindAsync(id);

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
