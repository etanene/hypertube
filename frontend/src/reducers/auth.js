import { userService } from '../services';

const user = userService.getUser();

const initialState = {
  isAuth: Boolean(user) || false,
  user,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
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
    case 'USER_UPDATE':
      // eslint-disable-next-line no-case-declarations
      return {
        isAuth: true,
        error: '',
        user: action.payload,
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
