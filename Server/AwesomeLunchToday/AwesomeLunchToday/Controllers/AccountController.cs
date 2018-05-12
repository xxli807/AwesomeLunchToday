using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InfoEatsWeb.Models;
using InfoEatsWeb.Services;

namespace InfoEatsWeb.Controllers
{

    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly ILoginService _loginService;

        public AccountController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [Route("create")]
        public async Task<IActionResult> Create([FromBody]LoginViewModel login)
        {
            var user = await _loginService.RegisterUser(login.Username, login.Password);
            if (user != null)
            {
                return Ok(user);
            }
            return StatusCode(500);
        }


        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel login)
        {
            var user = await _loginService.LoginUser(login.Username, login.Password);

            if (user != null)
            {
                return Ok(user);
            }
            return Unauthorized();
        }

        [Route("allUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await _loginService.GetAllUsers();
            return Ok(allUsers);
        }

    }
}
