<!--[RM_HEADING]-->
# set-long-timeout

<!--[]-->
<!--[RM_DESCRIPTION]-->
> setTimeout and setInterval above 2147483647ms delay

<!--[]-->

<!--[RM_BADGES]-->
[![NPM Version](https://img.shields.io/npm/v/set-long-timeout.svg?style=flat-square)](http://npm.im/set-long-timeout)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/trs/set-long-timeout/badge.svg?branch=master)](https://coveralls.io/github/trs/set-long-timeout?branch=master)
[![Dependencies status](https://david-dm.org/trs/set-long-timeout/status.svg?theme=shields.io)](https://david-dm.org/trs/set-long-timeout#info=dependencies)
[![Dev-dependencies status](https://david-dm.org/trs/set-long-timeout/dev-status.svg?theme=shields.io)](https://david-dm.org/trs/set-long-timeout#info=devDependencies)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


<!--[]-->


- [Why?](#why)
- [Install](#install)
- [Usage](#usage)
  - [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Why?

The native `setTimeout` and `setInterval` are limited to a delay of 2147483647ms. This package allows you to set a timeout up to `Number.MAX_SAFE_INTEGER`.

<!--[RM_INSTALL]-->
## Install

    npm install set-long-timeout


<!--[]-->

## Usage

```js
const {
  setLongTimeout,
  setLongInterval,

  clearLongTimeout,
  clearLongInterval
} = require('set-long-timeout')();

// will call function after 30 days
const timeoutId = setLongTimeout(() => { ... }, 2592000000);
// stop timeout with ID returned
clearLongTimeout(timeoutId);

// will call function every 30 days
const intervalId = setLongInterval(() => { ... }, 2592000000);
// stop interval with ID returned
clearLongInterval(intervalId);
```

## API

### `const longTimeout = require('set-long-timeout');`

`longTimeout` is a function that takes one argument: the maximum setInterval delay, which defaults to 2147483647.  
It returns 4 functions:

#### `setLongTimeout(func, delay[, ...params])`

Will call `func` __after__ `delay` milliseconds with the passed `params` if provided.  
Returns an ID that can be used to stop the timer.

#### `setLongInterval(func, delay[, ...params])`

Will call `func` __every__ `delay` milliseconds with the passed `params` if provided.  
Returns an ID that can be used to stop the timer.

#### `clearLongTimeout(timerID)`

Will stop a timer using the returned timer ID.  
(Also works with `setLongInterval` IDs)

#### `clearLongInterval(timerID)`

Will stop a timer using the returned timer ID.  
(Also works with `setLongTimeout` IDs)


<!--[RM_CONTRIBUTING]-->
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).


<!--[]-->

<!--[RM_LICENSE]-->
## License

This software is licensed under the MIT Licence. See [LICENSE](LICENSE).

<!--[]-->
