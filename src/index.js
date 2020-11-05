import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const isComplex = (value) => typeof value === 'object';

//  Отображение свойства объекта в структуру вида:
// {name, isComplex, value | properties, oper}
const mapProperty = (obj, key, oper = ' ') => {
  const property = obj[key];
  if (isComplex(property)) {
    return {
      name: key,
      isComplex: true,
      properties: Object.keys(property).map((name) => mapProperty(property, name)),
      oper,
    };
  }
  return {
    name: key,
    isComplex: false,
    value: property,
    oper,
  };
};

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
// name - string
// iscomplex - boolean
// value - рекурсивная структура объекта
// properties - [] - массив самоподобных объектов сравнения
// oper - char - '-', '+' - если свойство удалено или добавлено, '*' - если свойство изменено
// valueFrom - рекурсивная структура объекта источника (только для операции '*')
// valueTo - рекурсивная структура объекта приемника (только для операции '*')
const genPropertyDiff = (obj1, obj2, PropertyName = '') => {
  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));
  const inter = new Set([...keys1].filter((x) => keys2.has(x)));
  const diff1 = new Set([...keys1].filter((x) => !keys2.has(x)));
  const diff2 = new Set([...keys2].filter((x) => !keys1.has(x)));
  const properties = [];
  diff1.forEach((key) => properties.push(mapProperty(obj1, key, '-')));
  diff2.forEach((key) => properties.push(mapProperty(obj2, key, '+')));
  inter.forEach((key) => {
    const obj1IsComplex = isComplex(obj1[key]);
    const obj2IsComplex = isComplex(obj2[key]);
    if (obj1IsComplex && obj2IsComplex) {
      properties.push(genPropertyDiff(obj1[key], obj2[key], key));
      return;
    }
    if ((!obj1IsComplex && !obj2IsComplex) && (obj1[key] === obj2[key])) {
      properties.push({
        name: key,
        isComplex: false,
        value: obj1[key],
        oper: ' ',
      });
      return;
    }
    properties.push({
      name: key,
      oper: '*',
      valueFrom: mapProperty(obj1, key, '-'),
      valueTo: mapProperty(obj2, key, '+'),
    });
  });
  properties.sort(orderBy('name'));
  return {
    name: PropertyName,
    isComplex: true,
    properties,
    oper: ' ',
  };
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(path.resolve(process.cwd(), filepath1));
  const obj2 = parse(path.resolve(process.cwd(), filepath2));
  const tree = genPropertyDiff(obj1, obj2);
  return format(tree, formatName);
};

export default genDiff;
