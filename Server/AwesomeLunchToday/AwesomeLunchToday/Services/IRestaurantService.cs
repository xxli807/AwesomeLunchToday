using InfoEatsWeb.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoEatsWeb.Services
{
    public interface IRestaurantService
    {
        Task<List<Restaurant>> GetPersonalList(int loginId);

        Task AddRestaurantAndAttachToUser(int loginId, string restaurantName);

        Task RemoveRestaurantFromList(int loginId, int personallistId);

        Task<List<PersonalList>> GetPlaces(int[] loginIds);
    }
}
