import _ from 'lodash';

//  Сортировка по свойству
const orderBy = (prop) => {
  const orderByProp = (a, b) => {
    const valueFrom = a[prop];
    const valueTo = b[prop];
    if (valueFrom > valueTo) {
      return 1;
    }
    if (valueFrom < valueTo) {
      return -1;
    }
    return 0;
  };
  return orderByProp;
};

//  Формирование универсальной структуры сравнения объектов
//  Параметры:
// - obj1 - объект
// - obj2 - объект
//  Возвращаемое значение:
//  [{
// - name - string - наименование свойства сравнения
// - properties - [] - массив самоподобных объектов сравнения
// - type - char - тип операции: added, deleted, changed, unchanged, tree
// - value - объект или значение - определяет конечное значение свойства для операций '-', '+'
// - valueFrom - объект или значение - конечное значение свойства для 1-ой структуры, операция '*'
// - valueTo - объект или значение - конечное значение свойства для 2-й структуры, операция '*'
//  }] - массив - свойства сравнения
const genPropertyDiff = (obj1, obj2) => {
  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));
  const mapKey = (key) => {
    if (!keys2.has(key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (!keys1.has(key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }
    const obj1IsComplex = _.isObject(obj1[key]);
    const obj2IsComplex = _.isObject(obj2[key]);
    if (obj1IsComplex && obj2IsComplex) {
      return {
        name: key,
        type: 'tree',
        properties: genPropertyDiff(obj1[key], obj2[key]),
      };
    }
    if ((!obj1IsComplex && !obj2IsComplex) && (obj1[key] === obj2[key])) {
      return {
        name: key,
        type: 'unchanged',
        value: obj1[key],
      };
    }
    return {
      name: key,
      isComplex: false,
      type: 'changed',
      valueFrom: obj1[key],
      valueTo: obj2[key],
    };
  };
  const unionKeys = [...new Set([...keys1, ...keys2])];
  const diff = unionKeys.map(mapKey);
  return diff.sort(orderBy('name'));
};

export default genPropertyDiff;
