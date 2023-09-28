using API.Interfaces;
using API.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;
using Models;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    [Route("api/send-email")]
    [ApiController]
    public class EmailAPIController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private IWebHostEnvironment myEnvironment;
        private DBContext _context;

        public EmailAPIController(IEmailService emailService, DBContext context, IWebHostEnvironment environment)
        {
            myEnvironment = environment;
            _context = context;
            _emailService = emailService;
        }
        [HttpPost("post")]
        public IActionResult SendEmail(Email request)
        {
            string productsLi = "";
            foreach (var item in request.Products)
            {
                productsLi += "<li>" + item.Quantity + "x " + _context.Products.FirstOrDefault(x=> x.ProductID == Int32.Parse(item.ProductID)).Title + "</li>";

            }
            string productsUl = "<ul style='padding: 0; margin: 0;'>" + productsLi + "</ul>";
            string body = "gui mail";
            string folderEmail = "FileUploads\\Email\\email.html";
            string path = myEnvironment.WebRootPath + folderEmail;
            if (System.IO.File.Exists(path))
            {
                body = System.IO.File.ReadAllText(path).Trim().Replace("{soluong}", request.Quantity)
                                                  .Replace("{thanhtoan}", request.Payment)
                                                  .Replace("{ngay}", request.Date)
                                                  .Replace("{cacmathang}", productsUl)
                                                  .Replace("{chiphi}", request.Total);
            }
            else
            {
                body = "khong co file";
            }
            request.Body = body;
            
            _emailService.SendMail(request);
            return Ok();
        }

        [HttpPost("sendEmailAuthenticCode")]
        public IActionResult SendEmailAuthenticCode(EmailAuthenticCode request)
        {
            string body = "gui mail";
            string folderEmail = "FileUploads\\Email\\email-authentic-code.html";
            string path = myEnvironment.WebRootPath + folderEmail;
            if (System.IO.File.Exists(path))
            {
                body = System.IO.File.ReadAllText(path).Trim().Replace("{code}", request.Code); 
            }
            else
            {
                body = "khong co file";
            }
            request.Body = body;
            request.Subject = "Mã xác thực tài khoản";
            
            _emailService.SendEmailAuthenticCode(request);
            return Ok();
        }
    }
}
