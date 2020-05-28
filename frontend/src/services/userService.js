const setUser = (data) => {
  localStorage.setItem('loggedUser', JSON.stringify(data));
};

const getUser = () => (JSON.parse(localStorage.getItem('loggedUser')));

const delUser = () => {
  localStorage.removeItem('loggedUser');
};

export default {
  setUser,
  getUser,
  delUser,
};
