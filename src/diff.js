import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2).sort();
  return unionKeys.map((key) => {
    if (!keys2.includes(key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (!keys1.includes(key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }
    const obj1IsComplex = _.isPlainObject(obj1[key]);
    const obj2IsComplex = _.isPlainObject(obj2[key]);
    if (obj1IsComplex && obj2IsComplex) {
      return {
        name: key,
        type: 'nested',
        properties: genDiff(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        type: 'changed',
        valueFrom: obj1[key],
        valueTo: obj2[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
};

export default genDiff;
