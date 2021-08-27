using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ScrumPoker.Domain.Models;
using ScrumPoker.Dto.Requests;
using ScrumPoker.Dto.Shared;
using ScrumPoker.Infrastructure.Interfaces;
using ScrumPoker.Persistence.RepoInterface;

namespace ScrumPoker.Infrastructure.Services
{
    public class GameService : IGameService
    {
        private readonly IMapper _mapper;
        private readonly IGameRepository _gameRepository;

        public GameService(IMapper mapper, IGameRepository gameRepository)
        {
            _mapper = mapper;
            _gameRepository = gameRepository;
        }

        public async Task<BaseDtoListResponse<Game>> ListAsync()
        {
            try
            {
                IList<Game> games = await _gameRepository.ListAll();
                if (games != null)
                {
                    BaseDtoListResponse<Game> response = new(games);
                    return response;
                }
                else
                {
                    return new BaseDtoListResponse<Game>("No Categories found, please try after adding new categories(s)");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<Game>(ex.Message);
            }
        }

        public async Task<BaseDtoResponse<Game>> GetById(Guid id)
        {
            Game game = await _gameRepository.GetById(id);

            if (game == null)
                return new BaseDtoResponse<Game>("Game Not Found");
            return new BaseDtoResponse<Game>(game);
        }

        public async Task<BaseDtoResponse<Game>> Add(CreateGame request)
        {
            try
            {
                Game model = _mapper.Map<CreateGame, Game>(request);
                if (!request.Owner.HasValue || request.Owner == Guid.Empty)
                {
                    model.Owner = null;
                }
                Game game = await _gameRepository.Add(model);
                if (game != null)
                {
                    return new BaseDtoResponse<Game>(game);
                }
                else
                {
                    return new BaseDtoResponse<Game>("Unable to create a new game, try again");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<Game>($"An error occurred when saving the game: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<Game>> Delete(Guid id)
        {
            try
            {
                Game game = await _gameRepository.GetById(id);
                if (game != null)
                {
                    await _gameRepository.Delete(game);
                    return new BaseDtoResponse<Game>(game);

                }
                else
                {
                    return new BaseDtoResponse<Game>("Unable to delete: Game Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<Game>($"An error occurred when deleting the game: {ex.Message}");
            }
        }
    }
}
