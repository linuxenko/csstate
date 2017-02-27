/**
 * An example of usage csstate
 */

var expect = require('chai').expect;
var CST = require('../');
var cst = new CST();

var defaultRules = {
  'body': {
    'font-size': '12px',
    'padding': '0px'
  },
  '#content': {
    'padding': '10px'
  }
};

describe('Example of usage CSSTate', function () {
  beforeEach(function () {
    cst.rule(defaultRules);
  });

  afterEach(function () {
    cst.exit();
  });

  it('should create default rules', function () {
    expect(cst.rules[0].selectorText).to.be.equal('body');
    cst.remove('body');
    expect(cst.rules[0].selectorText).to.be.equal('#content');

    cst.rule('li', 'font-weight', 'bold');
  });

  it('should restore default rules', function () {
    expect(cst.rules[0].selectorText).to.be.equal('body');
    expect(cst.rules[1].selectorText).to.be.equal('#content');
    expect(cst.rules.length).to.be.equal(2);
  });
});
