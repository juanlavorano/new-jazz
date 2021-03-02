using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using AutoMapper;
using New_Jazz.Data;
using New_Jazz.Models;
using New_Jazz.Services;
using New_Jazz.DTOs;

namespace New_Jazz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthentication _authentication;

        public UsersController(UsersContext context, IMapper mapper, IAuthentication authentication)
        {
            _context = context;
            _mapper = mapper;
            _authentication = authentication;
        }

        // SIGN UP
        [HttpPost]
        [Route("new")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User newUser)
        {
            var encryptedPassword = Encryption.Encrypt(newUser.password);

            // New User Object
            User user = new User()
            {
                ID = newUser.ID,
                username = newUser.username,
                email = newUser.email,
                password = encryptedPassword
            };

            var existingUser = _authentication.LookForExistingUser(newUser.username, newUser.email);

            if (existingUser.success)
            {
                return BadRequest(existingUser.message);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(newUser);

        }

        // LOGIN
        [HttpPost]
        [Route("login")]
        public ActionResult<User> LogUserIn([FromBody] LoginDTO user)
        {
            var existingUser = _authentication.Authenticate(user.username, user.password);

            if (existingUser == null)
            {
                return NotFound("Username or password incorrect");
            }

            return Ok(new
            {
                user = new
                {
                    username = existingUser.username,
                    email = existingUser.email
                },
                message = "Successfully logged in"
            });
        }

    }
}