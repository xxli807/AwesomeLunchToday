import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { AuthReducer } from '../components/Auth';
import { myListReducer } from '../components/MyList';
import lunchIt from '../components/Lunch/reducer';

export default combineReducers({
  router: routerReducer,
  auth: AuthReducer,
  myList: myListReducer,
  lunchIt
});