var expect = require('chai').expect;
var CST = require('../');

describe('Test csstate initalization', function () {
  it('should create/remove stylesheet', function () {
    var cst = new CST();
    expect(document.styleSheets.length).to.be.equal(1);
    cst.exit();
    expect(document.styleSheets.length).to.be.equal(0);
  });

  it('should insert rules into css', function () {
    var cst = new CST();
    cst._insert('body', 'background', 'blue');
    cst._insert('p > a', 'font-size', '1px');
    cst._insert('a', 'font-size', '2px');

    expect(cst.rules[0].selectorText).to.be.equal('body');
    expect(cst.rules[1].selectorText).to.be.equal('p > a');
    expect(cst.rules[2].selectorText).to.be.equal('a');

    expect(cst.rules[0].style['background']).to.be.contain('blue');
    expect(cst.rules[1].style['font-size']).to.be.equal('1px');
    expect(cst.rules[2].style['font-size']).to.be.equal('2px');
    cst.exit();
  });

  it('should insert/remove selectors', function () {
    var cst = new CST();
    cst._insert('body', 'background', 'blue');
    cst._insert('p > a', 'font-size', '1px');

    expect(cst.rules[0].selectorText).to.be.equal('body');
    expect(cst.rules[1].selectorText).to.be.equal('p > a');

    cst._remove('p > a');
    expect(cst.rules.length).to.be.equal(1);
    cst._remove('body');
    expect(cst.rules.length).to.be.equal(0);
    cst.exit();
  });

  it('should insert/remove rules', function () {
    var cst = new CST();
    cst._insert('body', 'background', 'blue');
    cst._insert('p > a', 'font-size', '1px');
    cst._insert('p > a', 'font-weight', 'bold');

    expect(cst.rules.length).to.be.equal(2);
    expect(cst.rules[1].style['font-size']).to.be.equal('1px');
    expect(cst.rules[1].style['font-weight']).to.be.equal('bold');

    cst._remove('p > a', 'font-weight');
    expect(cst.rules[1].style['font-size']).to.be.equal('1px');
    expect(cst.rules[1].style['font-weight']).to.be.empty;
    cst.exit();
  });

  it('should modify rules', function () {
    var cst = new CST();
    cst._insert('body', 'background', 'blue');
    cst._insert('p > a', 'font-size', '1px');
    cst._insert('p > a', 'font-weight', 'bold');

    expect(cst.rules[1].style['font-weight']).to.be.equal('bold');
    cst._insert('p > a', 'font-weight', 'normal');
    expect(cst.rules[1].style['font-weight']).to.be.equal('normal');
    cst.exit();
  });

  it('should handle rule()', function () {
    var cst = new CST();
    var rules = {
      'body': {
        'font-size': '12px',
        'font-weight': 'bold'
      },
      'p': {
        'font-weight': 'normal'
      }
    };

    cst.rule(rules);

    expect(cst.rules[0].selectorText).to.be.equal('body');
    expect(cst.rules[0].style['font-size']).to.be.equal('12px');
    expect(cst.rules[0].style['font-weight']).to.be.equal('bold');
    expect(cst.rules[1].style['font-weight']).to.be.equal('normal');

    cst.rule('a', 'text-decoration', 'none');
    expect(cst.rules[2].style['text-decoration']).to.be.equal('none');

    cst.exit();
  });

  it('should handle remove()', function () {
    var cst = new CST();
    var rules = {
      'body': {
        'font-size': '12px',
        'font-weight': 'bold'
      },
      'p': {
        'font-weight': 'normal'
      }
    };

    cst.rule(rules);

    expect(cst.rules.length).to.be.equal(2);

    cst.remove({
      'p': {
        'font-weight': ''
      }
    });

    expect(cst.rules[1].style['font-weight']).to.be.empty;
    cst.remove('p');
    cst.remove('body');
    expect(cst.rules.length).to.be.equal(0);
    cst.exit();
  });
});
