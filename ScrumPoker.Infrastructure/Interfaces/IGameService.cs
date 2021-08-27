using System;
using System.Threading.Tasks;
using ScrumPoker.Domain.Models;
using ScrumPoker.Dto.Requests;
using ScrumPoker.Dto.Shared;

namespace ScrumPoker.Infrastructure.Interfaces
{
    public interface IGameService
    {
        Task<BaseDtoListResponse<Game>> ListAsync();
        Task<BaseDtoResponse<Game>> GetById(Guid id);
        Task<BaseDtoResponse<Game>> Add(CreateGame request);
        Task<BaseDtoResponse<Game>> Delete(Guid id);
    }
}
