// convert: { login: 'root', email: 'root@mail.ru' }
// to: WHERE login=$1 AND email=$2
const getCondition = (data, startInd = 0) => {
  const keys = Object.keys(data);
  if (!keys.length) {
    return '';
  }

  let ind = startInd;
  const values = keys.map((key) => {
    ind += 1;
    return (`${key}=$${ind}`);
  });
  return `WHERE ${values.join(' AND ')}`;
};

// convert: [...data]
// to: (data[0], data[1], data[2])
const getInValues = (data, startInd = 0) => {
  if (!data.length) {
    return '';
  }

  let ind = startInd;
  const values = data.map(() => {
    ind += 1;
    return `$${ind}`;
  });
  return `(${values.join(', ')})`;
};

const getInCondition = (data, without = {}, startInd = 0) => {
  const keys = Object.keys(data);
  if (!keys.length) {
    return '';
  }

  let ind = startInd;
  const values = keys.map((key) => {
    if (Array.isArray(data[key])) {
      const inValues = getInValues(data[key], ind);
      ind += data[key].length;
      if (without[key]) {
        return (`${key} NOT IN ${inValues}`);
      }
      return (`${key} IN ${inValues}`);
    }
    ind += 1;
    if (without[key]) {
      return (`${key}!=$${ind}`);
    }
    return (`${key}=$${ind}`);
  });
  return `WHERE ${values.join(' AND ')}`;
};

// convert: { login: 'root', email: 'root@mail.ru' }
// to: SET login=$1, email=$2
const getUpdateValues = (data, startInd = 0) => {
  const keys = Object.keys(data);
  if (!keys.length) {
    return '';
  }

  let ind = startInd;
  const values = keys.map((key) => {
    ind += 1;
    return (`${key}=$${ind}`);
  });
  return `SET ${values.join(', ')}`;
};

// convert: [...data]
// to: (data[0]), (data[1]), (data[2])
const getInsertValue = (data, startInd = 0) => {
  if (!data.length) {
    return '';
  }

  let ind = startInd;
  const values = data.map(() => {
    ind += 1;
    return (`($${ind})`);
  });
  return `VALUES ${values.join(', ')}`;
};

const spreadValues = (data) => (
  Object.values(data).reduce((result, value) => (
    Array.isArray(value) ? [...result, ...value] : [...result, value]
  ), [])
);

module.exports = {
  getCondition,
  getUpdateValues,
  getInsertValue,
  getInValues,
  getInCondition,
  spreadValues,
};
