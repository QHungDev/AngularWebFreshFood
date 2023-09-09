using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Services;
using Models;
namespace API.Controllers
{
    [Route("api/momo")]
    [ApiController]
    public class MomoAPIController : ControllerBase
    {
        private IMomoService _momoService;
        public MomoAPIController(IMomoService momoService)
        {
            _momoService = momoService;
        }
        //[HttpPost("post")]
        //public async Task<string> CreatePaymentUrl(OrderMoMo model)
        //{
        //    var response = await _momoService.CreatePaymentAsync(model);
        //    //return Redirect(response.PayUrl);
        //    var url = response.PayUrl;
        //    var link = url.ToString();

        //     return link;
        //}
        [HttpPost("post")]
        public async Task<IActionResult> CreatePaymentUrl(OrderMoMo model)
        {
            var response = await _momoService.CreatePaymentAsync(model);
            //return Redirect(response.PayUrl);
            object data = new
            {
                status = response.PayUrl.ToString() == null || response.PayUrl.ToString() == "" ? false : true,
                url = response.PayUrl.ToString()
            };
            
            return Ok(data);
        }

        [HttpGet("GetMomo")]
        public string CreatePaymentUrl()
        {
            //var response = await _momoService.CreatePaymentAsync(model);
            ////return Redirect(response.PayUrl);
            //var url = response.PayUrl;
            //var link = url.ToString();
            var link = "CaoThienPhuong";

            return link;
        }

        [HttpGet("getOrderMomo2")]
        public async Task<IActionResult> GetOrderMomo2()
        {
            //var response = await _service.SelectAll();

            //if (response == null)
            //    return NotFound();

            OrderMoMo model = new OrderMoMo();

            model.OrderID = 27;
            model.FullName = "Phuongmapkhung";
            model.OrderInfo = "Phuongmapkhung27";
            model.Amount = 34000;
            model.MomoCode = "";
            model.ReturnUrl = "";


            var response = await _momoService.CreatePaymentAsync(model);
            //return Redirect(response.PayUrl);

            var countProduct = 6;
            if (countProduct > 0)
            {
                object data = new
                {
                    status = false,
                    //message = "Có " + countProduct + " sản phẩm cùng thể loại!"
                    message = response.PayUrl.ToString()
                };
                return Ok(data);
            }

            return Ok("momo");
        }
        [HttpGet("Get")]
        public IActionResult PaymentCallBack()
        {
            var response = _momoService.PaymentExecuteAsync(HttpContext.Request.Query);
            return Ok(response);
        }
    }
}
