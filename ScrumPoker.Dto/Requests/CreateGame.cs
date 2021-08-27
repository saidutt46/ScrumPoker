using System;
namespace ScrumPoker.Dto.Requests
{
    public class CreateGame
    {
        public string Name { get; set; }
        public int VotingSystem { get; set; }
        public Guid? Owner { get; set; }
    }
}
