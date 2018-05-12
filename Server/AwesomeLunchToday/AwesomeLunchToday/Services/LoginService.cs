using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using InfoEatsWeb.Domain;
using Microsoft.EntityFrameworkCore;

namespace InfoEatsWeb.Services
{
    public class LoginService : ILoginService
    {
        public readonly LunchItDbContext _lunchItContext;

        public LoginService(LunchItDbContext dbContext)
        {
            _lunchItContext = dbContext;
        }

        public async Task<Login> RegisterUser(string username, string password)
        {
            var user = await _lunchItContext.Logins.FirstOrDefaultAsync(d => d.Username.ToLower() == username);

            if (user == null)
            {
                var newUser = new Login()
                {
                    Username = username,
                    Passsword = password
                };
                _lunchItContext.Logins.Add(newUser);

                _lunchItContext.SaveChanges();
                return newUser;
            }

            return null;
            
        }



        public async Task<Login> LoginUser(string username, string password)
        {
            var user = await _lunchItContext.Logins.FirstOrDefaultAsync(d => d.Username.ToLower() == username && d.Passsword == password);

            return user;
        }

        public async Task<List<Login>> GetAllUsers()
        {
            return await _lunchItContext.Logins.ToListAsync();
        }

    }
}
