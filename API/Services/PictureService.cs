using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Newtonsoft.Json;
using RestSharp;

namespace API.Services
{
    public class PictureService : IPictureService
    {
        private readonly IConfiguration _configuration;
        //khởi tạo DBContext theo mô hình DI
        private DBContext _context;
        public PictureService(DBContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _context.Pictures.FindAsync(id);

            if (item == null)
                return false;

            _context.Pictures.Remove(item);

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

        public async Task<List<Picture>> FindAll(string title)
        {
            var data = await _context.Pictures
                                     .Where(x => x.Title.Contains(title))
                                     .ToListAsync();

            return data;
        }

        public async Task<Picture> FindItem(int id)
        {
            var item = await _context.Pictures.FindAsync(id);
            return item;
        }

        public async Task<List<Picture>> FindWithPaging(string title, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Pictures
                               .Where(x => x.Title.Contains(title))
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Picture> Insert(Picture item)
        {
            if (item == null)
                return null;

            _context.Pictures.Add(item);

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

        public async Task<List<Picture>> SelectAll()
        {
            var data = await _context.Pictures.ToListAsync();
            return data;
        }

        public async Task<List<Picture>> SelectWithPaging(int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
                return null;

            int skip = (page - 1) * pageSize;

            var data = await _context.Pictures
                               .Skip(skip)
                               .Take(pageSize)
                               .ToListAsync();

            return data;
        }

        public async Task<Picture> Update(int id, Picture item)
        {
            var existItem = await _context.Pictures.FindAsync(id);

            if (existItem == null)
                return null;

            existItem.Avatar = item.Avatar;
            existItem.Thumb = item.Thumb;
            existItem.Title = item.Title;
            existItem.Position = item.Position;
            existItem.Url     = item.Url;
            existItem.Status = item.Status;
            existItem.CreateTime = item.CreateTime;
            existItem.PictureCategoryID = item.PictureCategoryID;
            existItem.CreateBy = item.CreateBy;

            await _context.SaveChangesAsync();
            return existItem;
        }

        public async Task<bool> UpdateStatus(int id, bool status)
        {
            var item = await _context.Pictures.FindAsync(id);

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

        public async Task<GitResponseModel> UploadImageAsync(IFormFile file, string folderSource)
        {
            var fileName = ToFileName(file);
            var commit = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt").Replace("/", "_");

            await using MemoryStream ms = new();
            await file.CopyToAsync(ms);

            var fileBytes = ms.ToArray();

            RestRequest request = new() { Method = Method.Put };

            request.AddHeader("Authorization", "Token " + _configuration["GithubAPI:AccessToken"]);
            request.AddHeader("accept", "application/vnd.github.v3+json");
            request.AddJsonBody(
                new
                {
                    message = commit,
                    content = Convert.ToBase64String(fileBytes),
                    branch = _configuration["GithubAPI:Branch"]
                });

            var client = new RestClient($"{_configuration["GithubAPI:BaseUrl"]}/{folderSource}/{fileName}");

            var response = await client.ExecuteAsync(request);
            var jsonGit = response.Content?.Replace("download_url", "downloadUrl");

            if (jsonGit == null)
            {
                return new GitResponseModel { Success = false };
            }

            var resGit = JsonConvert.DeserializeObject<GitResponseModel>(jsonGit);

            if (resGit == null)
            {
                return new GitResponseModel { Success = false };
            }

            resGit.Success = true;

            return resGit;
        }
        private string ToFileName(IFormFile file)
        {
            var stringName = "";
            var ticks = DateTime.UtcNow.Ticks;
            var fileName = file.FileName.Split('.').First();

            if (file.FileName.EndsWith(".png") || file.FileName.EndsWith(".PNG"))
            {
                stringName = fileName + "_" + ticks + ".png";
            }
            else if (file.FileName.EndsWith(".jpg") || file.FileName.EndsWith(".JPG"))
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }
            else if (file.FileName.EndsWith(".jpeg") || file.FileName.EndsWith(".JPEG"))
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }
            else if (file.FileName.EndsWith(".gif") || file.FileName.EndsWith(".GIF"))
            {
                stringName = fileName + "_" + ticks + ".gif";
            }
            else if (file.FileName.EndsWith(".webp") || file.FileName.EndsWith(".WEBP"))
            {
                stringName = fileName + "_" + ticks + ".webp";
            }
            else
            {
                stringName = fileName + "_" + ticks + ".jpg";
            }

            return stringName;
        }
    }
}
