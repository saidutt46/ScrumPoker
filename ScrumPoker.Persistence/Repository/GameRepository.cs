using System;
using ScrumPoker.Domain.Models;
using ScrumPoker.Persistence.RepoInterface;
using ScrumPoker.Persistence.Shared;

namespace ScrumPoker.Persistence.Repository
{
    public class GameRepository : EfRepository<Game>, IGameRepository
    {
        public GameRepository(ScrumPokerContext options) : base(options)
        {
        }
    }
}
