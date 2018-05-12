using InfoEatsWeb.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace InfoEatsWeb.Services
{
    public class RestaurantService: IRestaurantService
    {
        public readonly LunchItDbContext _lunchItContext;

        public RestaurantService(LunchItDbContext dbContext)
        {
            _lunchItContext = dbContext;
        }

        public async Task<List<Restaurant>> GetPersonalList(int loginId)
        {
            var user = await _lunchItContext.Logins.Include(x => x.PersonalLists).ThenInclude(x => x.Restaurant).FirstOrDefaultAsync(x => x.Id == loginId);
            if (user == null)
            {
                return new List<Restaurant>();
            }
            //return user.PersonalLists.ToList();
            return user.PersonalLists.Select(x => x.Restaurant).ToList();
        }


        public async Task AddRestaurantAndAttachToUser(int loginId, string restaurantName)
        {
            var user = await _lunchItContext.Logins.FirstOrDefaultAsync(d => d.Id == loginId);

            var restaurant = new Restaurant()
            {
                Name = restaurantName
            };

            _lunchItContext.Restaurants.Add(restaurant);

            var personalList= new PersonalList()
            {
                Login = user,
                Restaurant = restaurant
            };

            _lunchItContext.PersonalLists.Add(personalList);

            await _lunchItContext.SaveChangesAsync();

        }


        public async Task RemoveRestaurantFromList(int loginId, int restaurantId)
        {
            var personList = await _lunchItContext.PersonalLists.FirstAsync(d => d.LoginId == loginId && d.RestaurantId == restaurantId);
            _lunchItContext.PersonalLists.Remove(personList);

            _lunchItContext.SaveChanges();
        }

        public async Task<List<PersonalList>> GetPlaces(int[] loginIds)
        {
            return await _lunchItContext.PersonalLists.Include(x => x.Restaurant).Where(x => loginIds.Contains(x.LoginId)).ToListAsync();
        }


    }
}
