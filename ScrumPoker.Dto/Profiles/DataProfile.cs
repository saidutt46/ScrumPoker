using System;
using AutoMapper;
using ScrumPoker.Domain.Models;
using ScrumPoker.Dto.DtoModels;
using ScrumPoker.Dto.Requests;

namespace ScrumPoker.Dto.Profiles
{
    public class DataProfile : Profile
    {
        public DataProfile()
        {
            CreateMap<Participant, UserProfileDto>();
            CreateMap<CreateGame, Game>();
        }
    }
}
