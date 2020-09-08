const getTreeFromArray = (arr) => {
  const mappedArr = {};
  let comment;
  const tree = [];
  for (let i = 0; i < arr.length; i += 1) {
    comment = arr[i];
    mappedArr[comment.id] = comment;
    mappedArr[comment.id].children = [];
  }
  const arrKeys = Object.keys(mappedArr);
  arrKeys.forEach((id) => {
    comment = mappedArr[id];
    if (comment.parent_id && mappedArr[comment.parent_id]) {
      mappedArr[comment.parent_id].children.push(comment);
    } else {
      tree.push(comment);
    }
  });
  return tree;
};

export default getTreeFromArray;
