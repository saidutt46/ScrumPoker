using System;
namespace ScrumPoker.Dto.DtoModels
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
    }
}
