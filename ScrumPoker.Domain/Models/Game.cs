using System;
namespace ScrumPoker.Domain.Models
{
    public class Game : BaseEntity
    {
        public string Name { get; set; }
        public int VotingSystem { get; set; }
        public Guid? Owner { get; set; }
    }
}
