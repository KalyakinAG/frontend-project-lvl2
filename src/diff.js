import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const unionKeys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  return unionKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (!_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
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
