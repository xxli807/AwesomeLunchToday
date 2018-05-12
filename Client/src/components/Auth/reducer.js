import {
  REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_PENDING,
  LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_PENDING, GET_REMEMBERED_USER
} from './actions';

import { getUser } from '../../utils'

const initState = { 
  userId: null,
  pending: false, 
  username: "",
  error: null 
};

export function AuthReducer(state=initState, action) {
  switch (action.type) {
    case REGISTER_USER_PENDING:
    case LOGIN_USER_PENDING:
      console.log('pending...');
      return {...state, pending: true};
      
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      const { userId, username } = action.payload;
      alert('Register/Login successful');
      return {
        ...state,
        userId,
        username
      }
      // return { userId, username, error: null, pending: false };
    case REGISTER_USER_ERROR:
    case LOGIN_USER_ERROR:
      alert('Register/Login Error');
      return {...initState, error: action.payload.error };

    case GET_REMEMBERED_USER:
      const user = getUser();
      console.log(user);
      return {
        ...state,
        userId: user.userId,
        username: user.username
      }

    default:
      return state;
  }
};
