using System;
using Autofac;
using ScrumPoker.Persistence.RepoInterface;
using ScrumPoker.Persistence.Repository;

namespace ScrumPoker.Persistence
{
    public class PersistenceAutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GameRepository>().As<IGameRepository>().InstancePerLifetimeScope();
        }
    }
}
