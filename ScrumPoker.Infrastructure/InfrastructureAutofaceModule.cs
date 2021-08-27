using System;
using Autofac;
using ScrumPoker.Infrastructure.Interfaces;
using ScrumPoker.Infrastructure.Services;

namespace ScrumPoker.Infrastructure
{
    public class InfrastructureAutofaceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GameService>().As<IGameService>().InstancePerLifetimeScope();
        }
    }
}
