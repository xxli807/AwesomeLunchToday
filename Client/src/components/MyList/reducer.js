import {
  GET_MY_LIST_PENDING, GET_MY_LIST_SUCCESS
} from './actions';

const initState = [];

export function myListReducer(state = initState, action) {
  switch(action.type) {
    case GET_MY_LIST_SUCCESS:
     
      return action.payload.myList;
    
    default:
      return state;
  }
}
