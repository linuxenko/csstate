/**
 * CSSTate is a simple util for dynamic CSS style handling.
 *
 * There is only two functions
 *
 *  rule(selector, property, value)
 *  rule(object)
 *
 *  remove(selector, property)
 *  remove(object)
 *
 *  License MIT (c) 2017 Svetlana Linuxenko
 */
var CSSTate = function (opt) {
  opt = opt || {};
  this.media = opt.media || 'screen';
  this.id = opt.id || null;

  this.init();
};

CSSTate.prototype = {
  head: function () {
    return document.head || document.getElementsByTagName('head')[0];
  },

  init: function () {
    this.el = document.createElement('style');
    this.el.type = 'text/css';
    this.el.id = this.id;
    this.el.media = this.media;

    this.head().appendChild(this.el);
    this.stylesheet = document.styleSheets[document.styleSheets.length - 1];
    this.rules = this.stylesheet.cssRules || this.stylesheet.rules;

    return this;
  },

  exit: function () {
    if (this.el) {
      this.head().removeChild(this.el);
    }
  },

  rule: function (selector, property, value) {
    if (typeof selector === 'string') {
      this._insert(selector, property, value);
    } else {
      var selectors = this._objToArray(selector);
      for (var i = 0; i < selectors.length; i++) {
        this._insert.apply(this, selectors[i]);
      }
    }
  },

  remove: function (selector, property) {
    if (typeof selector === 'string') {
      this._remove(selector, property);
    } else {
      var selectors = this._objToArray(selector);
      for (var i = 0; i < selectors.length; i++) {
        this._remove.apply(this, selectors[i]);
      }
    }
  },

  _objToArray: function (obj) {
    return [].concat.apply([], Object.keys(obj).map(function (name) {
      return Object.keys(obj[name]).map(function (property) {
        return [name, property, obj[name][property]];
      });
    }));
  },

  _insert: function (selector, property, value) {
    var index = this._indexOf(selector);

    if (index > -1) {
      this._modifyCss(index, property, value);
    } else {
      this._addCss(selector, property, value);
    }
  },

  _remove: function (selector, property) {
    var index = this._indexOf(selector);

    if (index > -1) {
      if (property) {
        this._removeCss(index, property);
      } else {
        this._removeCss(index);
      }
    }
  },

  _indexOf: function (selector) {
    var index = this.rules.length - 1;

    if (index > -1) {
      index = [].slice.call(this.rules).map(function (i, idx) {
        return i.selectorText === selector ? idx : false;
      }).filter(function (i) {
        return i !== false;
      })[0];
    }
    return index;
  },

  _addCss: function (selector, property, value) {
    var str = !value ? property : property + ':' + value + ';';

    if (this.stylesheet.insertRule) {
      this.stylesheet.insertRule(selector + '{' + str + '}', this.rules.length);
    } else {
      this.stylesheet.addRule(selector, str, this.rules.length);
    }
  },

  _removeCss: function (index, property) {
    if (property && this.stylesheet.cssRules) {
      this.rules[index].style.removeProperty(property);
    } else if (property && this.stylesheet.rules) {
      if (property === 'float') {
        this.rules[index].style.removeAttribute('styleFloat');
      } else {
        this.rules[index].style.removeAttribute(property);
      }
    } else if (!property) {
      if (this.stylesheet.deleteRule) {
        this.stylesheet.deleteRule(index);
      } else {
        this.stylesheet.removeRule(index);
      }
    }
  },

  _modifyCss: function (index, property, value) {
    if (this.stylesheet.cssRules) {
      this.rules[index].style.setProperty(property, value);
    } else if (this.stylesheet.rules) {
      if (property === 'float') {
        this.rules[index].style.setAttribute('styleFloat', value);
      } else {
        this.rules[index].style.setAttribute(property, value);
      }
    }
  }
};

module.exports = CSSTate;

