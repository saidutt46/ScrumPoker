using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ScrumPoker.Domain.Models;
using ScrumPoker.Dto.Requests;
using ScrumPoker.Dto.Response;
using ScrumPoker.WebApi.Extensions;
using ScrumPoker.Dto.DtoModels;

namespace ScrumPoker.WebApi.Controllers
{
    [Route("/api/user")]
    public class AuthenticationController : ControllerBase
    {

        private readonly UserManager<Participant> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(UserManager<Participant> userManager,
            RoleManager<Role> roleManager, IConfiguration configuration, IMapper mapper, ILogger<AuthenticationController> logger)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            try
            {
                var user = await userManager.FindByNameAsync(model.Username);
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password) == false)
                {
                    return BadRequest("Incorrect Password, please retry with a valid password for given user");
                }
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {

                    var authClaims = new List<Claim>
                    {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );
                    var convertedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    UserProfileDto currentUser = _mapper.Map<Participant, UserProfileDto>(user);

                    LoginResponse response = new LoginResponse
                    {
                        Token = convertedToken,
                        Expiration = token.ValidTo,
                        UserProfile = currentUser
                    };

                    return Ok(response);

                }
                return BadRequest("User Not Found, please check the credentials");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            try
            {
                var userExists = await userManager.FindByNameAsync(model.Username);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = "User already exists!" });

                Participant user = new Participant()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username,
                    DisplayName = model.DisplayName
                };
                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    var message = "";
                    foreach (var error in result.Errors)
                    {
                        message += error.Description + ", ";
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = message });
                }

                return Ok(new AuthResponse { Success = true, Status = "Success", Message = "User created successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Provided User Id is not a valid string or Guid");
            try
            {
                //var userExists = await userManager.FindByNameAsync(model.Username);
                var userExists = await userManager.FindByIdAsync(id);
                if (userExists == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User Not Found" } });
                
                UserProfileDto user = _mapper.Map<Participant, UserProfileDto>(userExists);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
