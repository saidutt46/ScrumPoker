using System;
using ScrumPoker.Dto.DtoModels;

namespace ScrumPoker.Dto.Response
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public UserProfileDto UserProfile { get; set; }
    }
}
