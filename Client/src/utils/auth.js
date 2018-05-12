
const storage = window.localStorage;

export const login = (username, userId) => {
  storage.removeItem('username');
  storage.removeItem('userId');
  storage.setItem('username', username);
  storage.setItem('userId', userId);
  return true;
}

export const getUser = () => {
  return {
    username: storage.getItem('username'),
    userId: storage.getItem('userId')
  }
}

export const logout = () => {
  storage.removeItem('username');
  storage.removeItem('userId');
}
