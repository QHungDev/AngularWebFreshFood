using Models;

namespace API.Interfaces
{
    public interface IEmailService
    {
        void SendMail(Email request);
    }
}
