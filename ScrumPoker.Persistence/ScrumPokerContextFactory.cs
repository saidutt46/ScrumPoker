using System;
using Microsoft.EntityFrameworkCore;
using ScrumPoker.Persistence.Shared;

namespace ScrumPoker.Persistence
{
    public class ScrumPokerContextFactory : DesignTimeDbContextFactoryBase<ScrumPokerContext>
    {
        protected override ScrumPokerContext CreateNewInstance(DbContextOptions<ScrumPokerContext> options)
        {
            return new ScrumPokerContext(options);
        }
    }
}
