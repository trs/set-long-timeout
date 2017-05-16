const rb = require('crypto').randomBytes;

const MAX_INT32 = 2147483647;
const TIMERS = {};

module.exports = function (maxTimeout = MAX_INT32) {
  function setLongWait(isInterval, fn, timeout, ...params) {
    timeout = Math.min(timeout, Number.MAX_SAFE_INTEGER);
    if (timeout <= maxTimeout) return setTimeout(fn, timeout);

    const timerId = rb(16).toString('hex');
    TIMERS[timerId] = {active: true};

    function createWait() {
      let loopCount = 0;
      const timer = TIMERS[timerId];
      const loopMax = Math.floor(timeout / maxTimeout);
      const remaining = Math.ceil(timeout % maxTimeout);

      const timeoutRemaining = () => {
        timer.timeoutTimer = setTimeout(() => {
          fn(...params);
          if (isInterval && timer.active) createWait();
          else clearLongTimeout(timer);
        }, remaining);
      };

      timer.intervalTimer = setInterval(() => {
        loopCount++;
        if (loopCount === loopMax) {
          clearInterval(timer.intervalTimer);
          timeoutRemaining();
        }
      }, maxTimeout);

      return timerId;
    }
    return createWait();
  }

  function setLongTimeout(fn, timeout, ...params) {
    return setLongWait(false, fn, timeout, ...params);
  }

  function setLongInterval(fn, timeout, ...params) {
    return setLongWait(true, fn, timeout, ...params);
  }

  function clearLongTimeout(timerId) {
    const timer = TIMERS[timerId];
    if (!timer) return false;
    timer.active = false;
    clearInterval(timer.intervalTimer);
    clearTimeout(timer.timeoutTimer);
    delete TIMERS[timerId];
    return true;
  }

  function clearLongInterval(timerId) {
    clearLongTimeout(timerId);
  }

  return {
    setLongTimeout,
    setLongInterval,
    clearLongTimeout,
    clearLongInterval
  };
};
