using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InfoEatsWeb.Domain
{
    public class PersonalList
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateAt { get; set; }

        [ForeignKey("Login")]
        public int LoginId { get; set; }
        
        public Login Login { get; set; }

        [ForeignKey("Restaurant")]
        public int RestaurantId { get; set; }

        public Restaurant Restaurant { get; set; }

    }
}
