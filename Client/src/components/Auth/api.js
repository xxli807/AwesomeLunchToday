import { post } from '../../utils';

export const registerUser = (username, password) => {
  return post('account/create', { username, password });
}

export const loginUser = (username, password) => {
  return post('account/login', { username, password });
}
