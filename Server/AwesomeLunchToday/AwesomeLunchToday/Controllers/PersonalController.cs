using System;
using System.Threading.Tasks;
using InfoEatsWeb.Models;
using Microsoft.AspNetCore.Mvc; 
using InfoEatsWeb.Services;
using InfoEatsWeb.Domain;
using System.Collections.Generic;

namespace InfoEatsWeb.Controllers
{
     
    public class PersonalListController : Controller
    {
        private readonly IRestaurantService _restaurantService;

        public PersonalListController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [Route("restaurant/add/{loginId}")]
        public async Task<IActionResult> AddRestaurant([FromRoute]int loginId, [FromBody]RestauranModel restauranModel)
        {
            try
            {
                await _restaurantService.AddRestaurantAndAttachToUser(loginId, restauranModel.RestaurantName);

                var restaurants = await _restaurantService.GetPersonalList(loginId);
                return Ok(restaurants);
               
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }


        [Route("restaurant/remove/{loginId}/{restaurantId}")]
        public async Task<IActionResult> RemoveRestaurant([FromRoute]int loginId, [FromRoute] int restaurantId)
        {
            try
            {
                await _restaurantService.RemoveRestaurantFromList(loginId, restaurantId);
                var restaurants = await _restaurantService.GetPersonalList(loginId);
                return Ok(restaurants);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        [Route("user/getList/{loginId}")]
        public async Task<IActionResult> GetList([FromRoute]int loginId)
        {
            var list = await _restaurantService.GetPersonalList(loginId);
            //return Json(new { list }

            //);
            return Ok(list);
        }


        [Route("user/removeList")]
        public IActionResult RemoveList()
        {
            return View();
        }

        [Route("places")]
        public async Task<IActionResult> GetPlacesOfAllPeople([FromBody]int[] loginIds)
        {
            var places = await _restaurantService.GetPlaces(loginIds);
            return Ok(places);
        }

    }
}
