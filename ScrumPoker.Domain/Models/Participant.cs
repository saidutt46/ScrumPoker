using System;
using Microsoft.AspNetCore.Identity;

namespace ScrumPoker.Domain.Models
{
    public class Participant : IdentityUser<Guid>
    {
        public string DisplayName { get; set; }
    }

    public class Role : IdentityRole<Guid> { }
}
