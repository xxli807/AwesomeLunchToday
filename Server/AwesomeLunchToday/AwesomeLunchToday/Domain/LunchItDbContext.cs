using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InfoEatsWeb.Domain
{
    public class LunchItDbContext : DbContext
    {

        //might need to get the connection string
        public LunchItDbContext(DbContextOptions<LunchItDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>().HasKey(d => d.Id);
            modelBuilder.Entity<Login>().Property(d => d.CreateAt).HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Restaurant>().HasKey(d => d.Id);
            modelBuilder.Entity<Restaurant>().Property(d => d.CreateAt).HasDefaultValueSql("getdate()");

            modelBuilder.Entity<PersonalList>().HasKey(d => d.Id);
            modelBuilder.Entity<PersonalList>().Property(d => d.CreateAt).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<PersonalList>().HasOne(d => d.Login).WithMany(x => x.PersonalLists);
            modelBuilder.Entity<PersonalList>().HasOne(d => d.Restaurant);



        }

        public DbSet<Login> Logins { get; set; }

        public DbSet<Restaurant> Restaurants { get; set; }

        public DbSet<PersonalList> PersonalLists { get; set; }

         
    }

}
