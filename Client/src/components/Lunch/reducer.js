import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
  allUsers: []
};

const getRandomColor = () => "#"+((1<<24)*Math.random()|0).toString(16);

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ALL_USERS: {
      const users = action.payload.map(x => {
        x.avatarColor = getRandomColor();
        return x;
      });
      return { ...state, allUsers: users };
    }
    case ActionTypes.TOGGLE_SELECT_PERSON: {
      const user = state.allUsers.find(x => x.id === action.payload);
      if (user) {
        user.selected = !user.selected;
        return { ...state, allUsers: state.allUsers.concat([]) };
      }
      return state;
    }
    default:
      return state;
  }
}