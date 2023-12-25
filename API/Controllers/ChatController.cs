using API.dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PusherServer;

namespace API.Controllers
{
    [Route("api")]
    [ApiController]
    public class ChatController : ControllerBase
    {
     [HttpPost("messages")]
    public async Task<ActionResult> Message(MessageDTO dto)
        {
            var options = new PusherOptions
            {
                Cluster = "ap1",
                Encrypted = true
            };

            var pusher = new Pusher(
              "1729879",
              "61ab5bb3fc79d84ff0e6",
              "4a331f5889da70c242f7",
              options);

            var result = await pusher.TriggerAsync(
              "chat",
              "message",
              new {
                  username = dto.Username,
                  message = dto.Message });
            return Ok(new string[] { });
        }
    }
}
