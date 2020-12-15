# Учебный проект 2 "Вычислитель отличий" из курса обучения "Фронтенд-разработчик" на Hexlet

[![Maintainability](https://api.codeclimate.com/v1/badges/ee6031cc3d97053e9573/maintainability)](https://codeclimate.com/github/KalyakinAG/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/10cae849a0e3b15576a9/test_coverage)](https://codeclimate.com/github/KalyakinAG/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/KalyakinAG/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/KalyakinAG/frontend-project-lvl2/actions)
[![Hexlet check](https://github.com/KalyakinAG/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/KalyakinAG/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)

## Описание

Пакет является учебным проектом реализации CLI приложений на Node.js. Учебное приложение задействует библиотеку построения CLI программ, включающую генерацию описания, описание опций и их значений.

В данной реализации создана утилита сравнения файлов с иерархической структурой. Поддерживаются форматы json, ini, yaml. Реализовано форматы вывода: stylish, plain и json. Первый следует иерархической структуре, а второй - плоской. Формат вывода json показывает внутреннюю структуру результата сравнения.

Архитектура приложения позволяет сделать расширение поддержки и других форматов сравниваемых файлов и вывода результата сравнения.

## Пример работы

### сравнение файлов json

[![asciicast](https://asciinema.org/a/B4RcSJFasqpRxP4rSCLHd0wbk.svg)](https://asciinema.org/a/B4RcSJFasqpRxP4rSCLHd0wbk)

### сравнение файлов ini

[![asciicast](https://asciinema.org/a/tXOdabCsad6Q0rsHEs4dcqBBR.svg)](https://asciinema.org/a/tXOdabCsad6Q0rsHEs4dcqBBR)

### сравнение файлов рекурсивно, выбор формата вывода результата

[![asciicast](https://asciinema.org/a/369890.svg)](https://asciinema.org/a/369890)

### демонстрация вывода внутреннего формата структуры сравнения в json

[![asciicast](https://asciinema.org/a/369908.svg)](https://asciinema.org/a/369908)

## Установка и запуск

### Установка пакета из хранилища npm

```bash
npm install frontend-project-lvl2-kalyaka -g
```

### Установка из репозитория github

- Склонировать репозиторий
- Перейти в текущую директорию пакета
- Опубликовать пакет локально
- Собрать пакет локально

```bash
> git clone https://github.com/KalyakinAG/frontend-project-lvl2.git ./gendiff
> cd gendiff
> make publish
> make link
```

После установки запуск производится командой:

```bash
> gendiff [options] <filepath1> <filepath2>

Опции:
  -V, --version        output the version number
  -d, --debug          debug
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

## Удаление

Выполнить команду в директории пакета:

```bash
> make uninstall
```

Или удалить пакет глобально:

```bash
> npm uninstall frontend-project-lvl2-kalyaka -g
```
