using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfoEatsWeb.Domain;
using Microsoft.Azure.KeyVault;

namespace InfoEatsWeb.Services
{
    public interface ILoginService
    {
        Task<Login> RegisterUser(string username, string password);

        Task<Login> LoginUser(string username, string password);

        Task<List<Login>> GetAllUsers();
    }
}
