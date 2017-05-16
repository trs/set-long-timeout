const {expect} = require('chai');

const {setLongTimeout, setLongInterval, clearLongTimeout} = require('../src')(1000);

describe('setLongTimeout', function () {
  this.timeout(10000);

  it('calls function after x seconds', done => {
    setLongTimeout(() => done(), 2500);
  });

  it('passes through variables', done => {
    setLongTimeout((var1, var2) => {
      expect(var1).to.equal(1);
      expect(var2).to.equal(2);
      done();
    }, 2500, 1, 2);
  });

  it('clears timeout early', done => {
    const id = setLongTimeout(() => {
      done('should not happen');
    }, 2500);

    setTimeout(() => {
      const cleared = clearLongTimeout(id);
      expect(cleared).to.equal(true);
      setTimeout(() => done(), 2000);
    }, 1500);
  });
});

describe('setLongInterval', function () {
  this.timeout(15000);

  it('calls function every x seconds', done => {
    let count = 0;
    const id = setLongInterval(() => {
      count++;
      if (count === 2) {
        clearLongTimeout(id);
        done();
      }
    }, 2500);
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
        }, 6000);
      }
    }, 2500);
  });
});
