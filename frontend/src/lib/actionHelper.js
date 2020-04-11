import { camelCase } from 'lodash';

// удалить коммент, когда добавиться еще один export
// eslint-disable-next-line
export function createAction(name) {
  return (type) => {
    const typeValue = `${name}_${type}`;
    return {
      [type]: typeValue,
      [camelCase(type)]: (payload = {}) => ({
        type: typeValue,
        payload,
      }),
    };
  };
}
