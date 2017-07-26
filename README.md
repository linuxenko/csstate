# CSState

Simple dynamic CSS style handling tool.


[![Donate](https://img.shields.io/badge/donate-3$-green.svg?style=flat-square)](https://www.linuxenko.pro/donate.html#?amount=3) [![Build Status](https://img.shields.io/travis/linuxenko/csstate.svg?style=flat-square)](https://travis-ci.org/linuxenko/csstate) [![Coveralls](https://img.shields.io/coveralls/linuxenko/csstate/master.svg?style=flat-square)](https://coveralls.io/github/linuxenko/csstate) [![npm version](https://img.shields.io/npm/v/csstate.svg?style=flat-square)](https://www.npmjs.com/package/csstate) [![license](https://img.shields.io/github/license/linuxenko/csstate.svg?style=flat-square)]() [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

### Installation

```
npm i --save-dev csstate
```

### Usage

```js
  var CSSTate = require('csstate');
  var cst = new CSSTate();

  cst.rule({
    'body': {
      'font-size': '18px'
    }
  });

  cst.exit();
```
Check out _[How to test DOM elements with CSSTate](https://medium.com/@linuxenko/how-to-test-dom-elements-with-csstate-749a6b3c5ce5)_ tutorial.

### Features

Create/modify rules

`rule(selector, property, value)`

`rule(object)`

Remove rules

`remove(selector)`

`remove(selector, proprery)`

`remove(object)` - remove specified properties

`remove(object, true)` - remove by selectors, executes `remove(selector)` for each selector inside of the object.

Remove stylesheet

`exit()`

### Usage in tests

```js
  beforeEach(() => {
    cst.rule(defaultRules); // Load default rules
  });

  afterEach(() => {
    cst.exit(); // Remove entire stylesheet
  });
```

See the [example](https://github.com/linuxenko/csstate/blob/master/tests/mocha-test.test.js).

### License

MIT (c) 2017 Svetlana Linuxenko
