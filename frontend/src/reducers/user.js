const USER_SAVE = 'USER_SAVE';
export function saveUser(user) {
  return {
    type: USER_SAVE,
    payload: user,
  };
}

const USER_DELETE = 'USER_DELETE';
export function deleteUser() {
  return {
    type: USER_DELETE,
  };
}

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_SAVE:
      return {
        ...state,
        ...action.payload,
      };
    case USER_DELETE:
      return {
        logged: false,
      };
    default:
      return state;
  }
};

export default userReducer;
