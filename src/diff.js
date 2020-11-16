const isComplex = (value) => typeof value === 'object';

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
// - isComplex - boolean - определяет наличие свойств
// - properties - [] - массив самоподобных объектов сравнения
// - oper - char - тип операции, '-', '+' - удалено/добавлено, '*' -  изменено, ' ' - без изменения
// - value - объект или значение - определяет конечное значение свойства для операций '-', '+'
// - valueFrom - объект или значение - конечное значение свойства для 1-ой структуры, операция '*'
// - valueTo - объект или значение - конечное значение свойства для 2-й структуры, операция '*'
//  }] - массив - свойства сравнения
const genPropertyDiff = (obj1, obj2) => {
  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));
  const crossKeys = [...keys1].filter((x) => keys2.has(x));
  const excludedKeys = [...keys1].filter((x) => !keys2.has(x));
  const addedKeys = [...keys2].filter((x) => !keys1.has(x));

  const excludeProperties = excludedKeys.map((key) => ({
    name: key,
    isComplex: false,
    oper: '-',
    value: obj1[key],
  }));

  const addedProperties = addedKeys.map((key) => ({
    name: key,
    isComplex: false,
    oper: '+',
    value: obj2[key],
  }));

  const crossProperties = crossKeys.map((key) => {
    const obj1IsComplex = isComplex(obj1[key]);
    const obj2IsComplex = isComplex(obj2[key]);
    if (obj1IsComplex && obj2IsComplex) {
      return {
        name: key,
        isComplex: true,
        properties: genPropertyDiff(obj1[key], obj2[key]),
      };
    }
    if ((!obj1IsComplex && !obj2IsComplex) && (obj1[key] === obj2[key])) {
      return {
        name: key,
        isComplex: false,
        oper: ' ',
        value: obj1[key],
      };
    }
    return {
      name: key,
      isComplex: false,
      oper: '*',
      valueFrom: obj1[key],
      valueTo: obj2[key],
    };
  });

  return [...excludeProperties, ...crossProperties, ...addedProperties].sort(orderBy('name'));
};

export default genPropertyDiff;
