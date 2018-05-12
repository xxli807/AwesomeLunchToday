using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoEatsWeb.Models
{
    public class LoginViewModel
    {
        public int? LoginId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
