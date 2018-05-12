import { getMyList, addToMyList, deleteFromMyList } from './api';

export const GET_MY_LIST = "GET_MY_LIST";
export const GET_MY_LIST_PENDING = "GET_MY_LIST_PENDING";
export const GET_MY_LIST_SUCCESS = "GET_MY_LIST_SUCCESS";
export const GET_MY_LIST_ERROR = "GET_MY_LIST_ERROR";

export const ADD_TO_MY_LIST = "ADD_TO_MY_LIST";
export const ADD_TO_MY_LIST_PENDING = "ADD_TO_MY_LIST_PENDING";
export const ADD_TO_MY_LIST_SUCCESS = "ADD_TO_MY_LIST_SUCCESS";
export const ADD_TO_MY_LIST_ERROR = "ADD_TO_MY_LIST_ERROR";

export const DELETE_FROM_MY_LIST = "DELETE_FROM_MY_LIST";
export const DELETE_FROM_MY_LIST_PENDING = "DELETE_FROM_MY_LIST_PENDING";
export const DELETE_FROM_MY_LIST_SUCCESS = "DELETE_FROM_MY_LIST_SUCCESS";
export const DELETE_FROM_MY_LIST_ERROR = "DELETE_FROM_MY_LIST_ERROR";

export const getMyListAct = () => {
  return dispatch => {
    dispatch({ type: GET_MY_LIST_PENDING });
    const userId = localStorage.getItem('userId');
    if (userId) {
      getMyList(userId)
        .then(myList => {
          dispatch({ type: GET_MY_LIST_SUCCESS, payload: { myList }})
        });
    }
  }
}

export const addToMyListAct = (restaurantName) => {
  return dispatch => {
    dispatch({ type: ADD_TO_MY_LIST_PENDING });
    const userId = localStorage.getItem('userId');
    if (userId) {
      addToMyList(userId, restaurantName)
        .then(myList => {
          console.log('mylist...', myList);
          dispatch({ type: GET_MY_LIST_SUCCESS, payload: { myList } });
        });
    }
  }
}

export const deleteFromMyListAct = (listItemId) => {
  return dispatch => {
    dispatch({ type: DELETE_FROM_MY_LIST });
    const userId = localStorage.getItem('userId');
    if (userId) {
      deleteFromMyList(userId, listItemId)
        .then(myList => {
          dispatch({ type: GET_MY_LIST_SUCCESS, payload: { myList } });
        });
    }
  }
}
