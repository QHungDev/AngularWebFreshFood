using Models;

namespace API.Interfaces
{
    public interface IPictureCategoryService
    {
        public Task<List<PictureCategory>> SelectAll();
        public Task<List<PictureCategory>> SelectWithPaging(int page, int pageSize);
        public Task<PictureCategory> FindItem(int id);
        public Task<List<PictureCategory>> FindAll(string title);
        public Task<List<PictureCategory>> FindWithPaging(string title, int page, int pageSize);
        public Task<PictureCategory> Insert(PictureCategory item);
        public Task<PictureCategory> Update(int id, PictureCategory item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
    }
}
