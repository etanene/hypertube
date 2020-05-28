import { userService } from '../services';

const user = userService.getUser();

const initialState = {
  isAuth: Boolean(user) || false,
  user,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuth: true,
        error: '',
        user: action.payload,
      };
    case 'LOGIN_LOGOUT':
      return {
        isAuth: false,
        error: '',
        user: null,
      };
    case 'LOGIN_ERROR':
      return {
        isAuth: false,
        error: action.payload,
        user: null,
      };
    case 'USER_RESET_ERROR':
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default authReducer;
