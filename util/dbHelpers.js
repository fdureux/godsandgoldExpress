const fromObjectToArr = (obj) => {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push(key);
    arr.push(value);
  }
  return arr;
};

module.exports = fromObjectToArr;
