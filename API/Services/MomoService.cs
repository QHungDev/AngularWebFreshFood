using API.Interfaces;
using Microsoft.Extensions.Options;
using Models;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using RestSharp;
namespace API.Services
{
    public class MomoService: IMomoService
    {
        private readonly IConfiguration _config;
        private readonly IOptions<MomoOptionModel> _options;

        public MomoService(IOptions<MomoOptionModel> options, IConfiguration config)
        {
            _options = options;
            _config = config;

        }

        public async Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(OrderMoMo model)
        {
            var requestId = DateTime.UtcNow.Ticks.ToString();
            model.OrderInfo = "Khách hàng: " + model.FullName + " thanh toán đơn hàng tại freshfoodstore.com";
            //var rawData = $"partnerCode={_config.GetValue<string>("MomoAPI:PartnerCode")}&accessKey={_config.GetValue<string>("MomoAPI:AccessKey")}&requestId={requestId}&amount={model.Amount.ToString()}&orderId={requestId}&orderInfo={model.OrderInfo}&returnUrl={_config.GetValue<string>("MomoAPI:ReturnUrl")}&notifyUrl={_config.GetValue<string>("MomoAPI:NotifyUrl")}&extraData=";
            var rawData = $"partnerCode={_config.GetValue<string>("MomoAPI:PartnerCode")}&accessKey={_config.GetValue<string>("MomoAPI:AccessKey")}&requestId={requestId}&amount={model.Amount.ToString()}&orderId={requestId}&orderInfo={model.OrderInfo}&returnUrl={model.ReturnUrl}&notifyUrl={_config.GetValue<string>("MomoAPI:NotifyUrl")}&extraData=";
            var signature = ComputeHmacSha256(rawData, _config.GetValue<string>("MomoAPI:SecretKey"));

            var client = new RestClient(_config.GetValue<string>("MomoAPI:MomoApiUrl"));
            var request = new RestRequest() { Method = Method.Post };
            request.AddHeader("Content-Type", "application/json; charset=UTF-8");

            // Create an object representing the request data
            var requestData = new
            {
                accessKey = _config.GetValue<string>("MomoAPI:AccessKey"),
                partnerCode = _config.GetValue<string>("MomoAPI:PartnerCode"),
                requestType = _config.GetValue<string>("MomoAPI:RequestType"),
                notifyUrl = _config.GetValue<string>("MomoAPI:NotifyUrl"),
                returnUrl = model.ReturnUrl,
                orderId = requestId,
                amount = model.Amount.ToString(),
                 orderInfo = model.OrderInfo,
                requestId = requestId,
                extraData = "",
                signature = signature
            };

            request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

            var response = await client.ExecuteAsync(request);

            return JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);
            // return null;
        }

        public MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection)
        {
            var amount = collection.First(s => s.Key == "amount").Value;
            var orderInfo = collection.First(s => s.Key == "orderInfo").Value;
            var orderId = collection.First(s => s.Key == "orderId").Value;
            return new MomoExecuteResponseModel()
            {
                Amount = amount,
                OrderId = orderId,
                OrderInfo = orderInfo
            };
        }

        private string ComputeHmacSha256(string message, string secretKey)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes))
            {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
    }
}
