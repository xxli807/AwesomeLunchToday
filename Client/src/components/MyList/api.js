import { post, get } from '../../utils';

export const getMyList = userId => {
  return get(`user/getList/${userId}`);
}

export const addToMyList = (userId, restaurantName) => {
  return post(`restaurant/add/${userId}`, { restaurantName });
}

export const deleteFromMyList = (listItemId, personallistId) => {
  return post(`restaurant/remove/${listItemId}/${personallistId}`);
}
