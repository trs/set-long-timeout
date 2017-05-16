const {expect} = require('chai');

const {setLongTimeout, setLongInterval, clearLongTimeout} = require('../src')(5000);

describe('setLongTimeout', function () {
  this.timeout(10000);

  it('calls function after x seconds', done => {
    setLongTimeout(() => done(), 19000);
  });

  it('passes through variables', done => {
    setLongTimeout((var1, var2) => {
      expect(var1).to.equal(1);
      expect(var2).to.equal(2);
      done();
    }, 9000, 1, 2);
  });

  it('clears timeout early', done => {
    const id = setLongTimeout(() => {
      done('should not happen');
    }, 9000);

    setTimeout(() => {
      const cleared = clearLongTimeout(id);
      expect(cleared).to.equal(true);
      setTimeout(() => done(), 2000);
    }, 8000);
  });
});

describe('setLongInterval', function () {
  this.timeout(100000);

  it('calls function every x seconds', done => {
    let count = 0;
    const id = setLongInterval(() => {
      count++;
      if (count === 2) {
        clearLongTimeout(id);
        done();
      }
    }, 19000);
  });

  it('clears timeout early', done => {
    let count = 0;
    const id = setLongInterval(() => {
      count++;
      if (count === 2) {
        const cleared = clearLongTimeout(id);
        expect(cleared).to.equal(true);
        setTimeout(() => {
          expect(count).to.equal(2);
          done();
        }, 9000);
      }
    }, 6000);
  });
});
