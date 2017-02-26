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

    return this;
  }
};

module.exports = CSSTate;

