using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InfoEatsWeb.Domain
{
    public class Login
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateAt { get; set; }

        public string Username { get; set; }

        public ICollection<PersonalList> PersonalLists { get; set; } = new List<PersonalList>();

        public string Passsword { get; set; }

    }
}
