import { createAction } from '../../lib/actionHelper';

const filmsAction = createAction('FILMS');

export default {
  ...filmsAction('GET_FILMS'),
  ...filmsAction('SAVE_FILMS'),
};
