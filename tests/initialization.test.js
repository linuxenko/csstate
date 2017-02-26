var expect = require('chai').expect;
var CST = require('../');

describe('Test csstate initalization', function () {
  it('should create/remove stylesheet', function () {
    var cst = new CST();
    expect(document.styleSheets.length).to.be.equal(1);
    cst.exit();
    expect(document.styleSheets.length).to.be.equal(0);
  });
});
