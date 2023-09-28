using Models;

namespace API.Interfaces
{
    public interface IPictureService
    {
        public Task<List<Picture>> SelectAll();
        public Task<List<Picture>> SelectWithPaging(int page, int pageSize);
        public Task<Picture> FindItem(int id);
        public Task<List<Picture>> FindAll(string title);
        public Task<List<Picture>> FindWithPaging(string title, int page, int pageSize);
        public Task<Picture> Insert(Picture item);
        public Task<Picture> Update(int id, Picture item);
        public Task<bool> Delete(int id);
        public Task<bool> UpdateStatus(int id, bool status);
        public Task<GitResponseModel> UploadImageAsync(IFormFile file, string folderSource);
    }
}
