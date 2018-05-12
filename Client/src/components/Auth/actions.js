import { registerUser, loginUser } from './api';
import { login, logout, getUser } from '../../utils'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
// const { notifSend } = notifActions;

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const GET_REMEMBERED_USER = 'GET_REMEMBERED_USER';

export const registerUserAct = (username, password, history) => {
  return dispatch => {
    dispatch({ type: REGISTER_USER_PENDING});

    registerUser(username, password)
      .then(({ username, id}) => {
        login(username, id);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: { username, userId: id } });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: { error: 'Username or Password Incorrect...' }
        });
      })
  }
}

export const loginUserAct = (username, password, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER_PENDING });

    loginUser(username, password)
      .then(({ username, id}) => {
        login(username, id);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: { username, userId: id} })
      })
      .then(() => {
        history.push('/mylist');
      })
      .catch(error => {
        dispatch({ 
          type: LOGIN_USER_ERROR,
          payload: { error: 'Username or Password Incorrect...' }
        });
      });
  }
}

export const getRememberedUserAct = () => {
  return { type: GET_REMEMBERED_USER };
}
