import _ from 'lodash';

//  Формирование универсальной структуры сравнения объектов
//  Параметры:
// - obj1 - объект
// - obj2 - объект
//  Возвращаемое значение:
//  [{
// - name - string - наименование свойства сравнения
// - properties - [] - массив самоподобных объектов сравнения
// - type - char - тип операции: added, deleted, changed, unchanged, nested
// - value - объект или значение - определяет конечное значение свойства для операций '-', '+'
// - valueFrom - объект или значение - конечное значение свойства для 1-ой структуры, операция '*'
// - valueTo - объект или значение - конечное значение свойства для 2-й структуры, операция '*'
//  }] - массив - свойства сравнения
const genPropertyDiff = (obj1, obj2) => {
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
        properties: genPropertyDiff(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
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

export default genPropertyDiff;
