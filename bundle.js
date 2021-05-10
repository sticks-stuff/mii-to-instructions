(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;

},{}],2:[function(require,module,exports){
(function (global){(function (){
'use strict';

var objectAssign = require('object-assign');

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"object-assign":28,"util/":5}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":40,"inherits":3}],6:[function(require,module,exports){
(function (global){(function (){
'use strict';

var filter = require('array-filter');

module.exports = function availableTypedArrays() {
	return filter([
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	], function (typedArray) {
		return typeof global[typedArray] === 'function';
	});
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"array-filter":1}],7:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
(function (process,Buffer){(function (){
'use strict';
/* eslint camelcase: "off" */

var assert = require('assert');

var Zstream = require('pako/lib/zlib/zstream');
var zlib_deflate = require('pako/lib/zlib/deflate.js');
var zlib_inflate = require('pako/lib/zlib/inflate.js');
var constants = require('pako/lib/zlib/constants');

for (var key in constants) {
  exports[key] = constants[key];
}

// zlib modes
exports.NONE = 0;
exports.DEFLATE = 1;
exports.INFLATE = 2;
exports.GZIP = 3;
exports.GUNZIP = 4;
exports.DEFLATERAW = 5;
exports.INFLATERAW = 6;
exports.UNZIP = 7;

var GZIP_HEADER_ID1 = 0x1f;
var GZIP_HEADER_ID2 = 0x8b;

/**
 * Emulate Node's zlib C++ layer for use by the JS layer in index.js
 */
function Zlib(mode) {
  if (typeof mode !== 'number' || mode < exports.DEFLATE || mode > exports.UNZIP) {
    throw new TypeError('Bad argument');
  }

  this.dictionary = null;
  this.err = 0;
  this.flush = 0;
  this.init_done = false;
  this.level = 0;
  this.memLevel = 0;
  this.mode = mode;
  this.strategy = 0;
  this.windowBits = 0;
  this.write_in_progress = false;
  this.pending_close = false;
  this.gzip_id_bytes_read = 0;
}

Zlib.prototype.close = function () {
  if (this.write_in_progress) {
    this.pending_close = true;
    return;
  }

  this.pending_close = false;

  assert(this.init_done, 'close before init');
  assert(this.mode <= exports.UNZIP);

  if (this.mode === exports.DEFLATE || this.mode === exports.GZIP || this.mode === exports.DEFLATERAW) {
    zlib_deflate.deflateEnd(this.strm);
  } else if (this.mode === exports.INFLATE || this.mode === exports.GUNZIP || this.mode === exports.INFLATERAW || this.mode === exports.UNZIP) {
    zlib_inflate.inflateEnd(this.strm);
  }

  this.mode = exports.NONE;

  this.dictionary = null;
};

Zlib.prototype.write = function (flush, input, in_off, in_len, out, out_off, out_len) {
  return this._write(true, flush, input, in_off, in_len, out, out_off, out_len);
};

Zlib.prototype.writeSync = function (flush, input, in_off, in_len, out, out_off, out_len) {
  return this._write(false, flush, input, in_off, in_len, out, out_off, out_len);
};

Zlib.prototype._write = function (async, flush, input, in_off, in_len, out, out_off, out_len) {
  assert.equal(arguments.length, 8);

  assert(this.init_done, 'write before init');
  assert(this.mode !== exports.NONE, 'already finalized');
  assert.equal(false, this.write_in_progress, 'write already in progress');
  assert.equal(false, this.pending_close, 'close is pending');

  this.write_in_progress = true;

  assert.equal(false, flush === undefined, 'must provide flush value');

  this.write_in_progress = true;

  if (flush !== exports.Z_NO_FLUSH && flush !== exports.Z_PARTIAL_FLUSH && flush !== exports.Z_SYNC_FLUSH && flush !== exports.Z_FULL_FLUSH && flush !== exports.Z_FINISH && flush !== exports.Z_BLOCK) {
    throw new Error('Invalid flush value');
  }

  if (input == null) {
    input = Buffer.alloc(0);
    in_len = 0;
    in_off = 0;
  }

  this.strm.avail_in = in_len;
  this.strm.input = input;
  this.strm.next_in = in_off;
  this.strm.avail_out = out_len;
  this.strm.output = out;
  this.strm.next_out = out_off;
  this.flush = flush;

  if (!async) {
    // sync version
    this._process();

    if (this._checkError()) {
      return this._afterSync();
    }
    return;
  }

  // async version
  var self = this;
  process.nextTick(function () {
    self._process();
    self._after();
  });

  return this;
};

Zlib.prototype._afterSync = function () {
  var avail_out = this.strm.avail_out;
  var avail_in = this.strm.avail_in;

  this.write_in_progress = false;

  return [avail_in, avail_out];
};

Zlib.prototype._process = function () {
  var next_expected_header_byte = null;

  // If the avail_out is left at 0, then it means that it ran out
  // of room.  If there was avail_out left over, then it means
  // that all of the input was consumed.
  switch (this.mode) {
    case exports.DEFLATE:
    case exports.GZIP:
    case exports.DEFLATERAW:
      this.err = zlib_deflate.deflate(this.strm, this.flush);
      break;
    case exports.UNZIP:
      if (this.strm.avail_in > 0) {
        next_expected_header_byte = this.strm.next_in;
      }

      switch (this.gzip_id_bytes_read) {
        case 0:
          if (next_expected_header_byte === null) {
            break;
          }

          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID1) {
            this.gzip_id_bytes_read = 1;
            next_expected_header_byte++;

            if (this.strm.avail_in === 1) {
              // The only available byte was already read.
              break;
            }
          } else {
            this.mode = exports.INFLATE;
            break;
          }

        // fallthrough
        case 1:
          if (next_expected_header_byte === null) {
            break;
          }

          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID2) {
            this.gzip_id_bytes_read = 2;
            this.mode = exports.GUNZIP;
          } else {
            // There is no actual difference between INFLATE and INFLATERAW
            // (after initialization).
            this.mode = exports.INFLATE;
          }

          break;
        default:
          throw new Error('invalid number of gzip magic number bytes read');
      }

    // fallthrough
    case exports.INFLATE:
    case exports.GUNZIP:
    case exports.INFLATERAW:
      this.err = zlib_inflate.inflate(this.strm, this.flush

      // If data was encoded with dictionary
      );if (this.err === exports.Z_NEED_DICT && this.dictionary) {
        // Load it
        this.err = zlib_inflate.inflateSetDictionary(this.strm, this.dictionary);
        if (this.err === exports.Z_OK) {
          // And try to decode again
          this.err = zlib_inflate.inflate(this.strm, this.flush);
        } else if (this.err === exports.Z_DATA_ERROR) {
          // Both inflateSetDictionary() and inflate() return Z_DATA_ERROR.
          // Make it possible for After() to tell a bad dictionary from bad
          // input.
          this.err = exports.Z_NEED_DICT;
        }
      }
      while (this.strm.avail_in > 0 && this.mode === exports.GUNZIP && this.err === exports.Z_STREAM_END && this.strm.next_in[0] !== 0x00) {
        // Bytes remain in input buffer. Perhaps this is another compressed
        // member in the same archive, or just trailing garbage.
        // Trailing zero bytes are okay, though, since they are frequently
        // used for padding.

        this.reset();
        this.err = zlib_inflate.inflate(this.strm, this.flush);
      }
      break;
    default:
      throw new Error('Unknown mode ' + this.mode);
  }
};

Zlib.prototype._checkError = function () {
  // Acceptable error states depend on the type of zlib stream.
  switch (this.err) {
    case exports.Z_OK:
    case exports.Z_BUF_ERROR:
      if (this.strm.avail_out !== 0 && this.flush === exports.Z_FINISH) {
        this._error('unexpected end of file');
        return false;
      }
      break;
    case exports.Z_STREAM_END:
      // normal statuses, not fatal
      break;
    case exports.Z_NEED_DICT:
      if (this.dictionary == null) {
        this._error('Missing dictionary');
      } else {
        this._error('Bad dictionary');
      }
      return false;
    default:
      // something else.
      this._error('Zlib error');
      return false;
  }

  return true;
};

Zlib.prototype._after = function () {
  if (!this._checkError()) {
    return;
  }

  var avail_out = this.strm.avail_out;
  var avail_in = this.strm.avail_in;

  this.write_in_progress = false;

  // call the write() cb
  this.callback(avail_in, avail_out);

  if (this.pending_close) {
    this.close();
  }
};

Zlib.prototype._error = function (message) {
  if (this.strm.msg) {
    message = this.strm.msg;
  }
  this.onerror(message, this.err

  // no hope of rescue.
  );this.write_in_progress = false;
  if (this.pending_close) {
    this.close();
  }
};

Zlib.prototype.init = function (windowBits, level, memLevel, strategy, dictionary) {
  assert(arguments.length === 4 || arguments.length === 5, 'init(windowBits, level, memLevel, strategy, [dictionary])');

  assert(windowBits >= 8 && windowBits <= 15, 'invalid windowBits');
  assert(level >= -1 && level <= 9, 'invalid compression level');

  assert(memLevel >= 1 && memLevel <= 9, 'invalid memlevel');

  assert(strategy === exports.Z_FILTERED || strategy === exports.Z_HUFFMAN_ONLY || strategy === exports.Z_RLE || strategy === exports.Z_FIXED || strategy === exports.Z_DEFAULT_STRATEGY, 'invalid strategy');

  this._init(level, windowBits, memLevel, strategy, dictionary);
  this._setDictionary();
};

Zlib.prototype.params = function () {
  throw new Error('deflateParams Not supported');
};

Zlib.prototype.reset = function () {
  this._reset();
  this._setDictionary();
};

Zlib.prototype._init = function (level, windowBits, memLevel, strategy, dictionary) {
  this.level = level;
  this.windowBits = windowBits;
  this.memLevel = memLevel;
  this.strategy = strategy;

  this.flush = exports.Z_NO_FLUSH;

  this.err = exports.Z_OK;

  if (this.mode === exports.GZIP || this.mode === exports.GUNZIP) {
    this.windowBits += 16;
  }

  if (this.mode === exports.UNZIP) {
    this.windowBits += 32;
  }

  if (this.mode === exports.DEFLATERAW || this.mode === exports.INFLATERAW) {
    this.windowBits = -1 * this.windowBits;
  }

  this.strm = new Zstream();

  switch (this.mode) {
    case exports.DEFLATE:
    case exports.GZIP:
    case exports.DEFLATERAW:
      this.err = zlib_deflate.deflateInit2(this.strm, this.level, exports.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);
      break;
    case exports.INFLATE:
    case exports.GUNZIP:
    case exports.INFLATERAW:
    case exports.UNZIP:
      this.err = zlib_inflate.inflateInit2(this.strm, this.windowBits);
      break;
    default:
      throw new Error('Unknown mode ' + this.mode);
  }

  if (this.err !== exports.Z_OK) {
    this._error('Init error');
  }

  this.dictionary = dictionary;

  this.write_in_progress = false;
  this.init_done = true;
};

Zlib.prototype._setDictionary = function () {
  if (this.dictionary == null) {
    return;
  }

  this.err = exports.Z_OK;

  switch (this.mode) {
    case exports.DEFLATE:
    case exports.DEFLATERAW:
      this.err = zlib_deflate.deflateSetDictionary(this.strm, this.dictionary);
      break;
    default:
      break;
  }

  if (this.err !== exports.Z_OK) {
    this._error('Failed to set dictionary');
  }
};

Zlib.prototype._reset = function () {
  this.err = exports.Z_OK;

  switch (this.mode) {
    case exports.DEFLATE:
    case exports.DEFLATERAW:
    case exports.GZIP:
      this.err = zlib_deflate.deflateReset(this.strm);
      break;
    case exports.INFLATE:
    case exports.INFLATERAW:
    case exports.GUNZIP:
      this.err = zlib_inflate.inflateReset(this.strm);
      break;
    default:
      break;
  }

  if (this.err !== exports.Z_OK) {
    this._error('Failed to reset stream');
  }
};

exports.Zlib = Zlib;
}).call(this)}).call(this,require('_process'),require("buffer").Buffer)
},{"_process":40,"assert":2,"buffer":11,"pako/lib/zlib/constants":31,"pako/lib/zlib/deflate.js":33,"pako/lib/zlib/inflate.js":35,"pako/lib/zlib/zstream":39}],10:[function(require,module,exports){
(function (process){(function (){
'use strict';

var Buffer = require('buffer').Buffer;
var Transform = require('stream').Transform;
var binding = require('./binding');
var util = require('util');
var assert = require('assert').ok;
var kMaxLength = require('buffer').kMaxLength;
var kRangeErrorMessage = 'Cannot create final Buffer. It would be larger ' + 'than 0x' + kMaxLength.toString(16) + ' bytes';

// zlib doesn't provide these, so kludge them in following the same
// const naming scheme zlib uses.
binding.Z_MIN_WINDOWBITS = 8;
binding.Z_MAX_WINDOWBITS = 15;
binding.Z_DEFAULT_WINDOWBITS = 15;

// fewer than 64 bytes per chunk is stupid.
// technically it could work with as few as 8, but even 64 bytes
// is absurdly low.  Usually a MB or more is best.
binding.Z_MIN_CHUNK = 64;
binding.Z_MAX_CHUNK = Infinity;
binding.Z_DEFAULT_CHUNK = 16 * 1024;

binding.Z_MIN_MEMLEVEL = 1;
binding.Z_MAX_MEMLEVEL = 9;
binding.Z_DEFAULT_MEMLEVEL = 8;

binding.Z_MIN_LEVEL = -1;
binding.Z_MAX_LEVEL = 9;
binding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;

// expose all the zlib constants
var bkeys = Object.keys(binding);
for (var bk = 0; bk < bkeys.length; bk++) {
  var bkey = bkeys[bk];
  if (bkey.match(/^Z/)) {
    Object.defineProperty(exports, bkey, {
      enumerable: true, value: binding[bkey], writable: false
    });
  }
}

// translation table for return codes.
var codes = {
  Z_OK: binding.Z_OK,
  Z_STREAM_END: binding.Z_STREAM_END,
  Z_NEED_DICT: binding.Z_NEED_DICT,
  Z_ERRNO: binding.Z_ERRNO,
  Z_STREAM_ERROR: binding.Z_STREAM_ERROR,
  Z_DATA_ERROR: binding.Z_DATA_ERROR,
  Z_MEM_ERROR: binding.Z_MEM_ERROR,
  Z_BUF_ERROR: binding.Z_BUF_ERROR,
  Z_VERSION_ERROR: binding.Z_VERSION_ERROR
};

var ckeys = Object.keys(codes);
for (var ck = 0; ck < ckeys.length; ck++) {
  var ckey = ckeys[ck];
  codes[codes[ckey]] = ckey;
}

Object.defineProperty(exports, 'codes', {
  enumerable: true, value: Object.freeze(codes), writable: false
});

exports.Deflate = Deflate;
exports.Inflate = Inflate;
exports.Gzip = Gzip;
exports.Gunzip = Gunzip;
exports.DeflateRaw = DeflateRaw;
exports.InflateRaw = InflateRaw;
exports.Unzip = Unzip;

exports.createDeflate = function (o) {
  return new Deflate(o);
};

exports.createInflate = function (o) {
  return new Inflate(o);
};

exports.createDeflateRaw = function (o) {
  return new DeflateRaw(o);
};

exports.createInflateRaw = function (o) {
  return new InflateRaw(o);
};

exports.createGzip = function (o) {
  return new Gzip(o);
};

exports.createGunzip = function (o) {
  return new Gunzip(o);
};

exports.createUnzip = function (o) {
  return new Unzip(o);
};

// Convenience methods.
// compress/decompress a string or buffer in one step.
exports.deflate = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new Deflate(opts), buffer, callback);
};

exports.deflateSync = function (buffer, opts) {
  return zlibBufferSync(new Deflate(opts), buffer);
};

exports.gzip = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new Gzip(opts), buffer, callback);
};

exports.gzipSync = function (buffer, opts) {
  return zlibBufferSync(new Gzip(opts), buffer);
};

exports.deflateRaw = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new DeflateRaw(opts), buffer, callback);
};

exports.deflateRawSync = function (buffer, opts) {
  return zlibBufferSync(new DeflateRaw(opts), buffer);
};

exports.unzip = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new Unzip(opts), buffer, callback);
};

exports.unzipSync = function (buffer, opts) {
  return zlibBufferSync(new Unzip(opts), buffer);
};

exports.inflate = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new Inflate(opts), buffer, callback);
};

exports.inflateSync = function (buffer, opts) {
  return zlibBufferSync(new Inflate(opts), buffer);
};

exports.gunzip = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new Gunzip(opts), buffer, callback);
};

exports.gunzipSync = function (buffer, opts) {
  return zlibBufferSync(new Gunzip(opts), buffer);
};

exports.inflateRaw = function (buffer, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  return zlibBuffer(new InflateRaw(opts), buffer, callback);
};

exports.inflateRawSync = function (buffer, opts) {
  return zlibBufferSync(new InflateRaw(opts), buffer);
};

function zlibBuffer(engine, buffer, callback) {
  var buffers = [];
  var nread = 0;

  engine.on('error', onError);
  engine.on('end', onEnd);

  engine.end(buffer);
  flow();

  function flow() {
    var chunk;
    while (null !== (chunk = engine.read())) {
      buffers.push(chunk);
      nread += chunk.length;
    }
    engine.once('readable', flow);
  }

  function onError(err) {
    engine.removeListener('end', onEnd);
    engine.removeListener('readable', flow);
    callback(err);
  }

  function onEnd() {
    var buf;
    var err = null;

    if (nread >= kMaxLength) {
      err = new RangeError(kRangeErrorMessage);
    } else {
      buf = Buffer.concat(buffers, nread);
    }

    buffers = [];
    engine.close();
    callback(err, buf);
  }
}

function zlibBufferSync(engine, buffer) {
  if (typeof buffer === 'string') buffer = Buffer.from(buffer);

  if (!Buffer.isBuffer(buffer)) throw new TypeError('Not a string or buffer');

  var flushFlag = engine._finishFlushFlag;

  return engine._processChunk(buffer, flushFlag);
}

// generic zlib
// minimal 2-byte header
function Deflate(opts) {
  if (!(this instanceof Deflate)) return new Deflate(opts);
  Zlib.call(this, opts, binding.DEFLATE);
}

function Inflate(opts) {
  if (!(this instanceof Inflate)) return new Inflate(opts);
  Zlib.call(this, opts, binding.INFLATE);
}

// gzip - bigger header, same deflate compression
function Gzip(opts) {
  if (!(this instanceof Gzip)) return new Gzip(opts);
  Zlib.call(this, opts, binding.GZIP);
}

function Gunzip(opts) {
  if (!(this instanceof Gunzip)) return new Gunzip(opts);
  Zlib.call(this, opts, binding.GUNZIP);
}

// raw - no header
function DeflateRaw(opts) {
  if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
  Zlib.call(this, opts, binding.DEFLATERAW);
}

function InflateRaw(opts) {
  if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
  Zlib.call(this, opts, binding.INFLATERAW);
}

// auto-detect header.
function Unzip(opts) {
  if (!(this instanceof Unzip)) return new Unzip(opts);
  Zlib.call(this, opts, binding.UNZIP);
}

function isValidFlushFlag(flag) {
  return flag === binding.Z_NO_FLUSH || flag === binding.Z_PARTIAL_FLUSH || flag === binding.Z_SYNC_FLUSH || flag === binding.Z_FULL_FLUSH || flag === binding.Z_FINISH || flag === binding.Z_BLOCK;
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.

function Zlib(opts, mode) {
  var _this = this;

  this._opts = opts = opts || {};
  this._chunkSize = opts.chunkSize || exports.Z_DEFAULT_CHUNK;

  Transform.call(this, opts);

  if (opts.flush && !isValidFlushFlag(opts.flush)) {
    throw new Error('Invalid flush flag: ' + opts.flush);
  }
  if (opts.finishFlush && !isValidFlushFlag(opts.finishFlush)) {
    throw new Error('Invalid flush flag: ' + opts.finishFlush);
  }

  this._flushFlag = opts.flush || binding.Z_NO_FLUSH;
  this._finishFlushFlag = typeof opts.finishFlush !== 'undefined' ? opts.finishFlush : binding.Z_FINISH;

  if (opts.chunkSize) {
    if (opts.chunkSize < exports.Z_MIN_CHUNK || opts.chunkSize > exports.Z_MAX_CHUNK) {
      throw new Error('Invalid chunk size: ' + opts.chunkSize);
    }
  }

  if (opts.windowBits) {
    if (opts.windowBits < exports.Z_MIN_WINDOWBITS || opts.windowBits > exports.Z_MAX_WINDOWBITS) {
      throw new Error('Invalid windowBits: ' + opts.windowBits);
    }
  }

  if (opts.level) {
    if (opts.level < exports.Z_MIN_LEVEL || opts.level > exports.Z_MAX_LEVEL) {
      throw new Error('Invalid compression level: ' + opts.level);
    }
  }

  if (opts.memLevel) {
    if (opts.memLevel < exports.Z_MIN_MEMLEVEL || opts.memLevel > exports.Z_MAX_MEMLEVEL) {
      throw new Error('Invalid memLevel: ' + opts.memLevel);
    }
  }

  if (opts.strategy) {
    if (opts.strategy != exports.Z_FILTERED && opts.strategy != exports.Z_HUFFMAN_ONLY && opts.strategy != exports.Z_RLE && opts.strategy != exports.Z_FIXED && opts.strategy != exports.Z_DEFAULT_STRATEGY) {
      throw new Error('Invalid strategy: ' + opts.strategy);
    }
  }

  if (opts.dictionary) {
    if (!Buffer.isBuffer(opts.dictionary)) {
      throw new Error('Invalid dictionary: it should be a Buffer instance');
    }
  }

  this._handle = new binding.Zlib(mode);

  var self = this;
  this._hadError = false;
  this._handle.onerror = function (message, errno) {
    // there is no way to cleanly recover.
    // continuing only obscures problems.
    _close(self);
    self._hadError = true;

    var error = new Error(message);
    error.errno = errno;
    error.code = exports.codes[errno];
    self.emit('error', error);
  };

  var level = exports.Z_DEFAULT_COMPRESSION;
  if (typeof opts.level === 'number') level = opts.level;

  var strategy = exports.Z_DEFAULT_STRATEGY;
  if (typeof opts.strategy === 'number') strategy = opts.strategy;

  this._handle.init(opts.windowBits || exports.Z_DEFAULT_WINDOWBITS, level, opts.memLevel || exports.Z_DEFAULT_MEMLEVEL, strategy, opts.dictionary);

  this._buffer = Buffer.allocUnsafe(this._chunkSize);
  this._offset = 0;
  this._level = level;
  this._strategy = strategy;

  this.once('end', this.close);

  Object.defineProperty(this, '_closed', {
    get: function () {
      return !_this._handle;
    },
    configurable: true,
    enumerable: true
  });
}

util.inherits(Zlib, Transform);

Zlib.prototype.params = function (level, strategy, callback) {
  if (level < exports.Z_MIN_LEVEL || level > exports.Z_MAX_LEVEL) {
    throw new RangeError('Invalid compression level: ' + level);
  }
  if (strategy != exports.Z_FILTERED && strategy != exports.Z_HUFFMAN_ONLY && strategy != exports.Z_RLE && strategy != exports.Z_FIXED && strategy != exports.Z_DEFAULT_STRATEGY) {
    throw new TypeError('Invalid strategy: ' + strategy);
  }

  if (this._level !== level || this._strategy !== strategy) {
    var self = this;
    this.flush(binding.Z_SYNC_FLUSH, function () {
      assert(self._handle, 'zlib binding closed');
      self._handle.params(level, strategy);
      if (!self._hadError) {
        self._level = level;
        self._strategy = strategy;
        if (callback) callback();
      }
    });
  } else {
    process.nextTick(callback);
  }
};

Zlib.prototype.reset = function () {
  assert(this._handle, 'zlib binding closed');
  return this._handle.reset();
};

// This is the _flush function called by the transform class,
// internally, when the last chunk has been written.
Zlib.prototype._flush = function (callback) {
  this._transform(Buffer.alloc(0), '', callback);
};

Zlib.prototype.flush = function (kind, callback) {
  var _this2 = this;

  var ws = this._writableState;

  if (typeof kind === 'function' || kind === undefined && !callback) {
    callback = kind;
    kind = binding.Z_FULL_FLUSH;
  }

  if (ws.ended) {
    if (callback) process.nextTick(callback);
  } else if (ws.ending) {
    if (callback) this.once('end', callback);
  } else if (ws.needDrain) {
    if (callback) {
      this.once('drain', function () {
        return _this2.flush(kind, callback);
      });
    }
  } else {
    this._flushFlag = kind;
    this.write(Buffer.alloc(0), '', callback);
  }
};

Zlib.prototype.close = function (callback) {
  _close(this, callback);
  process.nextTick(emitCloseNT, this);
};

function _close(engine, callback) {
  if (callback) process.nextTick(callback);

  // Caller may invoke .close after a zlib error (which will null _handle).
  if (!engine._handle) return;

  engine._handle.close();
  engine._handle = null;
}

function emitCloseNT(self) {
  self.emit('close');
}

Zlib.prototype._transform = function (chunk, encoding, cb) {
  var flushFlag;
  var ws = this._writableState;
  var ending = ws.ending || ws.ended;
  var last = ending && (!chunk || ws.length === chunk.length);

  if (chunk !== null && !Buffer.isBuffer(chunk)) return cb(new Error('invalid input'));

  if (!this._handle) return cb(new Error('zlib binding closed'));

  // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag
  // (or whatever flag was provided using opts.finishFlush).
  // If it's explicitly flushing at some other time, then we use
  // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
  // goodness.
  if (last) flushFlag = this._finishFlushFlag;else {
    flushFlag = this._flushFlag;
    // once we've flushed the last of the queue, stop flushing and
    // go back to the normal behavior.
    if (chunk.length >= ws.length) {
      this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;
    }
  }

  this._processChunk(chunk, flushFlag, cb);
};

Zlib.prototype._processChunk = function (chunk, flushFlag, cb) {
  var availInBefore = chunk && chunk.length;
  var availOutBefore = this._chunkSize - this._offset;
  var inOff = 0;

  var self = this;

  var async = typeof cb === 'function';

  if (!async) {
    var buffers = [];
    var nread = 0;

    var error;
    this.on('error', function (er) {
      error = er;
    });

    assert(this._handle, 'zlib binding closed');
    do {
      var res = this._handle.writeSync(flushFlag, chunk, // in
      inOff, // in_off
      availInBefore, // in_len
      this._buffer, // out
      this._offset, //out_off
      availOutBefore); // out_len
    } while (!this._hadError && callback(res[0], res[1]));

    if (this._hadError) {
      throw error;
    }

    if (nread >= kMaxLength) {
      _close(this);
      throw new RangeError(kRangeErrorMessage);
    }

    var buf = Buffer.concat(buffers, nread);
    _close(this);

    return buf;
  }

  assert(this._handle, 'zlib binding closed');
  var req = this._handle.write(flushFlag, chunk, // in
  inOff, // in_off
  availInBefore, // in_len
  this._buffer, // out
  this._offset, //out_off
  availOutBefore); // out_len

  req.buffer = chunk;
  req.callback = callback;

  function callback(availInAfter, availOutAfter) {
    // When the callback is used in an async write, the callback's
    // context is the `req` object that was created. The req object
    // is === this._handle, and that's why it's important to null
    // out the values after they are done being used. `this._handle`
    // can stay in memory longer than the callback and buffer are needed.
    if (this) {
      this.buffer = null;
      this.callback = null;
    }

    if (self._hadError) return;

    var have = availOutBefore - availOutAfter;
    assert(have >= 0, 'have should not go down');

    if (have > 0) {
      var out = self._buffer.slice(self._offset, self._offset + have);
      self._offset += have;
      // serve some output to the consumer.
      if (async) {
        self.push(out);
      } else {
        buffers.push(out);
        nread += out.length;
      }
    }

    // exhausted the output buffer, or used all the input create a new one.
    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
      availOutBefore = self._chunkSize;
      self._offset = 0;
      self._buffer = Buffer.allocUnsafe(self._chunkSize);
    }

    if (availOutAfter === 0) {
      // Not actually done.  Need to reprocess.
      // Also, update the availInBefore to the availInAfter value,
      // so that if we have to hit it a third (fourth, etc.) time,
      // it'll have the correct byte counts.
      inOff += availInBefore - availInAfter;
      availInBefore = availInAfter;

      if (!async) return true;

      var newReq = self._handle.write(flushFlag, chunk, inOff, availInBefore, self._buffer, self._offset, self._chunkSize);
      newReq.callback = callback; // this same function
      newReq.buffer = chunk;
      return;
    }

    if (!async) return false;

    // finished with the chunk.
    cb();
  }
};

util.inherits(Deflate, Zlib);
util.inherits(Inflate, Zlib);
util.inherits(Gzip, Zlib);
util.inherits(Gunzip, Zlib);
util.inherits(DeflateRaw, Zlib);
util.inherits(InflateRaw, Zlib);
util.inherits(Unzip, Zlib);
}).call(this)}).call(this,require('_process'))
},{"./binding":9,"_process":40,"assert":2,"buffer":11,"stream":42,"util":61}],11:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":7,"buffer":11,"ieee754":23}],12:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":13,"get-intrinsic":19}],13:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":18,"get-intrinsic":19}],14:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":19}],15:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],16:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],17:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],18:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":17}],19:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":18,"has":22,"has-symbols":20}],20:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":21}],21:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],22:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":18}],23:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],24:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],25:[function(require,module,exports){
'use strict';

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":12}],26:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var generatorFunc = getGeneratorFunc();
var GeneratorFunction = getProto && generatorFunc ? getProto(generatorFunc) : false;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	return getProto && getProto(fn) === GeneratorFunction;
};

},{}],27:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new global[typedArray]();
		if (!(Symbol.toStringTag in arr)) {
			throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
		}
		var proto = getPrototypeOf(arr);
		var descriptor = gOPD(proto, Symbol.toStringTag);
		if (!descriptor) {
			var superProto = getPrototypeOf(proto);
			descriptor = gOPD(superProto, Symbol.toStringTag);
		}
		toStrTags[typedArray] = descriptor.get;
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":6,"call-bind/callBound":12,"es-abstract/helpers/getOwnPropertyDescriptor":14,"foreach":16,"has-symbols":20}],28:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],29:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],30:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],31:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],32:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],33:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg     = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":29,"./adler32":30,"./crc32":32,"./messages":37,"./trees":38}],34:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],35:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = require('../utils/common');
var adler32       = require('./adler32');
var crc32         = require('./crc32');
var inflate_fast  = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":29,"./adler32":30,"./crc32":32,"./inffast":34,"./inftrees":36}],36:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":29}],37:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],38:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":29}],39:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],40:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],41:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":11}],42:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":15,"inherits":24,"readable-stream/lib/_stream_duplex.js":44,"readable-stream/lib/_stream_passthrough.js":45,"readable-stream/lib/_stream_readable.js":46,"readable-stream/lib/_stream_transform.js":47,"readable-stream/lib/_stream_writable.js":48,"readable-stream/lib/internal/streams/end-of-stream.js":52,"readable-stream/lib/internal/streams/pipeline.js":54}],43:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],44:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":46,"./_stream_writable":48,"_process":40,"inherits":24}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":47,"inherits":24}],46:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":43,"./_stream_duplex":44,"./internal/streams/async_iterator":49,"./internal/streams/buffer_list":50,"./internal/streams/destroy":51,"./internal/streams/from":53,"./internal/streams/state":55,"./internal/streams/stream":56,"_process":40,"buffer":11,"events":15,"inherits":24,"string_decoder/":57,"util":8}],47:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":43,"./_stream_duplex":44,"inherits":24}],48:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":43,"./_stream_duplex":44,"./internal/streams/destroy":51,"./internal/streams/state":55,"./internal/streams/stream":56,"_process":40,"buffer":11,"inherits":24,"util-deprecate":58}],49:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":52,"_process":40}],50:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":11,"util":8}],51:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":40}],52:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":43}],53:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],54:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":43,"./end-of-stream":52}],55:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":43}],56:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":15}],57:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":41}],58:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],59:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],60:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
isSharedArrayBufferToString.working = (
  typeof SharedArrayBuffer !== 'undefined' &&
  isSharedArrayBufferToString(new SharedArrayBuffer())
);
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBuffer === 'undefined') {
    return false;
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBuffer;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":25,"is-generator-function":26,"is-typed-array":27,"which-typed-array":62}],61:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require('./support/types');

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))
},{"./support/isBuffer":59,"./support/types":60,"_process":40,"inherits":24}],62:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof global[typedArray] === 'function') {
			var arr = new global[typedArray]();
			if (!(Symbol.toStringTag in arr)) {
				throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
			}
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = require('is-typed-array');

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":6,"call-bind/callBound":12,"es-abstract/helpers/getOwnPropertyDescriptor":14,"foreach":16,"has-symbols":20,"is-typed-array":27}],63:[function(require,module,exports){
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.MiidataMs = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var MiidataMs = (function() {
  function MiidataMs(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  MiidataMs.prototype._read = function() {
    this.facialHairColor = this._io.readU1();
    this.beardGoatee = this._io.readU1();
    this.bodyWeight = this._io.readU1();
    this.eyeStretch = this._io.readU1();
    this.eyeColor = this._io.readU1();
    this.eyeRotation = this._io.readU1();
    this.eyeSize = this._io.readU1();
    this.eyeType = this._io.readU1();
    this.eyeHorizontal = this._io.readU1();
    this.eyeVertical = this._io.readU1();
    this.eyebrowStretch = this._io.readU1();
    this.eyebrowColor = this._io.readU1();
    this.eyebrowRotation = this._io.readU1();
    this.eyebrowSize = this._io.readU1();
    this.eyebrowType = this._io.readU1();
    this.eyebrowHorizontal = this._io.readU1();
    this.eyebrowVertical = this._io.readU1();
    this.faceColor = this._io.readU1();
    this.faceMakeup = this._io.readU1();
    this.faceType = this._io.readU1();
    this.faceWrinkles = this._io.readU1();
    this.favoriteColor = this._io.readU1();
    this.gender = this._io.readU1();
    this.glassesColor = this._io.readU1();
    this.glassesSize = this._io.readU1();
    this.glassesType = this._io.readU1();
    this.glassesVertical = this._io.readU1();
    this.hairColor = this._io.readU1();
    this.hairFlip = this._io.readU1();
    this.hairType = this._io.readU1();
    this.bodyHeight = this._io.readU1();
    this.moleSize = this._io.readU1();
    this.moleEnable = this._io.readU1();
    this.moleHorizontal = this._io.readU1();
    this.moleVertical = this._io.readU1();
    this.mouthStretch = this._io.readU1();
    this.mouthColor = this._io.readU1();
    this.mouthSize = this._io.readU1();
    this.mouthType = this._io.readU1();
    this.mouthVertical = this._io.readU1();
    this.beardSize = this._io.readU1();
    this.beardMustache = this._io.readU1();
    this.beardVertical = this._io.readU1();
    this.noseSize = this._io.readU1();
    this.noseType = this._io.readU1();
    this.noseVertical = this._io.readU1();
  }

  return MiidataMs;
})();
return MiidataMs;
}));

},{"kaitai-struct/KaitaiStream":92}],64:[function(require,module,exports){
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.MiidataSdb = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var MiidataSdb = (function() {
  function MiidataSdb(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  MiidataSdb.prototype._read = function() {
    this.hairType = this._io.readU1();
    this.moleEnable = this._io.readBitsIntBe(1) != 0;
    this.bodyHeight = this._io.readBitsIntBe(7);
    this.hairFlip = this._io.readBitsIntBe(1) != 0;
    this.bodyWeight = this._io.readBitsIntBe(7);
    this.specialType = this._io.readBitsIntBe(1) != 0;
    this.hairColor = this._io.readBitsIntBe(7);
    this.gender = this._io.readBitsIntBe(1) != 0;
    this.eyeColor = this._io.readBitsIntBe(7);
    this._io.alignToByte();
    this.eyebrowColor = this._io.readU1();
    this.mouthColor = this._io.readU1();
    this.facialHairColor = this._io.readU1();
    this.glassesColor = this._io.readU1();
    this.regionMove = this._io.readBitsIntBe(2);
    this.eyeType = this._io.readBitsIntBe(6);
    this.fontRegion = this._io.readBitsIntBe(2);
    this.mouthType = this._io.readBitsIntBe(6);
    this.glassesSize = this._io.readBitsIntBe(3);
    this.eyeVertical = this._io.readBitsIntBe(5);
    this.facialHairMustache = this._io.readBitsIntBe(3);
    this.eyebrowType = this._io.readBitsIntBe(5);
    this.facialHairBeard = this._io.readBitsIntBe(3);
    this.noseType = this._io.readBitsIntBe(5);
    this.mouthStretch = this._io.readBitsIntBe(3);
    this.noseVertical = this._io.readBitsIntBe(5);
    this.eyebrowStretch = this._io.readBitsIntBe(3);
    this.mouthVertical = this._io.readBitsIntBe(5);
    this.eyeRotation = this._io.readBitsIntBe(3);
    this.facialHairVertical = this._io.readBitsIntBe(5);
    this.eyeStretch = this._io.readBitsIntBe(3);
    this.glassesVertical = this._io.readBitsIntBe(5);
    this.eyeSize = this._io.readBitsIntBe(3);
    this.moleHorizontal = this._io.readBitsIntBe(5);
    this._io.alignToByte();
    this.moleVertical = this._io.readU1();
    this.glassesType = this._io.readU1();
    this.faceType = this._io.readBitsIntBe(4);
    this.favoriteColor = this._io.readBitsIntBe(4);
    this.faceWrinkles = this._io.readBitsIntBe(4);
    this.faceColor = this._io.readBitsIntBe(4);
    this.eyeHorizontal = this._io.readBitsIntBe(4);
    this.faceMakeup = this._io.readBitsIntBe(4);
    this.eyebrowRotation = this._io.readBitsIntBe(4);
    this.eyebrowSize = this._io.readBitsIntBe(4);
    this.eyebrowVertical = this._io.readBitsIntBe(4);
    this.eyebrowHorizontal = this._io.readBitsIntBe(4);
    this.mouthSize = this._io.readBitsIntBe(4);
    this.noseSize = this._io.readBitsIntBe(4);
    this.moleSize = this._io.readBitsIntBe(4);
    this.facialHairSize = this._io.readBitsIntBe(4);
    this._io.alignToByte();
    this.miiName = KaitaiStream.bytesToStr(this._io.readBytes(20), "utf-16le");
    this.miiId = new Array(16);
    for (var i = 0; i < 16; i++) {
      this.miiId[i] = this._io.readU1();
    }
    this.checksumMii = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.checksumMii[i] = this._io.readU1();
    }
    this.checksumConsole = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.checksumConsole[i] = this._io.readU1();
    }
  }

  return MiidataSdb;
})();
return MiidataSdb;
}));

},{"kaitai-struct/KaitaiStream":92}],65:[function(require,module,exports){
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.MiidataSwi = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var MiidataSwi = (function() {
  function MiidataSwi(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  MiidataSwi.prototype._read = function() {
    this.miiId = new Array(16);
    for (var i = 0; i < 16; i++) {
      this.miiId[i] = this._io.readU1();
    }
    this.miiName = KaitaiStream.bytesToStr(this._io.readBytes(22), "utf-16le");
    this.fontRegion = this._io.readU1();
    this.favoriteColor = this._io.readU1();
    this.gender = this._io.readU1();
    this.bodyHeight = this._io.readU1();
    this.bodyWeight = this._io.readU1();
    this.specialType = this._io.readU1();
    this.regionMove = this._io.readU1();
    this.faceType = this._io.readU1();
    this.faceColor = this._io.readU1();
    this.faceWrinkles = this._io.readU1();
    this.faceMakeup = this._io.readU1();
    this.hairType = this._io.readU1();
    this.hairColor = this._io.readU1();
    this.hairFlip = this._io.readU1();
    this.eyeType = this._io.readU1();
    this.eyeColor = this._io.readU1();
    this.eyeSize = this._io.readU1();
    this.eyeStretch = this._io.readU1();
    this.eyeRotation = this._io.readU1();
    this.eyeHorizontal = this._io.readU1();
    this.eyeVertical = this._io.readU1();
    this.eyebrowType = this._io.readU1();
    this.eyebrowColor = this._io.readU1();
    this.eyebrowSize = this._io.readU1();
    this.eyebrowStretch = this._io.readU1();
    this.eyebrowRotation = this._io.readU1();
    this.eyebrowHorizontal = this._io.readU1();
    this.eyebrowVertical = this._io.readU1();
    this.noseType = this._io.readU1();
    this.noseSize = this._io.readU1();
    this.noseVertical = this._io.readU1();
    this.mouthType = this._io.readU1();
    this.mouthColor = this._io.readU1();
    this.mouthSize = this._io.readU1();
    this.mouthStretch = this._io.readU1();
    this.mouthVertical = this._io.readU1();
    this.facialHairColor = this._io.readU1();
    this.facialHairBeard = this._io.readU1();
    this.facialHairMustache = this._io.readU1();
    this.facialHairSize = this._io.readU1();
    this.facialHairVertical = this._io.readU1();
    this.glassesType = this._io.readU1();
    this.glassesColor = this._io.readU1();
    this.glassesSize = this._io.readU1();
    this.glassesVertical = this._io.readU1();
    this.moleEnable = this._io.readU1();
    this.moleSize = this._io.readU1();
    this.moleHorizontal = this._io.readU1();
    this.moleVertical = this._io.readU1();
    this.alwaysZero = this._io.readU1();
  }

  /**
   * Mii ID. An identifier used to save Miis in most games.
   */

  /**
   * Mii name. Can be up to 10 characters long. Different from the Mii name that appears in Super Smash Bros. Ultimate - in that game, this is never seen.
   */

  /**
   * Font region. 0 = USA + PAL + JPN, 1 = CHN, 2 = KOR, 3 = TWN.
   */

  /**
   * Favorite color. Ranges from 0 to 11.
   */

  /**
   * Mii gender. 0 = male, 1 = female.
   */

  /**
   * Body height. Ranges from 0 to 127, short to tall.
   */

  /**
   * Body weight. Ranges from 0 to 127, small to large.
   */

  /**
   * Toggle if the Mii is a Special Mii. Completely unused functionality. Does not allow editing the Mii, or using the Mii in games.
   */

  /**
   * Currently unknown.
   */

  /**
   * Face shape. Ranges from 0 to 11. Not ordered the same as visible in editor.
   */

  /**
   * Skin color. Ranges from 0 to 9. Not ordered the same as visible in editor.
   */

  /**
   * Face wrinkles. Ranges from 0 to 11.
   */

  /**
   * Face makeup. Ranges from 0 to 11.
   */

  /**
   * Hair type. Ranges from 0 to 131. Not ordered the same as visible in editor.
   */

  /**
   * Hair color. Ranges from 0 to 99. Not ordered the same as visible in editor.
   */

  /**
   * Flip hair. 0 = no, 1 = yes.
   */

  /**
   * Eye type. Ranges from 0 to 59. Not ordered the same as visible in editor.
   */

  /**
   * Eye color. Ranges from 0 to 99. Not ordered the same as visible in editor.
   */

  /**
   * Eye size. Ranges from 0 to 7, small to large.
   */

  /**
   * Eye stretch. Ranges from 0 to 6, small to large.
   */

  /**
   * Eye rotation. Ranges from 0 to 7, down to up. Note that some eye types have a default rotation.
   */

  /**
   * Eye X (horizontal) distance. Ranges from 0 to 12, close to far.
   */

  /**
   * Eye Y (vertical) position. Ranges from 18 to 0, low to high.
   */

  /**
   * Eyebrow type. Ranges from 0 to 23. Not ordered the same as visible in editor.
   */

  /**
   * Eyebrow color. Ranges from 0 to 99. Not ordered the same as visible in editor.
   */

  /**
   * Eyebrow size. Ranges from 0 to 8, small to large.
   */

  /**
   * Eyebrow stretch. Ranges from 0 to 6, small to large.
   */

  /**
   * Eyebrow rotation. Ranges from 0 to 11, down to up. Note that some eyebrow types have a default rotation.
   */

  /**
   * Eyebrow X (horizontal) distance. Ranges from 0 to 12, close to far.
   */

  /**
   * Eyebrow Y (vertical) distance. Ranges from 18 to 3, low to high.
   */

  /**
   * Nose type. Ranges from 0 to 17. Not ordered the same as visible in editor.
   */

  /**
   * Nose size. Ranges from 0 to 8, small to large.
   */

  /**
   * Nose Y (vertical) position. Ranges from 18 to 0, low to high.
   */

  /**
   * Mouth type. Ranges from 0 to 35. Not ordered the same as visible in editor.
   */

  /**
   * Mouth color. The default colors are ordered the same as visible in editor, ranging from 19 to 23. The custom colors are not and range from 0 to 99.
   */

  /**
   * Mouth size. Ranges from 0 to 8, small to large.
   */

  /**
   * Mouth stretch. Ranges from 0 to 6, small to large.
   */

  /**
   * Mouth Y (vertical) position. Ranges from 18 to 0, low to high.
   */

  /**
   * Facial hair color. Ranges from 0 to 99. Not ordered the same as visible in editor.
   */

  /**
   * Beard type. Ranges from 0 to 5.
   */

  /**
   * Mustache type. Ranges from 0 to 5.
   */

  /**
   * Mustache size. Ranges from 0 to 8, small to large.
   */

  /**
   * Mustache Y (vertical) position. Ranges from 16 to 0, low to high.
   */

  /**
   * Glasses type. Ranges from 0 to 19. Not ordered the same as visible in editor.
   */

  /**
   * Glasses color. Ranges from 0 to 99. Not ordered the same as visible in editor.
   */

  /**
   * Glasses size. Ranges from 0 to 7, small to large.
   */

  /**
   * Glasses Y (vertical) position. Ranges from 20 to 0, low to high.
   */

  /**
   * Enable mole. 0 = no, 1 = yes.
   */

  /**
   * Mole size. Ranges from 0 to 8, small to large.
   */

  /**
   * Mole X (horizontal) position. Ranges from 0 to 16, left to right.
   */

  /**
   * Mole Y (vertical) position. Ranges from 30 to 0, low to high.
   */

  /**
   * This value is always set to 0. The Switch does properly document it, though, so it may end up used in some update... but most likely, it will always remain zero.
   */

  return MiidataSwi;
})();
return MiidataSwi;
}));

},{"kaitai-struct/KaitaiStream":92}],66:[function(require,module,exports){
module.exports={
    "flip":[
        "0x2f","0x6b","0x30","0x33","0x37","0x46",
        "0x2b","0x38","0x3e","0x73","0x40","0x51",
        "0x74","0x79","0x3c","0x57","0x49","0x22",
        "0x27","0x0c","0x10","0x80","0x0e","0x5f",
        "0x69","0x5d","0x66","0x7b","0x6a","0x00",
        "0x62","0x3f","0x05","0x4a","0x63","0x45",
        "0x55","0x47","0x60","0x65","0x01","0x6d",
        "0x3d","0x67","0x4d","0x54","0x13","0x2e",
        "0x4e"
    ]
}
},{}],67:[function(require,module,exports){
module.exports={
    "faceColor":[
       [
          "<svg alt='row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 211, 173)'/></svg>",
          "<svg alt='row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 197, 143)'/></svg>",
          "<svg alt='row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 182, 107)'/></svg>",
          "<svg alt='row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(173, 81, 41)'/></svg>",
          "<svg alt='row 1 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(99, 44, 24)'/></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 190, 165)'/></svg>",
          "<svg alt='row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 170, 140)'/></svg>",
          "<svg alt='row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(222, 121, 66)'/></svg>",
          "<svg alt='row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(140, 60, 35)'/></svg>",
          "<svg alt='row 2 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(60, 45, 35)'/></svg>"
       ]
    ],
    "hairColor":[
       [
          "<svg alt='default row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='default row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(64, 32, 16)'/></svg>",
          "<svg alt='default row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(92, 24, 10)'/></svg>",
          "<svg alt='default row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(124, 58, 20)'/></svg>"
       ],
       [
          "<svg alt='default row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 120, 128)'/></svg>",
          "<svg alt='default row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(78, 62, 16)'/></svg>",
          "<svg alt='default row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(136, 88, 24)'/></svg>",
          "<svg alt='default row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(208, 160, 74)'/></svg>"
       ]
    ],
    "eyebrowColor":[
       [
          "<svg alt='default row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='default row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(64, 32, 16)'/></svg>",
          "<svg alt='default row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(92, 24, 10)'/></svg>",
          "<svg alt='default row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(124, 58, 20)'/></svg>"
       ],
       [
          "<svg alt='default row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 120, 128)'/></svg>",
          "<svg alt='default row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(78, 62, 16)'/></svg>",
          "<svg alt='default row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(136, 88, 24)'/></svg>",
          "<svg alt='default row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(208, 160, 74)'/></svg>"
       ]
    ],
    "facialHairColor":[
       [
          "<svg alt='default row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='default row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(64, 32, 16)'/></svg>",
          "<svg alt='default row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(92, 24, 10)'/></svg>",
          "<svg alt='default row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(124, 58, 20)'/></svg>"
       ],
       [
          "<svg alt='default row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 120, 128)'/></svg>",
          "<svg alt='default row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(78, 62, 16)'/></svg>",
          "<svg alt='default row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(136, 88, 24)'/></svg>",
          "<svg alt='default row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(208, 160, 74)'/></svg>"
       ]
    ],
    "eyeColor":[
       [
          "<svg alt='default row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='default row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(108, 112, 112)'/></svg>",
          "<svg alt='default row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(102, 60, 44)'/></svg>"
       ],
       [
          "<svg alt='default row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(96, 94, 48)'/></svg>",
          "<svg alt='default row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(70, 84, 168)'/></svg>",
          "<svg alt='default row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(56, 112, 88)'/></svg>"
       ]
    ],
    "mouthColor":[
       [
          "<svg alt='default 1st' width='45' height='45'><rect width='45' height='45' style='fill:rgb(216, 82, 8)'/></svg>",
          "<svg alt='default 2nd' width='45' height='45'><rect width='45' height='45' style='fill:rgb(240, 12, 8)'/></svg>",
          "<svg alt='default 3rd' width='45' height='45'><rect width='45' height='45' style='fill:rgb(245, 72, 72)'/></svg>",
          "<svg alt='default 4th' width='45' height='45'><rect width='45' height='45' style='fill:rgb(240, 154, 116)'/></svg>",
          "<svg alt='default 5th' width='45' height='45'><rect width='45' height='45' style='fill:rgb(140, 80, 64)'/></svg>"
       ]
    ],
    "glassesColor":[
       [
          "<svg alt='default row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='default row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(96, 56, 16)'/></svg>",
          "<svg alt='default row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(168, 16, 8)'/></svg>"
       ],
       [
          "<svg alt='default row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(32, 48, 104)'/></svg>",
          "<svg alt='default row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(168, 96, 0)'/></svg>",
          "<svg alt='default row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 112, 104)'/></svg>"
       ]
    ],
    "favoriteColor":[
       [
          "<svg alt='row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(210, 30, 20)'/></svg>",
          "<svg alt='row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 110, 25)'/></svg>",
          "<svg alt='row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 216, 32)'/></svg>",
          "<svg alt='row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 210, 32)'/></svg>",
          "<svg alt='row 1 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 120, 48)'/></svg>",
          "<svg alt='row 1 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(10, 72, 180)'/></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(60, 170, 222)'/></svg>",
          "<svg alt='row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(245, 90, 125)'/></svg>",
          "<svg alt='row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(115, 40, 173)'/></svg>",
          "<svg alt='row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(72, 56, 24)'/></svg>",
          "<svg alt='row 2 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(224, 224, 224)'/></svg>",
          "<svg alt='row 2 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(24, 24, 20)'/></svg>"
       ]
    ],
    "customColors":[
       [
          "<svg alt='custom row 1 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(92, 24, 10)'/></svg>",
          "<svg alt='custom row 1 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(132, 38, 38)'/></svg>",
          "<svg alt='custom row 1 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(102, 60, 44)'/></svg>",
          "<svg alt='custom row 1 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(140, 80, 64)'/></svg>",
          "<svg alt='custom row 1 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(168, 16, 8)'/></svg>",
          "<svg alt='custom row 1 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(240, 12, 8)'/></svg>",
          "<svg alt='custom row 1 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(245, 72, 72)'/></svg>",
          "<svg alt='custom row 1 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 115, 102)'/></svg>",
          "<svg alt='custom row 1 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 166, 166)'/></svg>",
          "<svg alt='custom row 1 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 192, 186)'/></svg>"
       ],
       [
          "<svg alt='custom row 2 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(115, 46, 59)'/></svg>",
          "<svg alt='custom row 2 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(153, 31, 61)'/></svg>",
          "<svg alt='custom row 2 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(138, 23, 62)'/></svg>",
          "<svg alt='custom row 2 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(181, 62, 66)'/></svg>",
          "<svg alt='custom row 2 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(199, 30, 86)'/></svg>",
          "<svg alt='custom row 2 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(176, 83, 129)'/></svg>",
          "<svg alt='custom row 2 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(199, 84, 110)'/></svg>",
          "<svg alt='custom row 2 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(250, 117, 151)'/></svg>",
          "<svg alt='custom row 2 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(252, 172, 201)'/></svg>",
          "<svg alt='custom row 2 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 201, 216)'/></svg>"
       ],
       [
          "<svg alt='custom row 3 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(49, 28, 64)'/></svg>",
          "<svg alt='custom row 3 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(55, 40, 61)'/></svg>",
          "<svg alt='custom row 3 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(76, 24, 77)'/></svg>",
          "<svg alt='custom row 3 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(111, 66, 179)'/></svg>",
          "<svg alt='custom row 3 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(133, 92, 184)'/></svg>",
          "<svg alt='custom row 3 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(192, 131, 204)'/></svg>",
          "<svg alt='custom row 3 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(168, 147, 201)'/></svg>",
          "<svg alt='custom row 3 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(197, 172, 230)'/></svg>",
          "<svg alt='custom row 3 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(238, 190, 250)'/></svg>",
          "<svg alt='custom row 3 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(210, 197, 237)'/></svg>"
       ],
       [
          "<svg alt='custom row 4 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(25, 31, 64)'/></svg>",
          "<svg alt='custom row 4 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(32, 48, 104)'/></svg>",
          "<svg alt='custom row 4 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(18, 63, 102)'/></svg>",
          "<svg alt='custom row 4 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(70, 84, 168)'/></svg>",
          "<svg alt='custom row 4 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(42, 130, 212)'/></svg>",
          "<svg alt='custom row 4 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(87, 180, 242)'/></svg>",
          "<svg alt='custom row 4 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(122, 197, 222)'/></svg>",
          "<svg alt='custom row 4 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(137, 166, 250)'/></svg>",
          "<svg alt='custom row 4 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(132, 189, 250)'/></svg>",
          "<svg alt='custom row 4 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(161, 227, 255)'/></svg>"
       ],
       [
          "<svg alt='custom row 5 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(11, 46, 54)'/></svg>",
          "<svg alt='custom row 5 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(1, 61, 59)'/></svg>",
          "<svg alt='custom row 5 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(13, 79, 89)'/></svg>",
          "<svg alt='custom row 5 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(35, 102, 99)'/></svg>",
          "<svg alt='custom row 5 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(56, 112, 88)'/></svg>",
          "<svg alt='custom row 5 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(48, 126, 140)'/></svg>",
          "<svg alt='custom row 5 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(79, 174, 176)'/></svg>",
          "<svg alt='custom row 5 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(122, 196, 158)'/></svg>",
          "<svg alt='custom row 5 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(127, 212, 192)'/></svg>",
          "<svg alt='custom row 5 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(135, 229, 182)'/></svg>"
       ],
       [
          "<svg alt='custom row 6 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(10, 74, 53)'/></svg>",
          "<svg alt='custom row 6 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(67, 122, 0)'/></svg>",
          "<svg alt='custom row 6 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(2, 117, 98)'/></svg>",
          "<svg alt='custom row 6 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(54, 153, 112)'/></svg>",
          "<svg alt='custom row 6 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(75, 173, 26)'/></svg>",
          "<svg alt='custom row 6 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(146, 191, 10)'/></svg>",
          "<svg alt='custom row 6 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(99, 199, 136)'/></svg>",
          "<svg alt='custom row 6 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(158, 224, 66)'/></svg>",
          "<svg alt='custom row 6 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(150, 222, 126)'/></svg>",
          "<svg alt='custom row 6 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(187, 242, 170)'/></svg>"
       ],
       [
          "<svg alt='custom row 7 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(78, 62, 16)'/></svg>",
          "<svg alt='custom row 7 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(96, 94, 48)'/></svg>",
          "<svg alt='custom row 7 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(153, 147, 43)'/></svg>",
          "<svg alt='custom row 7 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(166, 149, 99)'/></svg>",
          "<svg alt='custom row 7 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(204, 192, 57)'/></svg>",
          "<svg alt='custom row 7 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(204, 185, 135)'/></svg>",
          "<svg alt='custom row 7 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(217, 204, 130)'/></svg>",
          "<svg alt='custom row 7 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(213, 217, 111)'/></svg>",
          "<svg alt='custom row 7 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(213, 230, 131)'/></svg>",
          "<svg alt='custom row 7 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(216, 250, 157)'/></svg>"
       ],
       [
          "<svg alt='custom row 8 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(96, 56, 16)'/></svg>",
          "<svg alt='custom row 8 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(125, 69, 0)'/></svg>",
          "<svg alt='custom row 8 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(136, 88, 24)'/></svg>",
          "<svg alt='custom row 8 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(168, 96, 0)'/></svg>",
          "<svg alt='custom row 8 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(208, 160, 74)'/></svg>",
          "<svg alt='custom row 8 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(230, 187, 122)'/></svg>",
          "<svg alt='custom row 8 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(254, 226, 74)'/></svg>",
          "<svg alt='custom row 8 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(250, 222, 130)'/></svg>",
          "<svg alt='custom row 8 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(247, 234, 156)'/></svg>",
          "<svg alt='custom row 8 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(250, 248, 155)'/></svg>"
       ],
       [
          "<svg alt='custom row 9 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(64, 32, 16)'/></svg>",
          "<svg alt='custom row 9 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(124, 58, 20)'/></svg>",
          "<svg alt='custom row 9 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(166, 77, 30)'/></svg>",
          "<svg alt='custom row 9 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(216, 82, 8)'/></svg>",
          "<svg alt='custom row 9 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 150, 13)'/></svg>",
          "<svg alt='custom row 9 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(209, 155, 105)'/></svg>",
          "<svg alt='custom row 9 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(240, 154, 116)'/></svg>",
          "<svg alt='custom row 9 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 178, 102)'/></svg>",
          "<svg alt='custom row 9 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255, 194, 140)'/></svg>",
          "<svg alt='custom row 9 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(229, 207, 177)'/></svg>"
       ],
       [
          "<svg alt='custom row 10 column 1' width='45' height='45'><rect width='45' height='45' style='fill:rgb(0, 0, 0)'/></svg>",
          "<svg alt='custom row 10 column 2' width='45' height='45'><rect width='45' height='45' style='fill:rgb(45, 40, 40)'/></svg>",
          "<svg alt='custom row 10 column 3' width='45' height='45'><rect width='45' height='45' style='fill:rgb(65, 65, 65)'/></svg>",
          "<svg alt='custom row 10 column 4' width='45' height='45'><rect width='45' height='45' style='fill:rgb(108, 112, 112)'/></svg>",
          "<svg alt='custom row 10 column 5' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 112, 104)'/></svg>",
          "<svg alt='custom row 10 column 6' width='45' height='45'><rect width='45' height='45' style='fill:rgb(120, 120, 128)'/></svg>",
          "<svg alt='custom row 10 column 7' width='45' height='45'><rect width='45' height='45' style='fill:rgb(155, 155, 155)'/></svg>",
          "<svg alt='custom row 10 column 8' width='45' height='45'><rect width='45' height='45' style='fill:rgb(190, 190, 190)'/></svg>",
          "<svg alt='custom row 10 column 9' width='45' height='45'><rect width='45' height='45' style='fill:rgb(220, 215, 205)'/></svg>",
          "<svg alt='custom row 10 column 10' width='45' height='45'><rect width='45' height='45' style='fill:rgb(255,255,255);stroke:rgb(0,0,0);stroke-width:5'/></svg>"
       ]
    ],
    "menu parts":{
      "flip hair":[
          "<svg viewBox='0 0 48 18' alt='flip hair' width='45' height='45'><g fill='#8c8c8c'><path d='M13.87 5.76A6.72 6.72 0 0 0 7.05 0 6.72 6.72 0 0 0 .24 5.76a9.81 9.81 0 0 0-.12 1.57A13.1 13.1 0 0 0 0 9.86C.3 14.65 3.19 18 7 18s6.74-3.35 7-8.14a13.31 13.31 0 0 0 0-2.47 11.71 11.71 0 0 0-.13-1.63zm-1.7 4c-.23 3.74-2.33 6.35-5.12 6.35s-4.89-2.63-5.11-6.37a15.6 15.6 0 0 0 3.81-2.5 12.8 12.8 0 0 0 2.91-3.65 38.89 38.89 0 0 0 3.53 5.16c.01.32 0 .65-.02.99zM47.88 7.33a9.81 9.81 0 0 0-.12-1.57 6.91 6.91 0 0 0-13.63 0A11.71 11.71 0 0 0 34 7.39a12.52 12.52 0 0 0-.08 2.47C34.21 14.65 37.1 18 41 18s6.73-3.35 7-8.14a13.1 13.1 0 0 0-.12-2.53zm-6.94 8.76c-2.78 0-4.88-2.61-5.11-6.35v-1a38.89 38.89 0 0 0 3.53-5.16 12.8 12.8 0 0 0 2.91 3.65 15.6 15.6 0 0 0 3.82 2.47c-.25 3.78-2.36 6.39-5.15 6.39zM26.91 7.61h-5.82V4.83l-4.48 4.48 4.48 4.48v-2.77h5.82v2.77l4.48-4.48-4.48-4.48v2.78z'></path></g></svg>"
       ],
       "move down":[
          "<svg viewBox='0 0 52 52' alt='move down' width='45' height='45'><path d='M45.88 25.07h-2.44v-8.35a1 1 0 0 0-1-1H33a1 1 0 0 0-1 1v8.35h-2.47a.92.92 0 0 0-.69 1.52L37 36a.91.91 0 0 0 1.38 0l8.15-9.41a.92.92 0 0 0-.65-1.52z'></path><circle cx='15.61' cy='26' r='10.4'></circle></svg>"
       ],
       "move up":[
          "<svg viewBox='0 0 52 52' alt='move up' width='45' height='45'><path d='M45.88 26.93h-2.44v8.35a1 1 0 0 1-1 1H33a1 1 0 0 1-1-1v-8.35h-2.47a.92.92 0 0 1-.69-1.52L37 16a.91.91 0 0 1 1.38 0l8.15 9.41a.92.92 0 0 1-.65 1.52z'></path><circle cx='15.61' cy='26' r='10.4'></circle></svg>"
       ],
       "closer":[
          "<svg viewBox='0 0 52 52' alt='closer' width='45' height='45'><path d='M10 21.88v1.24H5.78a.52.52 0 0 0-.52.52v4.72a.52.52 0 0 0 .52.53H10v1.23a.46.46 0 0 0 .76.35l4.75-4.14a.46.46 0 0 0 0-.69l-4.74-4.11a.46.46 0 0 0-.77.35zm32 8.24v-1.24h4.21a.52.52 0 0 0 .52-.52v-4.72a.52.52 0 0 0-.52-.53H42v-1.23a.46.46 0 0 0-.76-.35l-4.74 4.14a.46.46 0 0 0 0 .69l4.74 4.11a.46.46 0 0 0 .76-.35z'></path><circle cx='21.06' cy='26' r='4.68'></circle><circle cx='30.94' cy='26' r='4.68'></circle></svg>"
       ],
       "farther":[
          "<svg viewBox='0 0 52 52' alt='farther' width='45' height='45'><path d='M36.5 25.64l-4.74-4.11a.47.47 0 0 0-.77.35v1.24H21v-1.24a.47.47 0 0 0-.77-.35c-1.27 1.11-3.78 3.29-4.74 4.14a.46.46 0 0 0 0 .69l4.74 4.11a.47.47 0 0 0 .77-.35v-1.24h10v1.23a.47.47 0 0 0 .77.35c1.27-1.11 3.78-3.29 4.74-4.14a.46.46 0 0 0-.01-.68z'></path><circle cx='9.93' cy='26' r='4.68'></circle><circle cx='42.07' cy='26' r='4.68'></circle></svg>"
       ],
       "rotate down":[
          "<svg viewBox='0 0 52 52' alt='rotate down' width='45' height='45'><circle cx='25.85' cy='33.73' r='5.2'></circle><path d='M30.44 28.09l5.65-3.35a13.51 13.51 0 0 0-23.49 7.2 14 14 0 0 0-.08 2.74 1 1 0 0 1-1 1.13h-5.1a1 1 0 0 1-1-1 22 22 0 0 1 .08-3.24 20.67 20.67 0 0 1 41.19 1 .9.9 0 0 1-1.12.92l-14.89-3.77a.89.89 0 0 1-.24-1.63z'></path></svg>"
       ],
       "rotate up":[
          "<svg viewBox='0 0 52 52' alt='rotate up' width='45' height='45'><circle cx='25.85' cy='18.27' r='5.2'></circle><path d='M30.44 23.91l5.65 3.35a13.51 13.51 0 0 1-23.49-7.2 14 14 0 0 1-.08-2.74 1 1 0 0 0-1-1.13h-5.1a1 1 0 0 0-1 1 22 22 0 0 0 .08 3.24 20.67 20.67 0 0 0 41.19-1 .9.9 0 0 0-1.12-.92l-14.89 3.77a.89.89 0 0 0-.24 1.63z'></path></svg>"
       ],
       "smaller":[
          "<svg viewBox='0 0 52 52' alt='smaller' width='45' height='45'><circle cx='26' cy='26' r='6.5'></circle><path d='M39.23 18.59l-.87-.87 3-3a.51.51 0 0 0 0-.74L38 10.66a.54.54 0 0 0-.75 0l-3 3-.87-.87a.46.46 0 0 0-.79.29c-.12 1.68-.35 5-.43 6.28a.46.46 0 0 0 .49.49l6.26-.45a.46.46 0 0 0 .32-.81zM12.77 33.41l.87.87-3 3a.51.51 0 0 0 0 .74L14 41.34a.54.54 0 0 0 .75 0l3-3 .87.87a.46.46 0 0 0 .79-.29c.12-1.68.35-5 .43-6.28a.46.46 0 0 0-.49-.49l-6.26.45a.46.46 0 0 0-.32.81zm5.82-20.64l-.87.87-3-3a.51.51 0 0 0-.74 0L10.66 14a.54.54 0 0 0 0 .75l3 3-.87.87a.46.46 0 0 0 .29.79l6.28.43a.46.46 0 0 0 .49-.49l-.45-6.26a.46.46 0 0 0-.81-.32zm14.82 26.46l.87-.87 3 3a.51.51 0 0 0 .74 0L41.34 38a.54.54 0 0 0 0-.75l-3-3 .87-.87a.46.46 0 0 0-.29-.79l-6.28-.43a.46.46 0 0 0-.49.49l.45 6.26a.46.46 0 0 0 .81.32z'></path></svg>"
       ],
       "larger":[
          "<svg viewBox='0 0 52 52' alt='larger' width='45' height='45'><circle cx='26' cy='26' r='13.59'></circle><path d='M38.07 7.16l1 1-3.46 3.45a.62.62 0 0 0 0 .87l3.88 3.87a.6.6 0 0 0 .86 0l3.46-3.45 1 1a.53.53 0 0 0 .91-.34c.14-1.95.41-5.81.5-7.3a.53.53 0 0 0-.57-.57l-7.27.53a.53.53 0 0 0-.31.94zM13.93 44.84l-1-1 3.46-3.45a.62.62 0 0 0 0-.87l-3.88-3.87a.6.6 0 0 0-.86 0l-3.48 3.43-1-1a.53.53 0 0 0-.91.34c-.14 2-.41 5.81-.5 7.3a.53.53 0 0 0 .57.57l7.27-.53a.53.53 0 0 0 .33-.92zM7.16 13.93l1-1 3.45 3.46a.62.62 0 0 0 .87 0l3.87-3.88a.6.6 0 0 0 0-.86l-3.43-3.48 1-1a.53.53 0 0 0-.34-.91c-1.95-.14-5.81-.41-7.3-.5a.53.53 0 0 0-.57.57l.53 7.27a.53.53 0 0 0 .92.33zm37.68 24.14l-1 1-3.45-3.46a.62.62 0 0 0-.87 0l-3.87 3.88a.6.6 0 0 0 0 .86l3.45 3.46-1 1a.53.53 0 0 0 .34.91c2 .14 5.81.41 7.3.5a.53.53 0 0 0 .57-.57l-.53-7.27a.53.53 0 0 0-.94-.31z'></path></svg>"
       ],
       "flatter":[
          "<svg viewBox='0 0 52 52' alt='flatter' width='45' height='45'><ellipse cx='17.3' cy='26' rx='10.4' ry='5.2'></ellipse><path d='M44.49 15.87h-1.65v-7a1 1 0 0 0-1-1h-5.65a1 1 0 0 0-1 1v7h-1.68a.61.61 0 0 0-.46 1c1.47 1.69 4.37 5 5.51 6.32a.61.61 0 0 0 .92 0l5.52-6.3a.62.62 0 0 0-.51-1.02zM33.51 36.13h1.65v7a1 1 0 0 0 1 1h5.64a1 1 0 0 0 1-1v-7h1.65a.62.62 0 0 0 .46-1c-1.47-1.69-4.38-5-5.51-6.32a.61.61 0 0 0-.92 0L33 35.11a.62.62 0 0 0 .51 1.02z'></path></svg>"
       ],
       "wider":[
          "<svg viewBox='0 0 52 52' alt='wider' width='45' height='45'><path d='M30.91 12.71h1.65v26.58h-1.65a.61.61 0 0 0-.46 1c1.47 1.7 4.37 5 5.51 6.33a.61.61 0 0 0 .92 0l5.47-6.32a.61.61 0 0 0-.46-1h-1.65V12.71h1.65a.61.61 0 0 0 .46-1c-1.47-1.7-4.38-5-5.51-6.33a.61.61 0 0 0-.92 0l-5.47 6.32a.61.61 0 0 0 .46 1.01z'></path><ellipse cx='14.7' cy='26' rx='5.2' ry='18.2'></ellipse></svg>"
       ],
       "move left":[
          "<svg viewBox='0 0 52 52' alt='move left' width='45' height='45'><path d='M16.36 34.17v-2.43h6.27a1 1 0 0 0 1-1V21.3a1 1 0 0 0-1-1h-6.27v-2.47a.92.92 0 0 0-1.52-.7l-9.42 8.21a.92.92 0 0 0 0 1.38l9.41 8.15a.92.92 0 0 0 1.53-.7z'></path><circle cx='36.49' cy='26' r='10.4'></circle></svg>"
       ],
       "move right":[
          "<svg viewBox='0 0 52 52' alt='move right' width='45' height='45'><path d='M35.63 17.83v2.43h-6.28a1 1 0 0 0-1 1v9.4a1 1 0 0 0 1 1h6.28v2.43a.91.91 0 0 0 1.51.7c2.53-2.2 7.51-6.53 9.42-8.21a.91.91 0 0 0 0-1.38l-9.41-8.15a.91.91 0 0 0-1.52.78z'></path><circle cx='15.5' cy='26' r='10.4'></circle></svg>"
       ],
       "height":[
          "<svg viewBox='0 0 11.74 36.68' alt='height' width='45' height='45'><path d='M4.1 12.21c-.44.51-.7 1.53-.7 3.54V34.3h-.64a1.19 1.19 0 0 0 0 2.38h1.53a1.17 1.17 0 0 0 1.16-1.19 1.24 1.24 0 0 0-.29-.79v-9.63a.67.67 0 0 1 .71-.64.67.67 0 0 1 .71.64v9.61a1.25 1.25 0 0 0-.3.79 1.18 1.18 0 0 0 1.17 1.19H9a1.19 1.19 0 0 0 0-2.36h-.65V15.75c0-2-.26-3-.71-3.54a6.82 6.82 0 0 1-1.77.25 6.88 6.88 0 0 1-1.77-.25zM11.74 5.87a5.87 5.87 0 1 0-5.87 5.87 5.87 5.87 0 0 0 5.87-5.87z'></path></svg>"
       ],
       "weight":[
          "<svg viewBox='0 0 16.85 36.68' alt='weight' width='45' height='45'><path d='M13.35 33.55h-.2l.56-4.19c1.53-2.32 3.14-5.58 3.14-8.42 0-4.57-2.29-7.93-5.91-9a6.43 6.43 0 0 1-5 0C2.29 13 0 16.37 0 20.94c0 3 1.77 6.39 3.35 8.72l.53 3.89h-.2A1.46 1.46 0 0 0 2.22 35v.44c0 .81.65 1.22 1.46 1.22H6.6c.8 0 1.22-.65 1.22-1.46v-6a.71.71 0 0 1 1.42 0v6.08a1.48 1.48 0 0 0 1.47 1.38h2.64c.81 0 1.47-.41 1.47-1.22V35a1.47 1.47 0 0 0-1.47-1.45zM14.3 5.87a5.87 5.87 0 1 0-5.87 5.87 5.87 5.87 0 0 0 5.87-5.87z'></path></svg>"
       ]
     },
    "faceType":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M26 11.2c-7.75 0-13.31 6.29-12.86 14 .44 7.56 11.18 15.6 12.86 15.6s12.42-8 12.86-15.57C39.31 17.49 33.75 11.2 26 11.2z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.46a14.47 14.47 0 0 1-5-.84l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.51 14.51 0 0 1-5 .84z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='14.02' fill='#fff' stroke='#000' stroke-width='2.34'></circle><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M26 42.48a5 5 0 0 0 3.8-1.42 30.85 30.85 0 0 0 5.84-7.4c1.62-3.16 3.29-6.3 3.29-9.46 0-8.11-5.18-14.68-12.93-14.68S13.07 16.09 13.07 24.2c0 3.16 1.67 6.3 3.29 9.46a30.85 30.85 0 0 0 5.84 7.4 5 5 0 0 0 3.8 1.42z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M26 9.52c-7.75 0-12.93 6.57-12.93 14.68S18.25 42.48 26 42.48 38.93 32.3 38.93 24.2 33.75 9.52 26 9.52z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.46a14.47 14.47 0 0 1-5-.84l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.51 14.51 0 0 1-5 .84z' fill='#bfbfbf'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M39.17 24.25c0-7.73-5.42-13.07-13.15-13.09-7.73 0-13.15 5.36-13.15 13.09 0 3.64-3.47 8.59-.8 12.35 2.48 3.5 8.92 4.23 14 4.24 5 0 11.47-.74 14-4.24 2.57-3.76-.9-8.71-.9-12.35z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.46a14.47 14.47 0 0 1-5-.84l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.51 14.51 0 0 1-5 .84z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M26 38.11a15.65 15.65 0 0 0 10.17-3.17C38.71 33 40 30 40 25.9a14 14 0 1 0-28 0c0 4.14 1.31 7.05 3.85 9A15.65 15.65 0 0 0 26 38.11z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.31a1.72 1.72 0 1 1-1.72-1.71 1.72 1.72 0 0 1 1.72 1.71zM32.94 25.31a1.72 1.72 0 1 1-1.72-1.71 1.72 1.72 0 0 1 1.72 1.71zM26 34.36a14.47 14.47 0 0 1-5-.84l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.51 14.51 0 0 1-5 .84z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M26 10.07c-7.75 0-12.71 6.4-12.71 14.29v11.25L26 41.93l12.71-6.32V24.36c0-7.89-4.96-14.29-12.71-14.29z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M26 40.58c4.07 0 11.39-.39 12.37-2.24 1.19-2.25 1.63-9.22 1.63-12.9a14 14 0 0 0-28 0c0 3.68.46 10.65 1.65 12.9.95 1.85 8.28 2.24 12.35 2.24z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M26 42.45a6.88 6.88 0 0 0 3.67-1.25 21.18 21.18 0 0 1 2.5-2.34c1.16-.83 4.93-1.5 6-3.84s.58-6.92.58-10.66c0-7.89-5-14.29-12.71-14.29s-12.71 6.4-12.71 14.29c0 3.74-.44 8.32.58 10.66s4.8 3 6 3.84a21.18 21.18 0 0 1 2.5 2.34A6.07 6.07 0 0 0 26 42.45z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M31.94 42.1l6.77-8.52v-9.21c0-7.89-5-14.29-12.71-14.29s-12.71 6.4-12.71 14.29v9.21l6.77 8.52z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.43a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM32.94 25.43a1.72 1.72 0 1 1-1.72-1.72 1.72 1.72 0 0 1 1.72 1.72zM26 34.48a14.48 14.48 0 0 1-5-.85l.6-1.65a13.3 13.3 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M26 42.48c14.41 0 12.93-10.18 12.93-18.28S33.74 9.52 26 9.52 13.07 16.09 13.07 24.2 11.59 42.48 26 42.48z' fill='#fff' stroke='#000' stroke-width='2.34'></path><path d='M22.42 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM32.94 25.42a1.72 1.72 0 1 1-1.72-1.72 1.71 1.71 0 0 1 1.72 1.72zM26 34.47a14.48 14.48 0 0 1-5-.85l.6-1.65a13.43 13.43 0 0 0 8.72 0l.6 1.65a14.52 14.52 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M30.58 42.73l6.62-4.39a40.52 40.52 0 0 1 .29-5.68c.39-3.61 1.22-6.49 1.22-8.24 0-7.89-5-14.29-12.71-14.29s-12.71 6.4-12.71 14.29c0 1.75.83 4.63 1.22 8.24a40.52 40.52 0 0 1 .29 5.68l6.62 4.39z' fill='#fff' stroke='#000' stroke-width='2.34'></path><circle cx='20.7' cy='25.48' r='1.72' fill='#bfbfbf'></circle><circle cx='31.22' cy='25.48' r='1.72' fill='#bfbfbf'></circle><path d='M26 34.53a14.24 14.24 0 0 1-5-.85l.6-1.64a13.56 13.56 0 0 0 8.72 0l.6 1.64a14.28 14.28 0 0 1-5 .85z' fill='#bfbfbf'></path></svg>"
       ]
    ],
    "faceMakeup":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M22.22 30.28c1.25 2.71.39 5.76-1.91 6.82s-5.18-.27-6.43-3-.39-5.76 1.92-6.82 5.2.29 6.42 3zM29.78 30.28C28.53 33 29.39 36 31.69 37.1s5.18-.27 6.43-3 .39-5.76-1.92-6.82-5.2.29-6.42 3z' fill='#ffbaba'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.87 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M22.22 30.28c1.25 2.71.39 5.76-1.91 6.82s-5.18-.27-6.43-3-.39-5.76 1.92-6.82 5.2.29 6.42 3zM29.78 30.28C28.53 33 29.39 36 31.69 37.1s5.18-.27 6.43-3 .39-5.76-1.92-6.82-5.2.29-6.42 3z' fill='#f0b48c'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='0f98c32f-4919-4165-87d9-723cc89b5a82' x1='1588.67' y1='74.35' x2='1585.65' y2='65.06' gradientTransform='matrix(-.85 -.1 -.05 .87 1377.7 120.3)' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#ccfff5'></stop><stop offset='1' stop-color='#80ffe7'></stop></linearGradient><linearGradient id='a60982c7-cb6e-4687-8018-e463b9810c8d' x1='-80.89' y1='-117.92' x2='-83.91' y2='-127.22' gradientTransform='matrix(.85 -.1 .05 .87 95.12 120.3)' xlink:href='#0f98c32f-4919-4165-87d9-723cc89b5a82'></linearGradient></defs><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M31.69 18a4 4 0 0 1 5.25 3c.4 2.41-1.27 4.25-4 4.22a13.24 13.24 0 0 1-6.07-1.55S28.34 19 31.69 18z' fill='url(#0f98c32f-4919-4165-87d9-723cc89b5a82)'></path><path d='M20.31 18a4 4 0 0 0-5.25 3c-.4 2.41 1.27 4.25 4 4.22a13.22 13.22 0 0 0 6.06-1.55S23.66 19 20.31 18z' fill='url(#a60982c7-cb6e-4687-8018-e463b9810c8d)'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='9007ee9a-c0bc-4397-9754-3978f3e45f5e' x1='11.46' y1='26.31' x2='22.5' y2='30.33' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='.05' stop-color='#fff0f0'></stop><stop offset='.15' stop-color='#ffd8d8'></stop><stop offset='.25' stop-color='#ffc7c7'></stop><stop offset='.36' stop-color='#ffbdbd'></stop><stop offset='.5' stop-color='#ffbaba'></stop><stop offset='.64' stop-color='#ffbdbd'></stop><stop offset='.75' stop-color='#ffc7c7'></stop><stop offset='.85' stop-color='#ffd8d8'></stop><stop offset='.95' stop-color='#fff0f0'></stop><stop offset='1' stop-color='#fff'></stop></linearGradient><linearGradient id='4fcc6478-6c3b-4cc5-9444-d2800ac12169' x1='1178.41' y1='26.31' x2='1189.45' y2='30.33' gradientTransform='matrix(-1 0 0 1 1218.95 0)' xlink:href='#9007ee9a-c0bc-4397-9754-3978f3e45f5e'></linearGradient></defs><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M21.81 28.46c-.94-1.74-4.08-3.61-6.24-4.13-2.9-.69-5.29 1.32-3.42 4.41 1.28 2.11 5.39 3.61 7.92 3.61 1.64 0 3.14-1.3 1.74-3.89z' fill='url(#9007ee9a-c0bc-4397-9754-3978f3e45f5e)'></path><path d='M30.19 28.46c.94-1.74 4.08-3.61 6.24-4.13 2.9-.69 5.29 1.32 3.42 4.41-1.28 2.11-5.39 3.61-7.92 3.61-1.64 0-3.14-1.3-1.74-3.89z' fill='url(#4fcc6478-6c3b-4cc5-9444-d2800ac12169)'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='7d0e86ae-8cb5-4574-b541-c7bcc6a5b976' x1='11.46' y1='26.31' x2='22.5' y2='30.33' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='.06' stop-color='#fbebe0'></stop><stop offset='.13' stop-color='#f7d7c2'></stop><stop offset='.21' stop-color='#f4c8aa'></stop><stop offset='.3' stop-color='#f2bd99'></stop><stop offset='.39' stop-color='#f0b68f'></stop><stop offset='.5' stop-color='#f0b48c'></stop><stop offset='.61' stop-color='#f0b68f'></stop><stop offset='.7' stop-color='#f2bd99'></stop><stop offset='.79' stop-color='#f4c8aa'></stop><stop offset='.87' stop-color='#f7d7c2'></stop><stop offset='.94' stop-color='#fbebe0'></stop><stop offset='1' stop-color='#fff'></stop></linearGradient><linearGradient id='5b44d639-bbe4-4181-8fc2-68b36b59d490' x1='1050.41' y1='26.31' x2='1061.45' y2='30.33' gradientTransform='matrix(-1 0 0 1 1090.95 0)' xlink:href='#7d0e86ae-8cb5-4574-b541-c7bcc6a5b976'></linearGradient></defs><path d='M42.09 26A16.09 16.09 0 1 1 26 9.87 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M21.81 28.46c-.94-1.74-4.08-3.61-6.24-4.13-2.9-.69-5.29 1.32-3.42 4.41 1.28 2.11 5.39 3.61 7.92 3.61 1.64 0 3.14-1.3 1.74-3.89z' fill='url(#7d0e86ae-8cb5-4574-b541-c7bcc6a5b976)'></path><path d='M30.19 28.46c.94-1.74 4.08-3.61 6.24-4.13 2.9-.69 5.29 1.32 3.42 4.41-1.28 2.11-5.39 3.61-7.92 3.61-1.64 0-3.14-1.3-1.74-3.89z' fill='url(#5b44d639-bbe4-4181-8fc2-68b36b59d490)'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='c2d6343b-cb73-46ba-b0fe-6369cff00bc4' x1='1585.05' y1='82.17' x2='1582.03' y2='72.88' gradientTransform='matrix(-.85 -.1 -.05 .87 1375.02 113.13)' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#ccfff5'></stop><stop offset='1' stop-color='#80ffe7'></stop></linearGradient><linearGradient id='60feba0c-1d26-494f-ba35-dbc5e3c3d76e' x1='-84.51' y1='-110.1' x2='-87.53' y2='-119.4' gradientTransform='matrix(.85 -.1 .05 .87 97.8 113.13)' xlink:href='#c2d6343b-cb73-46ba-b0fe-6369cff00bc4'></linearGradient></defs><circle cx='26' cy='25.96' r='16.09' transform='rotate(-80.78 26.003 25.962)' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M22.22 30.25c1.25 2.7.39 5.76-1.91 6.82s-5.18-.28-6.43-3-.39-5.76 1.92-6.82 5.2.29 6.42 3zM29.78 30.25c-1.25 2.7-.39 5.76 1.91 6.82s5.18-.28 6.43-3 .39-5.76-1.92-6.82-5.2.29-6.42 3z' fill='#ffbaba'></path><path d='M31.69 18a4 4 0 0 1 5.25 3c.4 2.41-1.27 4.25-4 4.22a13.24 13.24 0 0 1-6.07-1.55S28.34 19 31.69 18z' fill='url(#c2d6343b-cb73-46ba-b0fe-6369cff00bc4)'></path><path d='M20.31 18a4 4 0 0 0-5.25 3c-.4 2.41 1.27 4.25 4 4.22a13.22 13.22 0 0 0 6.06-1.55S23.66 19 20.31 18z' fill='url(#60feba0c-1d26-494f-ba35-dbc5e3c3d76e)'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='9e0c5872-4b49-4168-8d92-c7ce11b69811' x1='1445.85' y1='73.51' x2='1442.83' y2='64.21' gradientTransform='matrix(-.85 -.1 -.05 .87 1256.91 106.7)' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#f0d5c0'></stop><stop offset='1' stop-color='#f0a064'></stop></linearGradient><linearGradient id='16328e46-11c8-45f5-8b1e-a6e3f85ae64c' x1='-73.31' y1='-101.44' x2='-76.33' y2='-110.74' gradientTransform='matrix(.85 -.1 .05 .87 87.92 106.7)' xlink:href='#9e0c5872-4b49-4168-8d92-c7ce11b69811'></linearGradient></defs><circle cx='26' cy='25.96' r='16.09' transform='rotate(-80.78 26.003 25.962)' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M22.22 30.25c1.25 2.7.39 5.76-1.91 6.82s-5.18-.28-6.43-3-.39-5.76 1.92-6.82 5.2.29 6.42 3zM29.78 30.25c-1.25 2.7-.39 5.76 1.91 6.82s5.18-.28 6.43-3 .39-5.76-1.92-6.82-5.2.29-6.42 3z' fill='#ffbaba'></path><path d='M31.69 18a4 4 0 0 1 5.25 3c.4 2.41-1.27 4.25-4 4.22a13.24 13.24 0 0 1-6.07-1.55S28.34 19 31.69 18z' fill='url(#9e0c5872-4b49-4168-8d92-c7ce11b69811)'></path><path d='M20.31 18a4 4 0 0 0-5.25 3c-.4 2.41 1.27 4.25 4 4.22a13.22 13.22 0 0 0 6.06-1.55S23.66 19 20.31 18z' fill='url(#16328e46-11c8-45f5-8b1e-a6e3f85ae64c)'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='934596b4-da29-4022-8fab-8d3c38feee9d' x1='31.01' y1='25.41' x2='33.9' y2='17.87' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#e6dbdb'></stop><stop offset='1' stop-color='#ccb1b1'></stop></linearGradient><linearGradient id='d22a0ae6-543d-439c-8797-8c96bee36a95' x1='20.99' y1='25.41' x2='18.1' y2='17.87' xlink:href='#934596b4-da29-4022-8fab-8d3c38feee9d'></linearGradient><linearGradient id='82b5c4c9-0fff-4546-8fb4-46942a423ec9' x1='11.49' y1='28.27' x2='22.36' y2='28.27' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='.05' stop-color='#fff0f0'></stop><stop offset='.15' stop-color='#ffd8d8'></stop><stop offset='.25' stop-color='#ffc7c7'></stop><stop offset='.36' stop-color='#ffbdbd'></stop><stop offset='.5' stop-color='#ffbaba'></stop><stop offset='.64' stop-color='#ffbdbd'></stop><stop offset='.75' stop-color='#ffc7c7'></stop><stop offset='.85' stop-color='#ffd8d8'></stop><stop offset='.95' stop-color='#fff0f0'></stop><stop offset='1' stop-color='#fff'></stop></linearGradient><linearGradient id='6d0662fc-17bc-4f1f-af50-44ce08485be6' x1='1050.41' y1='26.31' x2='1061.45' y2='30.33' gradientTransform='matrix(-1 0 0 1 1090.95 0)' xlink:href='#82b5c4c9-0fff-4546-8fb4-46942a423ec9'></linearGradient></defs><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M31.69 18a4 4 0 0 1 5.25 3c.4 2.41-1.27 4.25-4 4.22a13.24 13.24 0 0 1-6.07-1.55S28.34 19 31.69 18z' fill='url(#934596b4-da29-4022-8fab-8d3c38feee9d)'></path><path d='M20.31 18a4 4 0 0 0-5.25 3c-.4 2.41 1.27 4.25 4 4.22a13.22 13.22 0 0 0 6.06-1.55S23.66 19 20.31 18z' fill='url(#d22a0ae6-543d-439c-8797-8c96bee36a95)'></path><path d='M21.81 28.46c-.94-1.74-4.08-3.61-6.24-4.13-2.9-.69-5.29 1.32-3.42 4.41 1.28 2.12 5.39 3.61 7.92 3.61 1.64 0 3.14-1.3 1.74-3.89z' fill='url(#82b5c4c9-0fff-4546-8fb4-46942a423ec9)'></path><path d='M30.19 28.46c.94-1.74 4.08-3.61 6.24-4.13 2.9-.69 5.29 1.32 3.42 4.41-1.28 2.12-5.39 3.61-7.92 3.61-1.64 0-3.14-1.3-1.74-3.89z' fill='url(#6d0662fc-17bc-4f1f-af50-44ce08485be6)'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M16.17 29.52a1 1 0 1 0 1 1 1.1 1.1 0 0 0-1-1zM18.53 26a1 1 0 1 0 1 1 1.1 1.1 0 0 0-1-1zM14.05 26.28a1 1 0 1 0 0 2 1 1 0 1 0 0-2zM20.62 29.14a1 1 0 1 0 1 1 1.1 1.1 0 0 0-1-1zM34.81 30.54a1 1 0 1 0 1-1 1.1 1.1 0 0 0-1 1zM32.46 27a1 1 0 1 0 1-1 1.1 1.1 0 0 0-1 1zM36.93 27.29a1 1 0 1 0 1-1 1.1 1.1 0 0 0-1 1zM30.36 30.16a1 1 0 1 0 1-1 1.1 1.1 0 0 0-1 1z' fill='#c98f6e' fill-rule='evenodd'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='12663085-2f51-40ba-8abb-b84382ab8b7e' x1='26' y1='29.04' x2='26' y2='40.81' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='.06' stop-color='#e7e8e8'></stop><stop offset='.17' stop-color='#c7caca'></stop><stop offset='.28' stop-color='#adb2b1'></stop><stop offset='.4' stop-color='#999f9e'></stop><stop offset='.54' stop-color='#8b9190'></stop><stop offset='.71' stop-color='#838988'></stop><stop offset='1' stop-color='#808786'></stop></linearGradient></defs><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M39.3 29s-1.7 6.18-5.8 7c-3.63.7-4.65-1.12-4.65-1.12h-5.63s-1 1.82-4.64 1.12c-4.1-.78-5.81-6.92-5.81-6.92h-1.3a14.85 14.85 0 0 0 29.06 0z' fill='url(#12663085-2f51-40ba-8abb-b84382ab8b7e)'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='7719c1fb-aefc-4f3b-abf2-1c79810f4b9a' x1='26' y1='28.48' x2='26' y2='40.81' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='.06' stop-color='#e7e8e8'></stop><stop offset='.17' stop-color='#c7caca'></stop><stop offset='.28' stop-color='#adb2b1'></stop><stop offset='.4' stop-color='#999f9e'></stop><stop offset='.54' stop-color='#8b9190'></stop><stop offset='.71' stop-color='#838988'></stop><stop offset='1' stop-color='#808786'></stop></linearGradient></defs><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M40.53 29h-1.3a14.21 14.21 0 0 1-2.72 5.05L33 30.54a11.34 11.34 0 0 0-7-2.05 11.34 11.34 0 0 0-7 2.05l-3.51 3.55A14.21 14.21 0 0 1 12.77 29h-1.3a14.87 14.87 0 0 0 14.14 11.79c-1 0 0 0 0 0h.76s1 0 0 0A14.87 14.87 0 0 0 40.53 29zm-8.36 7.08c-1.06.63-2-.21-2.52-.51s-.8-.81-.92-.77h-5.46c-.12 0-.43.34-.92.77s-1.46 1.14-2.52.51-1-2.27.11-3.87C21.62 29.78 26 30 26 30s4.38-.22 6.06 2.25c1.08 1.6 1.18 3.23.11 3.87z' fill='url(#7719c1fb-aefc-4f3b-abf2-1c79810f4b9a)'></path><path d='M37.59 35.23l-1.08-1.14L33 30.54a11.34 11.34 0 0 0-7-2.05 11.34 11.34 0 0 0-7 2.05l-3.51 3.55-1.08 1.14a14.78 14.78 0 0 0 11.2 5.56c-1 0 0 0 0 0h.76s1 0 0 0a14.78 14.78 0 0 0 11.22-5.56zm-5.42.89c-1.06.63-2-.21-2.52-.51s-.8-.81-.92-.77h-5.46c-.12 0-.43.34-.92.77s-1.46 1.14-2.52.51-1-2.27.11-3.87C21.62 29.78 26 30 26 30s4.38-.22 6.06 2.25c1.08 1.6 1.18 3.23.11 3.87z' fill='#808786'></path></svg>"
       ]
    ],
    "faceWrinkles":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M18.58 28.7a25.76 25.76 0 0 0 4.06-4.18 6.28 6.28 0 0 0 .84-2.18M33.42 28.7a25.76 25.76 0 0 1-4.06-4.18 6.28 6.28 0 0 1-.84-2.18' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M13.81 27.94c2.65-.23 4.39.66 5.2 3.13a18.39 18.39 0 0 1 .42 6.67M38.19 27.94c-2.65-.23-4.39.66-5.2 3.13a18.63 18.63 0 0 0-.42 6.67' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M13.77 24.4A7.73 7.73 0 0 0 15.2 28a6.09 6.09 0 0 0 3.07 1.89M38.23 24.4A7.73 7.73 0 0 1 36.8 28a6.09 6.09 0 0 1-3.07 1.89' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M19.33 30.7a11.28 11.28 0 0 0 4.13-3.63M32.67 30.7a11.28 11.28 0 0 1-4.13-3.63' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M22.5 26.16a4.46 4.46 0 0 1-4.67 4.21 4.45 4.45 0 0 1-4.67-4.21M29.5 26.16a4.46 4.46 0 0 0 4.67 4.21 4.45 4.45 0 0 0 4.67-4.21' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' transform='rotate(-80.78 26.003 25.962)' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M20.07 38A6.06 6.06 0 0 0 24 39.12a2.42 2.42 0 0 0 2-1.06M31.93 38A6.06 6.06 0 0 1 28 39.12a2.42 2.42 0 0 1-2-1.06M26 38.7v-3.74' fill='none' stroke='#996d54' stroke-width='1.86'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' transform='rotate(-80.78 26.003 25.962)' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M30.06 37.1a6.38 6.38 0 0 1-8.12 0' fill='none' stroke='#996d54' stroke-width='1.86' fill-rule='evenodd'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='5f7337af-7b8f-4d8c-9f77-40510764aa40' x1='18.37' y1='24.95' x2='20.59' y2='18.84' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'></stop><stop offset='1' stop-color='#996d54'></stop></linearGradient><linearGradient id='df31a6eb-2c64-4087-a5d6-318d5d837aa2' x1='1185.67' y1='24.95' x2='1187.89' y2='18.84' gradientTransform='matrix(-1 0 0 1 1219.3 0)' xlink:href='#5f7337af-7b8f-4d8c-9f77-40510764aa40'></linearGradient></defs><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path d='M14.05 21.31a3.57 3.57 0 0 1 .41-2.4s6.6-1.2 8.83 1.43a6.22 6.22 0 0 1 1.28 4.48s-5.69.41-7.69-.42a4.08 4.08 0 0 1-2.83-3.09z' fill='url(#5f7337af-7b8f-4d8c-9f77-40510764aa40)'></path><path d='M38 21.31a3.57 3.57 0 0 0-.41-2.4s-6.6-1.2-8.83 1.43a6.22 6.22 0 0 0-1.28 4.48s5.69.41 7.7-.42A4.08 4.08 0 0 0 38 21.31z' fill='url(#df31a6eb-2c64-4087-a5d6-318d5d837aa2)'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path d='M16.37 36.69a13.36 13.36 0 0 1 1.49-4.46 11.63 11.63 0 0 1 2.92-3.38M35.63 36.69a13.36 13.36 0 0 0-1.49-4.46 11.63 11.63 0 0 0-2.92-3.38' fill='none' stroke='#996d54' stroke-width='1.86' fill-rule='evenodd'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#999' stroke-width='2.48'></circle><path fill='none' stroke='#996d54' stroke-width='1.86' d='M12.58 21.26l2.38-1.3M13.33 23.65l2.38-1.29M39.42 21.26l-2.37-1.3M38.67 23.65l-2.38-1.29'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.88 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#999' stroke-width='2.48'></path><path fill='none' stroke='#996d54' stroke-width='1.86' d='M12.58 21.26l2.38-1.3M13.33 23.65l2.38-1.29M16 24.63c2.11 2 5.43 1.37 7.41-1.46M39.42 21.26l-2.38-1.3M38.67 23.65l-2.38-1.29M36 24.63c-2.11 2-5.43 1.37-7.41-1.46'></path><path d='M37.58 34.52a11.06 11.06 0 0 0-1.3-3.72 11.19 11.19 0 0 0-2.79-3.21M35.63 36.69a13.36 13.36 0 0 0-1.49-4.46 11.63 11.63 0 0 0-2.92-3.38M14.42 34.52a11.06 11.06 0 0 1 1.3-3.72 11.19 11.19 0 0 1 2.79-3.21M16.37 36.69a13.36 13.36 0 0 1 1.49-4.46 11.63 11.63 0 0 1 2.92-3.38' fill='none' stroke='#996d54' stroke-width='1.86' fill-rule='evenodd'></path></svg>"
       ]
    ],
    "hairType":[
       [
          [
             "<svg alt='page 1 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='3fed5af3-0658-4484-ba2d-8afe7d842181' data-name='33'><path d='M26 11.157c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.808 22.361a12.808 12.808 0 1 0-25.616 0 23.464 23.464 0 0 0 .622 7.442l1.334-6.76 2.223 2.846 1.691-4.9 2.529 2.765 2.363-4.554L26 23.487l2.045-4.287 2.363 4.555 2.53-2.765 1.69 4.9 2.224-2.846 1.334 6.76a23.5 23.5 0 0 0 .622-7.443z'></path></g></svg>",
             "<svg alt='page 1 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='65ae059d-231d-40b4-82f6-339ddacdebb0' data-name='47'><path d='M26 11.149c-7.038 0-11.359 6.324-10.828 15.005C15.636 33.733 20.045 39.07 26 39.07c5.955 0 10.364-5.337 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 16.177l2.244-2.784 2.707 3.557 1.392-3.094 2.32 4.254.929-1.16c1.082 3.558.928 12.529.928 12.529h2.289V21.5a12.809 12.809 0 1 0-25.617 0v7.98h2.29s-.156-8.971.927-12.529l.929 1.16 2.32-4.254 1.392 3.093 2.707-3.557z'></path></g></svg>",
             "<svg alt='page 1 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='3c3d4d77-7e80-4e4e-b338-02bea1ae0a82' data-name='40'><path d='M26 11.162c-7.038 0-11.359 6.323-10.828 15 .464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.531-8.677-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.3 18.432C36.955 13.183 33.072 8.78 26 8.78s-10.955 4.4-12.3 9.652a22.309 22.309 0 0 0 0 10.828l1.78-8.971.618 1.237 2.478-3.944 2.478 2.474 2.471-2.474L26 20.056l2.474-2.474 2.472 2.474 2.477-2.474 2.477 3.944.62-1.237 1.78 8.971a22.309 22.309 0 0 0 0-10.828z'></path></g></svg>",
             "<svg alt='page 1 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='c1d3eb75-fe12-4f32-aae1-1dcc10b33e3b' data-name='37'><path d='M26 11.25c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916C37.36 17.574 33.038 11.25 26 11.25z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.143 22.159c0-7.073-7.07-12.6-14.143-12.6s-14.144 5.527-14.144 12.6c0 0-.533 5.427 2.313 8.985l3.5-8.541 2.7 3.025 2.918-3.29 2.7 3.2 2.7-3.2 2.918 3.29 2.7-3.025 3.5 8.541c2.871-3.558 2.338-8.985 2.338-8.985z'></path></g></svg>",
             "<svg alt='page 1 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='b68114ef-7b09-46dd-95fc-a904fd6110b0' data-name='32'><path d='M36.886 31.747l-3.832 11.918-3.135-4.625L26 45.356l-3.92-6.316-3.135 4.625-3.832-11.918'></path><path d='M26 11.328c-7.039 0-11.36 6.323-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.682-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.608 20.717C39.608 13.644 33.073 8.65 26 8.65s-13.609 4.994-13.609 12.067c0 0-.623 6.76 1.867 9.873l.445-8.8 1.068-3.736 1.334 5.246 2.4-7.648 1.779 7.737 2.316-8.275L26 22.94l2.4-7.826 2.313 8.271 1.779-7.737L34.9 23.3l1.334-5.247 1.066 3.732.445 8.805c2.486-3.113 1.863-9.873 1.863-9.873z'></path></g></svg>",
             "<svg alt='page 1 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='e1ea61b6-6ca8-48e2-b397-c579ab44d9c0' data-name='107'><path d='M26 11.157c-7.039 0-11.36 6.323-10.829 15.005.465 7.58 4.874 12.916 10.829 12.916 5.957 0 10.365-5.336 10.829-12.916.532-8.682-3.79-15.005-10.829-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.808 22.361a12.808 12.808 0 1 0-25.615 0 23.482 23.482 0 0 0 .621 7.442l3.248-8.814 1.814 2.136L21 19.2l3 4.288 4.374-4.737 3.126 5.124 2.438-2.886L35 25.25l1.852-2.207 1.334 6.76a23.5 23.5 0 0 0 .622-7.442z'></path><path d='M20.501 10.875l-8.625 2L13.751 16l-3.5.75 3.125 7.75'></path></g></svg>"
          ],
          [
             "<svg alt='page 1 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='f76441f0-b6f9-4011-ae56-86829a5c3fb4' data-name='48'><path d='M26 11.216c-7.039 0-11.36 6.323-10.829 15.005C15.636 33.8 20.044 39.137 26 39.137S36.364 33.8 36.828 26.221c.533-8.682-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.143 27.3a37.176 37.176 0 0 0 0-8.277A11.963 11.963 0 0 0 26 8.757a11.963 11.963 0 0 0-12.144 10.27 34.582 34.582 0 0 0 .078 8.2 28.35 28.35 0 0 0 9.745-5.569 22.6 22.6 0 0 0 5.182-6.5s4.952 8.82 9.282 12.142z'></path></g></svg>",
             "<svg alt='page 1 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='2425d42b-0f27-4f8a-a2f7-03ce51e9a01f' data-name='51'><path d='M26 11.173c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.758 20.044 39.1 26 39.1s10.364-5.337 10.828-12.917c.532-8.683-3.79-15.01-10.828-15.01z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M29.944 15.582a9.125 9.125 0 0 0 5.414 2.939l1.625 8.43 1.005.077.309-4.175C38.3 14.513 33.073 9.6 26 9.6s-12.3 4.913-12.3 13.253l.309 4.175 1.005-.077 1.625-8.43a9.125 9.125 0 0 0 5.414-2.939 7.373 7.373 0 0 1-2.4 4.1s7.047 1.159 10.291-4.1z'></path></g></svg>",
             "<svg alt='page 1 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='c91a3f82-618f-4fd4-bb78-17779fbb434f' data-name='55'><path d='M26 11.157c-7.039 0-11.36 6.323-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916C37.36 17.48 33.038 11.157 26 11.157z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.5 27.477v-6.2A12.657 12.657 0 0 0 26 8.466a12.657 12.657 0 0 0-12.5 12.809v6.2l2.6-7.271a11.068 11.068 0 0 1 6.574-2.938c4.787-.369 8.926-.149 10.287-2.012 0 0 .773 4.254 2.862 6.266z'></path></g></svg>",
             "<svg alt='page 1 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='ca66de7b-f636-4130-904c-5a3fecb0b43c' data-name='70'><path d='M26 11.12c-7.038 0-11.359 6.324-10.828 15.005C15.634 33.7 20.043 39.041 26 39.041c5.955 0 10.364-5.337 10.828-12.916.53-8.681-3.791-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.517 25.2v4.56h2.167v-4.022c3.17-.7 2.01-5.491.386-8.276-2.127-3.646-6-8.724-13.072-8.724s-10.944 5.078-13.071 8.724c-1.624 2.785-2.785 7.58.386 8.276v4.022h2.166V25.2a50.745 50.745 0 0 0 12.298-10.6l2.088.464 2.166-.464s1.935 8.045 4.486 10.6z'></path></g></svg>",
             "<svg alt='page 1 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='cd115961-0257-4163-885b-1c65c88f2af7' data-name='44'><path d='M26 11.161c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.829-12.917c.535-8.681-3.786-15.005-10.829-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.625c7.416 0 13.381 5.565 13.381 12.8a28.828 28.828 0 0 1-.812 4.429 26.165 26.165 0 0 1-12.484-12.735H26a26.169 26.169 0 0 1-12.49 12.737 28.922 28.922 0 0 1-.811-4.429c0-7.237 5.965-12.8 13.381-12.8z'></path></g></svg>",
             "<svg alt='page 1 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='45e6632a-aa3c-4174-b952-1c57815073a7' data-name='66'><path d='M26 11.2c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.917 10.829 12.917 5.955 0 10.363-5.337 10.828-12.917.531-8.681-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.735a12.549 12.549 0 0 0-12.5 12.81v6.511h1.36l.31-5.956.929 2.784 1-4.022 1.779 3.326s2.939-8.122 5.8-10.6l1.315.85 1.315-.85c2.862 2.474 5.8 10.6 5.8 10.6l1.779-3.326 1.013 4.023.929-2.784.309 5.955H38.5v-6.511A12.55 12.55 0 0 0 26 8.735z'></path></g></svg>"
          ],
          [
             "<svg alt='page 1 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='24be7ff1-2693-4848-9df5-2e191b545e87' data-name='52'><path d='M26 11.2c-7.038 0-11.359 6.324-10.828 15.005.463 7.574 4.872 12.911 10.828 12.911 5.955 0 10.364-5.337 10.828-12.916.531-8.681-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 15.3l2.167-2.012a11.532 11.532 0 0 1 1.933 6.338l6.5.773.386 5.415 1.083.386.31-4.409c0-8.739-5.3-12.9-12.376-12.9s-12.375 4.161-12.375 12.9l.31 4.409 1.083-.386.379-5.414 6.5-.773a11.532 11.532 0 0 1 1.934-6.343z'></path></g></svg>",
             "<svg alt='page 1 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='11632068-efc7-4344-a008-0a3c075fc2af' data-name='50'><path d='M37.679 23.027l-1.624 17.558-5.491-1.16L26 41.049l-4.564-1.624-5.492 1.16-1.624-17.558'></path><path d='M26 11.116c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.7 20.044 39.038 26 39.038s10.364-5.337 10.828-12.917C37.36 17.44 33.038 11.116 26 11.116z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.734c7.249 0 12.127 4.625 13.078 11.355l2.932 3.789A10.265 10.265 0 0 1 32.9 22.8a24.175 24.175 0 0 1-6.9-7.58 24.17 24.17 0 0 1-6.9 7.58 10.265 10.265 0 0 1-9.115 1.082l2.932-3.789C13.873 13.359 18.751 8.734 26 8.734z'></path></g></svg>",
             "<svg alt='page 1 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='017e722e-716b-4631-b3d9-f6de3e5cdbfe' data-name='38'><path d='M26 11.111c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.7 20.044 39.032 26 39.032s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M31.337 7.786l-.928 2.552-2.321-3.79L26 9.333l-2.089-2.785-2.321 3.79-.927-2.552c-9.707 9.706-7.58 22.584-7.58 22.584h2.538c-.044-1.558-.077-6.638 1.793-9.977 2.233-3.987 4.022-5.878 8.586-5.878s6.353 1.891 8.585 5.878c1.87 3.339 1.837 8.419 1.793 9.977h2.539s2.127-12.878-7.58-22.584z'></path></g></svg>",
             "<svg alt='page 1 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='7ef8f6b5-20d1-4eda-be86-cd75adf9896f' data-name='49'><path d='M26 11.149c-7.039 0-11.36 6.324-10.829 15C15.635 33.733 20.044 39.07 26 39.07s10.364-5.337 10.828-12.917c.532-8.68-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 6.663l2.011 1.7 1.47-.928 1.16 1.165 2.088-1.315 1.083 2.4 1.856-.542.464 1.547 2.785-.619.231 17.317h-2.629a44.669 44.669 0 0 0-.851-6.952 16.026 16.026 0 0 0-2.63-5.956 25.95 25.95 0 0 1-7.038.768 25.954 25.954 0 0 1-7.039-.773 16.044 16.044 0 0 0-2.63 5.956 44.737 44.737 0 0 0-.85 6.952h-2.63l.232-17.317 2.784.619.464-1.547 1.857.542 1.082-2.4 2.088 1.32 1.161-1.161 1.469.928L26 6.663z'></path></g></svg>",
             "<svg alt='page 1 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='54512fa2-40bc-4308-8a57-69b5f27a01fe' data-name='43'><path d='M26.022 11.09c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917 5.955 0 10.363-5.337 10.828-12.917.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.948 14.416a12.351 12.351 0 0 0-4.873-.7 6.1 6.1 0 0 1 1.934-2.707 18.88 18.88 0 0 0-6.188-.541c-4.486-4.1-14-3.094-14-3.094l2.63 2.784-7.5.387 2.94 2.707-4.409.7c1.392 2.32 1.686 7.852 1.686 8.678l.047 4.935h2.055s-.387-4.951 1.469-8.044c2.027-3.377 4.719-5.105 9.282-5.105s7.255 1.728 9.282 5.105c1.856 3.093 1.469 8.044 1.469 8.044h2.057l.047-4.935c0-.054-.008-.106-.008-.159a18.982 18.982 0 0 1 2.08-8.055z'></path></g></svg>",
             "<svg alt='page 1 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='5ad61f8e-7fd7-4dbf-a90e-21697ff4fe2e' data-name='31'><path d='M26 11.169c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.753 20.044 39.09 26 39.09s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 6.452l2.887 2.63 6.549-1.445 1.341 5.879 4.692 2.99-2.089 5.8 1.934 2.32-1.624 2.38-1.625 3.964h-1.778l.386-9.9-3.093-2.707-2.244-3.4A22.568 22.568 0 0 0 26 14.418a22.587 22.587 0 0 0-5.338.541l-2.243 3.4-3.093 2.711.386 9.9h-1.778l-1.625-3.964-1.624-2.379 1.934-2.32-2.089-5.8 4.692-2.99 1.341-5.879 6.549 1.445L26 6.452z'></path></g></svg>"
          ],
          [
             "<svg alt='page 1 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='31ac9555-8738-4189-90fa-b88292cd4eb6' data-name='56'><path d='M26 11.049c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M27.391 14.994l.696 3.789 3.559-2.784 3.249 3.249 1.083-.929 1.432 6.33h1.12l.696-8.65-2.63-1.624-.773-4.564-5.337-.696L26 6.641l-4.487 2.474-5.337.696-.773 4.564-2.63 1.624.696 8.65h1.12l1.433-6.33 1.083.929 3.248-3.249 2.398 2.784 4.64-3.789z'></path></g></svg>",
             "<svg alt='page 1 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='ed30210e-1d1d-497f-9181-6976610ad062' data-name='68'><path d='M26 11.158c-7.039 0-11.36 6.324-10.829 15.005.465 7.58 4.873 12.916 10.829 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.308 18.815l-2.552-3.248-1.005-4.022-3.327-.7-2.324-2.78-3.094.309L26 7.291l-2.012 1.083-3.094-.309-2.32 2.784-3.326.7-1.006 4.022-2.552 3.244.928 3.635-.077 3.559 1.779 2.707 2.243-8.973 2.629-2.629a21.1 21.1 0 0 0 6.808.851 21.089 21.089 0 0 0 6.807-.851l2.63 2.629 2.242 8.973 1.78-2.707-.079-3.559z'></path></g></svg>",
             "<svg alt='page 1 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='e9d96a23-412f-438b-90b6-b991df722c36' data-name='62'><path d='M26.007 11.176c-7.038 0-11.359 6.324-10.828 15.005.463 7.58 4.871 12.919 10.827 12.919 5.955 0 10.364-5.337 10.828-12.917.533-8.683-3.789-15.007-10.827-15.007z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.031 21.927v8.894h2.475v-2.784l1.547-1.779-1.47-1.624 2.32-3.867-2.475-2.167c-1.933-6.5-5.348-9.7-12.422-9.7h.124c-7.073 0-10.488 3.2-12.421 9.7l-2.476 2.165 2.321 3.867-1.47 1.624 1.547 1.779v2.784h2.475v-8.892a20.945 20.945 0 0 0 10.9-2.939l-1 2.939a11.5 11.5 0 0 0 7.27-2.862l-.464 2.011 2.707-.619z'></path></g></svg>",
             "<svg alt='page 1 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='8fec302c-ce65-4585-8a62-caa5bd501c03' data-name='115'><path d='M26 11.049c-7.039 0-11.36 6.324-10.829 15.005.465 7.58 4.873 12.917 10.829 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M27.392 17.711l.696 3.789 3.558-2.784 3.249 3.249 1.083-.929 1.433 3.613h1.119l.696-8.65-2.629-1.624-.774-4.564-5.337-.696L26 6.641l-4.486 2.474-5.337.696-.774 4.564-2.629 1.624.696 8.65h1.12l1.432-3.613 1.083.929 3.249-3.249 2.397 2.784 4.641-3.789z'></path></g></svg>",
             "<svg alt='page 1 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='ecad7730-da09-463a-a33d-0465ba0b5d15' data-name='76'><path d='M26 11.077c-7.038 0-11.359 6.324-10.828 15.005C15.635 33.662 20.044 39 26 39c5.955 0 10.364-5.336 10.828-12.916.531-8.684-3.79-15.007-10.828-15.007z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 17.884a21.1 21.1 0 0 0 6.808-.851l2.629 2.629.877 10.623 4.021-5.467-.077-3.557.928-3.636-2.096-3.017-1.085-4.021L34 9.65l-2.108-2.258-3.225.514L26 6.669l-2.669 1.237-3.224-.514L18 9.65l-4 .937-1.09 4.021-2.1 3.017.928 3.636-.077 3.557 4.022 5.467.877-10.623 2.628-2.629a21.1 21.1 0 0 0 6.812.851z'></path></g></svg>",
             "<svg alt='page 1 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='f04a1e35-32dc-4f35-8c98-114983a44bed' data-name='119'><path d='M26.008 11.176c-7.038 0-11.36 6.324-10.829 15.005.465 7.58 4.873 12.917 10.829 12.917 5.955 0 10.363-5.337 10.828-12.917.531-8.681-3.791-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.031 21.927v8.894h2.475v-2.784l1.547-1.779-1.469-1.624 2.32-3.867-2.475-2.167c-1.934-6.5-5.349-9.7-12.422-9.7h.124c-7.074 0-10.488 3.2-12.422 9.7l-2.475 2.165 2.321 3.867-1.471 1.624 1.547 1.779v2.784h2.476v-8.892'></path><path d='M36 17.875V22l-1.5 2-1.5-2-2.25 2-2.312-2L26 24l-2.437-2-2.313 2L19 22l-1.5 2-1.5-2v-4.125'></path></g></svg>"
          ],
          [
             "<svg alt='page 1 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='3e00432d-ebed-4393-b111-8520f274d39c' data-name='64'><path d='M25.999 38.5h-1.627l-3 2.375-1.875-3.375-2.5 2.5-6.004-13.798 1.623-3.79-1.236-5.027 3.943-4.022.311-3.326 3.48-.077 1.78-2.784 2.474 1.082 2.629-1.934h.004l2.629 1.934 2.475-1.082 1.779 2.784 3.48.077.311 3.326 3.943 4.022-1.236 5.027 1.623 3.79L35.001 40l-2.5-2.5-1.875 3.375-3-2.375h-1.627z'></path><path d='M26 11.043c-7.038 0-11.359 6.323-10.828 15C15.636 33.623 20.045 38.96 26 38.96c5.955 0 10.364-5.337 10.828-12.917.531-8.677-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26.927 19.241c3.094-1.083 4.023-2.4 4.023-2.4a14.584 14.584 0 0 0 4.641 4.176l1.547 6.96 1.547-2.628-.62-7.89-3.248-5.491L26 9.109l-8.817 2.862-3.248 5.491-.62 7.89 1.547 2.628 1.547-6.96a14.584 14.584 0 0 0 4.641-4.176 7.8 7.8 0 0 1 0 3.4 18.865 18.865 0 0 0 5.877-1.003z'></path></g></svg>",
             "<svg alt='page 1 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='3fba4246-b2f6-4a0a-b1c6-fa76f9b9264b' data-name='81'><path d='M38.138 28.822l-4.616 13.355-3.712-2.51-3.815 3.25-3.816-3.25-3.713 2.51-4.615-13.355'></path><path d='M26 11.11c-7.04 0-11.36 6.324-10.829 15.005.459 7.579 4.868 12.916 10.829 12.916 5.955 0 10.364-5.337 10.828-12.916C37.354 17.434 33.033 11.11 26 11.11z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M33.007 11.034s6.188 2.062 6.6 9.9c.242 4.61-1.125 8.094-2.181 12.381 0 0-.918-10.924-1.761-14.313a10.555 10.555 0 0 0-3.334-5.333c-7.5 10.333-12 13.25-12 13.25l.3-7.016c-1.547 2.243-6.07 13.412-6.07 13.412-1.056-4.287-2.877-7.818-2.181-12.381 1.048-6.867 5.673-12.89 12.169-13.406 6.382-.508 8.458 3.506 8.458 3.506z'></path></g></svg>",
             "<svg alt='page 1 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='d595c9aa-8acd-480d-86ef-0d23d287189c' data-name='116'><path d='M26 38.6c8.121 0 11.365-.011 14.149-3.724 2.446-3.261 1.37-7.878.006-14.85C38.762 12.912 33.072 7.962 26 7.962s-12.762 4.95-14.154 12.065C10.481 27 9.4 31.616 11.851 34.877 14.635 38.59 17.878 38.6 26 38.6z'></path><path d='M26 11.056c-7.038 0-11.359 6.323-10.828 15C15.635 33.64 20.044 38.977 26 38.977c5.955 0 10.364-5.337 10.828-12.917.531-8.681-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.271l9.823 4.176 3.559 8.663-.233 11.756-1.779.851s-2.069-4.9-3.245-8.655c-1.312-4.187-3.687-12.812-3.687-12.812A43.453 43.453 0 0 0 20 23.25a55.391 55.391 0 0 0-5.37 10.467l-1.779-.851-.233-11.756 3.559-8.663z'></path></g></svg>",
             "<svg alt='page 1 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='9f63f4d6-2431-4f1b-bbb2-f51ae5261475' data-name='121'><path d='M25.999 6.324L23.37 8.258l-2.475-1.082-1.779 2.784-3.481.077-.309 3.326-3.945 4.022 1.238 5.027-.624 3.79L19.999 35l.973.5 5.027.618 5.028-.618.972-.5 8.005-8.798-.624-3.79 1.238-5.027-3.945-4.022-.309-3.326-3.481-.077-1.779-2.784-2.475 1.082-2.63-1.934z'></path><path d='M26 11.043c-7.038 0-11.359 6.323-10.828 15C15.636 33.623 20.045 38.96 26 38.96c5.955 0 10.364-5.337 10.828-12.917.532-8.677-3.789-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26.874 21.312a38.422 38.422 0 0 0 3.438-3.124 21 21 0 0 1 4 6.062l1.278-2.23 3.547 6.96.547-3.628-1.619-7.89-3.248-5.491L26 9.109l-8.817 2.862-3.248 5.491-1.619 7.89.547 3.628 3.547-6.96 1.277 2.23a21.021 21.021 0 0 1 4-6.062l.875 6a29.458 29.458 0 0 0 4.312-2.876z'></path></g></svg>",
             "<svg alt='page 1 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='7d84d045-8a86-46a3-8604-908b140b7a4f' data-name='22'><path d='M26 42.207l3.2-2.5 2.908 2.165 1.7-3.4 2.01 3.481c3.795-3.381 4.038-7.96 3.636-14a141.15 141.15 0 0 0-.649-6.87A12.61 12.61 0 0 0 26 8.505 12.823 12.823 0 0 0 13.005 21.14s-.232 3.326-.464 6.806c-.4 6.04-.16 10.619 3.636 14l2.011-3.481 1.7 3.4L22.8 39.7z'></path><path d='M26 11.163c-7.038 0-11.359 6.324-10.828 15.005.463 7.579 4.872 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.843l8.2 3.4 3.558 7.038.929 5.723s.077 4.177-.929 5.646c0 0-7.579-9.126-8.2-16.783L26 15.881l-3.559-2.011c-.619 7.657-8.2 16.783-8.2 16.783-1.006-1.469-.929-5.646-.929-5.646l.929-5.723 3.559-7.038z'></path></g></svg>",
             "<svg alt='page 1 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='0c6b3f5e-b18f-4b9a-9670-fdd66da712c7' data-name='58'><path d='M26 38.6c8.121 0 11.365-.011 14.148-3.724 2.445-3.261 1.369-7.878.006-14.85C38.761 12.912 33.072 7.962 26 7.962s-12.762 4.95-14.155 12.065c-1.363 6.972-2.439 11.589.006 14.85C14.634 38.59 17.878 38.6 26 38.6z'></path><path d='M26 11.056c-7.039 0-11.36 6.323-10.829 15C15.635 33.64 20.044 38.977 26 38.977c5.955 0 10.364-5.337 10.828-12.917.532-8.681-3.789-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.272l9.823 4.175 3.558 8.663-.232 11.756-1.779.851s-2.552-10.673-2.785-14.773L28.94 10.9 26 10.359l-2.94.541-5.645 8.044c-.233 4.1-2.785 14.773-2.785 14.773l-1.779-.851-.232-11.756 3.558-8.663z'></path></g></svg>"
          ]
       ],
       [
          [
             "<svg alt='page 2 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='cc0ddd4b-e6f7-4cd0-9782-98a79309b02d' data-name='60'><path d='M38.143 29.047L35.9 44.594l-3.635-4.332L26 45.289l-6.266-5.027-3.635 4.332-2.243-15.547'></path><path d='M26 11.336c-7.039 0-11.36 6.323-10.829 15C15.635 33.92 20.044 39.257 26 39.257S36.364 33.92 36.828 26.34c.532-8.681-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.876c5.878 0 12.565 5.415 13.612 12.282a29.174 29.174 0 0 1-1.392 13.381s-2.088-7.5-2.784-9.823l-6.111-8.2c-2.011 4.176-6.5 7.58-6.5 7.58l-1.315-6.653c-1.547 2.244-4.95 7.271-4.95 7.271-.7 2.32-2.784 9.823-2.784 9.823a29.174 29.174 0 0 1-1.392-13.381c1.05-6.865 7.737-12.28 13.616-12.28'></path></g></svg>",
             "<svg alt='page 2 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='4615a660-7dc4-4a7e-aadc-84c29130c639' data-name='87'><path d='M13.4 17.637l-4.949 8.4 3.049 1.338.625 6.875 1.5 5.5 3.125-1.25 1.301 2.387L26 34.75 13.4 17.637zM38.6 17.637l4.949 8.4-3.048 1.338-.625 6.875-1.5 5.5-3.125-1.25-1.302 2.387L26 34.75l12.6-17.113z'></path><path d='M26 11.113c-7.039 0-11.36 6.325-10.829 15.005C15.636 33.7 20.044 39.034 26 39.034s10.364-5.337 10.828-12.916c.532-8.68-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 7.029c5.878 0 13.184 6.035 14.232 12.9.7 4.562-.773 7.888-2.011 10.9 0 0-1.089-4.409-1.785-6.73 0 0-3.086-1.969-4.137-4.1a15.979 15.979 0 0 1-1.349-4.471c-3.017 6.806-15.387 8.569-15.387 8.569-.7 2.321-1.784 6.73-1.784 6.73-1.238-3.017-2.707-6.343-2.011-10.9 1.047-6.867 8.353-12.9 14.232-12.9'></path></g></svg>",
             "<svg alt='page 2 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='b2e14c35-1946-4b41-81d0-f8c8e7904392' data-name='125'><path d='M26 22.677l12.272.413 3.404 5.98-1.863.618.437 6.937-1.312-1.812-.5 3.187-2.063-1-2 2.625L26 35.938l-8.374 3.687-2-2.625-2.063 1-.5-3.187-1.312 1.812.437-6.937-1.863-.618 3.404-5.98L26 22.677z'></path><path d='M26 11.1c-7.039 0-11.36 6.323-10.829 15 .464 7.585 4.873 12.921 10.829 12.921 5.957 0 10.365-5.336 10.829-12.915C37.361 17.425 33.039 11.1 26 11.1z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.86l10.961-2.34-2.234 4.15 7.449 3.299-3.469 2.511 3.469 12.387-2.301.883-1.5-6.625-1.625 6.25-8.666-16.292-2.082.75H26l-2.083-.75-8.666 16.292-1.625-6.25-1.5 6.625-2.301-.883 3.469-12.387-3.469-2.511 7.449-3.299-2.234-4.15L26 8.86z'></path></g></svg>",
             "<svg alt='page 2 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='d972bd46-d6a0-4c95-a9b1-97a34f593e86' data-name='117'><path d='M38.143 29.047L35.9 44.594l-3.635-4.332L26 45.289l-6.265-5.027-3.636 4.332-2.243-15.547'></path><path d='M26 11.336c-7.039 0-11.36 6.323-10.829 15C15.635 33.92 20.044 39.257 26 39.257S36.364 33.92 36.828 26.34c.532-8.681-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.876c5.878 0 12.565 5.415 13.612 12.282a29.174 29.174 0 0 1-1.392 13.381S34.278 19.129 32 16.312c-2.375-2.937-6-1.187-6-1.187s-3.625-1.75-6 1.187c-2.278 2.817-6.221 18.227-6.221 18.227a29.187 29.187 0 0 1-1.392-13.381C13.434 14.291 20.121 8.876 26 8.876z'></path></g></svg>",
             "<svg alt='page 2 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='532d0d60-7b44-490c-af43-fb63c2114447' data-name='73'><path d='M26 41.966l4-5.091 4.125 4.25L36 36l3.272 3.182c.14-1.951.228-9.432.228-9.432l3.67-.685c-.055-1.067-3.045-8.69-3.045-8.69l2.025-1.056-6.219-7.8 1.485-.834-5.082-2L26 8.088l-6.334.6-5.082 2 1.484.834-6.218 7.8 2.025 1.056S8.885 28 8.829 29.065l3.671.685s.088 7.481.227 9.432L16 36l1.875 5.125L22 36.875l4 5.091z'></path><path d='M26 12.52c-6.335 0-10.224 5.692-9.746 13.5.418 6.822 4.385 11.624 9.746 11.624 5.36 0 9.328-4.8 9.746-11.624.478-7.808-3.411-13.5-9.746-13.5z' fill='#fff' stroke='#bfbfbf' stroke-width='2.228'></path><path d='M15.883 27.301l5.242-8.801.048 6.388 9.452-7.763 4.656 9.434 1.763-6.126-3.619-8.725-8.168-2.784-6.776 1.671-4.176 5.939-.65 8.354 2.228 2.413z'></path></g></svg>",
             "<svg alt='page 2 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='f6ded76e-1ee7-44e4-87a0-e46a53c01e49' data-name='75'><path d='M26 22.677l12.271.413 3.404 5.98-1.863.618.437 6.937-1.312-1.812-.5 3.187-2.062-1-2 2.625L26 35.938h-.001l-8.374 3.687-2-2.625-2.063 1-.5-3.187-1.312 1.812.437-6.937-1.863-.618 3.404-5.98 12.271-.413H26z'></path><path d='M26 11.1c-7.039 0-11.36 6.323-10.829 15 .464 7.585 4.872 12.922 10.829 12.922 5.955 0 10.364-5.337 10.828-12.916C37.359 17.425 33.038 11.1 26 11.1z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 12.569l10.75 16.806 1.625-6.25 1.499 6.625 2.301-.883-3.469-12.387 3.469-2.511-7.449-3.299 2.234-4.15L26 8.86 15.038 6.52l2.235 4.15-7.449 3.299 3.469 2.511-3.469 12.387 2.3.883 1.5-6.625 1.625 6.25 10.75-16.806'></path><path d='M30.75 12.625S29 19.875 26 24.75c-3-4.875-4.75-12.125-4.75-12.125'></path></g></svg>"
          ],
          [
             "<svg alt='page 2 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='4e237da4-892c-4c60-834b-a5450abee34c' data-name='42'><path d='M26 32.755l-10.596-1.083.619 8.508 1.919 1.469 2.654-.707 1.691-6.253.739 7.115 2.974.928 2.973-.928.739-7.115 1.691 6.253 2.655.707 1.919-1.469.618-8.508L26 32.755'></path><path d='M26 11.1c-7.039 0-11.36 6.323-10.829 15 .464 7.583 4.873 12.92 10.829 12.92s10.364-5.337 10.828-12.917C37.36 17.422 33.038 11.1 26 11.1z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 12.259c-.827.215-3.325.508-3.325.508s-.667 2.209-1.7 5.679a41.157 41.157 0 0 0-1.549 6.654l-2.011 1.16v6.884l-3.326 5.336L11 37.4a68.642 68.642 0 0 1 .773-8.586l-2.015-2.789c.7-13.3 9.2-19.18 9.2-19.18L20.122 7l.928-.309 2.244.7.309-.31 2.4.7 2.4-.7.309.31 2.243-.7.922.309 1.16-.154s8.508 5.878 9.2 19.18l-2.01 2.785A68.838 68.838 0 0 1 41 37.4l-3.09 1.078-3.326-5.336v-6.884L32.573 25.1a41.157 41.157 0 0 0-1.547-6.652c-1.034-3.47-1.7-5.679-1.7-5.679s-2.5-.293-3.325-.508z'></path></g></svg>",
             "<svg alt='page 2 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='25fe76a5-0c33-4d78-b468-c23e7d118e45' data-name='89'><path d='M25.999 25.423l12.126 2.16L35 38l-2.167-1.043-2.922 1.167-3.912-1.25-3.91 1.25-2.923-1.167L17 38l-3.126-10.417 12.125-2.16M12.107 20.307l1.47 2.384 1.784.117.656-4.814-1.626-.245-2.284 2.558z'></path><path d='M11.813 25.25l1.437 2.875 2.662-.618.026-4.045-2.444.038-1.681 1.75zM39.892 20.307l-1.47 2.384-1.784.117-.656-4.814 1.626-.245 2.284 2.558zM40.187 25.25l-1.438 2.875-2.662-.618-.025-4.045 2.443.038 1.682 1.75z'></path><path d='M26 11.117c-7.038 0-11.36 6.323-10.829 15C15.639 33.7 20.047 39.038 26 39.038c5.956 0 10.365-5.337 10.828-12.917.535-8.681-3.786-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M15.249 16.875L16.374 18l3-3.125-.375-2.5.75-.5L21.624 14l3-.625 1.375-3.545-4-.58-2.167 2.416-1.083.709-3.375 1.25-.125 3.25zM36.75 16.875L35.625 18l-3-3.125.375-2.5-.75-.5L30.375 14l-3-.625-1.376-3.545L30 9.25l2.167 2.416 1.083.709 3.375 1.25.125 3.25z'></path></g></svg>",
             "<svg alt='page 2 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='9676071f-dc03-4ca3-a82b-283ebbe89327' data-name='57'><path d='M26 11.076c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.661 20.044 39 26 39s10.364-5.337 10.828-12.917C37.36 17.4 33.038 11.076 26 11.076z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.383 24.534a21.041 21.041 0 0 0 .745 3.326l4.354-8.93-5.265 2.2s.083 2.244.166 3.404zM38.782 21.131l-5.265-2.2 4.353 8.93a20.924 20.924 0 0 0 .745-3.326c.085-1.161.167-3.404.167-3.404z'></path><path d='M26 7.534a12.809 12.809 0 0 0-12.808 12.81v2.025h.664S15.945 16.49 26 16.49s12.143 5.879 12.143 5.879h.664v-2.025A12.809 12.809 0 0 0 26 7.534z' fill='gray'></path><path d='M26 18.669c7.085 0 10.454 2.877 11.9 4.744a1.767 1.767 0 0 0 .941-.967s-2.355-6.3-12.838-6.3-12.84 6.3-12.84 6.3a1.769 1.769 0 0 0 .943.967c1.439-1.867 4.809-4.744 11.894-4.744z' fill='#404040'></path><path d='M28.419 7.771a12.464 12.464 0 0 0-4.838 0c-2.648 1.345-6.769 4.6-7.094 11.863h.031a10.888 10.888 0 0 1 1.294-.989c.758-7.326 5.73-9.7 7.569-10.327V16.5c.2-.006.407-.014.619-.014s.414.008.618.014V8.32c1.839.627 6.811 3 7.569 10.327a10.807 10.807 0 0 1 1.294.989h.031c-.325-7.269-4.446-10.52-7.093-11.865z' fill='#404040'></path></g></svg>",
             "<svg alt='page 2 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='191aee2a-8dfc-4bf7-b795-d80a9cbc60ea' data-name='54'><path d='M26 33.891s6.768.712 11.137-2.45c4.847-3.506 7.013-8.971 4.95-15.159-2.3-6.9-7-9.5-16.087-9.5s-13.789 2.6-16.088 9.5c-2.063 6.188.1 11.653 4.949 15.159C19.231 34.6 26 33.891 26 33.891z'></path><path d='M26 11.1c-7.039 0-11.36 6.323-10.829 15 .464 7.585 4.873 12.922 10.829 12.922s10.364-5.337 10.828-12.918C37.36 17.424 33.038 11.1 26 11.1z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.7l5.336 1.857 6.5 4.95 1.083 10.518-1.679 6.55-2.371-2.375a16.538 16.538 0 0 0 .721-5.26 25.442 25.442 0 0 0-1.134-5.156l-2.166-2.367s-1.186.722-6.29.722-6.291-.722-6.291-.722l-2.166 2.371a25.486 25.486 0 0 0-1.135 5.156 16.557 16.557 0 0 0 .722 5.26l-2.371 2.371-1.676-6.548 1.083-10.518 6.5-4.95z'></path></g></svg>",
             "<svg alt='page 2 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='c6aec926-e9f8-4105-9de4-6fd7d0a05f19' data-name='80'><path d='M26 25.423l12.125 2.16-.042 12.377-2.333 3.75-2.917-2.793-2.922 2.917-3.911-3-3.911 3-2.923-2.917-2.917 2.793-2.333-3.75-.042-12.377L26 25.423M12.107 20.307l1.471 2.384 1.784.117.655-4.814-1.625-.245-2.285 2.558z'></path><path d='M11.812 25.25l1.438 2.875 2.662-.618.025-4.045-2.443.038-1.682 1.75zM39.893 20.307l-1.471 2.384-1.784.117-.655-4.814 1.625-.245 2.285 2.558zM40.187 25.25l-1.437 2.875-2.662-.618-.026-4.045 2.444.038 1.681 1.75z'></path><path d='M26 11.117c-7.038 0-11.359 6.323-10.828 15C15.639 33.7 20.048 39.038 26 39.038c5.955 0 10.364-5.337 10.828-12.917.536-8.681-3.786-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M15.249 16.875L16.374 18l3-3.125-.375-2.5.75-.5L21.624 14l3-.625L26 9.83l-4.001-.58-2.166 2.416-1.084.709-3.375 1.25-.125 3.25zM36.75 16.875L35.625 18l-3-3.125.375-2.5-.75-.5L30.375 14l-3-.625L26 9.83l4-.58 2.167 2.416 1.083.709 3.375 1.25.125 3.25z'></path></g></svg>",
             "<svg alt='page 2 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='8ad11637-14e4-4b25-b5ab-fd9c91291861' data-name='34'><path d='M26 11.061c-7.038 0-11.359 6.324-10.828 15 .464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.531-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M17.999 20.875l-3.937 6.75-.438-6.187 4.375-.563zM34.124 20.875l3.938 6.75.437-6.187-4.375-.563z'></path><path d='M26 7.348c-6.59 0-12.762 5.647-12.762 15.469 0 0 4.476-2.475 12.762-2.475s12.763 2.475 12.763 2.475C38.762 13 32.589 7.348 26 7.348z' fill='gray'></path><path d='M22.566 14.114l.254 6.357c.4-.031.815-.057 1.239-.077l-.178-6.324zm2.856 6.239c.194 0 .38-.011.577-.011.229 0 .441.009.664.013v-6.33l-1.327.016zm-5.623-6.1l.4 6.525q.592-.093 1.233-.169l-.332-6.425zm-6.562 8.562s.144-.077.409-.2l-.213-2.705a21.449 21.449 0 0 0-.196 2.907zm3.837-8.373l.518 6.852c.382-.093.792-.183 1.222-.27l-.465-6.677zM15 14.606c-.182.371-.352.754-.508 1.153l.512 6.306c.351-.127.759-.26 1.214-.4l-.568-7.114zm12.937 5.788c.424.02.839.046 1.239.077l.254-6.357-1.315-.044zm8.4-5.84l-.569 7.114c.455.137.864.27 1.215.4l.512-6.306c-.156-.4-.327-.782-.51-1.153zm2.221 5.36l-.212 2.7c.263.122.407.2.407.2a21.585 21.585 0 0 0-.186-2.9zm-5.382 1.113c.43.086.84.176 1.223.269l.517-6.852-1.275-.1zm-2.614-.416c.427.051.837.107 1.233.169l.4-6.525-1.3-.071z' fill='#404040'></path><path d='M14.953 14.71a16.185 16.185 0 0 0-.665 1.594A31.056 31.056 0 0 1 26 14.232 31.044 31.044 0 0 1 37.71 16.3a15.939 15.939 0 0 0-.663-1.594A33.276 33.276 0 0 0 26 13a33.276 33.276 0 0 0-11.047 1.71zM33.157 11.752a.7.7 0 0 0 .672-.121l.665-.609q-.248-.256-.507-.5a.555.555 0 0 0-.112.073l-.794.728a.236.236 0 0 0 .076.429zM32.573 9.4a12 12 0 0 0-1.313-.78.226.226 0 0 0 .14.338l1 .406a.579.579 0 0 0 .173.036zm-8.255.96l1.184.576a1.147 1.147 0 0 0 .887 0c.245-.119.245-.313 0-.432l-1.183-.576a1.14 1.14 0 0 0-.888 0c-.245.12-.245.314 0 .433zm1.6-1.908a1.135 1.135 0 0 0 .886 0l1.184-.576c.181-.088.226-.217.141-.326a11.159 11.159 0 0 0-.928-.138.615.615 0 0 0-.1.032l-1.183.576c-.244.12-.244.314.002.433zm7.442 2.4a.237.237 0 0 0-.077-.427l-1-.405a.7.7 0 0 0-.674.122.236.236 0 0 0 .077.425l1 .406a.7.7 0 0 0 .676-.121zm-9.042-2.124L25.5 9.3a1.147 1.147 0 0 0 .887 0c.245-.119.245-.313 0-.432L25.206 8.3a1.132 1.132 0 0 0-.888 0c-.245.114-.245.307 0 .428zm10.519 3.357a.7.7 0 0 0-.673.12l-.8.729a.235.235 0 0 0 .078.425.691.691 0 0 0 .671-.12l.8-.729a.235.235 0 0 0-.076-.425zm-1.969-1.942a.691.691 0 0 0 .6-.074c-.188-.154-.379-.3-.573-.444l-.1.093a.235.235 0 0 0 .073.425zm.707 1.891l-1-.406a.7.7 0 0 0-.674.12.235.235 0 0 0 .077.425l1 .408a.694.694 0 0 0 .67-.122.235.235 0 0 0-.073-.425zm-14.444-1.891a.235.235 0 0 0 .077-.425l-.1-.093c-.2.141-.386.29-.574.444a.691.691 0 0 0 .597.074zm.292 1.485l-1 .406a.235.235 0 0 0-.077.425.7.7 0 0 0 .672.122l1-.408a.236.236 0 0 0 .078-.425.7.7 0 0 0-.673-.12zm8.567-.916a1.138 1.138 0 0 0-.887 0l-1.183.576c-.246.12-.246.314 0 .433a1.153 1.153 0 0 0 .886 0l1.184-.576c.245-.12.245-.313 0-.433zm-10.156 1.493a.7.7 0 0 0-.672-.12.236.236 0 0 0-.077.425l.795.729a.7.7 0 0 0 .673.12.235.235 0 0 0 .076-.425zm8.555-.067l-1.183-.575a1.132 1.132 0 0 0-.888 0c-.245.119-.245.313 0 .431l1.184.576a1.138 1.138 0 0 0 .887 0c.245-.119.245-.311 0-.432zm-7.548-.386a.236.236 0 0 0 .078-.426l-.8-.728a.555.555 0 0 0-.112-.073c-.173.16-.341.326-.508.5l.666.609a.7.7 0 0 0 .676.118zm9.149-2.674a1.147 1.147 0 0 0-.887 0l-1.183.577c-.246.119-.246.312 0 .432a1.135 1.135 0 0 0 .886 0l1.184-.577c.245-.119.245-.31 0-.432zm-1.6-1.409c.171-.083.215-.2.148-.307-.18-.007-.358-.014-.538-.014-.352 0-.7.02-1.051.051l.554.27a1.138 1.138 0 0 0 .886 0zM19.426 9.4a.579.579 0 0 0 .173-.036l1-.406a.225.225 0 0 0 .139-.338 12.08 12.08 0 0 0-1.312.78zm.285.619l-1 .405a.237.237 0 0 0-.076.427.7.7 0 0 0 .671.121l1-.406a.236.236 0 0 0 .077-.425.7.7 0 0 0-.672-.121z' fill='#404040'></path></g></svg>"
          ],
          [
             "<svg alt='page 2 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='1d8cb05e-5b20-4a41-ba9a-c4776534ef09' data-name='23'><path d='M26 11.282c-7.038 0-11.359 6.324-10.828 15C15.636 33.866 20.045 39.2 26 39.2c5.955 0 10.364-5.337 10.828-12.917.532-8.677-3.789-15.001-10.828-15.001z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 10.044a10.983 10.983 0 0 1 8.208 3.478c2.811 2.988 4.181 7.548 3.856 12.84l-.1-1.081H37.6c-.359-4.744-4-10.587-4-10.587a39.517 39.517 0 0 1-7.6.687 39.5 39.5 0 0 1-7.6-.687s-3.64 5.843-4 10.587h-.36l-.1 1.081c-.325-5.292 1.045-9.852 3.856-12.84A10.986 10.986 0 0 1 26 10.044z'></path></g></svg>",
             "<svg alt='page 2 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='4970c0b8-db3d-4df9-a992-8a789910a97d' data-name='86'><path d='M26 11.171c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916C37.36 17.5 33.038 11.171 26 11.171z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.83 16.044c-.987-2.233-4.642-6.187-10.83-6.187s-9.843 3.954-10.83 6.187c-2.555 5.781-1.561 10.28-1.237 15.572h1.34c-.309-4.95.181-11.093 1.2-13.135 1.134-2.268 2.7-3 4.312-2.7 2.051.381 2.532 1.95 5.213 1.95s3.162-1.569 5.213-1.95c1.612-.3 3.178.431 4.312 2.7 1.021 2.042 1.511 8.185 1.2 13.135h1.34c.328-5.292 1.322-9.791-1.233-15.572z'></path></g></svg>",
             "<svg alt='page 2 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='42104989-ea65-4405-b0ba-8f644bc12b74' data-name='88'><path d='M26 11.175c-7.038 0-11.359 6.323-10.828 15C15.635 33.759 20.044 39.1 26 39.1c5.955 0 10.364-5.337 10.828-12.917C37.359 17.5 33.037 11.175 26 11.175z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M15.171 15.016c-2.556 5.781-1.562 11.311-1.237 16.6h1.339A54.8 54.8 0 0 1 16.1 18.3c.582-2.185 1.454-5.4 4.5-6.188 2.964-.766 2.718 1.8 5.4 1.8V9.318c-3.23 0-8.87 1.264-10.829 5.698zM36.829 15.016c-1.96-4.434-7.6-5.7-10.829-5.7v4.591c2.681 0 2.435-2.566 5.4-1.8 3.047.788 3.919 4 4.5 6.188a54.8 54.8 0 0 1 .826 13.322h1.34c.324-5.29 1.317-10.817-1.237-16.601z'></path></g></svg>",
             "<svg alt='page 2 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='088e9151-58f8-4b33-b548-2235fd7dacc2' data-name='118'><path d='M26 35.625c9.5.25 14.221-2.878 14.5-5.625a27.626 27.626 0 0 0-2.125-13.375s-7-7.75-12.375-7.75-12.375 7.75-12.375 7.75A27.626 27.626 0 0 0 11.5 30c.279 2.747 5 5.875 14.5 5.625z'></path><path d='M26 11.215c-7.037 0-11.359 6.323-10.828 15C15.637 33.8 20.045 39.136 26 39.136c5.955 0 10.363-5.337 10.828-12.917.533-8.681-3.789-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14a28.625 28.625 0 0 1 6.375.875 20.256 20.256 0 0 1 3.875 8.375c.848 4.231 1.625 5.5 1.625 5.5l2.5-2.75S42.5 7.25 26 7.25 11.625 26 11.625 26l2.5 2.75s.778-1.269 1.625-5.5a20.256 20.256 0 0 1 3.875-8.375A28.625 28.625 0 0 1 26 14'></path></g></svg>",
             "<svg alt='page 2 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='ed8b78b7-78b1-4fa4-b771-7ffe6e5fe6b5' data-name='39'><path d='M26 11.122c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.21 10.649A6.28 6.28 0 0 0 33.973 9.4c-.524-.2-2.456 1.915-2.456 1.915s-.58-2.821-1.271-2.953A22.751 22.751 0 0 0 26 7.951c-4.628.01-9.369 1.714-10.21 2.7-1.7 1.991-2.7 9.4-2.089 12.859h1.964a42.75 42.75 0 0 1 .692-4.548c.825-2.5 4.318-4.615 9.642-4.615s8.817 2.114 9.642 4.615a42.75 42.75 0 0 1 .692 4.548H38.3c.614-3.458-.39-10.87-2.09-12.861z'></path></g></svg>",
             "<svg alt='page 2 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='0243b30f-4f37-4b2c-aafc-fc089fab3bce' data-name='36'><path d='M26 11.248c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 9.6c7.2 0 9.251 1.512 9.251 1.512 4.357 7.116 3.468 17.878 3.468 17.878h-1.512L36.21 22l-2.166-5.149s-1.818 1.48-8.044 1.48-8.045-1.48-8.045-1.48L15.79 22l-1 6.987h-1.51s-.889-10.762 3.469-17.878c0 0 2.051-1.509 9.251-1.509z'></path></g></svg>"
          ],
          [
             "<svg alt='page 2 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='85e3ece8-0a9b-414c-94b3-bcffe5ce880a' data-name='45'><path d='M26 11.2c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916C37.36 17.525 33.038 11.2 26 11.2z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M35.591 14.141A12.239 12.239 0 0 0 26 9.683a12.237 12.237 0 0 0-9.591 4.458c-3.636 4.794-2.949 11.973-2.94 12.219l3.945-8.816S20.43 15.455 26 15.455c5.569 0 8.585 2.089 8.585 2.089l3.944 8.816c.011-.246.696-7.425-2.938-12.219z'></path></g></svg>",
             "<svg alt='page 2 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='dcb8ae14-fb9c-4dff-a5d9-b82b5ccee70a' data-name='67'><path d='M26 11.089c-7.038 0-11.359 6.324-10.828 15.005.464 7.58 4.872 12.917 10.828 12.917 5.956 0 10.364-5.337 10.828-12.917.536-8.681-3.786-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 7.7c6.6 0 10.906 5.166 12.221 11.2a38.517 38.517 0 0 1 .542 9.9h-1.776s-.7-9.049-4.1-13.845c0 0-1.934 1.47-6.806 1.47H26c-4.872 0-6.806-1.47-6.806-1.47-3.4 4.8-4.1 13.845-4.1 13.845h-1.78a38.517 38.517 0 0 1 .542-9.9c1.315-6.033 5.617-11.2 12.221-11.2z'></path></g></svg>",
             "<svg alt='page 2 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='49947575-fd68-4307-bf6d-2f68a1bce98b' data-name='59'><path d='M26 11.037c-7.038 0-11.359 6.324-10.828 15.005.464 7.58 4.873 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 7.016c-7.073 0-12.808 7.347-12.808 15.609v7.13H15.4s-1.933-12.608 6.188-16.784c0 0 .7 1.469 4.408 1.469s4.409-1.469 4.409-1.469C38.53 17.147 36.6 29.755 36.6 29.755h2.212v-7.13C38.809 14.363 33.073 7.016 26 7.016z'></path></g></svg>",
             "<svg alt='page 2 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='cc08e264-7ca7-43b0-9e4a-f28f358edc97' data-name='65'><path d='M26 11.1c-7.038 0-11.359 6.324-10.828 15 .464 7.589 4.873 12.925 10.828 12.925 5.955 0 10.364-5.336 10.828-12.917C37.36 17.428 33.039 11.1 26 11.1z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 7.871a12.809 12.809 0 0 0-12.808 12.81v4.654h1.98S15.636 11.568 26 11.568s10.829 13.767 10.829 13.767h1.98v-4.654A12.81 12.81 0 0 0 26 7.871z'></path></g></svg>",
             "<svg alt='page 2 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='7732f9e0-fac9-4ad3-8421-da83051dee04' data-name='41'><path d='M26.01 11.182c-7.039 0-11.36 6.323-10.828 15C15.646 33.766 20.054 39.1 26.01 39.1c5.956 0 10.364-5.337 10.828-12.917.532-8.678-3.789-15.001-10.828-15.001z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M18.971 16.673a15.185 15.185 0 0 0-2.4 9.358l-4.606-.531s-.109-6.43 2.907-10.451zM33.216 16.673a15.188 15.188 0 0 1 2.4 9.358l4.609-.531s.109-6.43-2.907-10.451z'></path></g></svg>",
             "<svg alt='page 2 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M26 11.094c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475' id='3e78d6ab-376b-40d6-b981-4e8a44cf610d' data-name='30'></path></svg>"
          ],
          [
             "<svg alt='page 2 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='c3c7836f-57ef-4afb-8acc-9fc4992256af' data-name='12'><path d='M39.52 21.126a13.561 13.561 0 0 0-27.04 0s-1.127 9.31 2.253 16.069C17.415 42.559 21.137 45.6 26 45.6s8.584-3.043 11.266-8.407c3.381-6.757 2.254-16.067 2.254-16.067z'></path><path d='M26 11.338c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.132 27.886s12.248-2.7 18.436-12.371a61.225 61.225 0 0 0 2.707 6.651c2.368 4.6 5.185 5.72 5.185 5.72l-3.329-14.3L27 9.018l-7.579 1.856-5.934 7.826z'></path></g></svg>",
             "<svg alt='page 2 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='21c787fb-cb16-4795-9161-3364ef60106a' data-name='16'><path d='M39.223 21.268A13.508 13.508 0 0 0 26 8.46a13.507 13.507 0 0 0-13.224 12.808s-1.587 9.331.475 15.83c2.312 7.293 6.641 8.361 12.748 8.361s10.438-1.068 12.749-8.359c2.062-6.5.475-15.832.475-15.832z'></path><path d='M26 11.323c-7.038 0-11.359 6.325-10.828 15.005.464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.531-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.673 15.458l-5.8-5.527-9.515-.231-6.27 5.759L12.9 26.131s5.215-3.825 7.536-8.156c0 0-.79 2.573-.7 2.552a8.068 8.068 0 0 0 4.564-2.939s-.078.7-.155 2.321c0 0 1.548.141 4.176-1.393a9.468 9.468 0 0 0 2.785-2.4c1.957 4.328 8 10.012 8 10.012z'></path></g></svg>",
             "<svg alt='page 2 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='8bab59cd-0d61-4aaa-8688-e4b7d49bfae2' data-name='10'><path d='M39.638 19.8C37.919 13.692 33.072 8.475 26 8.475S14.08 13.692 12.361 19.8c-1.523 5.409-2.064 10.025.653 18.264 1.837 5.574 7.115 7.367 12.985 7.367s11.148-1.793 12.986-7.367c2.715-8.239 2.175-12.855.653-18.264z'></path><path d='M26 11.322c-7.038 0-11.359 6.324-10.828 15.005.464 7.58 4.873 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.022 14.559l-3.677-3.854L26 9.46l-6.344 1.245-3.677 3.854-2.964 7.969.355 9.25s5.929-11.91 7.708-17.07L26 15.5l4.922-.79c1.779 5.16 7.71 17.07 7.71 17.07l.354-9.25z'></path></g></svg>",
             "<svg alt='page 2 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='4d042130-2e98-4581-82ed-b47e87874586' data-name='82'><path d='M26 44.75c5.25 0 8.758-4.146 10.25-7.125a10.705 10.705 0 0 0 1.268-4.97l3.857-.03s-1.645-3.016-2.75-11.273S33.134 8.377 26 8.377c-7.133 0-11.516 4.722-12.625 12.975s-2.75 11.273-2.75 11.273l3.857.03a10.69 10.69 0 0 0 1.268 4.97c1.491 2.979 5 7.125 10.25 7.125'></path><path d='M26 11.11c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916 5.955 0 10.364-5.337 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M41.249 31a37.74 37.74 0 0 1-2.137-7.014L37.5 17.5l-5.025-6.926L26 9.25l-6.475 1.324L14.5 17.5l-1.612 6.486A37.61 37.61 0 0 1 10.749 31c-1.182 2.761-2.5 6.125-.875 9.75C11.329 44 17.124 46 17.124 46l2.75-5.75a57.464 57.464 0 0 1-3.25-5.5c-.744-3.834-.336-12.625 3-18 2.25-3.625 4.5-3.875 6.375-4.023 1.875.148 4.125.4 6.375 4.023 3.336 5.375 3.744 14.166 3 18a57.464 57.464 0 0 1-3.25 5.5l2.75 5.75s5.795-2 7.25-5.25c1.625-3.625.307-6.989-.875-9.75z'></path></g></svg>",
             "<svg alt='page 2 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='dc9acf92-9f8c-4bf4-9e83-5721fa18c6a6' data-name='128'><path d='M26 44.75c5.25 0 8.758-4.146 10.25-7.125a10.69 10.69 0 0 0 1.268-4.97l3.858-.03s-1.645-3.016-2.75-11.273S33.133 8.377 26 8.377c-7.133 0-11.516 4.722-12.625 12.975s-2.75 11.273-2.75 11.273l3.857.03a10.674 10.674 0 0 0 1.268 4.97c1.491 2.979 5 7.125 10.25 7.125'></path><path d='M26 11.11c-7.039 0-11.36 6.324-10.829 15.005.463 7.579 4.872 12.916 10.829 12.916 5.956 0 10.365-5.337 10.829-12.916C37.358 17.434 33.038 11.11 26 11.11z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M41.249 31a37.74 37.74 0 0 1-2.137-7.014L37.5 17.5l-5.026-6.926L26 9.25l-6.475 1.324L14.5 17.5l-1.613 6.486A37.651 37.651 0 0 1 10.749 31c-1.182 2.761-2.5 6.125-.875 9.75C11.329 44 17.124 46 17.124 46l2.75-5.75a57.256 57.256 0 0 1-3.25-5.5c-.745-3.834-.336-12.625 3-18 2.25-3.625 4.5-3.875 6.375-4.023 1.875.148 4.125.4 6.375 4.023 3.336 5.375 3.744 14.166 3 18a57.464 57.464 0 0 1-3.25 5.5l2.75 5.75s5.795-2 7.25-5.25c1.625-3.625.307-6.989-.875-9.75z'></path><path d='M15.832 23.333l.666 3.834s10.917-8.583 15.25-16.75L26 9.25l-10.417 7z'></path></g></svg>",
             "<svg alt='page 2 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='86d74c4a-95b4-42d7-ba1b-50d9f97c8c89' data-name='129'><path d='M26 44.75c5.25 0 8.758-4.146 10.251-7.125a10.7 10.7 0 0 0 1.267-4.97l3.858-.03s-1.645-3.016-2.75-11.273S33.134 8.377 26 8.377c-7.133 0-11.516 4.722-12.625 12.975s-2.75 11.273-2.75 11.273l3.857.03a10.69 10.69 0 0 0 1.268 4.97c1.491 2.979 5 7.125 10.25 7.125'></path><path d='M26 11.11c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916 5.955 0 10.365-5.337 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M41.25 31a37.651 37.651 0 0 1-2.137-7.014L37.5 17.5l-5.026-6.926L26 9.25l-6.475 1.324L14.5 17.5l-1.612 6.486A37.61 37.61 0 0 1 10.749 31c-1.182 2.761-2.5 6.125-.875 9.75C11.329 44 17.124 46 17.124 46l2.75-5.75a57.464 57.464 0 0 1-3.25-5.5c-.744-3.834-.336-12.625 3-18 2.25-3.625 4.5-3.875 6.375-4.023 1.875.148 4.125.4 6.375 4.023 3.336 5.375 3.745 14.166 3 18a57.452 57.452 0 0 1-3.251 5.5L34.874 46s5.795-2 7.251-5.25c1.625-3.625.306-6.989-.875-9.75z'></path><path d='M34 22.416V13.5l-8-4.167-8 4.167v8.916h16z'></path></g></svg>"
          ]
       ],
       [
          [
             "<svg alt='page 3 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='ab6385d2-efe4-44bd-920d-7ee8b2e60a6e' data-name='14'><path d='M26 45.6c3.913 0 9.823-.7 11.6-3.48 1.574-2.464 0-5.723 0-5.723l-.183-3.784h1.113s2.088-3.023.99-11.208S33.073 8.535 26 8.535 13.578 13.217 12.48 21.4s.989 11.208.989 11.208h1.112l-.181 3.786s-1.575 3.259 0 5.723C16.176 44.9 22.086 45.6 26 45.6z'></path><path d='M26 11.334c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.085 24.011l-2.1-8.81-8.325-6.078-9.08 1.592-6.093 7.9L13 24.011l.627 8.539h2.412V24.2a23.04 23.04 0 0 0 13.518-7.9 16.252 16.252 0 0 0 2.4 4.08 25.006 25.006 0 0 0 4.007 3.811v8.359h2.413z'></path></g></svg>",
             "<svg alt='page 3 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='8e4565e3-9776-4484-8661-0cbe368dc1cc' data-name='95'><path d='M26 8.484c7.074 0 12.5 5.812 13.922 12.809 1.449 7.124 2.563 14.734-6.627 23.926l-1.075-2.293-1.889 1.668-.387-2.321L26 45.693l-3.944-3.42-.387 2.321-1.89-1.668-1.072 2.293c-9.191-9.192-8.077-16.7-6.629-23.828C13.5 14.4 18.927 8.484 26 8.484z'></path><path d='M26 11.336c-7.038 0-11.359 6.324-10.828 15.005.463 7.579 4.872 12.917 10.828 12.917 5.956 0 10.364-5.338 10.828-12.917.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 9.325l5.957.929 3.037 2.783 4.928 10.055-1.777 12.22-1.934-.927c1.778-10.287-.619-15.7-.619-15.7S28.048 11.5 26 11.5s-9.591 7.184-9.591 7.184-2.4 5.414-.618 15.7l-1.934.927-1.779-12.22 4.929-10.055 3.038-2.783z'></path><path d='M14 28s10.25-3.125 14.875-13.5c0 0 2.938 10.562 9.125 13.5l-1.25-11.5L26 10.062 15.749 15.75z'></path></g></svg>",
             "<svg alt='page 3 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='5cd81e56-1a05-4c1c-9f82-0fe26b0e264e' data-name='105'><path d='M39.758 20.7C37.8 12.4 33.073 8.484 26 8.484S14.2 12.4 12.243 20.7c-1.849 7.843-.782 12.1 1.126 16.681 2.876 6.907 4.981 7.363 4.981 7.363l3.913-1.424L26 45.693l3.736-2.373 3.913 1.424s2.106-.456 4.982-7.363c1.908-4.581 2.975-8.838 1.127-16.681z'></path><path d='M26 11.336c-7.039 0-11.36 6.324-10.829 15.005.465 7.579 4.873 12.917 10.829 12.917s10.365-5.338 10.828-12.917C37.36 17.66 33.038 11.336 26 11.336z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M31.083 17.446s1.75 3.137 3.75 7.637c1.92 4.32 4.568 10.2 4.568 10.2V22.3l-4.388-9.6L26 8.783 16.987 12.7 12.6 22.3v12.987s4.792-6.06 8.318-9.564a83.542 83.542 0 0 1 10.165-8.277z'></path></g></svg>",
             "<svg alt='page 3 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='b6b9ad1b-5e13-4839-9406-ddc86415b80f' data-name='100'><path d='M26 45.6c3.913 0 9.823-.7 11.6-3.481 1.574-2.465 0-5.723 0-5.723l-.184-3.785h1.114s2.088-3.022.99-11.207S33.073 8.535 26 8.535 13.578 13.217 12.48 21.4s.989 11.207.989 11.207h1.111l-.18 3.787s-1.574 3.258 0 5.723C16.176 44.9 22.086 45.6 26 45.6z'></path><path d='M26 11.334c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.872 12.916 10.829 12.916 5.955 0 10.365-5.337 10.828-12.916.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 23.941c4.266.066 8.115-.046 9.963.254v8.356h2.412L39 24.012l-.488-5.4-6.094-7.9L26 9.123l-6.42 1.592-6.092 7.9-.49 5.4.627 8.539h2.412V24.2A75.171 75.171 0 0 1 26 23.941z'></path></g></svg>",
             "<svg alt='page 3 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='ff8980ef-ed9b-46d1-ad43-efaccf8d9420' data-name='6'><path d='M26 8.484c7.073 0 12.5 5.811 13.921 12.809 1.449 7.123 2.563 14.734-6.627 23.925l-1.074-2.293-1.889 1.669-.387-2.321L26 45.692l-3.945-3.419-.387 2.321-1.889-1.669-1.073 2.293c-9.191-9.191-8.077-16.7-6.629-23.827C13.5 14.393 18.926 8.484 26 8.484z'></path><path d='M26 11.336c-7.039 0-11.36 6.324-10.829 15C15.635 33.92 20.044 39.257 26 39.257S36.364 33.92 36.828 26.34c.532-8.68-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 9.325l5.956.928 3.037 2.784 4.928 10.055-1.778 12.22-1.933-.928c1.778-10.286-.62-15.7-.62-15.7l-4.027-2.4c-1.611-.108-3.515-.172-5.563-.172s-3.954.064-5.563.172l-4.029 2.4s-2.4 5.414-.618 15.7l-1.934.928-1.778-12.22 4.928-10.055 3.038-2.784z'></path></g></svg>",
             "<svg alt='page 3 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='c4b6f583-c765-468c-918a-64c411690466' data-name='20'><path d='M39.757 20.7C37.8 12.4 33.073 8.485 26 8.485S14.2 12.4 12.243 20.7c-1.849 7.843-.783 12.1 1.126 16.681 2.876 6.907 4.981 7.363 4.981 7.363l3.913-1.424L26 45.693l3.736-2.373 3.913 1.424s2.1-.456 4.981-7.363c1.909-4.581 2.976-8.838 1.127-16.681z'></path><path d='M26 11.336c-7.039 0-11.36 6.325-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M33.424 21.352l-.386-3.906s.633 3.767 1.857 8.276a40.386 40.386 0 0 0 4.505 9.565V22.3l-4.388-9.6L26 8.784 16.986 12.7 12.6 22.3v12.987a40.414 40.414 0 0 0 4.507-9.565c1.223-4.509 1.856-8.276 1.856-8.276l-.386 3.906z'></path></g></svg>"
          ],
          [
             "<svg alt='page 3 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='33f4c5dd-239b-400f-8fa9-aaa2ad5bb10f' data-name='93'><path d='M39.283 24v-1.576c0-7.073-6.211-13.936-13.284-13.936s-13.282 6.863-13.282 13.936V24l-1.245 21.459h29.055z'></path><path d='M26 11.325c-7.038 0-11.359 6.324-10.828 15.005.463 7.58 4.872 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M14.083 18.035l3.5-5.2 4.562-2.583 5.1-.917 6.584 2.75 4.851 7.885.42 3.03a5.468 5.468 0 0 1-3.772-2.166 27.715 27.715 0 0 1-2.75-4.5A22.048 22.048 0 0 1 16.393 23l-3.5-.083z'></path></g></svg>",
             "<svg alt='page 3 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='3560bccf-2bc1-4044-a945-09e74fd09952' data-name='102'><path d='M26 45.821l3.094-3.581 2.4 2.516a13.558 13.558 0 0 0 4.408-4.33 14.035 14.035 0 0 0 1.932-5.026l.976 1.268s1.448-1.363 2.04-6.048a28.777 28.777 0 0 0-.559-9.309C40.291 14.234 33.073 8.5 26 8.5s-14.291 5.734-14.291 12.809a28.842 28.842 0 0 0-.559 9.309c.594 4.685 2.041 6.048 2.041 6.048l.975-1.268a14.058 14.058 0 0 0 1.934 5.028 13.577 13.577 0 0 0 4.409 4.33l2.4-2.516z'></path><path d='M26 11.344c-7.038 0-11.359 6.324-10.828 15.005.464 7.579 4.873 12.917 10.828 12.917 5.955 0 10.364-5.338 10.828-12.917.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 12.5l9.191 7.918s.865 7.4-.218 10.262c0 0 3.954-.951 5.022-2.434l-.771-8.657-4.15-7.709L26 9.685l-9.072 2.2-4.152 7.709-.77 8.657c1.067 1.483 5.022 2.434 5.022 2.434-1.083-2.862-.218-10.262-.218-10.262z'></path><path d='M16 21.084L17.416 25s2.25-.5 5-4l-1 4.333a20.565 20.565 0 0 0 10.917-8L30.749 12 26 10.333 15.249 17z'></path></g></svg>",
             "<svg alt='page 3 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='71e340fd-57f2-4932-96a4-fc0758d5bfdd' data-name='27'><path d='M39.253 23.11s.093 6.909 1.422 10.407c1.692 4.447.712 8.894-2.578 11.651l-1.957-4.18a8.533 8.533 0 0 1-3.825 3.291 15.617 15.617 0 0 1-12.631 0 8.533 8.533 0 0 1-3.825-3.291l-1.959 4.18c-3.291-2.757-4.27-7.2-2.58-11.651 1.329-3.5 1.423-10.407 1.423-10.407z'></path><path d='M26 11.309c-7.039 0-11.36 6.325-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.431 19.138A13.225 13.225 0 0 0 26 8.02a13.225 13.225 0 0 0-13.432 11.118c-.978 5.515-1.512 8.9-4.18 10.495 0 0 7.294.712 10.762-5.959 2.277-4.378 3.113-6.4 3.113-6.4L26 15.047l3.736 2.224s.836 2.025 3.113 6.4c3.468 6.671 10.762 5.959 10.762 5.959-2.668-1.597-3.201-4.977-4.18-10.492z'></path></g></svg>",
             "<svg alt='page 3 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='aebba617-5cd9-47ab-bedd-96c53e7745cd' data-name='4'><path d='M39.283 23.994v-1.572c0-7.073-6.211-13.935-13.284-13.935s-13.282 6.862-13.282 13.935v1.572l-1.245 21.464h29.055z'></path><path d='M26 11.324c-7.038 0-11.359 6.324-10.828 15.005.463 7.579 4.872 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.926 22.88l-3.083-9.418-9.844-4.953-9.842 4.953-3.084 9.418-.178 4.497 4.684-4.367h16.84l4.685 4.367-.178-4.497z'></path></g></svg>",
             "<svg alt='page 3 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='53d56295-60c9-47fc-89cb-ba5315451a95' data-name='17'><path d='M26 45.821l3.094-3.582 2.4 2.517a13.568 13.568 0 0 0 4.406-4.331 14.027 14.027 0 0 0 1.934-5.025l.976 1.268s1.448-1.364 2.04-6.048a28.781 28.781 0 0 0-.559-9.31C40.291 14.234 33.073 8.5 26 8.5s-14.291 5.734-14.291 12.808a28.846 28.846 0 0 0-.559 9.31c.594 4.684 2.041 6.048 2.041 6.048l.975-1.268a14.05 14.05 0 0 0 1.934 5.027 13.587 13.587 0 0 0 4.409 4.331l2.4-2.517z'></path><path d='M26 11.343c-7.038 0-11.359 6.325-10.828 15.005.464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.68-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14.489a8.981 8.981 0 0 0 3.791 4.28 14.92 14.92 0 0 0 5.4 1.649s.865 7.4-.218 10.261c0 0 3.954-.952 5.022-2.433l-.771-8.658-4.15-7.709L26 9.686l-9.072 2.193-4.152 7.709-.77 8.658c1.067 1.481 5.022 2.433 5.022 2.433-1.083-2.862-.218-10.261-.218-10.261a14.915 14.915 0 0 0 5.4-1.649 8.975 8.975 0 0 0 3.79-4.28z'></path></g></svg>",
             "<svg alt='page 3 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='0bb49654-df22-4882-b780-ede3d6a7341d' data-name='110'><path d='M39.254 23.111s.092 6.909 1.422 10.407c1.691 4.447.711 8.894-2.579 11.65l-1.957-4.18a8.525 8.525 0 0 1-3.825 3.291 15.617 15.617 0 0 1-12.631 0 8.526 8.526 0 0 1-3.824-3.291l-1.96 4.18c-3.291-2.756-4.27-7.2-2.58-11.65 1.33-3.5 1.423-10.407 1.423-10.407z'></path><path d='M26 11.31c-7.039 0-11.36 6.325-10.829 15.005C15.635 33.9 20.044 39.23 26 39.23s10.364-5.335 10.828-12.915C37.36 17.635 33.038 11.31 26 11.31z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.431 19.139A13.224 13.224 0 0 0 26 8.021a13.223 13.223 0 0 0-13.43 11.118c-.979 5.514-1.513 8.894-4.181 10.5 0 0 6.294.712 9.763-5.959 2.276-4.378 2.112-6.4 2.112-6.4L26 15.047l5.736 2.224s-.163 2.026 2.113 6.4c3.469 6.671 9.762 5.959 9.762 5.959-2.668-1.597-3.201-4.977-4.18-10.491z'></path><path d='M34 21.125l-2.667 4-2.667-4-2.666 4-2.667-4-2.667 4-2.666-4v-8.209h16.041L34 21.125z'></path></g></svg>"
          ],
          [
             "<svg alt='page 3 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='09d76cf7-e124-4bb9-8796-19dec1166f1b' data-name='123'><path d='M12.48 21.31c-1.1 8.186 2.072 15.224 3.465 18.008 1.478 2.956 6.141 4.548 10.054 4.548V8.444c-7.072 0-12.421 4.682-13.519 12.866zM39.521 21.31C38.423 13.126 33.074 8.444 26 8.444v35.422c3.913 0 8.577-1.592 10.055-4.548 1.393-2.784 4.564-9.818 3.466-18.008z'></path><path d='M26 11.243c-7.039 0-11.36 6.323-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.682-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.5 17.25s-3.229 7-4.45 10.866c-1.425 4.509-1.748 8.53.075 11.009 3.125 4.25 8.475 4.142 8.475 4.142s-2.514-2.207-2.4-7.65c.135-6.472 1.272-16.4 1.575-17.026 2.268-4.669 5.85-5.4 9.225-6.265V9.31l-6.42 1.314z'></path><path d='M38.5 17.25s3.228 7 4.45 10.866c1.425 4.509 1.749 8.53-.075 11.009-3.125 4.25-8.475 4.142-8.475 4.142s2.514-2.207 2.4-7.65c-.135-6.472-1.272-16.4-1.575-17.026-2.268-4.669-5.85-5.4-9.225-6.265V9.31l6.42 1.314z'></path><path d='M15.667 27.167a55.432 55.432 0 0 0 19.916-8.916L34.5 13.667 26 9.815l-10.417 5.6-1.833 11.252z'></path></g></svg>",
             "<svg alt='page 3 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='13455599-771e-4930-8ea3-ccdd05e905bd' data-name='8'><path d='M38.333 35.589a84.009 84.009 0 0 1 1.661-9.072H12.005a84.009 84.009 0 0 1 1.661 9.072c.237 3.618-.06 9.489-.06 9.489l4.032-5.812-.3 5.871 4.8-6.76L26 45.611l3.854-7.234 4.8 6.76-.3-5.871 4.032 5.812s-.286-5.871-.053-9.489z'></path><path d='M26 11.338c-7.039 0-11.36 6.325-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.622c7.073 0 11.385 4.448 13.638 11.326a45.085 45.085 0 0 1 1.839 9.606s-3.579-.69-8.129-5.531a19.194 19.194 0 0 1-4.564-8.276L26 16.134l-2.785-.387a19.194 19.194 0 0 1-4.564 8.276c-4.55 4.841-8.128 5.531-8.128 5.531a45.049 45.049 0 0 1 1.838-9.606C14.614 13.07 18.926 8.622 26 8.622z'></path></g></svg>",
             "<svg alt='page 3 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='fbb89afc-ba12-4a42-b9d9-ebac85d52ffe' data-name='106'><path d='M39.461 20.934C38.037 12.869 33.072 8.717 26 8.717s-12.038 4.152-13.461 12.217c-1.31 7.421-3.766 13.861 1.3 18.381 2.732 2.431 7.536 2.135 12.161 2.076 4.625.059 9.428.355 12.156-2.076 5.071-4.515 2.614-10.96 1.305-18.381z'></path><path d='M26 11.135c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.872 12.917 10.829 12.917 5.955 0 10.364-5.338 10.828-12.917.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M18.265 11.135L26 9.252l7.811 2.115 3.689 6.424 2.078 10.139-1.827 1.236-4.417-14.833A22.247 22.247 0 0 0 26 13.416c-4.981 0-7.75 5.084-7.75 5.084l-4.416 13-1.414-3.57 2.08-10.139z'></path><path d='M14.417 29.75s11.167-5.584 15-14.917c0 0 2 6.917 8.583 14.917L33.834 13.5l-8.25-2.667-10.667 7.333z'></path></g></svg>",
             "<svg alt='page 3 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='394fd1f8-9527-42e0-88c9-22a44f7f44c2' data-name='72'><path d='M12.48 21.31c-1.1 8.186 2.072 15.224 3.464 18.008 1.478 2.956 6.142 4.548 10.055 4.548V8.444c-7.073 0-12.421 4.682-13.519 12.866zM39.521 21.31C38.422 13.126 33.074 8.444 26 8.444v35.422c3.913 0 8.577-1.592 10.055-4.548 1.393-2.784 4.564-9.818 3.466-18.008z'></path><path d='M26 11.243c-7.039 0-11.36 6.323-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.682-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.5 17.25s-3.229 7-4.45 10.866c-1.425 4.509-1.749 8.53.075 11.009 3.125 4.25 8.475 4.142 8.475 4.142s-2.515-2.207-2.4-7.65c.135-6.472 1.272-16.4 1.574-17.026 2.269-4.669 5.851-5.4 9.226-6.265V9.31l-6.42 1.314z'></path><path d='M38.5 17.25s3.229 7 4.45 10.866c1.425 4.509 1.748 8.53-.075 11.009-3.125 4.25-8.475 4.142-8.475 4.142s2.514-2.207 2.4-7.65c-.135-6.472-1.272-16.4-1.575-17.026-2.268-4.669-5.85-5.4-9.225-6.265V9.31l6.42 1.314z'></path><path d='M26 9.815l9.6 4.652-.599 9.749H17l-.601-9.749L26 9.815z'></path></g></svg>",
             "<svg alt='page 3 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='65b66f7f-36b2-4859-b542-6205339db236' data-name='3'><path d='M38.375 23.528s-.141 6.212 1.469 9.05c1.624 2.861 1.923 6.4-.851 8.585-2.552 2.011-6.27 2.383-12.993 2.383s-10.442-.372-12.995-2.383c-2.773-2.185-2.475-5.724-.85-8.585 1.61-2.838 1.469-9.05 1.469-9.05'></path><path d='M26 11.231c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14.823l3.093-.889c.848 1.9 2.58 6.542 4.8 9.517 1.734 2.327 3.094 3.248 4.607 3.35 2.764.186 2.135-5.4 2.135-5.4C40 14.324 33.073 8.538 26 8.538s-14 5.786-14.632 12.867c0 0-.629 5.582 2.135 5.4 1.513-.1 2.874-1.023 4.607-3.35 2.216-2.975 3.948-7.621 4.8-9.517z'></path></g></svg>",
             "<svg alt='page 3 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='84056884-1abb-4cb6-9af2-073367d1ddc3' data-name='21'><path d='M39.46 20.933C38.037 12.869 33.073 8.717 26 8.717s-12.038 4.152-13.461 12.216c-1.31 7.422-3.766 13.862 1.3 18.382C16.571 41.746 21.375 41.45 26 41.39c4.625.06 9.428.356 12.156-2.075 5.07-4.515 2.614-10.96 1.304-18.382z'></path><path d='M26 11.135c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M18.265 11.135L26 9.252l7.811 2.115 3.689 6.424 2.079 10.139-1.779 6.582L34.123 22.3A32.745 32.745 0 0 0 26 21.407a32.759 32.759 0 0 0-8.124.889L14.2 34.512l-1.78-6.582 2.08-10.139z'></path></g></svg>"
          ],
          [
             "<svg alt='page 3 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='6c3f284d-7bf8-40ab-8afc-a4e4f3bde366' data-name='0'><path d='M26 39.818c3.336 0 7.038 1.083 10.054 1.237a10.349 10.349 0 0 0 6.729-1.779 7.442 7.442 0 0 1-3.326-6.11c.065-3.325.557-7.2 0-11.06C38.3 14.062 33.074 9.112 26 9.112c-7.073 0-12.3 4.95-13.458 12.994-.557 3.862-.064 7.735 0 11.06a7.442 7.442 0 0 1-3.326 6.11 10.351 10.351 0 0 0 6.729 1.779c3.016-.155 6.719-1.237 10.055-1.237'></path><path d='M26 11.278c-7.039 0-11.36 6.324-10.829 15C15.635 33.862 20.044 39.2 26 39.2c5.955 0 10.363-5.337 10.828-12.917C37.36 17.6 33.039 11.278 26 11.278z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.477 29.3s5.336-12.762 19.8-13.071c0 0 2.089 9.823 5.723 12.761V22.8l-1.16-4.641-3.4-5.337-4.412-2.859-5.337-.155-5.8 1.779-4.563 6.342-1.393 7.348z'></path></g></svg>",
             "<svg alt='page 3 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='f9fa0030-f059-46d6-a8de-ef4e591e6ac4' data-name='98'><path d='M37.742 30.629l2.431 1.126-1.009-10.081A13.356 13.356 0 0 0 26 8.866a13.356 13.356 0 0 0-13.163 12.808l-1.009 10.081 2.432-1.126s-1.187 7.412-2.729 8.775l7 .119L26 39.107l7.473.416 7-.119c-1.545-1.363-2.731-8.775-2.731-8.775z'></path><path d='M26 11.148c-7.038 0-11.359 6.325-10.828 15.006C15.636 33.733 20.045 39.07 26 39.07c5.955 0 10.364-5.337 10.828-12.916.532-8.681-3.789-15.006-10.828-15.006z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M21.729 25.344a13.738 13.738 0 0 0 3.687-2.01A4.155 4.155 0 0 0 27.333 21L29 23.833a20.762 20.762 0 0 0 2.75-2.916 27.894 27.894 0 0 0 1.584-2.75l2.73 5.645 1.625 6.938 1.187-8.562-3.312-8.25L30.6 10.25 26 9.312l-4.6.938-4.96 3.688-3.313 8.25 1.188 8.562 1.625-6.938a31.193 31.193 0 0 0 5.229-1.645z'></path></g></svg>",
             "<svg alt='page 3 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='ad7b6ad4-1098-4f60-ac1e-c0da1a2f80c0' data-name='63'><path d='M39.071 22.9s.618 14.772 2.088 16.783a32.152 32.152 0 0 1-5.1-2.088l.773 4.176-6.187-2.707L26 43l-4.642-3.945-6.187 2.707.773-4.176a32.152 32.152 0 0 1-5.1 2.088c1.465-2.007 2.084-16.774 2.084-16.774'></path><path d='M26 11.215c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917S36.364 33.8 36.828 26.22c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M31.645 18.718a26.014 26.014 0 0 0 3.791 2.4c.7 2.32.077 11.834.077 11.834 3.171-2.011 4.927-5.774 4.1-11.911C38.684 14.154 31.878 8.756 26 8.756s-12.685 5.4-13.613 12.282c-.828 6.137.928 9.9 4.1 11.911 0 0-.619-9.514.077-11.834 0 0 3.4-1.547 4.95-3.79l-.7 3.867s6.187-1.469 8.2-5.645a9 9 0 0 0 2.631 3.171z'></path></g></svg>",
             "<svg alt='page 3 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='776a2f9c-f953-4840-894c-04e066cc8da4' data-name='90'><path d='M26 39.818c3.336 0 7.038 1.082 10.055 1.237a10.351 10.351 0 0 0 6.729-1.779 7.44 7.44 0 0 1-3.326-6.11c.064-3.325.557-7.2 0-11.061C38.3 14.062 33.073 9.112 26 9.112c-7.074 0-12.3 4.95-13.459 12.993-.557 3.863-.063 7.736 0 11.061a7.44 7.44 0 0 1-3.326 6.11 10.351 10.351 0 0 0 6.729 1.779c3.017-.155 6.719-1.237 10.056-1.237'></path><path d='M26 11.277c-7.039 0-11.36 6.325-10.829 15.006C15.635 33.862 20.044 39.2 26 39.2s10.364-5.337 10.828-12.916C37.36 17.6 33.038 11.277 26 11.277z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.808 22.434a12.808 12.808 0 1 0-25.616 0 23.49 23.49 0 0 0 .622 7.441l1.334-6.76 2.224 2.846 1.69-4.9 2.529 2.765 2.363-4.555L26 23.56l2.046-4.289 2.362 4.555 2.53-2.765 1.69 4.9 2.224-2.846 1.334 6.76a23.49 23.49 0 0 0 .622-7.441z'></path></g></svg>",
             "<svg alt='page 3 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='bd4c9161-2220-4456-9a86-156bbc6f28c3' data-name='11'><path d='M37.742 30.627l2.431 1.127-1.009-10.081A13.356 13.356 0 0 0 26 8.865a13.356 13.356 0 0 0-13.163 12.808l-1.009 10.081 2.432-1.127s-1.187 7.413-2.729 8.773l7 .119L26 39.106l7.473.416 7-.119c-1.545-1.363-2.731-8.776-2.731-8.776z'></path><path d='M26 11.148c-7.038 0-11.359 6.324-10.828 15.005.464 7.579 4.873 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M37.623 17.938l-3.966-6.171L26 9.19l-7.425 2.422-4.2 6.326L12.836 26l.712 4.981s3.558-8.868 4.15-11.834l1.72 1.957 1.72-2.49 2.254 2.49L26 16.481l2.61 4.625 2.254-2.49 1.719 2.49 1.717-1.957c.594 2.966 4.151 11.834 4.151 11.834L39.164 26z'></path></g></svg>",
             "<svg alt='page 3 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='daef1b9c-b7f5-4d7c-9eff-56b5698eb35e' data-name='120'><path d='M39.071 22.9s.618 14.772 2.088 16.783a32.152 32.152 0 0 1-5.1-2.088l.773 4.176-6.187-2.707L26 43l-4.641-3.945-6.188 2.707.774-4.176a32.186 32.186 0 0 1-5.105 2.088c1.469-2.007 2.088-16.774 2.088-16.774'></path><path d='M26 11.215c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917S36.364 33.8 36.828 26.22c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 22.688l2.25-2.626 2 2.75L32.188 20a15.113 15.113 0 0 0 3.248 2.115c.7 2.32.077 10.834.077 10.834 3.171-2.011 4.927-5.774 4.1-11.911C38.684 14.154 31.878 8.756 26 8.756s-12.685 5.4-13.613 12.282c-.828 6.137.928 9.9 4.1 11.911 0 0-.619-8.514.077-10.834A15.1 15.1 0 0 0 19.812 20l1.937 2.812 2-2.75z'></path></g></svg>"
          ],
          [
             "<svg alt='page 3 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='3f153bfc-af39-4cc9-bf5f-89b3da922f3a' data-name='5'><path d='M26 7.921c7.073 0 14 6.091 15.006 13.361A27.8 27.8 0 0 1 39.4 34.625l-.635-1.819s-2.423 5.162-3.865 6.884l-1.72-3.232-3.024 5.32-2.134-2.43L26 42.552l-2.017-3.2-2.133 2.43-3.025-5.32-1.719 3.228c-1.447-1.722-3.868-6.884-3.868-6.884l-.638 1.819A27.788 27.788 0 0 1 11 21.282c1-7.27 7.927-13.361 15-13.361z'></path><path d='M26 11.15c-7.038 0-11.359 6.324-10.828 15.005.464 7.58 4.873 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916C37.36 17.474 33.039 11.15 26 11.15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M11.846 18.034l10.3-9.253 13.135 2.91 3.4 8.276.421 8.324-1.968 2.431-1.531-5.4-2.488-7.942a28.211 28.211 0 0 1-16.721 7.945l-1.532 5.4-1.962-2.434z'></path></g></svg>",
             "<svg alt='page 3 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='9a650e70-8e2b-40a8-a3c9-d5004a4994ce' data-name='74'><path d='M26 39.815c.335 0 7.125-2.815 7.125-2.815l1 3 2.5-3.125.919 2.855a13.8 13.8 0 0 0 3.481-5.309c1.752-5.751.425-10.266-.793-13.922C38.375 14.931 33.072 8.434 26 8.434S13.623 14.931 11.767 20.5c-1.218 3.656-2.545 8.171-.793 13.922a13.8 13.8 0 0 0 3.481 5.309l.919-2.855 2.5 3.124 1-3s6.79 2.815 7.126 2.815z'></path><path d='M26 11.09c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.872 12.916 10.829 12.916 5.956 0 10.365-5.337 10.828-12.916C37.359 17.414 33.037 11.09 26 11.09z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.131 27.638s12.249-2.7 18.436-12.371a61.311 61.311 0 0 0 2.707 6.651c2.368 4.6 5.185 5.72 5.185 5.72l-3.328-14.305L27 8.77l-7.58 1.856-5.937 7.82z'></path></g></svg>",
             "<svg alt='page 3 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='f2312bf7-6867-434c-ab12-979f8e731eed' data-name='108'><path d='M40.5 20.373C38.27 13.1 33.073 8.84 26 8.84S13.73 13.1 11.5 20.373c-1.69 5.516-1.246 13.164 2.134 20.369A27.553 27.553 0 0 1 26 37.718a27.548 27.548 0 0 1 12.364 3.024c3.38-7.205 3.825-14.853 2.136-20.369z'></path><path d='M26 11.205c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.916 10.829 12.916 5.955 0 10.363-5.336 10.828-12.916.532-8.676-3.789-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 13.668l3.333-1.084s5.834 9.083 9.917 12.667l-1.417-7.583-4.666-6.5L26 9.5l-7.167 1.665-4.666 6.5-1.417 7.586c4.083-3.584 9.917-12.667 9.917-12.667z'></path></g></svg>",
             "<svg alt='page 3 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='efa1f77e-0c4e-4573-95ad-6dcf0e7651af' data-name='94'><path d='M26 7.922c7.073 0 14 6.091 15.006 13.361A27.8 27.8 0 0 1 39.4 34.626l-.635-1.819s-2.421 5.162-3.867 6.884l-1.72-3.232-3.024 5.32-2.136-2.429L26 42.553l-2.017-3.2-2.133 2.426-3.025-5.32-1.719 3.232c-1.447-1.722-3.868-6.884-3.868-6.884l-.638 1.819A27.791 27.791 0 0 1 11 21.283c1-7.27 7.927-13.361 15-13.361z'></path><path d='M26 11.15c-7.038 0-11.359 6.325-10.828 15.006.464 7.579 4.873 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916C37.36 17.475 33.039 11.15 26 11.15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M18.885 17.381l-4.022 13.342-1.968-2.432.421-8.322 3.403-8.277L26 8.688l9.281 3.004 3.404 8.277.421 8.322-1.968 2.432-4.023-13.342'></path><path d='M35.625 21.709l-2.5 2.166-2.312-2.166-2.375 2.104L26 21.709l-2.437 2.104-2.375-2.104-2.313 2.166-2.5-2.166L18 14.5l15.375-.5 2.25 7.709z'></path></g></svg>",
             "<svg alt='page 3 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='b519d708-ab19-4662-85fb-67e93f1223a2' data-name='124'><path d='M26 39.815c.336 0 7.125-2.815 7.125-2.815l1 3 2.5-3.125.919 2.855a13.81 13.81 0 0 0 3.482-5.309c1.752-5.751.425-10.266-.793-13.922C38.376 14.931 33.075 8.434 26 8.434S13.626 14.931 11.769 20.5c-1.218 3.656-2.546 8.171-.794 13.922a13.807 13.807 0 0 0 3.483 5.309l.918-2.855 2.5 3.124 1-3s6.79 2.815 7.124 2.815z'></path><path d='M26 11.09c-7.039 0-11.359 6.324-10.828 15.005.464 7.579 4.873 12.916 10.828 12.916 5.957 0 10.366-5.337 10.829-12.916C37.361 17.414 33.04 11.09 26 11.09z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.168 24.25l-2.5-8-4.093-4.624L26 8.77l-7.574 2.856-4.092 4.624-2.5 8h28.334z'></path></g></svg>",
             "<svg alt='page 3 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='bce7677a-6a1e-46d1-9155-6360a5e47f94' data-name='25'><path d='M40.5 20.373C38.27 13.1 33.073 8.84 26 8.84S13.73 13.1 11.5 20.373c-1.69 5.515-1.245 13.165 2.134 20.369A27.555 27.555 0 0 1 26 37.718a27.546 27.546 0 0 1 12.363 3.024c3.38-7.204 3.825-14.854 2.137-20.369z'></path><path d='M26 11.205c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M36.407 16.46l-2.983-5.41L26 9.503l-7.581 1.624-2.827 5.333-2.401 6.137h25.617l-2.401-6.137z'></path></g></svg>"
          ]
       ],
       [
          [
             "<svg alt='page 4 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='38551ffe-9207-47b5-a6e0-5d901b7502bb' data-name='99'><path d='M39.7 21.479c0-7.073-6.625-12.807-13.7-12.807s-13.7 5.734-13.7 12.807c0 0-.652 8.005 2.017 14.054a15.272 15.272 0 0 0 5.03 6.492l2.784-2.759L26 44.131l3.868-4.865 2.783 2.759a15.264 15.264 0 0 0 5.03-6.492c2.668-6.049 2.019-14.054 2.019-14.054z'></path><path d='M26 11.268c-7.039 0-11.36 6.324-10.829 15 .464 7.584 4.873 12.921 10.829 12.921s10.364-5.337 10.828-12.918c.532-8.679-3.79-15.003-10.828-15.003z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M25.583 19.25a18.053 18.053 0 0 0 3.584-2.5s8 7.667 9.819 11.435l.3-8.07-4.922-8.34L26 9.334l-8.362 2.441-4.921 8.34.3 8.07c1.819-3.768 9.819-11.435 9.819-11.435l-1.75 4.5a22.579 22.579 0 0 0 4.497-2z'></path></g></svg>",
             "<svg alt='page 4 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='d5688b00-a8e7-493a-b174-95a5abfdc5c8' data-name='69'><path d='M39.743 17.772c-1.759-5.566-6.079-9.9-13.744-9.9s-11.984 4.337-13.744 9.9C10.876 22.131 6.892 35.623 26 36.564c19.106-.941 15.121-14.433 13.743-18.792z'></path><path d='M26 11.118c-7.039 0-11.36 6.323-10.829 15C15.635 33.7 20.043 39.039 26 39.039c5.955 0 10.364-5.337 10.828-12.917.531-8.681-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M29.557 17.228c4.718 3.093 8.585 11.06 8.585 11.06l.232-6.42-1.314-5.259-2.553-3.79-3.557-2.552L26 9.416l-4.95.851-3.558 2.552-2.552 3.79-1.315 5.259.232 6.42s3.867-7.967 8.585-11.06l-.619 3.016 7.58-2.938'></path></g></svg>",
             "<svg alt='page 4 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='1c8270f1-ff0f-40b4-ada7-c7b1db5929c4' data-name='35'><path d='M39.254 20.075a13.465 13.465 0 0 0-26.507 0c-1.245 6.108-1.093 12.3 1.778 14.676C18.617 38.131 26 38.131 26 38.131s7.383 0 11.475-3.38c2.873-2.372 3.025-8.568 1.779-14.676z'></path><path d='M26 11.171c-7.038 0-11.359 6.324-10.828 15 .464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.671-3.789-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.364 18.735l-5.248-7.151L26 9.263l-7.115 2.321-5.248 7.151-1.068 10.679s3.559-9.1 13.431-9.1 13.432 9.1 13.432 9.1z'></path></g></svg>",
             "<svg alt='page 4 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='908e76f2-3fd6-4fb1-b5c8-61ce3bb95396' data-name='13'><path d='M39.7 21.479c0-7.073-6.625-12.808-13.7-12.808s-13.7 5.735-13.7 12.808c0 0-.652 8.005 2.017 14.054a15.282 15.282 0 0 0 5.03 6.493l2.784-2.76L26 44.131l3.868-4.865 2.783 2.76a15.274 15.274 0 0 0 5.03-6.493C40.35 29.484 39.7 21.479 39.7 21.479z'></path><path d='M26 11.268c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M34.361 11.775L26 9.334l-8.362 2.441-4.921 8.34.3 8.07c3.38-2.254 5.04-8.01 5.04-8.01l2.643 1.838 2.652-2.613L26 22.013l2.647-2.613 2.653 2.613 2.65-1.838s1.66 5.756 5.04 8.01l.3-8.07z'></path></g></svg>",
             "<svg alt='page 4 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='ae5c2862-67ad-49da-9858-f30ea610ccf2' data-name='122'><path d='M39.744 17.771c-1.76-5.565-6.08-9.9-13.745-9.9s-11.984 4.337-13.744 9.9C10.877 22.131 6.892 35.623 26 36.564c19.107-.941 15.122-14.433 13.744-18.793z'></path><path d='M26 11.118c-7.038 0-11.359 6.323-10.828 15C15.635 33.7 20.043 39.039 26 39.039c5.956 0 10.364-5.337 10.828-12.917.532-8.681-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M29.558 17.228c4.718 3.093 8.585 11.06 8.585 11.06l.231-6.42-1.314-5.259-2.552-3.79-3.558-2.552L26 9.416l-4.95.851-3.558 2.552-2.552 3.79-1.315 5.259.232 6.42s3.867-7.967 8.585-11.06l6.961.078'></path><path d='M34.812 21.594l-2.203.75-2.203-.75-2.203.75-2.204-.75-2.203.75-2.203-.75-2.203.75-2.203-.75v-7.531h17.937l-.312 7.531z'></path></g></svg>",
             "<svg alt='page 4 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='4a57b2b1-8434-4dd5-9136-eda313eba75d' data-name='113'><path d='M39.254 20.075a13.465 13.465 0 0 0-26.507 0c-1.245 6.108-1.093 8.865 1.778 11.237C18.617 34.692 26 34.692 26 34.692s7.383 0 11.475-3.38c2.873-2.372 3.025-5.129 1.779-11.237z'></path><path d='M26 11.171c-7.038 0-11.359 6.323-10.828 15.005.464 7.58 4.873 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.532-8.682-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.364 18.734l-5.248-7.15L26 9.263l-7.115 2.321-5.248 7.15-.068 8.578s2.559-4 12.431-4 12.432 4 12.432 4z'></path></g></svg>"
          ],
          [
             "<svg alt='page 4 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='8207a640-b6df-49e2-8852-5e81e0234327' data-name='53'><path d='M26 36.686l6.5.31 5.955.851 2.63-2.63-1.317-3.017 1.547-2.01-1.547-2.244a13.449 13.449 0 0 0 .386-8.816C38 11.1 33.073 8.085 26 8.085S14 11.1 11.846 19.13a13.457 13.457 0 0 0 .386 8.816l-1.546 2.244 1.546 2.01-1.314 3.017 2.63 2.63L19.5 37z'></path><path d='M26 11.086c-7.038 0-11.359 6.323-10.828 15.005.464 7.579 4.873 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916.532-8.682-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.686 17.118L34.2 10.776 26 8.3l-8.2 2.474-4.487 6.342-.85 9.127A23.41 23.41 0 0 0 21.282 14.1l4.718.85 4.719-.85a23.41 23.41 0 0 0 8.817 12.142z'></path></g></svg>",
             "<svg alt='page 4 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='678e1bb5-cf94-46bf-861a-d08dde044e80' data-name='24'><path d='M26 40.97l5.094 2.707 3.939-3.165 4.811 3.011 2.4-4.254-1.469-3.553 1.237-3.707-2.864-7.049-.341-3.412a15.031 15.031 0 0 0-3.526-9.195c-1.7-1.779-3.662-2.5-6.446-3.083L26 9.182l-2.836.088c-2.784.582-4.745 1.3-6.446 3.083a15.031 15.031 0 0 0-3.527 9.195l-.34 3.412-2.862 7.049 1.238 3.707-1.47 3.553 2.4 4.254 4.812-3.011 3.939 3.165L26 40.97z'></path><path d='M26 11.271c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.671-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M37.291 18.077l-1.16-2.477-4.254-4.641L26 9.646l-6.111 1.47-3.094 3.4L14.4 18l-.318 3.876a40.665 40.665 0 0 0 3.8-5.16 52.914 52.914 0 0 0 8.118.432 52.905 52.905 0 0 0 8.123-.433 40.665 40.665 0 0 0 3.8 5.16z'></path></g></svg>",
             "<svg alt='page 4 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='721d3828-2c89-49c1-aa70-8060efa55cb4' data-name='85'><path d='M12.587 29.659l-1 8.663L17 43.385l-.288-3.825L21 44.172l2-4.612 3 4.065 3-4.065 2 4.612 4.288-4.612-.287 3.825 5.412-5.063-1-8.663'></path><path d='M26 11.287c-7.039 0-11.36 6.323-10.829 15 .464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.828-12.917c.532-8.677-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M35.9 11.828c1.616 1.789 2.374 4.669 3.5 7.932a17.6 17.6 0 0 1 .9 4.487l2.588 5.524a71.437 71.437 0 0 1-5.3 6.638l-2.375-6.862.687-4.388-5.737-11.138A35.452 35.452 0 0 1 26 15.128v-6.1c2.914.005 7.013-.397 9.9 2.8zM16.1 11.828c-1.616 1.789-2.374 4.669-3.5 7.932a17.6 17.6 0 0 0-.9 4.487l-2.588 5.524a71.437 71.437 0 0 0 5.3 6.638l2.375-6.862-.687-4.388 5.737-11.138A35.428 35.428 0 0 0 26 15.128v-6.1c-2.914.005-7.013-.397-9.9 2.8z'></path><path d='M17.75 19l.875 6.5s9-5.75 12.75-11.375V11H18.75z'></path></g></svg>",
             "<svg alt='page 4 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='63d7c342-72a9-40d8-8b76-d3dc0f3a90c5' data-name='83'><path d='M26 8.127l-7.42-.697-3.17 2.571-3.229 2.124-.99 3.126-2.687 2.576 1.052 3.34-1.723 3.167 1.808 4-.775 2.833 3.616 3.5 8.296-4.754L26 33.728M26 8.127l7.42-.697 3.17 2.571 3.23 2.124.989 3.126 2.687 2.576-1.051 3.34 1.723 3.167-1.809 4 .776 2.833-3.617 3.5-8.295-4.754L26 33.728'></path><path d='M26 11.127c-7.038 0-11.36 6.324-10.828 15.005.464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.365-5.337 10.829-12.917.531-8.681-3.79-15.005-10.829-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.343l-8.2 2.475-4.485 6.342-.85 9.127 3.2-2.2.833-3.916 4.334-2.917a19.032 19.032 0 0 0 2.25-3.5l2.918.081M26 8.343l8.2 2.475 4.487 6.342.849 9.127-3.2-2.2-.836-3.919-4.334-2.917a19.032 19.032 0 0 1-2.25-3.5L26 13.835'></path></g></svg>",
             "<svg alt='page 4 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='d444e79b-4edf-4a58-8451-9969e17a2029' data-name='71'><path d='M39.516 28.459l1.954-4.95-1.408-2.243C38.657 14.537 33.146 8.675 26 8.675s-12.656 5.862-14.063 12.591l-1.406 2.243 1.953 4.95-1.718 4.021 3.593 3.713-.545 2.939 2.577 4.64L17.8 40.6l3.876 3.635 1.954-2.374L26 44.237l2.344-2.343 1.984 2.343L34.2 40.6l1.406 3.17 2.579-4.64-.548-2.939 3.594-3.713z'></path><path d='M26 11.288c-7.038 0-11.359 6.324-10.828 15.005.464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M12.929 27.763s8.353-4.254 10.518-8.818l-1.16 3.945 6.188-4.1a63.571 63.571 0 0 0 9.746 9.049l1.547-6.419-4.8-8.431L26.7 8.891l-8.821 2.939-5.647 9.281z'></path></g></svg>",
             "<svg alt='page 4 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='7c02e25c-3a5f-4495-9183-378cc01cbfb7' data-name='131'><path d='M12.587 29.659l-1 8.663 5.414 5.063-.289-3.825 4.289 4.612 2-4.612L26 43.625l3-4.065 2 4.612 4.289-4.612L35 43.385l5.414-5.063-1-8.663'></path><path d='M26 11.287c-7.039 0-11.36 6.323-10.829 15 .464 7.58 4.873 12.917 10.829 12.917s10.364-5.337 10.829-12.917c.531-8.677-3.79-15-10.829-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.3 24.247a17.6 17.6 0 0 0-.9-4.487c-1.125-3.263-1.884-6.143-3.5-7.932-2.887-3.2-6.986-2.795-9.9-2.795s-7.013-.4-9.9 2.8c-1.616 1.789-2.375 4.669-3.5 7.932a17.6 17.6 0 0 0-.9 4.487l-2.588 5.519a71.324 71.324 0 0 0 5.3 6.638l2.375-6.862-.687-4.388 5.737-11.138A35.428 35.428 0 0 0 26 15.128a35.4 35.4 0 0 0 4.164-1.107L35.9 25.159l-.688 4.388 2.375 6.862a71.324 71.324 0 0 0 5.3-6.638z'></path></g></svg>"
          ],
          [
             "<svg alt='page 4 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='ac3eff4a-2d89-4fb3-bccc-f2f01472963c' data-name='96'><path d='M42.662 34.859L39.816 31.3l2.727-3.558-2.608-2.552a19.534 19.534 0 0 0-.119-4.286 13.878 13.878 0 0 0-27.633 0 19.438 19.438 0 0 0-.119 4.286l-2.608 2.553 2.727 3.557-2.846 3.559 3.563 3.557-3.444 3.855 4.8 3.2 3.913-3.2 3.914 3.2L26 43.043l3.913 2.43 3.914-3.2 3.913 3.2 4.8-3.2-3.44-3.857z'></path><path d='M26 11.317c-7.039 0-11.36 6.325-10.829 15.005C15.635 33.9 20.043 39.238 26 39.238c5.956 0 10.364-5.336 10.828-12.916.532-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M35.499 24.813l3.875 3.062.116-7.327-4.921-8.716L26 9.152l-8.564 2.685-4.038 9.601-.474 5.514 4.887-.639 1.813-3.375 3.937-.625 1.188-3.75 4.25-1.063 1.187-3.312 1.938.75.187 3.062 2.938 2.875.25 3.938z'></path></g></svg>",
             "<svg alt='page 4 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='75c2b50a-e5a1-4173-927f-0eb75d2e1391' data-name='101'><path d='M38.606 28.893l2.011 7.121-2.784 4.228 1.16 4.377-3.712-3.857-2.166 4.451-3.094-4.006L26 45.065l-4.024-3.858-3.093 4.006-2.165-4.451-3.712 3.857 1.16-4.377-2.785-4.228 2.011-7.121'></path><path d='M26 11.336c-7.039 0-11.361 6.324-10.829 15C15.635 33.92 20.043 39.257 26 39.257c5.955 0 10.364-5.337 10.828-12.917.531-8.68-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.535 26.5l.277-3.7v-1.577c0-7.075-6.74-12.267-13.812-12.267s-13.815 5.192-13.815 12.267v1.571l.279 3.7-.387 2.862 4.409 5.259 1.856-6.343-1.393-7.656 6.729-7.657L26 14.738l2.32-1.778 6.729 7.657-1.392 7.656 1.856 6.343 4.409-5.259z'></path><path d='M15.833 24.916S21.667 21.25 24 19.25l-2.5 5.416A29.933 29.933 0 0 0 32.083 17l-.166-5.334-6-1.916-8.667 4.583z'></path></g></svg>",
             "<svg alt='page 4 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='460208bf-0e0e-4665-9203-a8e5b0a3e12d' data-name='29'><path d='M26 22.75l-7.941.084-1.346 11.357-1.147 4.493 1.702 2.63-1.555 4.169-.449-3.921-2.405-2.8.266-4.887-1-3.75 4.5-10.75L35.5 19.25l4.375 10.875-1 3.75.266 4.887-2.405 2.8-.449 3.921-1.555-4.169 1.702-2.63-1.147-4.493-1.346-11.357L26 22.75'></path><path d='M26 11.22c-7.038 0-11.359 6.325-10.828 15.005.464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917C37.36 17.545 33.039 11.22 26 11.22z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 12.544c3.1 9.427 13.923 18.244 13.923 18.244s1.47-3.48.487-9.752A14.958 14.958 0 0 0 26 8.613a14.958 14.958 0 0 0-14.409 12.423c-.983 6.272.487 9.752.487 9.752S22.906 21.971 26 12.544z'></path><path d='M32.939 7.265l-3.825 1.157L26 6.376l-3.113 2.046-3.825-1.157-1.334 6.138L26 12.602l8.273.801-1.334-6.138z'></path></g></svg>",
             "<svg alt='page 4 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='cedfd718-536a-48c1-a98b-9e6af16d335e' data-name='7'><path d='M42.662 34.858L39.816 31.3l2.728-3.557-2.609-2.553a19.546 19.546 0 0 0-.119-4.287 13.878 13.878 0 0 0-27.633 0 19.373 19.373 0 0 0-.118 4.287l-2.609 2.553 2.727 3.557-2.846 3.558 3.563 3.558-3.444 3.854 4.8 3.2 3.913-3.2 3.914 3.2L26 43.042l3.913 2.431 3.914-3.2 3.913 3.2 4.8-3.2-3.44-3.857z'></path><path d='M26 11.317c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.9 20.044 39.238 26 39.238s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M35.049 23.692l4.026 3.26.415-6.405-4.921-8.716L26 9.151l-8.564 2.685-4.038 9.601-.474 5.515 4.026-3.26 3.867-4.641-.387-2.707 2.693-1.726L26 16.872l2.876-2.254 2.692 1.594-.386 2.83 3.867 4.65z'></path></g></svg>",
             "<svg alt='page 4 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='1b7a1994-3948-427e-aac5-6cb427d83aba' data-name='15'><path d='M38.606 28.893l2.012 7.121-2.785 4.229 1.16 4.376-3.712-3.857-2.165 4.45-3.094-4.005L26 45.064l-4.023-3.857-3.094 4.005-2.165-4.45-3.713 3.857 1.161-4.376-2.785-4.229 2.011-7.121'></path><path d='M26 11.336c-7.039 0-11.36 6.324-10.829 15C15.635 33.92 20.044 39.257 26 39.257S36.364 33.92 36.828 26.34c.532-8.68-3.79-15.004-10.828-15.004z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M39.535 26.5l.277-3.7v-1.577c0-7.074-6.739-12.267-13.812-12.267s-13.814 5.193-13.814 12.267v1.571l.278 3.7-.387 2.862 4.409 5.259 1.856-6.342-1.392-7.656 6.729-7.657L26 14.739l2.32-1.779 6.729 7.657-1.392 7.657 1.856 6.342 4.408-5.259z'></path></g></svg>",
             "<svg alt='page 4 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='7a2e3844-408f-46db-898a-e388b8e155ba' data-name='112'><path d='M26 22.75l-7.941.083-1.346 11.358-1.147 4.494 1.702 2.629-1.555 4.169-.449-3.922-2.405-2.799.266-4.887-1-3.75 4.5-10.75L35.5 19.25l4.375 10.875-1 3.75.266 4.887-2.405 2.799-.449 3.922-1.555-4.169 1.702-2.629-1.147-4.494-1.346-11.358L26 22.75'></path><path d='M26 11.22c-7.038 0-11.359 6.325-10.828 15.006.464 7.579 4.873 12.916 10.828 12.916 5.955 0 10.364-5.337 10.828-12.916C37.36 17.545 33.039 11.22 26 11.22z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.613a14.958 14.958 0 0 0-14.409 12.423c-.983 6.272.487 9.752.487 9.752s2.43-3.607 6.433-8.675c2.255-2.854 6.374-6.172 7.489-9.569M26 8.613a14.958 14.958 0 0 1 14.41 12.423c.983 6.272-.486 9.752-.486 9.752s-2.43-3.607-6.434-8.675c-2.254-2.854-6.373-6.172-7.488-9.569'></path><path d='M32.939 7.265l-3.825 1.157L26 6.376l-3.113 2.046-3.825-1.157-1.334 6.138 8.272-.8 8.273.8-1.334-6.138z'></path><path d='M36.094 22.75H16.281v-9.187L26 11.313l10.094 2.25v9.187z'></path></g></svg>"
          ],
          [
             "<svg alt='page 4 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='9c80c0be-e96f-46e1-bf6f-264ee58a8872' data-name='79'><path d='M13.083 33.583l6.584-6.667H26v-9.5H13.5l-.417 16.167zM38.917 33.583l-6.583-6.667H26v-9.5h12.501l.416 16.167z'></path><path d='M26 11.194c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 6.5c.063-.062 3.917 1 3.917 1l5.333-.918 2.5 3.917 4.417 2.25L41.334 18l1.584 3.417-3.584 4.416c0 1-.416 5.917-.416 5.917l-3.1-8.467c-.1 0-1.231-4.533-1.231-4.533v4.306s-5.7-.473-8.586-.473c-2.885 0-8.586.473-8.586.473V18.75s-1.133 4.538-1.232 4.533l-3.1 8.467s-.416-4.917-.416-5.917l-3.584-4.416L10.667 18l-.834-5.25 4.417-2.25 2.5-3.917 5.333.918S25.937 6.438 26 6.5z'></path></g></svg>",
             "<svg alt='page 4 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='165b0673-0b43-4aef-a670-e57105c741a9' data-name='1'><path d='M26 11.032c-7.039 0-11.36 6.325-10.829 15.005.464 7.58 4.873 12.917 10.829 12.917 5.955 0 10.363-5.337 10.828-12.917.532-8.68-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.14 29l3.075-3.271s11.563-2.224 17.523-7.383l2.312 3.38 2.619 8.174a18.118 18.118 0 0 0 .5-4.211v-2.4a13.626 13.626 0 0 0-2.4-7.748 12.791 12.791 0 0 0-21.52 0 13.626 13.626 0 0 0-2.4 7.748v2.4A18.282 18.282 0 0 0 13.14 29z'></path><path d='M34.895 8.891l-3.143 2.253-.948-3.558-3.013 1.85L26 6.105l-1.791 3.331-3.013-1.85-.948 3.558-3.143-2.253-.185 4.957 3.15 1.625 5.93-.297 5.93.297 3.15-1.625-.185-4.957z'></path></g></svg>",
             "<svg alt='page 4 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='e1c6d237-fdfa-4eaf-9aed-d87f7736456e' data-name='109'><path d='M26.283 11.128c-7.039 0-11.36 6.324-10.828 15.005.464 7.579 4.872 12.916 10.828 12.916 5.955 0 10.363-5.337 10.828-12.916.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26.282 9.456a13.07 13.07 0 0 1 13.226 11.881c.38 5.282-.309 6.42-1.8 9.223 0 0-.754-3.886-1.45-7.212-.633-3.02-1.238-9.43-1.238-9.43H17.542s-.605 6.41-1.238 9.43c-.7 3.326-1.45 7.212-1.45 7.212-1.489-2.8-2.177-3.941-1.8-9.223A13.07 13.07 0 0 1 26.282 9.456z'></path><path d='M35.331 13.139l-5.159 2.38-4.355-5.474a7.131 7.131 0 0 1 5.7-3.113c3.611.088 5.871 2.935 6.849 5.6 1.056 2.88 1 7.908 3.226 9.266a5.581 5.581 0 0 0 3.093.851s-2.676 5.279-7.657.387z'></path><path d='M14.166 24.667S25 24.251 31.166 16c0 0 3.416 3.5 6.083 11.417l-.833-12.75L28.249 11l-10.917 2.418z'></path></g></svg>",
             "<svg alt='page 4 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='2e39685c-4761-4aa5-bb33-2aed80966145' data-name='127'><path d='M26 11.194c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916 5.955 0 10.363-5.337 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 13.166a11.157 11.157 0 0 1 7 2.5l2.813 8.367.019 1.634 3.5 2.167 3.583-6.417L41.333 18l.834-5.25-4.416-2.25-2.5-3.917-5.334.917S26.063 6.438 26 6.5c-.062-.062-3.917 1-3.917 1l-5.333-.917-2.5 3.917-4.417 2.25.834 5.25-1.584 3.417 3.583 6.417 3.5-2.167.019-1.634L19 15.666a11.157 11.157 0 0 1 7-2.5z'></path></g></svg>",
             "<svg alt='page 4 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='96950b8a-3b4d-400c-9115-e38b2bbbb805' data-name='91'><path d='M26 11.033c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.917 10.829 12.917s10.364-5.338 10.828-12.917c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M18.262 16.287l-2.312 5.442-2.619 8.171a18.116 18.116 0 0 1-.495-4.21v-2.4a13.624 13.624 0 0 1 2.4-7.748 12.79 12.79 0 0 1 21.519 0 13.617 13.617 0 0 1 2.4 7.748v2.4a18.116 18.116 0 0 1-.494 4.21l-2.611-8.171-2.313-5.442'></path><path d='M34.895 8.892l-3.143 2.253-.949-3.558-3.013 1.851L26 6.105l-1.791 3.333-3.013-1.851-.948 3.558-3.143-2.253-.186 4.958 3.15 1.624L26 15.177l5.93.297 3.15-1.624-.185-4.958z'></path><path d='M26 10.688l9.063 3.437V23.5A52.231 52.231 0 0 0 26 22.625a52.248 52.248 0 0 0-9.063.875v-9.375L26 10.688'></path></g></svg>",
             "<svg alt='page 4 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='fe0c2983-63a8-46b7-b645-2c0324b66a3f' data-name='26'><path d='M26.282 11.128c-7.039 0-11.36 6.324-10.829 15 .464 7.58 4.873 12.917 10.829 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26.282 9.456a13.07 13.07 0 0 1 13.226 11.881c.379 5.282-.31 6.42-1.8 9.224 0 0-.754-3.887-1.451-7.213-.632-3.02-1.237-6.419-1.237-6.419v5.394H17.542v-5.394s-.606 3.4-1.238 6.419c-.7 3.326-1.45 7.213-1.45 7.213-1.489-2.8-2.178-3.942-1.8-9.224A13.07 13.07 0 0 1 26.282 9.456z'></path><path d='M35.331 13.139l-5.159 2.38-4.355-5.474a7.128 7.128 0 0 1 5.7-3.113c3.611.088 5.87 2.935 6.849 5.6 1.056 2.879 1 7.907 3.225 9.265a5.584 5.584 0 0 0 3.094.851s-2.676 5.279-7.657.387z'></path></g></svg>"
          ],
          [
             "<svg alt='page 4 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='e898c6b6-8963-4661-b67f-ca389fd654d4' data-name='61'><path d='M39.248 20.96c-1.361-7.148-6-12.221-13.072-12.221s-11.71 5.073-13.071 12.221c0 0-6.961 22.043 13.071 22.043S39.248 20.96 39.248 20.96z'></path><path d='M26.177 11.215c-7.038 0-11.36 6.323-10.828 15 .464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.532-8.677-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M33.911 39.677l5.723-9.745-2.089-12.221-3.4-5.568L26.1 8.9l-7.89 3.243-3.094 5.491-2.63 11.678 5.955 10.365a25.326 25.326 0 0 1-2.707-9.977c-.154-5.259 2.437-13.342 2.437-13.342s2.514 1.045 8 1.045 8.006-1.045 8.006-1.045 2.596 8.082 2.441 13.342a25.326 25.326 0 0 1-2.707 9.977z'></path><path d='M38.938 15.855a17.435 17.435 0 0 1 4.64 10.673 18.711 18.711 0 0 1-2.32 10.442l-3.016-6.342-2.089-13.381.929-3.171z'></path><path transform='rotate(-31.395 36.837 15.693)' fill='#bfbfbf' d='M35.222 14.532h3.228v2.32h-3.228z'></path></g></svg>",
             "<svg alt='page 4 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='24269ae3-367e-40db-8dcb-5aac6ff9b014' data-name='103'><path d='M26 11.055c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.917 10.829 12.917 5.955 0 10.363-5.338 10.828-12.917.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 9.894A12.808 12.808 0 0 0 13.192 22.7v5.22l3.617-7s3.143-8.837 9.191-8.837 9.191 8.839 9.191 8.839l3.617 7V22.7A12.808 12.808 0 0 0 26 9.894z'></path><path d='M31.218 11.629A5.219 5.219 0 1 1 26 6.41a5.218 5.218 0 0 1 5.218 5.219z'></path><path d='M13.191 27.92a26.085 26.085 0 0 1 17.642-10.67 83.494 83.494 0 0 1 7.975 10.67L36 16.5 26 9.833l-9.25 5.833-2.833 7z'></path></g></svg>",
             "<svg alt='page 4 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='438cca29-4e44-42f6-af51-d52317b5b849' data-name='2'><path d='M38.38 28.184a4.937 4.937 0 1 0 4.937 4.937 4.936 4.936 0 0 0-4.937-4.937zm0 0a4.937 4.937 0 1 0 4.937 4.937 4.936 4.936 0 0 0-4.937-4.937'></path><path d='M26.147 11.263c-7.039 0-11.36 6.324-10.829 15.005.465 7.58 4.873 12.916 10.829 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M38.816 28.184c2.757.267 1.639-6.17 1.639-6.17C39.108 14.876 33.22 9.09 26.146 9.09s-12.962 5.786-14.309 12.924c0 0-1.118 6.437 1.639 6.17 1.29-.124 7.445-8.539 8.958-11.919l3.712.89 3.712-.89c1.513 3.38 7.668 11.795 8.958 11.919z'></path></g></svg>",
             "<svg alt='page 4 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='bc7e6871-64a5-4d7a-b214-7e8af342b324' data-name='77'><path d='M28 9.25a5.264 5.264 0 0 1 5.495-1.577 11.811 11.811 0 0 1 7.519 7.792c1.222 4.248-.568 10.055-.568 10.055l-4.577-7.02z'></path><path transform='rotate(-68.588 30.374 8.625)' fill='#bfbfbf' d='M29.214 7.011h2.321v3.228h-2.321z'></path><path d='M39.608 21.229c-1.1-8.184-6.447-12.866-13.52-12.866s-12.422 4.682-13.52 12.866S12.535 36 15.062 38.984a15.5 15.5 0 0 0 11.026 4.894 15.5 15.5 0 0 0 11.025-4.894c2.529-2.984 3.593-9.569 2.495-17.755z'></path><path d='M26.088 11.162c-7.039 0-11.359 6.323-10.828 15 .464 7.58 4.872 12.917 10.828 12.917 5.956 0 10.364-5.337 10.828-12.917.532-8.677-3.789-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26.088 8.95l-6.42 1.593-6.093 7.9-.489 5.4.24 6.272.928 3.094 1.872-12.221c.317-.051 4.856-4.794 4.856-4.794M26.088 8.95l6.42 1.593 6.092 7.9.49 5.4-.24 6.272-.928 3.094-1.871-12.225c-.319-.051-4.176-6.734-4.176-6.734'></path><path d='M18.431 14.565L14.275 24.7s6.313-1.234 10.1-3.322c5.3-2.922 9.125-5.625 10.875-8l-6.765-3.995-.928-1.006L23.381 10z'></path></g></svg>",
             "<svg alt='page 4 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='70aafb2c-9ede-4ac9-9d01-18d2ace42e1e' data-name='18'><path d='M26 11.055c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 9.894A12.808 12.808 0 0 0 13.191 22.7v5.22l3.617-7s3.143-2.606 9.192-2.606 9.19 2.608 9.19 2.608l3.618 7V22.7A12.808 12.808 0 0 0 26 9.894z'></path><path d='M31.218 11.629A5.219 5.219 0 1 1 26 6.41a5.218 5.218 0 0 1 5.218 5.219z'></path></g></svg>",
             "<svg alt='page 4 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='5398ae6a-64d7-45e6-9423-4348e56fcfa5' data-name='92'><path d='M38.38 28.185a4.937 4.937 0 1 0 4.937 4.936 4.936 4.936 0 0 0-4.937-4.936zm0 0a4.937 4.937 0 1 0 4.937 4.936 4.936 4.936 0 0 0-4.937-4.936'></path><path d='M26.147 11.264c-7.039 0-11.36 6.324-10.829 15.005.465 7.58 4.873 12.916 10.829 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14l10.57 10.281 2.446.5v-1.5a13.623 13.623 0 0 0-2.4-7.748 12.525 12.525 0 0 0-21.228 0 13.623 13.623 0 0 0-2.4 7.748v1.5l2.446-.5L26 14'></path><path d='M26.063 10.688l9.063 3.437L38 24.562a86.663 86.663 0 0 0-11.937-.874A88.371 88.371 0 0 0 14 24.562l3-10.437 9.063-3.437'></path></g></svg>"
          ]
       ],
       [
          [
             "<svg alt='page 5 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='d0882069-270f-4021-8c4d-80f313c41209' data-name='84'><path d='M37.771 20.257s-5.57 5-2.4 8.3A34.189 34.189 0 0 1 41.7 38.2s4.754-7.705 3.085-12.9c-1.4-4.35-7.014-5.043-7.014-5.043z'></path><path d='M26 11.278c-7.039 0-11.36 6.325-10.829 15.005C15.636 33.862 20.044 39.2 26 39.2c5.955 0 10.364-5.337 10.828-12.916C37.36 17.6 33.039 11.278 26 11.278z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 8.819c5.878 0 12.565 5.415 13.613 12.282.7 4.563-2.53 20.083-3.549 23.1 0 0-1.7-17.221-2.275-19.541l-4.464-8.2a68.6 68.6 0 0 1-10.75 9.591l1.8-5.063a24.164 24.164 0 0 0-2.164 3.671c-.574 2.32-2.275 19.541-2.275 19.541-1.019-3.016-4.245-18.536-3.549-23.1C13.435 14.234 20.122 8.819 26 8.819'></path></g></svg>",
             "<svg alt='page 5 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='43f563d9-9a29-41cf-b139-e162956c763a' data-name='9'><path d='M31.585 32.015s-3.989 4.01-2.4 8.3a7.657 7.657 0 0 0 7.012 5.043 7.655 7.655 0 0 0 2.4-8.3c-1.397-4.351-7.012-5.043-7.012-5.043z'></path><path d='M26 11.317c-7.039 0-11.36 6.324-10.829 15.005C15.635 33.9 20.044 39.238 26 39.238s10.364-5.337 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 12.941l4.177 1.547c1.16 2.552 3.171 6.574 5.336 10.6 2.363 4.386 3.48 6.188 3.48 6.188s2.011-5.956.645-11.5C37.905 12.748 33.073 8.45 26 8.45c-7.074 0-11.906 4.3-13.639 11.326-1.366 5.54.644 11.5.644 11.5s1.119-1.8 3.481-6.188c2.165-4.022 4.177-8.044 5.337-10.6L26 12.941z'></path></g></svg>",
             "<svg alt='page 5 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='64e4d569-8362-4427-9f1b-2cc33563786f' data-name='19'><path d='M16.927 29.2a13.137 13.137 0 0 0-4.463 7c-1.478 6.4-4.486 7.348-4.486 7.348s5.2 2.823 8.276-.078c2.707-2.552 3.209-8.746 5.878-10.519zM35.072 29.2a13.137 13.137 0 0 1 4.463 7c1.478 6.4 4.486 7.348 4.486 7.348s-5.2 2.823-8.276-.078c-2.707-2.552-3.209-8.746-5.878-10.519z'></path><path d='M13.14 28.231L26 36.27l12.669-8.039a14.49 14.49 0 0 0 .494-3.764v-2.4a13.613 13.613 0 0 0-2.4-7.747 12.789 12.789 0 0 0-21.519 0 13.622 13.622 0 0 0-2.4 7.747v2.4a23.451 23.451 0 0 0 .296 3.764z'></path><path d='M26 11.288c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916s10.364-5.336 10.828-12.916c.532-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.14 28.231s12.237-7.144 18.2-12.3l7.333 12.3a14.49 14.49 0 0 0 .494-3.764v-2.4a13.613 13.613 0 0 0-2.4-7.747 12.789 12.789 0 0 0-21.519 0 13.622 13.622 0 0 0-2.4 7.747v2.4a23.451 23.451 0 0 0 .292 3.764z'></path></g></svg>",
             "<svg alt='page 5 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='1d05e911-e35d-44f1-9160-0ef1fd35f632' data-name='130'><path d='M37.771 20.257s-5.57 5-2.4 8.3A34.216 34.216 0 0 1 41.7 38.2s4.754-7.705 3.084-12.9c-1.398-4.35-7.013-5.043-7.013-5.043z'></path><path d='M26 11.278c-7.038 0-11.36 6.325-10.829 15.005C15.636 33.862 20.044 39.2 26 39.2c5.955 0 10.364-5.337 10.829-12.916.532-8.684-3.79-15.006-10.829-15.006z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 13.5s-.944-.785-3.5-.25c-3.582.75-4.29 11.409-4.29 11.409-.574 2.32-2.273 19.541-2.273 19.541-1.019-3.016-4.246-18.536-3.549-23.1C13.435 14.234 20.123 8.819 26 8.819c5.878 0 12.566 5.415 13.613 12.282.7 4.563-2.53 20.083-3.549 23.1 0 0-1.7-17.221-2.274-19.541 0 0-.708-10.659-4.291-11.409C26.945 12.715 26 13.5 26 13.5z'></path></g></svg>",
             "<svg alt='page 5 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='2fdc551b-e49d-4775-b2a4-c5ce6285c1fe' data-name='97'><path d='M31.585 32.016s-3.99 4.009-2.4 8.294a7.655 7.655 0 0 0 7.012 5.044 7.655 7.655 0 0 0 2.4-8.3c-1.397-4.345-7.012-5.038-7.012-5.038z'></path><path d='M26 11.318c-7.039 0-11.36 6.325-10.829 15C15.635 33.9 20.044 39.239 26 39.239s10.365-5.337 10.828-12.917C37.36 17.643 33.039 11.318 26 11.318z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14.938c2.088 0 5.164-.134 5.164-.134l4.421 2.74.832 8.79 2.113.026c.01-.246.7-7.425-2.939-12.219A12.238 12.238 0 0 0 26 9.683a12.237 12.237 0 0 0-9.591 4.458c-3.636 4.794-2.949 11.973-2.94 12.219l2.114-.026.831-8.79 4.421-2.74s3.076.134 5.165.134z'></path></g></svg>",
             "<svg alt='page 5 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='4ab9e0bd-a915-4f6a-9b94-9548d22833b6' data-name='104'><path d='M16.927 29.2a13.131 13.131 0 0 0-4.463 7c-1.478 6.4-4.486 7.348-4.486 7.348s5.2 2.823 8.276-.078c2.707-2.553 3.21-8.746 5.878-10.519zM35.073 29.2a13.131 13.131 0 0 1 4.463 7c1.478 6.4 4.486 7.348 4.486 7.348s-5.2 2.823-8.276-.078c-2.707-2.553-3.21-8.746-5.878-10.519z'></path><path d='M13.14 28.23L26 36.27l12.669-8.04a14.477 14.477 0 0 0 .5-3.763v-2.4a13.621 13.621 0 0 0-2.4-7.747 12.79 12.79 0 0 0-21.52 0 13.621 13.621 0 0 0-2.4 7.747v2.4a23.555 23.555 0 0 0 .291 3.763z'></path><path d='M26 11.288c-7.039 0-11.36 6.324-10.829 15.005.464 7.58 4.873 12.916 10.829 12.916 5.955 0 10.363-5.336 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M20.664 15.929l-7.333 12.3a14.476 14.476 0 0 1-.494-3.763v-2.4a13.613 13.613 0 0 1 2.4-7.747 12.789 12.789 0 0 1 21.519 0 13.621 13.621 0 0 1 2.4 7.747v2.4a14.477 14.477 0 0 1-.5 3.763l-7.333-12.3'></path><path d='M26.001 13.416l6.916 1.084 1.167 8.583H17.918l1.166-8.583 6.917-1.084z'></path></g></svg>"
          ],
          [
             "<svg alt='page 5 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><g id='485425d8-50ec-475a-9359-1fe291706687' data-name='46'><path d='M38.3 21.13c0-9.094-5.226-12.808-12.3-12.808S13.7 12.036 13.7 21.13'></path><path d='M26 11.185c-7.038 0-11.359 6.324-10.828 15.005.463 7.58 4.872 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.531-8.681-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M37.992 15.319l-6.5-5.759.063.883-.682-.65-10.365-.233-6.5 5.759-.15 10.1a20.138 20.138 0 0 0 6.036-7.191 9.29 9.29 0 0 0 3.138.783 6.648 6.648 0 0 1-2.405 2.834s4.129-.059 6.679-1.719a10.327 10.327 0 0 0 1.394-1.088 9.688 9.688 0 0 0 3.409-.813 20.138 20.138 0 0 0 6.036 7.191z'></path><path d='M18.265 11.572s-8.539.15-9.823 7.656C6.9 28.278 13.547 30.6 13.547 30.6s-1.393-9.05 1.856-11.448a26.814 26.814 0 0 0 5.569-5.878zM33.734 11.572s8.538.15 9.823 7.656C45.1 28.278 38.452 30.6 38.452 30.6s1.393-9.05-1.856-11.448a26.814 26.814 0 0 1-5.569-5.878z'></path></g></svg>",
             "<svg alt='page 5 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><g id='8b153c61-b507-4bc9-ab2a-df70c3b2a902' data-name='78'><path d='M15.784 14.673s-3.846-1.735-7.221 2.452c-2.352 2.918-2.438 7.75-1.75 11.625a34.977 34.977 0 0 0 3.562 10.75 68.952 68.952 0 0 1 1.688-10.875c1-3.437 3.3-5.244 5.937-7zM36.216 14.673s3.847-1.735 7.222 2.452c2.351 2.918 2.437 7.75 1.75 11.625a34.992 34.992 0 0 1-3.563 10.75 69.029 69.029 0 0 0-1.687-10.875c-1-3.437-3.3-5.244-5.938-7z'></path><path d='M26 11.194c-7.039 0-11.36 6.324-10.829 15.005.464 7.579 4.873 12.916 10.829 12.916 5.955 0 10.363-5.337 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M13.269 27.95s12.114-7.071 18.014-12.179l7.259 12.179a14.338 14.338 0 0 0 .49-3.726v-2.378a13.473 13.473 0 0 0-2.381-7.669 12.658 12.658 0 0 0-21.3 0 13.48 13.48 0 0 0-2.38 7.669v2.378a23.218 23.218 0 0 0 .298 3.726z'></path></g></svg>",
             "<svg alt='page 5 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><g id='9d85a539-c2d5-4194-88c5-682dcd039382' data-name='28'><path d='M20.142 33.5c0-1.843-.928-3.336-2.075-3.336s-2.075 1.493-2.075 3.336a4.51 4.51 0 0 0 .614 2.365 3.088 3.088 0 0 0-2.187 1.648 4.391 4.391 0 0 0-.608 2.637 2.672 2.672 0 0 0-2.6-.34c-1.484.533-3.606 2.455-3.274 3.759s2.988 1.494 4.472.962a3.119 3.119 0 0 0 2.154-2.844c.941.726 2.386.137 3.261-1.349a3.938 3.938 0 0 0 .368-3.524c1.086-.107 1.95-1.544 1.95-3.314zM31.857 33.5c0-1.843.929-3.336 2.075-3.336s2.075 1.493 2.075 3.336a4.519 4.519 0 0 1-.613 2.365 3.09 3.09 0 0 1 2.186 1.648 4.4 4.4 0 0 1 .609 2.637 2.669 2.669 0 0 1 2.6-.34c1.484.533 3.606 2.455 3.274 3.759s-2.988 1.494-4.473.962a3.12 3.12 0 0 1-2.152-2.844c-.942.726-2.388.137-3.262-1.349a3.938 3.938 0 0 1-.368-3.524c-1.087-.107-1.951-1.544-1.951-3.314z'></path><path d='M26 11.292c-7.038 0-11.359 6.324-10.828 15 .464 7.58 4.873 12.917 10.828 12.917 5.955 0 10.364-5.337 10.828-12.917.531-8.676-3.79-15-10.828-15z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.5 20.905A14.287 14.287 0 0 0 26 8.483a14.287 14.287 0 0 0-14.5 12.422c-.642 3.808.355 6.849 1.513 8.272a47.289 47.289 0 0 0 6.4-8.093c2.313-4 3.488-6.157 3.488-6.157l3.094.2 3.094-.2s1.176 2.154 3.489 6.157a47.343 47.343 0 0 0 6.4 8.093c1.165-1.423 2.162-4.464 1.522-8.272z'></path></g></svg>",
             "<svg alt='page 5 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><g id='3b071902-a1f6-4c40-bf81-6ab4c5693def' data-name='114'><path d='M38.3 21.13c0-9.094-5.225-12.808-12.3-12.808S13.7 12.036 13.7 21.13'></path><path d='M26 11.185c-7.038 0-11.359 6.324-10.828 15.005.463 7.58 4.872 12.916 10.828 12.916 5.955 0 10.364-5.336 10.828-12.916.532-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M26 14.812a11.15 11.15 0 0 1 6.375 1.5c4.545 2.938 5.768 9.1 5.768 9.1l-.149-10.1-6.5-5.759H20.508l-6.5 5.759-.149 10.1s1.223-6.166 5.768-9.1a11.151 11.151 0 0 1 6.373-1.5z'></path><path d='M18.265 11.572s-8.539.15-9.822 7.657c-1.547 9.049 5.1 11.37 5.1 11.37s-1.392-9.05 1.857-11.448a26.8 26.8 0 0 0 5.568-5.878zM33.735 11.572s8.538.15 9.822 7.657c1.547 9.049-5.1 11.37-5.1 11.37s1.392-9.05-1.857-11.448a26.8 26.8 0 0 1-5.568-5.878z'></path></g></svg>",
             "<svg alt='page 5 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><g id='0d858280-1b0e-49a1-a75c-a6bc7a9952ec' data-name='126'><path d='M15.784 14.673s-3.846-1.735-7.221 2.452c-2.352 2.918-2.437 7.75-1.75 11.625a34.96 34.96 0 0 0 3.563 10.75 69.029 69.029 0 0 1 1.687-10.875c1-3.437 3.3-5.244 5.938-7zM36.217 14.673s3.846-1.735 7.221 2.452c2.352 2.918 2.438 7.75 1.75 11.625a34.977 34.977 0 0 1-3.562 10.75 69.078 69.078 0 0 0-1.688-10.875c-1-3.437-3.3-5.244-5.937-7z'></path><path d='M26 11.194c-7.039 0-11.36 6.324-10.829 15.005.465 7.579 4.873 12.916 10.829 12.916s10.364-5.337 10.828-12.916c.533-8.681-3.789-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M33.5 17.083l5.23 10.867a23.218 23.218 0 0 0 .3-3.726v-2.378a13.48 13.48 0 0 0-2.38-7.669 12.659 12.659 0 0 0-21.3 0 13.48 13.48 0 0 0-2.38 7.669v2.378a23.218 23.218 0 0 0 .3 3.726l5.23-10.867'></path><path d='M36.001 19.5l-2 4.5-2-4.5-2 4.5-2-4.5-2 4.5-2-4.5-2 4.5-2-4.5-2 4.5-2-4.5L26.083 9l9.918 10.5z'></path></g></svg>",
             "<svg alt='page 5 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><g id='71002417-1be0-4522-8178-6c59c8bebbc9' data-name='111'><path d='M20.142 33.5c0-1.842-.928-3.336-2.074-3.336s-2.076 1.494-2.076 3.336a4.507 4.507 0 0 0 .614 2.365 3.087 3.087 0 0 0-2.187 1.649 4.388 4.388 0 0 0-.608 2.636 2.669 2.669 0 0 0-2.6-.339c-1.484.533-3.606 2.455-3.274 3.758s2.988 1.5 4.473.962a3.119 3.119 0 0 0 2.153-2.843c.941.726 2.387.136 3.262-1.35a3.941 3.941 0 0 0 .368-3.524c1.086-.107 1.949-1.543 1.949-3.314zM31.858 33.5c0-1.842.928-3.336 2.074-3.336s2.075 1.494 2.075 3.336a4.507 4.507 0 0 1-.613 2.365 3.089 3.089 0 0 1 2.186 1.645 4.4 4.4 0 0 1 .61 2.636 2.663 2.663 0 0 1 2.6-.339c1.484.533 3.607 2.455 3.275 3.758s-2.988 1.5-4.474.962a3.117 3.117 0 0 1-2.151-2.843c-.943.726-2.389.136-3.263-1.35a3.941 3.941 0 0 1-.368-3.524c-1.088-.103-1.951-1.539-1.951-3.31z'></path><path d='M26 11.292c-7.038 0-11.359 6.325-10.828 15.005.464 7.58 4.873 12.916 10.828 12.916 5.955 0 10.365-5.336 10.828-12.916.532-8.68-3.79-15.005-10.828-15.005z' fill='#fff' stroke='#bfbfbf' stroke-width='2.475'></path><path d='M40.5 20.906A14.287 14.287 0 0 0 26 8.483a14.287 14.287 0 0 0-14.5 12.423c-.641 3.808.356 6.849 1.513 8.272a47.317 47.317 0 0 0 6.4-8.094c2.313-4 3.489-6.156 3.489-6.156l3.093.2 3.094-.2s1.176 2.154 3.489 6.156a47.352 47.352 0 0 0 6.4 8.094c1.164-1.423 2.162-4.464 1.522-8.272z'></path><path d='M16.094 13.563h19.812v9.188H16.094z'></path></g></svg>"
          ]
       ]
    ],
    "eyebrowType":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' d='M7.827 28.891v4.686l35.528-10.271-7.642-8.052L7.827 28.891z'></path></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M44.141 25.274S39.922 18.9 29.7 19.293c-10.5.4-21.3 11.086-21.3 11.086s12.22-9.153 21.336-9.591c9.418-.452 14.405 4.486 14.405 4.486z' stroke='#000' stroke-width='2.194'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' stroke-width='1.463' d='M9.51 33.24l23.948-6.558-1.929-8.273-23.951 6.557L9.51 33.24z'></path><path stroke='#000' stroke-linejoin='bevel' stroke-width='1.463' d='M31.702 18.186l12.027 10.765-13.458-2.434'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M11.356 26.616c-3.266 2.568-3.079 4.929-1.917 5.9 1.77 1.477 3.834.441 5.9-1.473 1.4-1.3 9.6-9.622 17.84-10.009a18.776 18.776 0 0 1 10.951 3.208 17.007 17.007 0 0 0-11.318-5.513c-6.172-.343-17.729 4.958-21.456 7.887z' stroke='#000' stroke-width='1.463'></path></svg>",
          "<svg alt='row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M7.479 29.178l2.267 3.046s10.532-9.341 17.631-9.7a26.461 26.461 0 0 1 11.781 1.865l2.33-6.347A29.436 29.436 0 0 0 27.3 16.6C16.281 18.066 7.479 29.178 7.479 29.178z'></path></svg>",
          "<svg alt='row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M6.617 28.757l1.427 3.016s15.425-6.694 21.7-8.052S43.362 25.7 43.362 25.7s-6.7-3.978-13.509-3.978-23.236 7.035-23.236 7.035z' stroke='#000' stroke-width='1.463'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M12.624 30.619s3.946-6.8 11.18-6.8 11.374 7.235 11.374 7.235' fill='none' stroke='#000' stroke-width='3.656'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' stroke-width='1.463' d='M10.395 27.337L32.29 15.492l12.588 11.209-12.588-6.036-21.895 12.446v-5.774z'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M8.364 25.868s9.779-.357 16.04 1.783c6.672 2.28 10.085 6.2 12.291 7.276a1.582 1.582 0 0 0 1.624-2.711C35.84 29.831 31 27.959 24.944 26.581c-6.26-1.426-16.58-.713-16.58-.713z' stroke='#000' stroke-width='3.656'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M35.438 32.113c0-5.529-5.39-10.011-12.039-10.011s-12.04 4.482-12.04 10.011' fill='none' stroke='#000' stroke-width='5.85'></path></svg>",
          "<svg alt='row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='9.506' d='M9.29 29.299l15.516-10.07 15.518 10.07'></path></svg>",
          "<svg alt='row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' stroke-width='2.194' d='M12.982 23.276L8.986 34.171l31.649-9.524 1.491-2.7-29.144 1.329z'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M24.094 17.886c-9.656 2.639-13.545 8.88-14.056 10.1a4.6 4.6 0 0 0 2.719 6.069 5 5 0 0 0 6.386-2.577s2.906-5.894 7.61-8.038c6.327-2.884 16.322-1 16.322-1s-8.957-7.294-18.981-4.554z'></path><path d='M24.094 17.886c-9.656 2.639-13.545 8.88-14.056 10.1a4.6 4.6 0 0 0 2.719 6.069 5 5 0 0 0 6.386-2.577s2.906-5.894 7.61-8.038c6.327-2.884 16.322-1 16.322-1s-8.957-7.294-18.981-4.554z' fill='none' stroke='#000' stroke-width='1.463'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' stroke-width='2.925' d='M41.523 15.8L8.799 29.968'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='8.775' d='M41.268 27.059H9.458'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M7.826 32.294S20.856 14.21 31.61 14.683a12.2 12.2 0 0 1 10.571 6.711' fill='none' stroke='#000' stroke-width='2.925'></path></svg>",
          "<svg alt='row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M35.532 24.894a2.973 2.973 0 0 0-1.732-5.687l-22.46 4.786a4.955 4.955 0 0 0 2.89 9.477z' stroke='#000' stroke-width='1.463'></path></svg>",
          "<svg alt='row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M33.845 25.317c-3.752-1.651-10.228-1.832-15.562-1.371a38.285 38.285 0 0 1-9.88-.452v7.25a54.586 54.586 0 0 0 10.7-.148A38.447 38.447 0 0 1 32 30.391a26.64 26.64 0 0 1 8.2 3.44l1.754-3.261a44.118 44.118 0 0 0-8.109-5.253z'></path><path d='M33.845 25.317c-3.752-1.651-10.228-1.832-15.562-1.371a38.285 38.285 0 0 1-9.88-.452v7.25a54.586 54.586 0 0 0 10.7-.148A38.447 38.447 0 0 1 32 30.391a26.64 26.64 0 0 1 8.2 3.44l1.754-3.261a44.118 44.118 0 0 0-8.109-5.253z' fill='none' stroke='#000' stroke-width='1.463'></path></svg>"
       ],
       [
          "<svg alt='row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M35.356 21.618c6.924 1.5 10.081 4.807 10.081 4.807s-5.986-2.9-10.283-2.8c-3.957.089-6.443 3.131-9.656 4.662a28.723 28.723 0 0 1-7.26 2.769' stroke='#000' stroke-linejoin='bevel' stroke-width='1.463'></path><path d='M35.154 23.622c-3.957.089-6.443 3.131-9.656 4.662a28.723 28.723 0 0 1-7.26 2.769c-5.892.937-8.659-.739-9.155-1.088l3.55-2.262c.014.006 1.309.67 4.5.162a27.173 27.173 0 0 0 5.486-2.224c4.207-2.006 8.248-4.619 12.741-4.023' stroke='#000' stroke-width='1.463'></path></svg>",
          "<svg alt='row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M35.227 27.653s-9.092 6.4-15.284 3.824C13.986 29 13.2 22.034 13.2 22.034' fill='none' stroke='#000' stroke-width='3.656'></path></svg>",
          "<svg alt='row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M30.533 16.286a7.536 7.536 0 0 1 6.145 4.18c1.378 2.494 1.937 4.435 5.373 6 0 0-4.349-.248-6.726-3.122-1.646-1.987-2.674-3.085-4.937-3.016-1.7.052-4.269 3.042-6.146 5.339l-1.989 2.354a13.555 13.555 0 0 1-12.128 4.289v-3.93c.213.037 5.623.883 9.16-3.038l1.861-2.208c2.676-3.27 5.709-6.974 9.387-6.848z' stroke='#000' stroke-width='1.463'></path></svg>",
          "<svg alt='row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><path stroke='#000' stroke-linejoin='bevel' stroke-width='.731' d='M6.614 23.942l24.73-.487 11.852 2.267-5.831 2.311 3.802 2.976-4.817-.332 2.789 5.619-10.314-6.277-22.211-3.6v-2.477z'></path></svg>",
          "<svg alt='row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M7.517 31.1a1.952 1.952 0 1 0 1.952-1.952A1.951 1.951 0 0 0 7.517 31.1zM13.645 26.882A1.952 1.952 0 1 0 15.6 24.93a1.95 1.95 0 0 0-1.955 1.952zM19.773 22.66a1.952 1.952 0 1 0 1.951-1.952 1.95 1.95 0 0 0-1.951 1.952zM26.7 20.685a1.952 1.952 0 1 0 1.951-1.952 1.95 1.95 0 0 0-1.951 1.952zM33.684 21.513a1.952 1.952 0 1 0 1.952-1.951 1.951 1.951 0 0 0-1.952 1.951zM39.51 26.143a1.952 1.952 0 1 0 1.952-1.951 1.952 1.952 0 0 0-1.952 1.951z' stroke='#000'></path></svg>",
          "<svg alt='row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle></svg>"
       ]
    ],
    "eyeType":[
       [
          [
             "<svg alt='page 1 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M14.51 28.62a8.55 8.55 0 0 0 8.43 8.66 8.54 8.54 0 0 0 8.42-8.66c0-4.78-3.77-7.31-8.42-7.31s-8.43 2.53-8.43 7.31z' fill='#6c7070'></path><path d='M16.16 27.86a6.78 6.78 0 1 0 6.78-6.77 6.78 6.78 0 0 0-6.78 6.77z' fill='#6c7070'></path><path d='M19.55 27.86a3.39 3.39 0 1 0 3.39-3.38 3.39 3.39 0 0 0-3.39 3.38z'></path><path d='M9 27.88c1.66-3.74 6.77-8.08 14-8.08s12.29 4.34 14 8.08' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M10.53 29.9a9.89 9.89 0 1 1 9.88 9.88 9.88 9.88 0 0 1-9.88-9.88z' fill='#6c7070'></path><path d='M11.47 29.57a8.72 8.72 0 1 0 8.72-8.72 8.72 8.72 0 0 0-8.72 8.72z' fill='#6c7070'></path><path d='M15.83 29.57a4.36 4.36 0 1 0 4.36-4.36 4.36 4.36 0 0 0-4.36 4.36z'></path><path d='M7.23 30.13C8.41 23.05 14 17.69 20.62 17.69S32.84 23.05 34 30.13' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M42.49 23.8l-6.54 2.93-3.12 1.14-1.07-2.95 3.12-1.13 6.89-1.96.72 1.97z'></path></svg>",
             "<svg alt='page 1 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M10.52 24.38C15 17 24.93 14.64 31.5 20.45c5.56 4.93 4.41 14.44 4.41 14.44a142.16 142.16 0 0 1-14.54.52c-5.89-.14-14.3-.55-14.3-.55a25.57 25.57 0 0 1 3.45-10.48z' fill='#fff'></path><path d='M13 27a8.54 8.54 0 1 0 8.53-8.53A8.53 8.53 0 0 0 13 27z' fill='#6c7070'></path><path d='M17.21 27a4.27 4.27 0 1 0 4.27-4.27A4.27 4.27 0 0 0 17.21 27z'></path><path d='M10.52 24.38C15 17 24.93 14.64 31.5 20.45c5.56 4.93 4.41 14.44 4.41 14.44s-7.5.57-14.54.52c-6.14 0-14.3-.55-14.3-.55a25.57 25.57 0 0 1 3.45-10.48z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M44 18.23l-8.4 5.67-1.57-2.6 8.92-4.81L44 18.23z'></path></svg>",
             "<svg alt='page 1 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M12.57 18.31a18.8 18.8 0 0 0-2.06 11c.67 5.66 1.78 7.57 1.78 7.57h19.89s5.39-11.31-2.12-17.53c-8.24-6.8-17.49-1.04-17.49-1.04z' fill='#fff'></path><path d='M10.43 26.88a9 9 0 1 0 9-9 9 9 0 0 0-9 9z' fill='#6c7070'></path><path d='M15 26.87a4.5 4.5 0 1 0 4.5-4.49 4.5 4.5 0 0 0-4.5 4.49z'></path><path d='M33.65 37.39s3.11-10.91-4.4-17.13c-8.24-6.82-18.59-1.2-18.59-1.2' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M9.17 22.3c-1.48 4.87 3.05 10.48 10.1 12.52s14-.24 15.44-5.12-3.05-10.48-10.1-12.52-13.97.24-15.44 5.12z' fill='#fff'></path><path d='M12.93 25.55a7.67 7.67 0 1 0 7.66-7.66 7.66 7.66 0 0 0-7.66 7.66z' fill='#6c7070'></path><path d='M16.76 25.55a3.84 3.84 0 1 0 3.83-3.83 3.83 3.83 0 0 0-3.83 3.83z'></path><path d='M9.17 22.3c-1.48 4.87 3.05 10.48 10.1 12.52s14-.24 15.44-5.12-3.05-10.48-10.1-12.52-13.97.24-15.44 5.12z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M20.77 17.56c3.94.85 12.13 3.66 14.86 8.18a5.4 5.4 0 0 1 .65 4.42l-3.15-.91a2.15 2.15 0 0 0-.33-1.88c-1.7-2.82-7.8-5.61-12.74-6.67-6.41-1.38-8.41-.94-9.32 2.05l-3.15-.91c2.02-6.69 8.73-5.24 13.18-4.28z'></path></svg>",
             "<svg alt='page 1 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><path fill='#fff' d='M9.97 29.42l26.27.19-1.72-2.66-21.9-1.63-2.65 4.1z'></path><path d='M12.43 23.22s.81-6.3 4.84-5.84l14.05 1.46c4 .46 4.19 7 4.19 7s2.1 8.85-14 8.17c-15.11-.63-9.08-10.79-9.08-10.79z' fill='#fff'></path><path d='M15.4 20.1l7.88.49 7.72.51a3.34 3.34 0 0 1 .44 1.29v.66a8.53 8.53 0 0 1-17 0V22a4.26 4.26 0 0 1 .96-1.9z' fill='#6c7070'></path><path d='M18.69 23.05A4.27 4.27 0 1 0 23 18.78a4.27 4.27 0 0 0-4.31 4.27z'></path><path d='M37.05 28.73c.27-5-2.84-8.26-6.5-8.5l-14.42-.93c-3.66-.24-6.48 2.68-6.75 7.64' fill='none' stroke='#000' stroke-width='4.38'></path><path d='M36 30.81a22.35 22.35 0 0 1-12.72 3.83 22.35 22.35 0 0 1-12.72-3.83' fill='none' stroke='#000' stroke-width='3.28'></path></svg>"
          ],
          [
             "<svg alt='page 1 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M10.66 26.2a7.23 7.23 0 1 0 7.23-7.2 7.23 7.23 0 0 0-7.23 7.2z' fill='#6c7070'></path><path d='M14.27 26.2a3.62 3.62 0 1 0 3.62-3.61 3.62 3.62 0 0 0-3.62 3.61z'></path><path d='M10.66 26.2a7.15 7.15 0 0 0 .14 1.4 7.82 7.82 0 0 1 7.09-4.26A7.82 7.82 0 0 1 25 27.6a7.21 7.21 0 0 0-7.11-8.6 7.23 7.23 0 0 0-7.23 7.2z'></path><path d='M29.24 20.76l-4.43 3.39-1.87-3.09L28 18.7l1.24 2.06z'></path></svg>",
             "<svg alt='page 1 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='3.61' d='M32.51 26.17H9.18'></path></svg>",
             "<svg alt='page 1 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M10.12 27.91a6.6 6.6 0 1 0 6.6-6.59 6.6 6.6 0 0 0-6.6 6.59z' fill='#6c7070'></path><path d='M13.42 27.91a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.3 3.3z'></path><path fill='none' stroke='#000' stroke-width='3.61' d='M35.34 26.07L8.88 17.61'></path></svg>",
             "<svg alt='page 1 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M22.44 18.08c7.92 0 13.2 2.64 13.2 7.92s-5.28 7.92-13.2 7.92S9.23 31.28 9.23 26s5.28-7.92 13.21-7.92z' fill='#fff'></path><path d='M15.68 26a6.76 6.76 0 1 0 6.76-6.75A6.76 6.76 0 0 0 15.68 26z' fill='#6c7070'></path><path d='M19.06 26a3.38 3.38 0 1 0 3.38-3.38A3.38 3.38 0 0 0 19.06 26z'></path><path d='M22.44 18.08c7.92 0 13.2 2.64 13.2 7.92s-5.28 7.92-13.2 7.92S9.23 31.28 9.23 26s5.28-7.92 13.21-7.92z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M8.31 30.49s2-8.36 10-11.45A17.2 17.2 0 0 1 36 22.12S33.9 30.8 25.19 33c-8.92 2.28-16.88-2.51-16.88-2.51z' fill='#fff'></path><path d='M11.73 26.3a7.91 7.91 0 1 0 7.9-7.91 7.9 7.9 0 0 0-7.9 7.91z' fill='#6c7070'></path><path d='M15.68 26.3a4 4 0 1 0 3.95-4 4 4 0 0 0-3.95 4z'></path><path d='M8.31 30.49s2-8.36 10-11.45A17.2 17.2 0 0 1 36 22.12S33.9 30.8 25.19 33c-8.92 2.28-16.88-2.51-16.88-2.51z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M12.25 28a7.11 7.11 0 1 0 7.11-7.11A7.11 7.11 0 0 0 12.25 28z' fill='#6c7070'></path><path d='M15.8 28a3.56 3.56 0 1 0 3.56-3.55A3.57 3.57 0 0 0 15.8 28z'></path><path d='M30 15.49a10.8 10.8 0 0 1 5.76 6.39c1.15 3.44-.24 8.2-.41 8.81h-3.31a21.28 21.28 0 0 1 .2-4.12 7.47 7.47 0 0 0 .19-3.57 7.35 7.35 0 0 0-3.9-4.31 11.23 11.23 0 0 0-8.79.14C11.85 21.87 9.1 32.92 9.21 33l-3.15-.58c0-.54 1.58-13.16 12.27-17.2a15.1 15.1 0 0 1 11.67.27z' fill='#0ff'></path><path d='M41.05 28.72l-7.27 1.83-.57-3.23 7.46-.76zM39.29 21.88l-6.15 4.3-1.68-2.82L38.17 20z'></path><path d='M7.66 32.82s2.25-10.13 11-12.89c7.87-2.49 14.76 1.29 15 10.8' fill='none' stroke='#000' stroke-width='3.28'></path></svg>"
          ],
          [
             "<svg alt='page 1 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M11.21 28.09a10.19 10.19 0 1 0 10.17-10.22 10.2 10.2 0 0 0-10.17 10.22z' fill='#fff'></path><path d='M10.59 24.71A8.76 8.76 0 1 0 19.35 16a8.76 8.76 0 0 0-8.76 8.71z' fill='#6c7070'></path><circle cx='19.35' cy='24.71' r='4.38'></circle><path d='M28.4 37.52a11.77 11.77 0 1 0-18.76-9.43' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M11 29.1a6.71 6.71 0 1 0 6.71-6.7A6.7 6.7 0 0 0 11 29.1z' fill='#6c7070'></path><path d='M11.72 29.1a6 6 0 1 0 6-6 6 6 0 0 0-6 6z' fill='#6c7070'></path><path d='M14.73 29.1a3 3 0 1 0 3-3 3 3 0 0 0-3 3z'></path><path d='M27.74 36.14a11.93 11.93 0 0 0 2.35-7.42c0-6.47-4.79-10.94-11.63-10.94a12.74 12.74 0 0 0-8.27 3' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M37.88 39.83l-6.29-4.09-2.76-2.1 1.99-2.61 2.76 2.1 5.63 4.95-1.33 1.75z'></path><path d='M11.22 25.92a10.95 10.95 0 1 0 11-10.8 10.88 10.88 0 0 0-11 10.8z' fill='#fff'></path><path d='M9.66 25.85a12.51 12.51 0 1 0 21.77-8.39' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M12.19 24.32a9.09 9.09 0 1 0 9.09-9.09 9.09 9.09 0 0 0-9.09 9.09z' fill='#6c7070'></path><path d='M16.73 24.32a4.55 4.55 0 1 0 4.55-4.55 4.55 4.55 0 0 0-4.55 4.55z'></path></svg>",
             "<svg alt='page 1 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M16 27.07a7.66 7.66 0 1 0 7.66-7.66A7.66 7.66 0 0 0 16 27.07z' fill='#6c7070'></path><path d='M19.82 27.07a3.83 3.83 0 1 0 3.83-3.83 3.82 3.82 0 0 0-3.83 3.83z'></path><path d='M12.34 33a8.27 8.27 0 0 1-1-3.93c0-5.5 5.52-10 12.32-10S36 23.53 36 29a8.26 8.26 0 0 1-1 4' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M15.27 30.05a8 8 0 0 0 8.13 7.88 8 8 0 0 0 8.13-7.88c0-4.36-3.67-6.95-8.16-6.95s-8.1 2.59-8.1 6.95z' fill='#6c7070'></path><path d='M16.09 29.37a7.31 7.31 0 1 0 7.31-7.31 7.31 7.31 0 0 0-7.31 7.31z' fill='#6c7070'></path><path d='M19.75 29.37a3.66 3.66 0 1 0 3.65-3.65 3.65 3.65 0 0 0-3.65 3.65z'></path><path d='M8.79 27.8a28.72 28.72 0 0 1 14.61-3.9A28.7 28.7 0 0 1 38 27.8' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M23.4 22.73c-6.66 0-15.48 3.63-15.48 3.63C8.88 21.91 14.33 17 23.4 17s14.52 4.92 15.48 9.37c0-.01-8.81-3.64-15.48-3.64z'></path></svg>",
             "<svg alt='page 1 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M13.81 27.45A7.22 7.22 0 1 0 21 20.24a7.22 7.22 0 0 0-7.19 7.21z' fill='#6c7070'></path><path d='M17.42 27.45a3.61 3.61 0 1 0 3.58-3.6 3.6 3.6 0 0 0-3.58 3.6z'></path><path d='M36.41 32.14s2.46-9.29-5.61-13.63-17-.14-22.8 13.14' fill='none' stroke='#000' stroke-width='3.28'></path></svg>"
          ],
          [
             "<svg alt='page 1 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M10.13 26.21C9.79 24 16.55 20.08 24.36 23c5.82 2.19 7.05 8.73 7.05 8.73a9.29 9.29 0 0 0-7-5.86c-6.81-1.44-13.94 2.56-14.28.34z' stroke='#000' stroke-width='3.28'></path><path d='M39.29 27.29l-6.84 3.07-2.13.78-1.13-3.09 2.14-.78 7.21-2.04.75 2.06z'></path></svg>",
             "<svg alt='page 1 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M18.46 28.92a50.57 50.57 0 0 0-9.57.78 9.72 9.72 0 0 1 9.57-7.07A9.74 9.74 0 0 1 28 29.7a50.69 50.69 0 0 0-9.54-.78z' stroke='#000' stroke-linejoin='bevel' stroke-width='3.61'></path></svg>",
             "<svg alt='page 1 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M20.26 24.76a37.69 37.69 0 0 1 8.21 2.41 37.16 37.16 0 0 1-8.53-.61 37.76 37.76 0 0 1-8.2-2.41 36.68 36.68 0 0 1 8.52.61z' stroke='#000' stroke-linejoin='bevel' stroke-width='3.61'></path><path d='M28.79 33.85a38 38 0 0 1-10.07-.54 38.19 38.19 0 0 1-9.62-3' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.61'></path></svg>",
             "<svg alt='page 1 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M11 26.8a7 7 0 1 0 7-7 7 7 0 0 0-7 7z' fill='#6c7070'></path><path d='M14.52 26.8A3.51 3.51 0 1 0 18 23.29a3.51 3.51 0 0 0-3.48 3.51z'></path><path d='M41.11 28.11s-4.67 4.24-9 .81c-4.11-3.28-6.19-10.14-14.75-10.2-7.29 0-10.07 7.54-10.07 7.54' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M8.79 33.84A6.74 6.74 0 0 1 8.16 31c0-4.94 5.55-8.95 12.39-8.95s12.39 4 12.39 9a6.73 6.73 0 0 1-.62 2.8z' fill='#fff'></path><path d='M13.91 33.84a8.23 8.23 0 1 1 13.35 0z' fill='#6c7070'></path><path d='M16.47 29a4.12 4.12 0 1 0 4.11-4.12A4.12 4.12 0 0 0 16.47 29z'></path><path d='M7.71 33.43c0-8 6.1-14.17 13.28-14.17S33.58 25 33.58 33.05l-.09.82c0-3.13-3.64-12.78-12.85-12.42-9.75.39-13 9.29-13 12.42z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M41.15 32.31l-7.45.84-.14-3.28 7.5.25zM40.32 25.3l-6.66 3.43-1.29-3 7.09-2.43z'></path></svg>",
             "<svg alt='page 1 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M7.82 33.39c0-6.27 4.86-15.8 14.17-15.8 11.35 0 13.41 9.53 13.41 15.8z' fill='#fff'></path><path d='M10.77 26a9 9 0 1 0 9-9 9 9 0 0 0-9 9z' fill='#6c7070'></path><path d='M15.25 26a4.48 4.48 0 1 0 4.48-4.48A4.47 4.47 0 0 0 15.25 26z'></path><path d='M7.82 33.39c0-6.27 4.86-15.8 14.17-15.8 11.35 0 13.41 9.53 13.41 15.8z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M39.59 20.31l-5 4-1.81-2.73 5.62-3.07zM41.72 26.05l-6 2.18-.84-3.18 6.31-1.11zM41.91 32.18l-6.4.13.21-3.31 6.34 1z'></path></svg>"
          ],
          [
             "<svg alt='page 1 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M11.85 30.05a5.76 5.76 0 1 0 5.76-5.77 5.76 5.76 0 0 0-5.76 5.77z' fill='#6c7070'></path><path d='M14.73 30.05a2.88 2.88 0 1 0 2.88-2.88 2.88 2.88 0 0 0-2.88 2.88z'></path><path d='M33.65 15.57C24.08 17.58 15.8 22 10 28' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M16.84 27.54a5.9 5.9 0 1 0 5.9-5.9 5.91 5.91 0 0 0-5.9 5.9z' fill='#6c7070'></path><path d='M19.79 27.54a3 3 0 1 0 2.95-2.95 3 3 0 0 0-2.95 2.95z'></path><path fill='none' stroke='#000' stroke-width='3.28' d='M36.52 21.03H18.51l-8.06 8.56M36.52 23.09H16.64'></path></svg>",
             "<svg alt='page 1 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M18.72 21.06a13.75 13.75 0 0 0-9.09 3.58v2.72a13.75 13.75 0 0 0 9.09 3.58 13.75 13.75 0 0 0 9.08-3.58v-2.72a13.75 13.75 0 0 0-9.08-3.58z'></path></svg>",
             "<svg alt='page 1 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M7.07 30c0 .07 5.24 2.31 18-.35 10.78-2.24 14.47-5.93 14.42-6-1.75-3.5-12.67-3.78-18.35-2.31C12.33 23.59 7.73 27.4 7.07 30z' fill='#fff'></path><path d='M15.27 26A5.75 5.75 0 1 0 21 20.26 5.74 5.74 0 0 0 15.27 26z' fill='#6c7070'></path><circle cx='21.01' cy='26' r='2.87'></circle><path d='M7.07 30c0 .07 5.24 2.31 18-.35 10.78-2.24 14.47-5.93 14.42-6-1.75-3.5-12.67-3.78-18.35-2.31C12.33 23.59 7.73 27.4 7.07 30z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M13.07 35.56L8.62 29.9s2.5-6.11 11-9.8c9-3.92 18.77.6 18.77.6s-2 3.7-5.43 9.73' fill='#fff'></path><path d='M14.5 25.91a7.24 7.24 0 1 0 7.24-7.24 7.24 7.24 0 0 0-7.24 7.24z' fill='#6c7070'></path><path d='M18.12 25.91a3.62 3.62 0 1 0 3.62-3.62 3.62 3.62 0 0 0-3.62 3.62z'></path><path d='M12.91 36.24L8.62 29.9S11.11 24 20 20.18c8.52-3.7 18.4.52 18.4.52a35 35 0 0 1-4.22 10.59' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 1 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M9 25.67s3.34-4.45 11.76-6.89a29.56 29.56 0 0 1 17.34.59S35.12 32 28.62 33.7C22.43 35.37 10 32.2 10 32.2' fill='#fff'></path><path d='M14.82 25A6.22 6.22 0 1 0 21 18.79 6.22 6.22 0 0 0 14.82 25z' fill='#6c7070'></path><path d='M17.93 25A3.11 3.11 0 1 0 21 21.9a3.11 3.11 0 0 0-3.07 3.1z'></path><path d='M7.92 25.77s4.37-4.55 12.79-7a29.56 29.56 0 0 1 17.34.59S35.12 32 28.62 33.7c-6.19 1.67-19.14-.94-19.14-.94' fill='none' stroke='#000' stroke-width='3.28'></path></svg>"
          ]
       ],
       [
          [
             "<svg alt='page 2 row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M22.72 31.08C14.83 31.08 7.6 31 7.6 31c1.92-3.93 7.11-9 15.67-9.92 8.39-.94 13.08 3.13 11.7 7.45-1.03 3.23-5.54 2.55-12.25 2.55z' fill='#fff'></path><path d='M15 24a6.94 6.94 0 0 0-.33 2.14 7.12 7.12 0 0 0 1.79 4.72c1.3 1.47 8.57 1.82 9.79.84a7.12 7.12 0 0 0 .07-11.06c-1.2-1.03-10.38.45-11.32 3.36z' fill='#6c7070'></path><path d='M18.26 26.12a3.57 3.57 0 1 0 3.56-3.56 3.56 3.56 0 0 0-3.56 3.56z'></path><path d='M22.72 31.08C14.83 31.08 7.6 31 7.6 31c1.92-3.93 7.11-9 15.67-9.92 8.39-.94 13.08 3.13 11.7 7.45-1.03 3.23-5.54 2.55-12.25 2.55z' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3.28'></path><path d='M42.89 25.63l-7 2.58-.91-3.16 7.35-1.53zM40.43 19l-5.67 4.91-2-2.63 6.32-4z'></path></svg>",
             "<svg alt='page 2 row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M6.9 33.317s3.331-8.252 11.7-10.961a23.056 23.056 0 0 1 16.33 1.118s-2.642 9.165-11.652 11.486A25.4 25.4 0 0 1 6.9 33.317z' fill='#fff'></path><path d='M12.117 23.572a7.391 7.391 0 1 0 11.691-3.546' fill='#6c7070'></path><path d='M15.477 25.78a3.695 3.695 0 1 0 3.694-3.695 3.694 3.694 0 0 0-3.694 3.695z'></path><path d='M6.9 33.317s3.331-8.252 11.7-10.961a23.056 23.056 0 0 1 16.33 1.118s-2.642 9.165-11.652 11.486A25.4 25.4 0 0 1 6.9 33.317z' fill='none' stroke='#000' stroke-width='3.284'></path><path d='M6.377 34.408s3.278-11.156 13.478-14.437c9.784-3.147 15.258 1.916 15.258 1.916' fill='none' stroke='#000' stroke-width='3.284'></path><path d='M43.51 18.069l-8.397 5.674-1.573-2.598 8.921-4.809 1.049 1.733z'></path></svg>",
             "<svg alt='page 2 row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M9.88 28.2l-1.51-2.11c.47-3.94 2.3-7.53 8-6.29a99 99 0 0 0 13.56 1.6 7.2 7.2 0 0 1 6.3 8l-2.1 1.78s-1.37 3.45-7.62 3.68c-7.09.24-13.66-1.02-16.63-6.66z' fill='#fff'></path><path d='M15.54 25.38a4.78 4.78 0 1 0 4.78-4.78 4.78 4.78 0 0 0-4.78 4.78z' fill='#6c7070'></path><path d='M17.93 25.38A2.39 2.39 0 1 0 20.32 23a2.39 2.39 0 0 0-2.39 2.38z'></path><path d='M8.14 28.05l.23-2c.47-3.94 2.3-7.53 8-6.29a99 99 0 0 0 13.56 1.6 7.2 7.2 0 0 1 6.3 8L36 31.34' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M12.75 26A7.23 7.23 0 1 0 20 18.75 7.22 7.22 0 0 0 12.75 26z' fill='#6c7070'></path><path d='M16.36 26A3.61 3.61 0 1 0 20 22.36 3.61 3.61 0 0 0 16.36 26z'></path></svg>",
             "<svg alt='page 2 row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M41.46 23.64l-6.84 3.08-3.26 1.18-1.12-3.08 3.26-1.19 7.21-2.04.75 2.05z'></path><path d='M19.48 15.12c7.2 0 13.35 5.42 13.35 12.11 0 4.26-1.29 5.37-4.87 7.53H11.5c-3.59-2.16-5.36-3.27-5.36-7.53 0-6.69 6.15-12.11 13.34-12.11z' fill='#fff'></path><path d='M11.64 26.5a8 8 0 1 0 8-8 8 8 0 0 0-8 8z' fill='#6c7070'></path><path d='M15.65 26.5a4 4 0 1 0 4-4 4 4 0 0 0-4 4z'></path><path d='M10.87 36a11.67 11.67 0 0 1-4.09-8.8c0-6.69 5.83-12.11 13-12.11s13 5.42 13 12.11a11.7 11.7 0 0 1-4.03 8.8' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M8.45 26.08A11.91 11.91 0 1 1 20.36 38 11.91 11.91 0 0 1 8.45 26.08z' fill='#fff'></path><path d='M8.51 26.08a11.85 11.85 0 1 1 11.85 11.84A11.85 11.85 0 0 1 8.51 26.08z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M13.31 26.08a7 7 0 1 0 7-7 7.05 7.05 0 0 0-7 7z' fill='#6c7070'></path><path d='M16.84 26.08a3.53 3.53 0 1 0 3.52-3.53 3.53 3.53 0 0 0-3.52 3.53zM40.5 26.43l-6.85.57v-3.51l6.85.59zM39.26 19.15l-6.08 3.2-1.37-3.25 6.54-2.1zM35.29 12.92l-4.35 5.32-2.53-2.46 5.2-4.5z'></path></svg>"
          ],
          [
             "<svg alt='page 2 row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M24.32 14.29c8 0 14.45 4.63 14.45 11.71S32.3 37.7 24.32 37.7 9.87 33.08 9.87 26s6.47-11.71 14.45-11.71z' fill='#fff'></path><path d='M16.81 25.76a7.55 7.55 0 1 0 7.54-7.55 7.54 7.54 0 0 0-7.54 7.55z' fill='#6c7070'></path><path d='M20.58 25.76A3.78 3.78 0 1 0 24.35 22a3.77 3.77 0 0 0-3.77 3.76z'></path><path d='M24.32 14.29c8 0 14.45 4.63 14.45 11.71S32.3 37.7 24.32 37.7 9.87 33.08 9.87 26s6.47-11.71 14.45-11.71z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M9.87 27.19c0-7.08 6.47-8.9 14.45-8.9s14.45 1.82 14.45 8.9c0 0 .07-12.37-14.53-12.37S9.87 27.19 9.87 27.19z' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M10.22 25.29c0 4.63 5.91 8.71 13.31 9 8.73.29 13.59-4.24 13.31-8.86-.21-3.6-4.91-5.84-12.76-6.23-9.24-.5-13.86 1.46-13.86 6.09z' fill='#fff'></path><path d='M17.46 24.34a5.88 5.88 0 1 0 5.87-6.07 6 6 0 0 0-5.87 6.07z' fill='#6c7070'></path><path d='M20.4 24.34a2.94 2.94 0 1 0 2.93-3 3 3 0 0 0-2.93 3z'></path><path d='M10.22 25.29c0 4.63 6 12.21 16.55 11.06 8.55-.94 10.51-7.16 10.07-11' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M10.22 25.29c0 4.63 5.91 8.71 13.31 9 8.73.29 13.59-4.24 13.31-8.86-.21-3.6-4.91-5.84-12.76-6.23-9.24-.5-13.86 1.46-13.86 6.09z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M22.88 33.45c-4.48 0-8.58.2-11.81.53a9 9 0 0 1-1.75-5.27c0-6 6.14-10.79 13.72-10.79s13.72 4.83 13.72 10.79A9 9 0 0 1 35 34a118.11 118.11 0 0 0-12.12-.55z' fill='#fff'></path><path d='M14.76 26.46a8.28 8.28 0 0 1 4.82-7.52 14 14 0 0 1 3.42-.43 13.88 13.88 0 0 1 3.45.43 8.28 8.28 0 0 1-.22 15.15c-1.09 0-2.22-.05-3.38-.05h-3.1a8.29 8.29 0 0 1-4.99-7.58z' fill='#6c7070'></path><path d='M18.9 26.46a4.14 4.14 0 1 0 4.1-4.15 4.14 4.14 0 0 0-4.1 4.15z'></path><path d='M22.88 33.45c-4.48 0-8.58.2-11.81.53a9 9 0 0 1-1.75-5.27c0-6 6.14-10.79 13.72-10.79s13.72 4.83 13.72 10.79A9 9 0 0 1 35 34a118.11 118.11 0 0 0-12.12-.55z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M11.07 34a7.06 7.06 0 0 1-1.75-4.52c0-5.12 6.14-9.26 13.72-9.26s13.72 4.14 13.72 9.26A7 7 0 0 1 35 34' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M6.56 26.13c0 5.2 6.15 9.42 13.75 9.42s13.75-4.22 13.75-9.42-6.16-9.42-13.75-9.42-13.75 4.22-13.75 9.42z' fill='#fff'></path><path d='M11.58 25.61a8.39 8.39 0 1 0 8.42-8.2 8.3 8.3 0 0 0-8.42 8.2z' fill='#6c7070'></path><path d='M15.77 25.61a4.2 4.2 0 1 0 4.2-4.1 4.16 4.16 0 0 0-4.2 4.1z'></path><path d='M6.56 26.13c0 5.2 6.15 9.42 13.75 9.42s13.75-4.22 13.75-9.42-6.16-9.42-13.75-9.42-13.75 4.22-13.75 9.42z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M6.75 28.69c0-3.67 6-6.63 13.34-6.63s13.35 3 13.35 6.63V22.6l-10.6-6.15L12.2 19l-5.27 5.59M42.06 25.21l-7.26 1.88-.59-3.23 7.46-.8zM40.26 18.38l-6.12 4.34-1.7-2.81 6.69-3.4z'></path></svg>",
             "<svg alt='page 2 row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M9.12 25.67c0 6 5.62 10.92 12.55 10.92s12.54-4.89 12.54-10.92-5.61-10.91-12.54-10.91S9.12 19.65 9.12 25.67z' fill='#fff'></path><path d='M13.12 24.94a8 8 0 1 0 8-8 8 8 0 0 0-8 8z' fill='#6c7070'></path><path d='M17.12 24.94a4 4 0 1 0 4-4 4 4 0 0 0-4 4z'></path><path d='M9.12 25.67c0 6 5.62 10.92 12.55 10.92s12.54-4.89 12.54-10.92-5.61-10.91-12.54-10.91S9.12 19.65 9.12 25.67z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M21.67 16C9.43 16 7.6 22.07 7.6 25.67h3c0-2.8 6-5.17 11-5.17s11 2.37 11 5.17h3c.13-3.6-1.7-9.67-13.93-9.67zM35.29 37.16l-4.25-2.77 2.07-2.54 3.57 3.61-1.39 1.7zM30.89 40.88l-3.21-3.93 2.76-1.79 2.29 4.53-1.84 1.19zM25.19 42.72l-1.86-4.73 3.17-.86.8 5.01-2.11.58z'></path></svg>",
             "<svg alt='page 2 row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M9.8 20.64c-1.94 5.6.83 10.73 8 13.45 7.41 2.83 15.17 1 17.1-4.58S32.5 19.09 25 16.49 11.73 15 9.8 20.64z' fill='#fff'></path><path d='M11.51 23.45A8.51 8.51 0 1 0 20 14.94a8.51 8.51 0 0 0-8.49 8.51z' fill='#6c7070'></path><path d='M15.76 23.45A4.26 4.26 0 1 0 20 19.19a4.25 4.25 0 0 0-4.24 4.26z'></path><path d='M7.68 25.8a8.57 8.57 0 0 1 .42-3.65C10 16.53 17.48 14 24.72 16.5s11.28 9 9.58 14.7a9.55 9.55 0 0 1-4.5 4.92' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M37.12 39.8l-7-4.52 2.19-2.91 6.26 5.49zM41.25 33.7l-8-2.15 1.19-3.45 7.64 3.3z'></path></svg>"
          ],
          [
             "<svg alt='page 2 row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M34 26a12 12 0 1 0-12 12 12 12 0 0 0 12-12z' fill='#fff'></path><path d='M28.55 26A6.57 6.57 0 1 1 22 19.43 6.57 6.57 0 0 1 28.55 26z' fill='#6c7070'></path><path d='M25.27 26A3.29 3.29 0 1 1 22 22.71 3.28 3.28 0 0 1 25.27 26z'></path><path d='M33.93 26A11.95 11.95 0 1 0 22 38a11.95 11.95 0 0 0 11.93-12z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M10.13 21.87a13.73 13.73 0 0 0 27.46 0z' fill='#fff'></path><path d='M32.56 21.87a8.71 8.71 0 1 1-17.41 0h17.41z' fill='#6c7070'></path><path d='M28.21 21.87a4.36 4.36 0 0 1-8.71 0h8.71z'></path><path d='M10.13 21.87a13.73 13.73 0 0 0 27.46 0z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M39.26 19.11a21.36 21.36 0 0 1-7.63 9.76C25.27 33 11.53 32 11.53 32c-2.62 0-4.73-1.85-4.73-4.13a4.46 4.46 0 0 1 4.73-4.14 93.21 93.21 0 0 0 15.45-1 64.33 64.33 0 0 0 12.28-3.62z' fill='#fff'></path><path d='M13.77 27.62A5.27 5.27 0 1 0 19 22.35a5.27 5.27 0 0 0-5.23 5.27z' fill='#6c7070'></path><path d='M16.41 27.62A2.64 2.64 0 1 0 19 25a2.63 2.63 0 0 0-2.59 2.62z'></path><path d='M39.26 19.11a21.36 21.36 0 0 1-7.63 9.76C25.27 33 11.53 32 11.53 32c-2.62 0-4.73-1.85-4.73-4.13a4.46 4.46 0 0 1 4.73-4.14 93.21 93.21 0 0 0 15.45-1 64.33 64.33 0 0 0 12.28-3.62z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M9.05 27.69a12 12 0 1 0 12-12 12 12 0 0 0-12 12z' fill='#6c7070'></path><path d='M15.07 27.69a6 6 0 1 0 6-6 6 6 0 0 0-6 6z'></path><path fill='#fff' d='M24.37 19.37l1.68 3.36 3.36 1.68-3.36 1.69-1.68 3.36-1.68-3.36-3.36-1.69 3.36-1.68 1.68-3.36zM16.81 27.94l1.34 2.69 2.69 1.35-2.69 1.34-1.34 2.69-1.35-2.69-2.69-1.34 2.69-1.35 1.35-2.69z'></path><path d='M34.78 28.24a13.69 13.69 0 0 0-27.37 0' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M41.32 26.48l-6.38.52v-3.26l6.38.55zM40.17 19.7l-5.67 3-1.28-3 6.1-2zM36.47 13.89l-4.06 5-2.36-2.29 4.85-4.19z'></path></svg>",
             "<svg alt='page 2 row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='2.19' d='M40.76 27.09l-7.3-.33M38.1 35.77l-6.59-3.16'></path><path d='M8.06 26.77a1.82 1.82 0 0 0-.28 1 1.8 1.8 0 0 0 .23.87c.71 1.24 2 1.05 4.67.62a49.86 49.86 0 0 1 8.83-.8 40.44 40.44 0 0 1 7.22.6l.91-2.23a32.85 32.85 0 0 0-7.5-1.46c-5.68-.47-12.86-.53-14.08 1.4zM8 28.61z'></path></svg>",
             "<svg alt='page 2 row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='3.61' d='M30.83 26H10.96'></path><path fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.61' d='M28.29 16.07L11.09 26l17.2 9.94'></path></svg>"
          ],
          [
             "<svg alt='page 2 row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M36 32.34c0-4.94-6.29-10.41-14.06-10.41s-14 5.47-14 10.41' fill='#fff'></path><path d='M27.35 32.34a7 7 0 1 0-11.73 0z' fill='#6c7070'></path><path d='M18 28.5a3.51 3.51 0 1 0 3.5-3.5 3.51 3.51 0 0 0-3.5 3.5z'></path><path d='M36 32.34c0-4.94-6.29-10.41-14.06-10.41s-14 5.47-14 10.41' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M7.75 32.43C11.14 35.16 18 38.08 24.52 37a16.52 16.52 0 0 0 7.57-3.16c1.92-1.6 2.56-.91 4.31-3.26l-5-4.38-11.09-4.9L11 23.9z' fill='#fff'></path><path d='M13.15 29.09a7 7 0 0 0 7.14 6.76 7 7 0 0 0 7.14-6.76 7 7 0 0 0-7.14-6.76 7 7 0 0 0-7.14 6.76z' fill='#6c7070'></path><path d='M16.72 29.09a3.58 3.58 0 1 0 3.57-3.38 3.48 3.48 0 0 0-3.57 3.38z'></path><path d='M6.5 32.11s2.42-8.57 9.5-9.76c5.44-.92 10.12.09 15.41 3.92a30.71 30.71 0 0 1 5.09 4.54s-1.3 1.85-3.15 4' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M22.41 30.69a47.83 47.83 0 0 1-15.59-2.26 18.16 18.16 0 0 1 15.59-8.22A18.16 18.16 0 0 1 38 28.43a47.85 47.85 0 0 1-15.59 2.26z' fill='#fff' stroke='#000' stroke-linejoin='bevel' stroke-width='.65'></path><ellipse cx='22.41' cy='25.8' rx='6.25' ry='5.86' fill='#6c7070'></ellipse><ellipse cx='22.41' cy='25.8' rx='3.12' ry='2.93'></ellipse><path d='M22.41 30.69a47.83 47.83 0 0 1-15.59-2.26c3-4.9 8.86-6.92 15.59-6.92s12.6 2 15.6 6.92a47.85 47.85 0 0 1-15.6 2.26z' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.28'></path><path d='M13.09 35.26a67 67 0 0 0 9.32.63 67.09 67.09 0 0 0 9.33-.63' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='2.93'></path></svg>",
             "<svg alt='page 2 row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M26.78 34.27c-10.2 3.65-20-3.72-20-3.72s5.24-9.88 14.5-10.42c13.11-.75 12.51 9.64 12.51 9.64a16 16 0 0 1-7.01 4.5z' fill='#fff'></path><path d='M12.77 27.67A7.24 7.24 0 1 0 20 20.44a7.24 7.24 0 0 0-7.23 7.23z' fill='#6c7070'></path><path d='M16.39 27.67A3.62 3.62 0 1 0 20 24.05a3.62 3.62 0 0 0-3.61 3.62z'></path><path d='M6.79 30.66a27.1 27.1 0 0 1 6.36-7.25 14.2 14.2 0 0 1 17.32.82 17.43 17.43 0 0 1 4 5.75' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M38.2 27.11s-7.26-13-23.68-4.86' fill='none' stroke='#000' stroke-width='2.93'></path></svg>",
             "<svg alt='page 2 row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M11.08 25.44c-2.26 2.87-6.17 8.87-3.42 9.25a93.85 93.85 0 0 0 13 .83 93.82 93.82 0 0 0 13.76-.94c1.58-.25-.42-3.07-.42-3.07s-1.59-3.3-2.22-4.39c-1.41-2.43-3.25-6.71-10.35-6.71-4.43 0-7.26 1.11-10.35 5.03z' fill='#fff'></path><path d='M12.5 27.87a7.59 7.59 0 0 0 7.81 7.35 7.59 7.59 0 0 0 7.82-7.35 7.6 7.6 0 0 0-7.82-7.37 7.6 7.6 0 0 0-7.81 7.37z' fill='#6c7070'></path><path d='M16.4 27.87a3.79 3.79 0 0 0 3.91 3.67 3.69 3.69 0 1 0 0-7.36 3.8 3.8 0 0 0-3.91 3.69zM43 28.5l-7 2.73-1-3.14 7.3-1.69z'></path><path d='M35.61 34.92a18.86 18.86 0 0 0-.2-2.73C34.27 24.76 28.56 20 21.69 20 14 20 7.77 26.19 7.77 34.92' fill='none' stroke='#000' stroke-width='3.27'></path><path d='M33.58 34.92c0-8.73-5.29-14.41-12.59-14.41S7.77 26.19 7.77 34.92' fill='none' stroke='#000' stroke-width='3.27'></path><path fill='none' stroke='#000' stroke-width='3.36' d='M37.51 35.36l-9.7 1.62'></path></svg>",
             "<svg alt='page 2 row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M7.68 31.52v-.05a14.38 14.38 0 1 1 28.76 0v.05a79.88 79.88 0 0 1-14.38 1.21 79.8 79.8 0 0 1-14.38-1.21z' fill='#fff'></path><path d='M13.7 25.22a7.8 7.8 0 0 0 8 7.54 7.81 7.81 0 0 0 8-7.54 7.81 7.81 0 0 0-8-7.55 7.8 7.8 0 0 0-8 7.55z' fill='#6c7070'></path><path d='M17.71 25.22a3.9 3.9 0 0 0 4 3.77 3.9 3.9 0 0 0 4-3.77 3.9 3.9 0 0 0-4-3.78 3.9 3.9 0 0 0-4 3.78z'></path><path d='M7.68 31.52v-.05a14.38 14.38 0 1 1 28.76 0v.05a79.88 79.88 0 0 1-14.38 1.21 79.8 79.8 0 0 1-14.38-1.21z' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M27 38.47c-2.16.12-5.31 0-7.6-.06a61 61 0 0 1-9.1-1' fill='none' stroke='#000' stroke-width='2.93'></path></svg>"
          ],
          [
             "<svg alt='page 2 row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M35.39 32.52c-8 1.95-12.18 2.25-16.8 1.84A44.82 44.82 0 0 1 9.93 33s.76-12.35 10.3-13.37c12.66-1.35 14.68 7 14.68 7s2.95 5.29.48 5.89z' fill='#fff'></path><path d='M29.13 28.25a7.18 7.18 0 1 0-14.35 0 7.32 7.32 0 0 0 3.17 6l.64.07A36.7 36.7 0 0 0 26 34.3a7.33 7.33 0 0 0 3.13-6.05z' fill='#6c7070'></path><path d='M18.37 28.25A3.59 3.59 0 1 0 22 24.6a3.63 3.63 0 0 0-3.63 3.65z'></path><path d='M8.84 33.39s-.54-9.53 9.75-13.11c8.31-2.88 18.75 2.82 17.34 12.89' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M10 33.39a12.67 12.67 0 0 1 8.91-12.19c7.61-2.68 16.88 2.65 15.89 12' fill='none' stroke='#000' stroke-width='3.03'></path><path d='M34.25 18.17a19 19 0 0 0-15.76-3.25A17.36 17.36 0 0 0 11 18.67' fill='none' stroke='#000' stroke-width='2.93'></path><path d='M44 26.81l-6.87 3-1.13-3.1 7.23-2z'></path></svg>",
             "<svg alt='page 2 row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M35.47 27.44C31.89 31 32.62 32.33 23.68 34c-4.23.81-12 .42-16.27-2.76 1.51-6.28 6-12 18.55-10.81 6.45.64 5.32 4.01 9.51 7.01z' fill='#fff'></path><path d='M13 27.15a7.27 7.27 0 0 0 7.48 7.05 7.27 7.27 0 0 0 7.49-7.05 7.28 7.28 0 0 0-7.49-7 7.28 7.28 0 0 0-7.48 7z' fill='#6c7070'></path><path d='M16.7 27.15a3.64 3.64 0 0 0 3.74 3.53 3.53 3.53 0 1 0 0-7 3.64 3.64 0 0 0-3.74 3.47zM42.4 25.97l-6.64 3.48-1.73.77-1.3-3.01 1.72-.78 7.08-2.47.87 2.01zM39.57 20.52l-5.74 4.84-1.37 1.14-1.92-2.66 1.37-1.14 6.37-3.95 1.29 1.77z'></path><path d='M35.12 30.24c-1.14-5.51-6.64-9.68-13.25-9.68-7.43 0-14.46 5.28-14.46 11.79' fill='none' stroke='#000' stroke-width='3.37'></path><path d='M7.3 32.08c0-7 6.67-12.62 14.89-12.62 7 0 12.9 4.11 14.48 9.64L29 34.2' fill='none' stroke='#000' stroke-width='3.26'></path></svg>",
             "<svg alt='page 2 row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M14.23 24.39a7.46 7.46 0 1 0 12.48 7.19 7.17 7.17 0 0 0 .29-1.92 7.45 7.45 0 0 0-1-3.61' fill='#6c7070'></path><path d='M15.77 29.66a3.73 3.73 0 1 0 3.73-3.73 3.73 3.73 0 0 0-3.73 3.73z'></path><path d='M9.64 19.61a19.49 19.49 0 0 1 10-2.58 20 20 0 0 1 9.11 2.09' fill='none' stroke='#000' stroke-width='2.93'></path><path d='M8 28.69a16.87 16.87 0 0 1 11.67-4.59 16.91 16.91 0 0 1 11.68 4.59' fill='none' stroke='#000' stroke-width='3.28'></path><path d='M7.33 28a19.14 19.14 0 0 1 12.34-5.2A19.13 19.13 0 0 1 32 28' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M13.45 20.44c8.15 1.76 17.47-1.93 21 4.58 2.3 4.19 0 8.37-4.63 10.07-3.69 1.36-9 1.11-12.92-.16s-6.59-4-6.67-7.8A10.39 10.39 0 0 1 13 20.22a1.21 1.21 0 0 0 .45.22z' fill='#fff'></path><path d='M16.08 26.58a6.34 6.34 0 0 0 6.52 6.14 6.35 6.35 0 0 0 6.53-6.14 6.35 6.35 0 0 0-6.53-6.15 6.34 6.34 0 0 0-6.52 6.15z' fill='#6c7070'></path><path d='M19.34 26.58a3.27 3.27 0 1 0 3.26-3.08 3.17 3.17 0 0 0-3.26 3.08z'></path><path d='M8 15.1s1.3 4.31 4.88 5.2c8.28 2.08 17.95-1.95 21.61 4.72 2.3 4.19 0 8.37-4.63 10.07-3.69 1.36-9 1.11-12.92-.16s-6.59-4-6.67-7.8A10.39 10.39 0 0 1 13 20.22' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M34.27 26a8.47 8.47 0 0 1 .06 1c0 5.79-6 10.49-13.37 10.49S7.6 32.84 7.6 27.05v-.68a46.91 46.91 0 0 1 13.3-1.83A47 47 0 0 1 34.27 26z' fill='#fff'></path><path d='M13.05 24.8a8.17 8.17 0 1 0 16.18 1.65 7.78 7.78 0 0 0-.07-1.09' fill='#6c7070'></path><path d='M17.15 25.25a4 4 0 0 0-.18 1.2 4.09 4.09 0 1 0 8.17 0 4 4 0 0 0-.32-1.59'></path><path d='M7.64 26.37a46.91 46.91 0 0 1 13.3-1.83A47 47 0 0 1 34.27 26' fill='none' stroke='#000' stroke-width='2.93'></path><path d='M7.6 27.05c0 5.79 6 10.49 13.36 10.49s13.37-4.7 13.37-10.49S28.35 16.56 21 16.56 7.6 21.26 7.6 27.05z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>",
             "<svg alt='page 2 row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M10 22.19c2.74-3 7.21-3.65 12-3.65s9.27.67 12 3.65c3 3.27 2.59 8.55-2.21 9.94-3.8 1.1-5.33.43-9.8.43s-6 .67-9.8-.43C7.38 30.74 7 25.46 10 22.19z' fill='#fff'></path><path d='M16.69 24.28A5.29 5.29 0 1 0 22 19a5.29 5.29 0 0 0-5.31 5.28z' fill='#6c7070'></path><path d='M19.33 24.28A2.65 2.65 0 1 0 22 21.63a2.65 2.65 0 0 0-2.67 2.65z'></path><path d='M10 22.19c2.74-3 7.21-3.65 12-3.65s9.27.67 12 3.65c3 3.27 2.59 8.55-2.21 9.94-3.8 1.1-5.33.43-9.8.43s-6 .67-9.8-.43C7.38 30.74 7 25.46 10 22.19z' fill='none' stroke='#000' stroke-width='3.28'></path></svg>"
          ]
       ]
    ],
    "noseType":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M27.23 14.86a54.13 54.13 0 0 1-2.54 9c-1.53 3.59-3.87 4.35-3.05 8.86.89 4.91 8.89 4.43 8.89 4.43' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M38.65 25.21s-2.48 8.11-12.42 8.11-12.42-8.11-12.42-8.11' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M22.45 21.82c-1.86-1.16-5 .47-6.22 2.47A4.12 4.12 0 0 0 17.34 30 4.14 4.14 0 0 0 23 28.49c1.21-2 1.31-5.49-.55-6.67zm13.32 2.47c-1.24-2-4.36-3.63-6.22-2.47s-1.76 4.67-.51 6.67a4 4 0 1 0 6.73-4.2z'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M38.61 28.08c-1.88 7.64-9.17 13-12.74 13s-10.87-5.36-12.75-13' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M30.64 26s4.14 5.28 4.14 7.84S26 39 26 39s-8.78-2.61-8.78-5.17S21.37 26 21.37 26V10.81' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M26 20.74L15.48 31.26h21.04L26 20.74z'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M35.14 18.89s5 2.59 5 6.85c0 5.82-5.48 7.36-14.4 7.36s-14.4-1.54-14.4-7.36c0-4.26 5-6.85 5-6.85' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M38.17 31S37.71 21 26 21 13.83 31 13.83 31' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M29.75 11.4s5.7 12.55 4.4 19.87a8.87 8.87 0 0 1-8 7.47 8.89 8.89 0 0 1-8-7.47c-1.3-7.32 4.4-19.87 4.4-19.87' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M31.35 10.94s-.8 18 0 18.47 6.16-3.27 7.71.86-11.51 9-13.06 9-14.6-4.89-13.06-9 6.9-.43 7.71-.86 0-18.47 0-18.47' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M39.944 19.857v5.229c-1.327 4.43-7.22 2.823-7.22 2.823C32.225 32.06 26 32.142 26 32.142s-6.224-.082-6.723-4.233c0 0-5.893 1.607-7.22-2.823v-5.229' fill='none' stroke='#000' stroke-width='3.506' fill-rule='evenodd'></path></svg>",
          "<svg alt='row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='3.21' d='M20.66 10.97v17.24l-4.28 9.95'></path><path d='M18.77 39h5.18v-5.75L18.77 39z'></path><path fill='none' stroke='#000' stroke-width='3.21' d='M32.85 10.97v17.24l4.27 9.95'></path><path d='M33.46 39h-5.19v-5.75L33.46 39z'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M34.47 34.38a4.13 4.13 0 0 1-.65.22 35.74 35.74 0 0 1-7.82.61 35.74 35.74 0 0 1-7.82-.61c-3.76-1-3-5.25-2.13-7.31.95-2.24 6.05-12.52 6.05-12.52' fill='none' stroke='#000' stroke-width='3.25'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M35.38 21.53a11 11 0 1 1-18.76 0' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M31.74 29.51l-.41 6.38a4.2 4.2 0 0 1-4.12 3.86h-2.64a4.2 4.2 0 0 1-4.12-3.86l-1.61-25' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M16 11.5a53.28 53.28 0 0 0-2.1 10.72 85.58 85.58 0 0 0-.42 11.58c.13 4 8.64 7.79 9.76 7.79H26M36 11.5a53.66 53.66 0 0 1 2 10.72 85.58 85.58 0 0 1 .42 11.58c-.13 4-8.63 7.79-9.75 7.79H26' fill='none' stroke='#000' stroke-width='3.51'></path></svg>",
          "<svg alt='row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M31.9 12.1c3.266 7.879 3.266 13.358 3.266 13.358s4.077 1.79 4.132 5.573c.1 6.343-7.593 5.958-7.593 5.958a5.713 5.713 0 0 1-5.475 3.46 5.711 5.711 0 0 1-5.475-3.46s-7.69.385-7.593-5.958c.055-3.783 4.131-5.573 4.131-5.573s0-5.479 3.268-13.358' fill='none' stroke='#000' stroke-width='3.506'></path></svg>",
          "<svg alt='row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M35.41 21.72s3.22 7 .77 10.82-5.41 8.51-10.18 8.51-7.73-4.64-10.18-8.51.77-10.82.77-10.82' fill='none' stroke='#000' stroke-width='3.51'></path></svg>"
       ]
    ],
    "mouthType":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='4.018' d='M12.187 26.001h27.626'></path></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M25.964 30.259h.077c9.685-.035 16.444-7.394 16.444-7.394l-.3-.015A35.388 35.388 0 0 1 26 26.518 35.384 35.384 0 0 1 9.815 22.85l-.294.015s6.758 7.359 16.443 7.394z' fill='#be4e26'></path><path d='M42.188 22.87c-1.5-.076-8.53-.45-10.664-.45a16.5 16.5 0 0 0-5.546 1.456H25.9a15.422 15.422 0 0 0-5.419-1.456c-2.136 0-9.179.374-10.667.45A35.384 35.384 0 0 0 26 26.538a35.388 35.388 0 0 0 16.188-3.668z' fill='#712a04'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M44.257 22.246C41.9 26.838 33.059 28.119 26 28.119s-15.9-1.281-18.256-5.873' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M42.877 22.173c0 2.271-7.556 4.112-16.877 4.112S9.122 24.444 9.122 22.173' fill='none' stroke='#000' stroke-width='3.014'></path><path d='M6.444 26.192a9.78 9.78 0 0 1 2.593-4.128 9.378 9.378 0 0 1 3.179-2.029M45.555 26.192a9.761 9.761 0 0 0-2.593-4.128 9.363 9.363 0 0 0-3.18-2.029' fill='none' stroke='#000' stroke-width='2.009'></path></svg>",
          "<svg alt='row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M7.492 23.227s5.9 8.48 18.508 8.48 18.505-8.48 18.505-8.48z' fill='#fff'></path><path d='M7.492 23.227s5.9 8.48 18.508 8.48 18.505-8.48 18.505-8.48' fill='none' stroke='#fff' stroke-linejoin='bevel' stroke-width='3.014'></path><path fill='none' stroke='#fff' stroke-linejoin='bevel' stroke-width='2.009' d='M45.749 23.101H6.248'></path><path d='M7.492 23.227s5.9 8.48 18.508 8.48 18.505-8.48 18.505-8.48z'></path><path d='M7.492 23.227a24.635 24.635 0 0 0 4.966 4.15h27.084a24.644 24.644 0 0 0 4.965-4.15z' fill='#fff'></path><path d='M7.492 23.227s5.9 8.48 18.508 8.48 18.505-8.48 18.505-8.48' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path><path fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='2.009' d='M45.749 23.101H6.248'></path></svg>",
          "<svg alt='row 1 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M46.423 22.791c-3.23.693-14.714 3.026-20.423 3.026S8.807 23.484 5.578 22.791c4.18 2.436 12.642 5.08 20.422 5.08s16.246-2.644 20.423-5.08z' fill='#be4e26'></path><path d='M46.423 22.811c.182-.106.368-.212.534-.317A173.006 173.006 0 0 1 26 23.684a173 173 0 0 1-20.956-1.19c.166.105.352.211.534.317C8.807 23.5 20.292 25.877 26 25.877s17.193-2.377 20.423-3.066z' fill='#712a04'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M26 21.581a25.59 25.59 0 0 0-14.815 4.479l.013.029a93.363 93.363 0 0 1 29.606 0l.013-.029A25.585 25.585 0 0 0 26 21.581z' fill='#712a04'></path><path d='M11.2 26.089c.119.319 3.655 6.165 14.8 6.165s14.685-5.847 14.8-6.165a93.363 93.363 0 0 0-29.606 0z' fill='#be4e26'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M45.463 26.958a13.889 13.889 0 0 1-7.6 1.381c-4.203-.565-7.782-3.992-11.863-3.992s-7.657 3.427-11.864 3.992a13.889 13.889 0 0 1-7.6-1.381' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M44.519 28.518l-7.8-4.424s-3.183-1.854-5.757-1.6A11.136 11.136 0 0 0 26 24.629a11.143 11.143 0 0 0-4.959-2.138c-2.575-.251-5.757 1.6-5.757 1.6l-7.8 4.424' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M10.779 37.147a36.02 36.02 0 0 1 4.632-18.6M41.221 37.147a36.01 36.01 0 0 0-4.632-18.6' fill='none' stroke='#000' stroke-width='2.009'></path><path fill='none' stroke='#000' stroke-width='3.014' d='M12.822 26.304h26.355'></path></svg>",
          "<svg alt='row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M26 21.132c-5 0-10 5-10 7.5s10 2.5 10 2.5 10 0 10-2.5-5-7.5-10-7.5z' fill='#fff' stroke='#fff' stroke-width='2.009'></path><path d='M26 21.131c-5 0-10 5-10 7.5s10 2.5 10 2.5 10 0 10-2.5-5-7.5-10-7.5z' fill='#fff'></path><path d='M26 21.131c-5 0-10 5-10 7.5s10 2.5 10 2.5 10 0 10-2.5-5-7.5-10-7.5z' fill='none' stroke='#000' stroke-width='2.009'></path><path d='M26 31.654c5 0 10-2.808 10-4.214s-10-1.4-10-1.4-10 0-10 1.4 5 4.214 10 4.214z'></path></svg>",
          "<svg alt='row 2 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M12.652 26.8v1.521a16.87 16.87 0 0 0 26.993 0V26.8z' fill='#be4e26'></path><path d='M39.645 25.329l-.036-.1H12.688l-.036.1V28.3h26.993z'></path><path d='M26.148 18.532a16.747 16.747 0 0 0-13.46 6.715h26.921a16.848 16.848 0 0 0-13.461-6.715z' fill='#712a04'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M22.378 20.805c-2.9 0-13.775 4.553-13.775 4.553H43.4s-10.784-4.553-13.685-4.553S26 22.708 26 22.708s-.723-1.903-3.622-1.903z' fill='#712a04'></path></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M45.133 22.19A62.913 62.913 0 0 0 26 29.809 62.883 62.883 0 0 0 6.867 22.19' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M26 20.452c-2.232 0-4.464 3.441-4.464 5.672S23.771 29.38 26 29.38s4.464-1.023 4.464-3.256-2.229-5.672-4.464-5.672z'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M39.837 21.321l2.37 3.856s-5.633 5.437-16.125 5.437h-.151c-10.492 0-16.125-5.437-16.125-5.437l2.369-3.856' fill='none' stroke='#fff' stroke-width='2.009'></path><path d='M40.726 21.823a52.7 52.7 0 0 1-14.712 2.226h-.085a52.717 52.717 0 0 1-14.713-2.226' fill='none' stroke='#fff' stroke-width='2.009'></path><path d='M26.009 30.189c10.124 0 15.462-4.975 15.462-4.975l-2.188-3.642A43.376 43.376 0 0 1 26.009 23.8h-.077a43.363 43.363 0 0 1-13.272-2.228l-2.188 3.642s5.337 4.975 15.46 4.975z' fill='#fff'></path><path d='M26.009 30.189c10.124 0 15.462-4.975 15.462-4.975l-2.188-3.642A43.394 43.394 0 0 1 26.009 23.8h-.077a43.381 43.381 0 0 1-13.272-2.228l-2.188 3.642s5.337 4.975 15.46 4.975z'></path><path d='M26.046 30.459c6.317 0 7.841-1.755 7.841-1.755l-.066-4.628a37.409 37.409 0 0 1-7.775.806h-.087a37.409 37.409 0 0 1-7.775-.806l-.068 4.624s1.525 1.755 7.843 1.755z' fill='#fff'></path><path d='M39.837 21.32l2.37 3.857s-5.633 5.437-16.125 5.437h-.151c-10.492 0-16.125-5.437-16.125-5.437l2.369-3.857' fill='none' stroke='#000' stroke-width='2.009'></path><path d='M40.726 21.823a52.718 52.718 0 0 1-14.712 2.225h-.085a52.738 52.738 0 0 1-14.713-2.225' fill='none' stroke='#000' stroke-width='2.009'></path></svg>",
          "<svg alt='row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='3.014' d='M14.469 25.921h23.062'></path><path d='M10.678 19.264a9.747 9.747 0 0 1 2.708 6.607 9.483 9.483 0 0 1-1.929 5.66M41.323 19.264a9.748 9.748 0 0 0-2.709 6.607 9.471 9.471 0 0 0 1.931 5.66' fill='none' stroke='#000' stroke-width='2.009'></path><path fill='none' stroke='#000' stroke-width='3.014' d='M13.934 25.921h24.132'></path></svg>",
          "<svg alt='row 3 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M26.194 34.322c4.925 0 7.658-4.7 7.686-7.556H18.507c.027 2.861 2.764 7.556 7.687 7.556z' fill='#be4e26'></path><path d='M33.882 26.721c0-2.857-2.561-6.053-4.593-6.571a3.059 3.059 0 0 0-3.1.887 3.057 3.057 0 0 0-3.089-.887c-2.032.518-4.595 3.714-4.595 6.571v.065H33.88l.002-.065z' fill='#712a04'></path></svg>"
       ],
       [
          "<svg alt='row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M12.378 26.473s9.031.143 16.136-.188c8.1-.378 11.615-1.633 16.134-6.467' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><defs><linearGradient id='ab04ab50-0380-446e-8ef3-7e7d35956e9e' x1='25.7' y1='26.11' x2='25.7' y2='18.443' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#712a04'></stop><stop offset='.148' stop-color='#8b3610'></stop><stop offset='.319' stop-color='#a24119'></stop><stop offset='.505' stop-color='#b24821'></stop><stop offset='.715' stop-color='#bb4d25'></stop><stop offset='1' stop-color='#be4e26'></stop></linearGradient><linearGradient id='966eeeb4-75fa-4797-b414-1b7c92cd7eda' x1='25.7' y1='34.515' x2='25.7' y2='26.578' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#be4e26'></stop><stop offset='.285' stop-color='#bb4d25'></stop><stop offset='.495' stop-color='#b24821'></stop><stop offset='.681' stop-color='#a24119'></stop><stop offset='.852' stop-color='#8b3610'></stop><stop offset='1' stop-color='#712a04'></stop></linearGradient></defs><path d='M25.7 18.489c4.52 0 11.3 1.13 11.3 4.519s-6.778 3.074-11.3 3.074-11.3.315-11.3-3.074 6.78-4.519 11.3-4.519z' fill='url(#ab04ab50-0380-446e-8ef3-7e7d35956e9e)'></path><path d='M25.7 34.315c4.52 0 11.3-1.131 11.3-4.52s-6.778-3.077-11.3-3.077-11.3-.311-11.3 3.082 6.78 4.515 11.3 4.515z' fill='url(#966eeeb4-75fa-4797-b414-1b7c92cd7eda)'></path></svg>",
          "<svg alt='row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M10.024 25.406s6.81-.512 15.87-.536c9.709 0 14.628.294 14.628.294a13.039 13.039 0 0 1-.878 3.725 17.329 17.329 0 0 1-2.3 3.829' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M42.805 29.478A43.27 43.27 0 0 1 26 23.521a43.266 43.266 0 0 1-16.8 5.957' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path></svg>",
          "<svg alt='row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M10.329 20.463A97.326 97.326 0 0 0 26 21.991a97.286 97.286 0 0 0 15.672-1.528S36.168 30.779 26 30.779 10.329 20.463 10.329 20.463z' fill='#fff'></path><path d='M41.675 20.463S36.168 30.779 26 30.779 10.329 20.463 10.329 20.463' fill='none' stroke='#fff' stroke-linejoin='bevel' stroke-width='2.562'></path><path d='M9.333 20.178A128.824 128.824 0 0 0 26 21.475a128.752 128.752 0 0 0 16.668-1.3' fill='none' stroke='#fff' stroke-linejoin='bevel' stroke-width='1.708'></path><path d='M10.329 20.462A97.326 97.326 0 0 0 26 21.99a97.286 97.286 0 0 0 15.672-1.528S36.168 30.779 26 30.779 10.329 20.462 10.329 20.462z' fill='#fff'></path><path d='M41.675 20.462S36.168 30.779 26 30.779 10.329 20.462 10.329 20.462' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='2.562'></path><path d='M9.333 20.178A128.921 128.921 0 0 0 26 21.474a128.849 128.849 0 0 0 16.668-1.3' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='1.708'></path><path fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='2.135' d='M26.001 21.82v9.09M19.289 21.82v7.831M32.713 21.82v7.831'></path></svg>",
          "<svg alt='row 4 column 6' width='45' height='45' viewBox='0 0 52 52'><path fill='none' stroke='#000' stroke-width='3.014' d='M8.087 28.46l7.259-.874 5.651-3.39 6.152 4.102 7.472-3.516 9.517 4.649'></path></svg>"
       ],
       [
          "<svg alt='row 5 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M15.114 29.6A20 20 0 0 0 26 33.2a20 20 0 0 0 10.887-3.6 17.139 17.139 0 0 0 4.881-5.313l-.2-1.117h-.031l.01.088c-3.171 1.764-6.227 2.09-11 2.623-.9.1-1.822 1.884-4.552 1.884s-3.654-1.784-4.55-1.884c-4.771-.533-7.828-.859-11-2.623l.01-.088h-.032l-.2 1.117a17.139 17.139 0 0 0 4.891 5.313z' fill='#be4e26'></path><path d='M41.57 23.167v-.007h-.034l-.227-.669c-.192-.009-3-.715-5.914-1.4-2.207-.519-4.3-1.449-5.258-1.536-1.872-.178-3.412 1.131-4.137 1.545-.724-.41-2.265-1.719-4.134-1.548-.961.087-3.053 1.017-5.26 1.536-2.91.687-5.72 1.393-5.912 1.4l-.227.669h-.034v.007h.032l-.03.088c3.169 1.764 6.246 2.11 11.017 2.643.9.1 1.821 1.884 4.55 1.884S29.655 26 30.552 25.9c4.77-.533 7.846-.879 11.017-2.643l-.03-.088z' fill='#712a04'></path></svg>",
          "<svg alt='row 5 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M40.119 32.222s-4.662-5.641-11.971-6.562c-9.4-1.183-16.816 4.62-16.816 4.62' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 5 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M14.576 31.758C18.642 34.334 23.8 34.619 26 34.619a26.86 26.86 0 0 0 11.425-2.861 14.641 14.641 0 0 0 5.949-6.839v-.074l-2.092.144c-.884.171-2.035.378-3.391.589l-3 1.041-5.443-.128a62.51 62.51 0 0 1-3.445.1c-1.151 0-2.307-.04-3.446-.1l-5.446.128-3-1.043c-1.352-.21-2.5-.416-3.381-.587l-2.1-.144v.06a17.043 17.043 0 0 0 5.946 6.853z' fill='#be4e26'></path><path d='M35.044 22.8c-3.217-.784-4.32-2.168-9.037-2.168H26c-4.717 0-5.82 1.384-9.036 2.168a18.035 18.035 0 0 1-6.695.146l.046.633v.679l2.1.73 1.691.587c2.377.369 5.345.74 8.449.914L26 26.4l3.451.081c3.1-.174 6.065-.544 8.441-.913l1.7-.588 2.1-.73v-.679l.049-.633a18.026 18.026 0 0 1-6.697-.138z' fill='#712a04'></path><path d='M16.974 28.205a12.281 12.281 0 0 1-8.348-3.36l1.64-1.9c4.168 3.592 7.533 2.887 11.1 2.139A22.523 22.523 0 0 1 26 24.442a22.532 22.532 0 0 1 4.639.639c3.563.748 6.928 1.454 11.1-2.139l1.639 1.9c-5.108 4.4-9.434 3.5-13.251 2.694A20.347 20.347 0 0 0 26 26.954a20.347 20.347 0 0 0-4.123.585 23.635 23.635 0 0 1-4.903.666z'></path></svg>",
          "<svg alt='row 5 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M40.731 23.081s.879 1.831.117 3.144c-2.208 3.8-9.162 1.328-14.848 1.328s-12.639 2.475-14.847-1.328c-.762-1.313.117-3.144.117-3.144' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 5 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M35.121 23.608c-2.857.171-6.009.288-9.121.288s-6.264-.117-9.121-.288c-2.7-.16-5.115-.483-7.5-.775l-.01.058C12.64 25.956 19.377 28.443 26 28.443c.831 0 1.664-.039 2.491-.113 5.769-.52 11.281-2.759 14.14-5.439l-.01-.058c-1.785.218-3.589.455-5.517.627q-.969.087-1.983.148z' fill='#fff'></path><path d='M9.35 22.828h.031zM42.621 22.833h.03-.03zM37.1 23.46c1.928-.172 3.732-.409 5.517-.627-1.781.218-3.586.455-5.517.627zM26 23.9c-3.111 0-6.263-.117-9.12-.288-2.7-.16-5.116-.483-7.5-.776 2.383.292 4.8.615 7.5.775 2.856.168 6.009.289 9.12.289z' fill='#0f0'></path><path d='M10.737 27.331zM10.068 26.5a9.058 9.058 0 0 1-.986-1.655 9.058 9.058 0 0 0 .986 1.655z' fill='red'></path><path d='M42.651 22.828l-.007-.04.007.04zM9.357 22.788l-.007.04.007-.04zM9.643 21.048l-.252 1.532.252-1.532zM42.61 22.58l-.252-1.532.252 1.532zM9.357 22.788l.034-.208-.034.208zM42.644 22.788l-.034-.208.034.208zM9.388 22.788h-.031l-.007.04h.031zM42.613 22.788l.008.044h.03l-.007-.04zM42.644 22.788l-.034-.208h-.032l.035.208h.031zM9.424 22.58h-.033l-.034.208h.031l.036-.208z'></path><path d='M42.613 22.788l-.035-.208h.032l-.252-1.532A122.608 122.608 0 0 0 26 19.84a122.606 122.606 0 0 0-16.357 1.208l-.252 1.532h.033l-.036.208-.007.044c2.383.293 4.8.616 7.5.776 2.857.171 6.009.288 9.12.288s6.264-.117 9.121-.288q1.015-.06 1.983-.148c1.927-.172 3.732-.409 5.517-.628z' fill='#712a04'></path><path d='M42.665 22.861l-.034.03.034-.03zM10.13 26.579c-.019-.026-.043-.051-.062-.077.019.026.043.051.062.077zM9.371 22.891l-.035-.03.035.03z'></path><path d='M42.665 22.861l-.034.03c-2.859 2.68-8.371 4.919-14.14 5.439-.827.074-1.66.113-2.491.113-6.623 0-13.36-2.487-16.629-5.552l-.035-.03-.254 1.986a9.058 9.058 0 0 0 .986 1.655c.019.026.043.051.062.077.188.251.388.5.607.752A21.814 21.814 0 0 0 26 34.192c7.393 0 14.961-4.977 16.919-9.345z' fill='#be4e26'></path></svg>",
          "<svg alt='row 5 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M26 30.016c5.617 0 10.733-.753 12.869-2.763 1.543-1.452 1.46-3.64-.251-4.52-2.2-1.13-5.185.627-12.618.627s-10.42-1.76-12.619-.627c-1.711.88-1.794 3.068-.251 4.52 2.136 2.01 7.252 2.763 12.87 2.763z'></path></svg>"
       ],
       [
          "<svg alt='row 6 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M26 32.456a9.845 9.845 0 0 0 6.653-2.31A26.4 26.4 0 0 1 39.983 26c-5.7-.669-8.769-6.021-13.982-6.026S17.715 25.333 12.018 26a26.411 26.411 0 0 1 7.325 4.144A9.847 9.847 0 0 0 26 32.456z' fill='#fff' stroke='#fff' stroke-width='3.014'></path><path d='M26 31.52a8.368 8.368 0 0 0 5.655-1.964 22.444 22.444 0 0 1 6.226-3.522c-4.843-.568-7.454-5.118-11.885-5.123s-7.043 4.555-11.886 5.123a22.444 22.444 0 0 1 6.226 3.522A8.371 8.371 0 0 0 26 31.52z'></path><path d='M26 20.413h.011c5.372 0 9.78 2.867 12.2 4.527a3.13 3.13 0 0 1-1.076 1.5H14.874a3.135 3.135 0 0 1-1.077-1.5c2.419-1.66 6.826-4.527 12.2-4.527h.011' fill='#fff'></path><path d='M26 32.457a9.846 9.846 0 0 0 6.653-2.311A26.4 26.4 0 0 1 39.983 26c-5.7-.669-8.769-6.021-13.982-6.026S17.715 25.333 12.018 26a26.411 26.411 0 0 1 7.325 4.144A9.848 9.848 0 0 0 26 32.457z' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path></svg>",
          "<svg alt='row 6 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M42.238 27.3a7.347 7.347 0 0 0-5.191-1.841c-3.682.334-7.422 3.232-11.047 3.232s-7.364-2.9-11.046-3.232A7.349 7.349 0 0 0 9.763 27.3' fill='none' stroke='#000' stroke-width='3.014'></path></svg>",
          "<svg alt='row 6 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M21.893 21.9s-2.471 6.118-4.062 9.851c0 0 8.1.164 16.492.659' fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='3.014'></path></svg>",
          "<svg alt='row 6 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M44.111 24.89a6.97 6.97 0 0 0-4.8-5.034 9.736 9.736 0 0 0-4.846.056l-.128.026A43.208 43.208 0 0 1 26 20.6a43.2 43.2 0 0 1-8.332-.658l-.128-.026a9.74 9.74 0 0 0-4.847-.056 6.97 6.97 0 0 0-4.8 5.034 6.239 6.239 0 0 0 .969 4.93 8.638 8.638 0 0 0 5.938 3.385 70.408 70.408 0 0 0 11.2.834 70.4 70.4 0 0 0 11.2-.834 8.638 8.638 0 0 0 5.946-3.389 6.239 6.239 0 0 0 .965-4.93z' fill='#fff'></path><path d='M26 32.536a65.684 65.684 0 0 0 11.056-.836c3.765-.6 6.263-3.22 5.579-6.508s-4.272-4.872-8.021-4.291a67.563 67.563 0 0 1-8.614.417 67.572 67.572 0 0 1-8.615-.413c-3.749-.581-7.338 1.016-8.021 4.291s1.814 5.91 5.579 6.508A65.7 65.7 0 0 0 26 32.536z' fill='#fff'></path><path d='M44.111 24.89a6.97 6.97 0 0 0-4.8-5.034 9.736 9.736 0 0 0-4.846.056l-.128.026A43.208 43.208 0 0 1 26 20.6a43.2 43.2 0 0 1-8.332-.658l-.128-.026a9.74 9.74 0 0 0-4.847-.056 6.97 6.97 0 0 0-4.8 5.034 6.239 6.239 0 0 0 .969 4.93 8.638 8.638 0 0 0 5.938 3.385 70.408 70.408 0 0 0 11.2.834 70.4 70.4 0 0 0 11.2-.834 8.638 8.638 0 0 0 5.946-3.389 6.239 6.239 0 0 0 .965-4.93zm-3.448 3.217a5.682 5.682 0 0 1-3.843 2.109l-.125.021A65.926 65.926 0 0 1 26 31.029a65.931 65.931 0 0 1-10.7-.792l-.125-.021a5.682 5.682 0 0 1-3.843-2.109 3.247 3.247 0 0 1-.5-2.6 4.417 4.417 0 0 1 2.832-3.4 5.728 5.728 0 0 1 3.594-.2 44.853 44.853 0 0 0 8.735.7 44.848 44.848 0 0 0 8.734-.7 5.728 5.728 0 0 1 3.594.2 4.417 4.417 0 0 1 2.832 3.4 3.247 3.247 0 0 1-.49 2.6z'></path><path fill='none' stroke='#000' stroke-linejoin='bevel' stroke-width='2.511' d='M26 21.525v10.694M18.104 20.734v11.559M33.895 20.734v11.559'></path></svg>",
          "<svg alt='row 6 column 5' width='45' height='45' viewBox='0 0 52 52'><path d='M44.3 22.647c-4.406 1.644-10.97 2.688-18.3 2.688s-13.893-1.044-18.3-2.688' fill='none' stroke='#000' stroke-width='3.014'></path><path d='M33.652 33.327a72.036 72.036 0 0 1-7.652.4 72 72 0 0 1-7.651-.4M8.31 25.349c-1.333-1.817.474-4.037 2.288-4.458M43.689 25.349c1.335-1.817-.472-4.037-2.287-4.458' fill='none' stroke='#000' stroke-width='2.009'></path><path d='M44.3 22.832A67.049 67.049 0 0 1 26 25.019a67.055 67.055 0 0 1-18.3-2.187' fill='none' stroke='#000' stroke-width='3.014'></path><path d='M33.651 32.508a72.016 72.016 0 0 1-7.651.4 71.974 71.974 0 0 1-7.651-.4M8.31 25.282c-1.334-1.816.473-4.036 2.287-4.457M43.688 25.282c1.336-1.816-.473-4.036-2.287-4.457' fill='none' stroke='#000' stroke-width='2.009'></path></svg>",
          "<svg alt='row 6 column 6' width='45' height='45' viewBox='0 0 52 52'><path d='M29.3 33.559c-3.971 4.26-9.842 1.519-9.842-2.178a3.867 3.867 0 0 1 4.024-3.681 3.867 3.867 0 0 1-4.028-3.683c0-3.7 5.871-6.438 9.842-2.176M21.526 27.699h4.49' fill='none' stroke='#000' stroke-width='3.014'></path></svg>"
       ]
    ],
    "glassesType":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.91 16.1 16.1 0 0 1 42.09 26z' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></path><path d='M24.36 25c0-2.43-2.74-4.4-6.11-4.4s-6.11 2-6.11 4.4 2.73 4.39 6.11 4.39 6.11-1.93 6.11-4.39zM27.64 25c0-2.43 2.74-4.4 6.11-4.4s6.11 2 6.11 4.4-2.73 4.39-6.11 4.39-6.11-1.93-6.11-4.39zM27.42 24.75h-2.84' fill='none' stroke='#000' stroke-width='1.24'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M40 22c-1.35-1.6-4.15-1.8-6.43-1.8-1.94 0-4.32.18-5.58 1.59a3.68 3.68 0 0 0-.87 2.54h-2.2a3.73 3.73 0 0 0-.92-2.59c-1.26-1.41-3.64-1.59-5.58-1.59-2.28 0-5.08.2-6.43 1.8a3.76 3.76 0 0 0-.69 3.2c.78 4.55 3.2 4.93 5.61 4.93h1.68c2.33 0 5.49 0 6.19-4.65h2.36c.71 4.64 3.87 4.65 6.19 4.65h1.69c2.41 0 4.82-.38 5.6-4.93A3.73 3.73 0 0 0 40 22zm-16.26 2.88c-.43 3.78-2.22 4.05-5.11 4.05H17c-2.16 0-3.85-.29-4.48-4a2.62 2.62 0 0 1 .44-2.27c1.05-1.26 3.67-1.4 5.55-1.4 1.57 0 3.76.13 4.73 1.21a2.92 2.92 0 0 1 .5 2.41zm15.8.08c-.64 3.68-2.33 4-4.48 4h-1.69c-2.89 0-4.68-.27-5.11-4.05a2.92 2.92 0 0 1 .55-2.38c1-1.08 3.16-1.21 4.73-1.21 1.88 0 4.5.14 5.56 1.4a2.69 2.69 0 0 1 .44 2.28z'></path></svg>",
          "<svg alt='row 1 column 4' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M24.11 26.86a1.42 1.42 0 0 1-1.48 1.35h-9a1.43 1.43 0 0 1-1.49-1.35v-3.41a1.43 1.43 0 0 1 1.49-1.35h9a1.42 1.42 0 0 1 1.48 1.35zM27.89 26.86a1.42 1.42 0 0 0 1.48 1.35h9a1.43 1.43 0 0 0 1.49-1.35v-3.41a1.43 1.43 0 0 0-1.49-1.35h-9a1.42 1.42 0 0 0-1.48 1.35zM28.01 24.72h-4.02' fill='none' stroke='#000' stroke-width='1.49'></path></svg>",
          "<svg alt='row 1 column 5' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M40.34 24.24v-.59H39.2v.59c0 1.39 0 2.23-.4 2.64s-2.22.67-4.72.67c-5.46 0-5.49-.43-5.64-3.75v-.06l-1.14.06v.64h-2.63v-.64l-1.14-.06v.06c-.16 3.32-.18 3.75-5.64 3.75-2.51 0-4.17-.12-4.72-.67s-.41-1.25-.4-2.64v-.59h-1.11v.59c0 1.62 0 2.7.72 3.44s2.53 1 5.54 1c5.21 0 6.32-.69 6.65-3.1h2.86c.33 2.41 1.44 3.1 6.65 3.1 3 0 4.69-.16 5.53-1s.74-1.82.73-3.44z'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M24.59 25.16a5.26 5.26 0 1 0-5.25 5.25 5.25 5.25 0 0 0 5.25-5.25zM27.41 25.16a5.26 5.26 0 1 1 5.25 5.25 5.25 5.25 0 0 1-5.25-5.25zM27.42 24.81h-2.84' fill='none' stroke='#000' stroke-width='.93'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M33.26 19.87c-3.4 0-5.88 1.77-6 4.25h-2.49c-.15-2.48-2.63-4.25-6-4.25s-6 1.88-6 4.48a6 6 0 0 0 11.99.65h2.48a6 6 0 0 0 12.06-.63c0-2.62-2.54-4.5-6.04-4.5zm-14.52 9.85a5 5 0 0 1-5.18-5.37c0-2.1 2.18-3.63 5.18-3.63s5.19 1.53 5.19 3.63a5.1 5.1 0 0 1-5.19 5.37zm14.52 0a5.1 5.1 0 0 1-5.19-5.37c0-2.1 2.18-3.63 5.19-3.63s5.18 1.53 5.18 3.63a5 5 0 0 1-5.18 5.37z'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M40.36 21.49c-1-2.88-5-3.39-8.84-2.16a6.3 6.3 0 0 0-4.38 4.2h-2.28a6.29 6.29 0 0 0-4.37-4.2c-3.84-1.23-7.85-.72-8.85 2.16s1.55 6.1 4.86 7.25 7.23.15 8.23-2.73A4.61 4.61 0 0 0 25 25h2.1a4.61 4.61 0 0 0 .22 1c1 2.88 4.92 3.88 8.23 2.73s5.81-4.36 4.81-7.24zm-16.75 4.19c-.77 2.21-3.77 3-6.32 2.09s-4.5-3.35-3.74-5.57 3.86-2.6 6.8-1.66c2.43.78 4.03 2.92 3.26 5.14zm11.1 2.09c-2.54.89-5.55.12-6.32-2.09s.83-4.36 3.26-5.14c2.94-.94 6-.55 6.8 1.66s-1.19 4.69-3.74 5.57z'></path></svg>",
          "<svg alt='row 2 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.91 16.09 16.09 0 0 1 42.09 26z' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></path><path d='M24.19 23.26l-.33 3.92a2.67 2.67 0 0 1-2.35 2.37H15a2.67 2.67 0 0 1-2.35-2.37l-.33-3.92a2 2 0 0 1 2-2.33h7.91a2 2 0 0 1 1.96 2.33zM27.81 23.26l.33 3.92a2.69 2.69 0 0 0 2.35 2.37H37a2.67 2.67 0 0 0 2.35-2.37l.33-3.92a2 2 0 0 0-2-2.33h-7.91a2 2 0 0 0-1.96 2.33zM28.28 24.81h-4.56' fill='none' stroke='#000' stroke-width='1.49'></path></svg>",
          "<svg alt='row 2 column 5' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M39.77 22.45c-1.06-1.25-3.1-1.35-5.87-1.35-3 0-4.86.48-5.74 1.5a2.61 2.61 0 0 0-.6 1.35h-3.12a2.61 2.61 0 0 0-.6-1.35c-.88-1-2.71-1.5-5.74-1.5-2.77 0-4.81.1-5.87 1.35-.73.86-.9 2.14-.56 4.17l1.12-.18c-.27-1.65-.17-2.68.31-3.25.68-.8 2.21-.94 5-.94 2.6 0 4.24.37 4.87 1.1s.39 1.48.24 2.5v.21l1.14.16v-.2c0-.31.08-.62.11-.93h3.08c0 .31.07.62.11.93v.2l1.14-.16v-.21c-.14-1-.27-1.91.25-2.5s2.27-1.1 4.87-1.1c2.79 0 4.32.14 5 .94.49.57.59 1.6.31 3.25l1.13.18c.32-2.03.15-3.31-.58-4.17z'></path></svg>"
       ],
       [
          "<svg alt='row 3 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M32.66 19.44A5.73 5.73 0 0 0 27 24.35h-2a5.69 5.69 0 1 0 .06.92H27a5.72 5.72 0 1 0 5.71-5.83z'></path><path d='M19.34 29.94a4.79 4.79 0 1 1 4.78-4.78 4.79 4.79 0 0 1-4.78 4.78z' fill='#7f7f7f'></path><circle cx='32.66' cy='25.16' r='4.79' fill='#7f7f7f'></circle></svg>",
          "<svg alt='row 3 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M24.28 23.75a8.26 8.26 0 0 0-6.39-3.14c-4-.24-6.89 1.58-5.93 3.89a10 10 0 0 0 3.36 4c1.39 1.07 4.84 2.46 7.28 1.1a4.29 4.29 0 0 0 1.68-5.85z' fill='#8c8c8c'></path><path d='M23.46 22a15.26 15.26 0 0 0-6.79-2c-2.71-.07-4.89.53-5.25 2.29a2.85 2.85 0 0 0 .43 2c0-2.72 2.32-3.54 4.9-3.47a12.09 12.09 0 0 1 6.25 1.9 4.2 4.2 0 0 1 1.79 2.39 3 3 0 0 1 1.21-.36v-2a4.38 4.38 0 0 1-2.54-.75z'></path><path d='M27.72 23.75a8.26 8.26 0 0 1 6.39-3.14c4-.24 6.89 1.58 5.93 3.89a10 10 0 0 1-3.36 4c-1.39 1.07-4.84 2.46-7.28 1.1a4.3 4.3 0 0 1-1.68-5.85z' fill='#8c8c8c'></path><path d='M28.54 22a15.26 15.26 0 0 1 6.79-2c2.71-.07 4.89.53 5.25 2.29a2.85 2.85 0 0 1-.43 2c0-2.72-2.32-3.54-4.89-3.47a12.1 12.1 0 0 0-6.26 1.9 4.2 4.2 0 0 0-1.79 2.39 3 3 0 0 0-1.21-.36v-2a4.38 4.38 0 0 0 2.54-.75z'></path></svg>",
          "<svg alt='row 3 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M39.31 21.77c-1.13-1.32-3-2-5.67-2a9.25 9.25 0 0 0-4.39 1.09l-.16.1a6.73 6.73 0 0 0-.75.53A4.73 4.73 0 0 1 26 22.68a4.73 4.73 0 0 1-2.34-1.18 7.81 7.81 0 0 0-.75-.53l-.17-.1a9.27 9.27 0 0 0-4.39-1.09c-2.64 0-4.54.66-5.67 2a5.16 5.16 0 0 0-1 4.31c.54 3.43 3.62 4.66 6.33 4.66a7.46 7.46 0 0 0 5.81-2.83 15.67 15.67 0 0 0 1.47-2.78.72.72 0 0 1 .71-.34.73.73 0 0 1 .67.33 15 15 0 0 0 1.47 2.78A7.46 7.46 0 0 0 34 30.74c2.71 0 5.8-1.23 6.34-4.66a5.2 5.2 0 0 0-1.03-4.31z'></path><path d='M18.36 20.93c-2.29 0-3.9.53-4.8 1.59a4.14 4.14 0 0 0-.74 3.39c.42 2.71 3 3.68 5.2 3.68a6 6 0 0 0 5.88-4.45 2.59 2.59 0 0 0-.49-2.27c-1.08-1.34-3.31-1.94-5.05-1.94zM33.64 20.93c2.29 0 3.9.53 4.8 1.59a4.17 4.17 0 0 1 .74 3.39c-.43 2.71-3 3.68-5.21 3.68a6 6 0 0 1-5.87-4.45 2.56 2.56 0 0 1 .49-2.27c1.08-1.34 3.31-1.94 5.05-1.94z' fill='#666'></path></svg>",
          "<svg alt='row 3 column 4' width='45' height='45' viewBox='0 0 52 52'><path d='M42.09 26A16.09 16.09 0 1 1 26 9.91 16.1 16.1 0 0 1 42.09 26z' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></path><path d='M24.22 24.45l.09-1a2.06 2.06 0 0 0-2-2.34h-7.92a1.93 1.93 0 0 0-1.91 1.59l.06 2.14.22 2.55a2.69 2.69 0 0 0 2.36 2.38h6.49A2.69 2.69 0 0 0 24 27.38l.09-1z' fill='#fff' stroke='#000' stroke-width='1.86'></path><path fill='none' stroke='#000' stroke-linecap='round' stroke-width='1.86' d='M10.4 24.86h1.62'></path><path d='M23.59 24.56l.08-.9a1.84 1.84 0 0 0-1.76-2.09h-7.09a1.72 1.72 0 0 0-1.7 1.43l.05 1.91.2 2.27a2.4 2.4 0 0 0 2.1 2.12h5.79a2.41 2.41 0 0 0 2.11-2.12l.07-.89z' fill='#666'></path><path d='M27.78 24.45l-.09-1a2.06 2.06 0 0 1 2-2.34h8a1.93 1.93 0 0 1 1.91 1.59l-.06 2.14-.22 2.55a2.69 2.69 0 0 1-2.36 2.38h-6.57A2.69 2.69 0 0 1 28 27.38l-.09-1z' fill='#fff' stroke='#000' stroke-width='1.86'></path><path fill='none' stroke='#000' stroke-linecap='round' stroke-width='1.86' d='M41.25 24.58h-1.61'></path><path fill='none' stroke='#000' stroke-linejoin='round' stroke-width='1.86' d='M27.82 24.58h-3.64'></path><path d='M28.41 24.56l-.08-.9a1.84 1.84 0 0 1 1.76-2.09h7.09a1.72 1.72 0 0 1 1.7 1.43l-.05 1.91-.2 2.27a2.4 2.4 0 0 1-2.1 2.12h-5.79a2.42 2.42 0 0 1-2.11-2.12l-.07-.89z' fill='#666'></path></svg>",
          "<svg alt='row 3 column 5' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M24.58 24.37v-.43c-.7-2.34-4.14-3.33-7.38-2.45s-5.84 3.21-4.89 6c.81 2.58 4.09 3.93 7.44 3a6.13 6.13 0 0 0 4.9-6.15z' fill='#8c8c8c'></path><path d='M41.34 24.22c-1.08-2.09-3.78-3.58-6.48-4.22a48.45 48.45 0 0 0-8.86-.64 48.45 48.45 0 0 0-8.86.64c-2.7.64-5.4 2.13-6.48 4.22a4.26 4.26 0 0 0-.07 3.72l1.69-.44c-1-2.83 1.63-5.15 4.89-6s6.68.11 7.38 2.46v.45H26v-1.55h-.72a5.26 5.26 0 0 0-2.85-2.43c1-.07 2-.11 3.59-.11s2.58 0 3.59.11a5.26 5.26 0 0 0-2.85 2.43H26v1.51h1.39v-.45c.7-2.35 4.14-3.34 7.38-2.46s5.85 3.21 4.89 6l1.69.44a4.23 4.23 0 0 0-.01-3.68z'></path><path d='M27.42 24.37v-.43c.7-2.34 4.15-3.33 7.38-2.45s5.85 3.21 4.89 6c-.81 2.58-4.09 3.93-7.44 3a6.13 6.13 0 0 1-4.9-6.15z' fill='#8c8c8c'></path></svg>"
       ],
       [
          "<svg alt='row 4 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M32.66 19.44A5.73 5.73 0 0 0 27 24.35h-2a5.69 5.69 0 1 0 .06.92H27a5.72 5.72 0 1 0 5.71-5.83z'></path></svg>",
          "<svg alt='row 4 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M24.28 23.75a8.26 8.26 0 0 0-6.39-3.14c-4-.24-6.89 1.58-5.93 3.89a10 10 0 0 0 3.36 4c1.39 1.07 4.84 2.46 7.28 1.1a4.29 4.29 0 0 0 1.68-5.85z'></path><path d='M23.46 22a15.26 15.26 0 0 0-6.79-2c-2.71-.07-4.89.53-5.25 2.28a2.87 2.87 0 0 0 .43 2c0-2.72 2.32-3.54 4.9-3.47A12.09 12.09 0 0 1 23 22.72a4.2 4.2 0 0 1 1.79 2.39 3 3 0 0 1 1.21-.36v-2a4.38 4.38 0 0 1-2.54-.75zM27.71 23.75a8.31 8.31 0 0 1 6.4-3.14c4-.24 6.89 1.58 5.93 3.89a10 10 0 0 1-3.36 4c-1.39 1.07-4.84 2.46-7.28 1.1a4.3 4.3 0 0 1-1.69-5.85z'></path><path d='M28.54 22a15.26 15.26 0 0 1 6.79-2c2.71-.07 4.89.53 5.25 2.28a2.87 2.87 0 0 1-.43 2c0-2.72-2.32-3.54-4.9-3.47A12.09 12.09 0 0 0 29 22.72a4.2 4.2 0 0 0-1.79 2.39 3 3 0 0 0-1.21-.36v-2a4.38 4.38 0 0 0 2.54-.75z'></path></svg>",
          "<svg alt='row 4 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M26 22.68v2.12a.72.72 0 0 0-.67.33 15.67 15.67 0 0 1-1.47 2.78A7.46 7.46 0 0 1 18 30.74c-2.71 0-5.79-1.23-6.33-4.66a5.16 5.16 0 0 1 1-4.31c1.13-1.32 3-2 5.67-2a9.27 9.27 0 0 1 4.39 1.09l.17.1a7.81 7.81 0 0 1 .75.53A4.73 4.73 0 0 0 26 22.68zM26 22.68v2.12a.73.73 0 0 1 .67.33 15 15 0 0 0 1.47 2.78A7.46 7.46 0 0 0 34 30.74c2.71 0 5.8-1.23 6.34-4.66a5.2 5.2 0 0 0-1-4.31c-1.13-1.32-3-2-5.67-2a9.25 9.25 0 0 0-4.39 1.09l-.16.1a6.73 6.73 0 0 0-.75.53A4.73 4.73 0 0 1 26 22.68z'></path></svg>",
          "<svg alt='row 4 column 4' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M41.25 23.65h-.83V22.47a2.82 2.82 0 0 0-2.81-2.3h-7.95a2.74 2.74 0 0 0-2.08.89 3.3 3.3 0 0 0-.81 2.46v.13h-1.55v-.13a3.3 3.3 0 0 0-.81-2.46 2.74 2.74 0 0 0-2.08-.89h-7.94a2.82 2.82 0 0 0-2.81 2.3V23.65h-.83a.93.93 0 0 0 0 1.86h.91l.17 1.94a3.63 3.63 0 0 0 3.29 3.24h6.5a3.63 3.63 0 0 0 3.28-3.23l.16-1.95h1.88l.16 1.94a3.63 3.63 0 0 0 3.29 3.24h6.5a3.63 3.63 0 0 0 3.28-3.23l.17-1.95h.91a.93.93 0 0 0 0-1.86z'></path></svg>",
          "<svg alt='row 4 column 5' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='26' r='16.09' fill='#fff' stroke='#bfbebd' stroke-width='2.48'></circle><path d='M41.34 24.22c-1.08-2.09-3.78-3.58-6.48-4.22a48.45 48.45 0 0 0-8.86-.64 48.45 48.45 0 0 0-8.86.64c-2.7.64-5.4 2.13-6.48 4.22a4.23 4.23 0 0 0-.07 3.72l1.66-.43c.81 2.57 4.1 3.92 7.44 3a6.13 6.13 0 0 0 4.9-6.15h2.83c0 .59 0 0 0 0a6.13 6.13 0 0 0 4.9 6.15c3.34.91 6.63-.44 7.44-3l1.66.43a4.23 4.23 0 0 0-.08-3.72zm-16.08-1.36a5.3 5.3 0 0 0-2.85-2.43c1-.07 2-.11 3.59-.11s2.58 0 3.59.11a5.3 5.3 0 0 0-2.85 2.43z'></path></svg>"
       ]
    ],
    "facialHairMustache":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.85' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.85' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle><path d='M21.65 25.54a8.07 8.07 0 0 0-2.78 5l2.32-1 1 1.87 1.9-1.56 1.88 2V24.1a7.39 7.39 0 0 0-4.32 1.44zm8.7 0A7.39 7.39 0 0 0 26 24.1v7.72l1.88-2 1.9 1.56 1-1.87 2.32 1a8.07 8.07 0 0 0-2.75-4.97z'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.51A14.85 14.85 0 1 1 26 9.66a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path><path d='M25.11 25.53a13.72 13.72 0 0 0-7.35 2.66l1.18 1.43a12.18 12.18 0 0 1 6.17-2.23zM26.89 25.53a13.72 13.72 0 0 1 7.35 2.66l-1.18 1.43a12.18 12.18 0 0 0-6.17-2.23z'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.85' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle><path d='M26 23.33c-5.52 0-8.68 3.31-8.68 7.51a6.7 6.7 0 0 0 3 5.85v-3.64c0-3.94 1-7.58 5.7-7.58s5.7 3.64 5.7 7.58v3.64a6.7 6.7 0 0 0 3-5.85c-.04-4.2-3.2-7.51-8.72-7.51z'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.85' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle><path d='M17.75 30.17a17.06 17.06 0 0 1 4-1.52 20.16 20.16 0 0 1 4.25-.53V25a12.88 12.88 0 0 0-9.37 3.4zM26 25v3.09a20.16 20.16 0 0 1 4.29.53 17.06 17.06 0 0 1 4 1.52l1.12-1.74A12.88 12.88 0 0 0 26 25z'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.85' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle><path d='M26 31.57a40.23 40.23 0 0 1-4.61-.27 11.76 11.76 0 0 0 2.94 4.21L26 34.08l1.67 1.43a11.76 11.76 0 0 0 2.94-4.21 40.23 40.23 0 0 1-4.61.27z'></path></svg>"
       ]
    ],
    "facialHairBeard":[
       [
          "<svg alt='row 1 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.51A14.85 14.85 0 1 1 26 9.66a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path></svg>",
          "<svg alt='row 1 column 2' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.51A14.85 14.85 0 1 1 26 9.66a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path><path d='M26 34.9l2.72-2.34 1.2 2.34.94 4.78a13.6 13.6 0 0 1-4.86.82 13.6 13.6 0 0 1-4.86-.82l.94-4.78 1.2-2.34z'></path></svg>",
          "<svg alt='row 1 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.67A14.85 14.85 0 1 1 26 9.82a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path><path d='M26 36.46l2.1 1.84 2.65-2.3 1.94 1.52 4.55-1.33s-.77.78-2.46 2.8a33.19 33.19 0 0 1-3.1 3.18l-1.17-.9-1.42 1.8L27.71 42 26 43.7 24.3 42l-1.39 1.14-1.42-1.8-1.17.9a33.19 33.19 0 0 1-3.1-3.24c-1.69-2-2.46-2.8-2.46-2.8l4.55 1.33L21.25 36l2.65 2.3z'></path></svg>"
       ],
       [
          "<svg alt='row 2 column 1' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.75A14.85 14.85 0 1 1 26 9.9a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path><path d='M26 36.68l2.28 1.56 1.66-1.83 2.37 1.24a12.58 12.58 0 0 0 3.92-3 19.47 19.47 0 0 0 2.78-5l2.17.73a17.87 17.87 0 0 1-4.13 9.22c-2.78 3.38-7.68 5-7.68 5l-1.51-1.23L26 45.18l-1.86-1.91-1.51 1.23s-4.9-1.57-7.68-5a17.8 17.8 0 0 1-4.12-9.22L13 29.6a19.47 19.47 0 0 0 2.78 5 12.58 12.58 0 0 0 3.92 3l2.38-1.24 1.65 1.83z'></path></svg>",
          "<svg alt='row 2 column 2' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='24.51' r='14.75' fill='#fff' stroke='#bfbfbf' stroke-width='2.27'></circle><path d='M38.2 27.33s-1.56 5.67-5.32 6.35c-3.33.64-4.26-1-4.26-1h-5.17s-.92 1.67-4.26 1c-3.75-.72-5.32-6.35-5.32-6.35h-1.19a13.62 13.62 0 0 0 26.64 0z'></path></svg>",
          "<svg alt='row 2 column 3' width='45' height='45' viewBox='0 0 52 52'><path d='M40.85 24.51A14.85 14.85 0 1 1 26 9.66a14.85 14.85 0 0 1 14.85 14.85z' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></path><path d='M39.58 24H38a10.11 10.11 0 0 1-1.28 3.9c-.44.56-2.28 2.19-4.06.75-2.61-2.12-6.66-1.98-6.66-1.98s-4-.14-6.62 1.93c-1.78 1.44-3.62-.19-4.06-.75A10.11 10.11 0 0 1 14 24h-1.58v.56A13.79 13.79 0 0 0 26 38.11a13.79 13.79 0 0 0 13.61-13.6c0-.19-.02-.38-.03-.51zm-8.18 8.29a2.13 2.13 0 0 1-2 0c-.45-.4-.74-1.75-.85-1.71h-5.08c-.11 0-.4 1.31-.84 1.71a2.15 2.15 0 0 1-2 0c-.56-.44-1-1-.21-2.14 1.49-2.22 5.35-2.1 5.61-2.09s4.12-.13 5.61 2.09c.73 1.14.36 1.7-.24 2.14z'></path></svg>"
       ]
    ],
    "moleEnable":[
       [
          "<svg alt='mole disabled' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle></svg>",
          "<svg alt='mole enabled' width='45' height='45' viewBox='0 0 52 52'><circle cx='26' cy='25.96' r='16.09' fill='#fff' stroke='#bfbfbf' stroke-width='2.48'></circle><circle cx='19.25' cy='29.15' r='2.25' fill='#221815'></circle></svg>"
       ]
    ]
 }
},{}],68:[function(require,module,exports){
(function (global){(function (){
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');
const mnms = require("./MiidataMs");
const nfsd = require("./MiidataSdb");
var converter = require('number-to-words');

const map = require('./maps_Switch.json');
const flip = require('./flip.json');
const mouthColor = require('./mouthColor.json');
const parsedrotation = require('./rotation.json');
const icons = require('./icons.json');

console.log(map);
console.log(flip);
console.log(mouthColor);
console.log(parsedrotation);
console.log(icons);

function getStringLocation(array, string) {
    for( var i = 0; i < array.length; i++ ) {
        for( var j = 0; j < array[i].length; j++ ) {
            if(Array.isArray(array[i][j])) {
                for( var k = 0; k < array[i][j].length; k++ ) {
                    if(array[i][j][k] === string) {
                        return {
                            page: i + 1,
                            row: j + 1,
                            column: k + 1,
                        };
                    }
                }
            }
            else {
                if(array[i][j] === string) {
                    return {
                        row: i + 1,
                        column: j + 1,
                    };
                }
            }
        }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getEyebrowRotation(eyebrowType) {
    if (eyebrowType === '0x17') {
        return 0;
    } else {
        return getStringLocation(parsedrotation.eyebrows, eyebrowType).row + 3;
    }
}

function getEyeRotation(eyeType) {
    return getStringLocation(parsedrotation.eyes, eyeType).row + 2;
}

function toHex(int) {
    return '0x' + pad(int.toString(16), 2);
}

function generateInstructions(parsedFile, parsedDefaultM, parsedDefaultF) {
    global.hairCount = 0;
    global.eyebrowCount = 0;
    global.eyeCount = 0;
    global.noseCount = 0;
    global.facialHairCount = 0;
    global.mouthCount = 0;
    global.glassesCount = 0;
    global.moleCount = 0;
    global.faceCount = 0;
    var head;
    if (parsedFile.gender == 0) {
        defaultFile = parsedDefaultM;
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch on your Switch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/KKyM2gf/male.png' alt='male' width='45' height='45' class='icon'></td><td>Male</td></tr>\n";  
    } else {
        defaultFile = parsedDefaultF;
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch on your Switch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/tmz1Qw3/female.png' alt='female' width='45' height='45' class='icon'></td><td>Female</td></tr>\n";  
    }

    var face = "";
    face += addInstruction("faceType", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceColor", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceWrinkles", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceMakeup", parsedFile, defaultFile, "faceCount");
    if(global.faceCount > 0){face = "<tbody><tr><th valign='top' align='right' rowspan='" + global.faceCount + "' style='font-size:20'>Face</th>" + face + "</tr>";}
    face += "</tbody>";

    var hair = "";
    hair += addInstructionPage("hairType", parsedFile, defaultFile, "hairCount");
    if(toHex(parsedFile.hairType) != "0x1e"){
        if (flip.flip.includes(toHex(parsedFile.hairType))) {
            if(parsedFile.hairFlip === 1) {
                hair += "<tr>";
                hair += "<td class='icon'>";
                hair += icons["menu parts"]['flip hair'];
                hair += "</td><td>Flip hair</td></tr>";
                global.hairCount++;
            }
        }
        hair += addInstructionColor("hairColor", parsedFile, defaultFile, "hairCount");
    }
    if(global.hairCount > 0){hair = "<tr><th valign='top' align='right' rowspan='" + global.hairCount + "' style='font-size:20'>Hair</th>" + hair + "</tr>";}

    var eyebrows = "";
    eyebrows += addInstruction("eyebrowType", parsedFile, defaultFile, "eyebrowCount");
    if(toHex(parsedFile.hairType) != "0x17"){
        eyebrows += addInstructionColor("eyebrowColor", parsedFile, defaultFile, "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowVertical", parsedFile, defaultFile, "move up", "move down", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowHorizontal", parsedFile, defaultFile, "closer", "farther", "eyebrowCount");
        eyebrows += addInstructionRotation("eyebrowRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyebrowRotation(toHex(parsedFile.eyebrowType)), "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowSize", defaultFile, parsedFile, "larger", "smaller", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowStretch", parsedFile, defaultFile, "flatter", "wider", "eyebrowCount");
    }
    if(global.eyebrowCount > 0){eyebrows = "<tr><th valign='top' align='right' rowspan='" + global.eyebrowCount + "' style='font-size:20'>Eyebrows</th>" + eyebrows + "</tr>";}

    var eyes = "";
    eyes += addInstructionPage("eyeType", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionColor("eyeColor", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionNumber("eyeVertical", parsedFile, defaultFile, "move up", "move down", "eyeCount");
    eyes += addInstructionNumber("eyeHorizontal", parsedFile, defaultFile, "closer", "farther", "eyeCount");
    eyes += addInstructionRotation("eyeRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyeRotation(toHex(parsedFile.eyeType)), "eyeCount");
    eyes += addInstructionNumber("eyeSize", parsedFile, defaultFile, "smaller", "larger", "eyeCount");
    eyes += addInstructionNumber("eyeStretch", parsedFile, defaultFile, "flatter", "wider", "eyeCount");
    if(global.eyeCount > 0){eyes = "<tr><th valign='top' align='right' rowspan='" + global.eyeCount + "' style='font-size:20'>Eyes</th>" + eyes + "</tr>";}

    var nose = "";
    nose += addInstruction("noseType", parsedFile, defaultFile, "noseCount");
    nose += addInstructionNumber("noseVertical", parsedFile, defaultFile, "move up", "move down", "noseCount");
    nose += addInstructionNumber("noseSize", parsedFile, defaultFile, "smaller", "larger", "noseCount");
    if(global.noseCount > 0){nose = "<tr><th valign='top' align='right' rowspan='" + global.noseCount + "' style='font-size:20'>Nose</th>" + nose + "</tr>";}

    var facialHair = "";
    facialHair += addInstruction("facialHairMustache", parsedFile, defaultFile, "facialHairCount");
    facialHair += addInstruction("facialHairBeard", parsedFile, defaultFile, "facialHairCount");
    if(parsedFile.facialHairMustache != 0 || parsedFile.facialHairBeard != 0) {
        facialHair += addInstructionColor("facialHairColor", parsedFile, defaultFile, "facialHairCount");
    }
    if(parsedFile.facialHairMustache != 0) {
        facialHair += addInstructionNumber("facialHairVertical", parsedFile, defaultFile, "move up", "move down", "facialHairCount");
        facialHair += addInstructionNumber("facialHairSize", parsedFile, defaultFile, "smaller", "larger", "facialHairCount");
    }
    if(global.facialHairCount > 0){facialHair = "<tr><th valign='top' align='right' rowspan='" + global.facialHairCount + "' style='font-size:20'>Facial Hair</th>" + facialHair + "</tr>";}

    var glasses = "";
    if(parsedFile.glassesType != 0) {
        glasses += addInstruction("glassesType", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionColor("glassesColor", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionNumber("glassesVertical", parsedFile, defaultFile, "move up", "move down", "glassesCount");
        glasses += addInstructionNumber("glassesSize", parsedFile, defaultFile, "smaller", "larger", "glassesCount");
        if(global.glassesCount > 0){glasses = "<tr><th valign='top' align='right' rowspan='" + global.glassesCount + "' style='font-size:20'>Glasses</th>" + glasses + "</tr>";}
    }

    var mole = "";
    if(parsedFile.moleEnable === 1) {
        mole += "<tr>";
        mole += "<td class='icon'>";
        mole += icons.moleEnable[0][1];
        mole += "</td><td>Mole: Enable</td></tr>";
        global.moleCount = 2;
        mole += addInstructionNumber("moleVertical", parsedFile, defaultFile, "move up", "move down", "moleCount");
        mole += addInstructionNumber("moleHorizontal", parsedFile, defaultFile, "move left", "move right", "moleCount");
        mole += addInstructionNumber("moleSize", parsedFile, defaultFile, "smaller", "larger", "moleCount");
        if(global.moleCount > 0){mole = "<tr><th valign='top' align='right' rowspan='" + global.moleCount + "' style='font-size:20'>Mole</th>" + mole + "</tr>";}
    }

    var mouth = "";
    mouth += addInstruction("mouthType", parsedFile, defaultFile, "mouthCount");
    if (mouthColor.possible.includes(toHex(parsedFile.mouthType))) {
        mouth += addInstructionColor("mouthColor", parsedFile, defaultFile, "mouthCount");
    }
    mouth += addInstructionNumber("mouthVertical", parsedFile, defaultFile, "move up", "move down", "mouthCount");
    mouth += addInstructionNumber("mouthSize", parsedFile, defaultFile, "smaller", "larger", "mouthCount");
    mouth += addInstructionNumber("mouthStretch", parsedFile, defaultFile, "flatter", "wider", "mouthCount");
    if(global.mouthCount > 0){mouth = "<tr><th valign='top' align='right' rowspan='" + global.mouthCount + "' style='font-size:20'>Mouth</th>" + mouth + "</tr>";}

    var end = "";
    if(parsedFile.bodyHeight != defaultFile.bodyHeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Height</th>";
        var differencebodyHeight = defaultFile.bodyHeight - parsedFile.bodyHeight;
        if(differencebodyHeight < 0) {
            end += "<td class='icon'>";
            end += icons["menu parts"].height;
            end += "</td><td>";
            end += parsedFile.bodyHeight + "/127 (" + Math.abs(differencebodyHeight) + " clicks right)";
        } else {
            end += "<td class='icon'>";
            end += icons["menu parts"].height;
            end += "</td><td>";
            end += parsedFile.bodyHeight + "/127 (" + Math.abs(differencebodyHeight) + " clicks left)";
        }
        end += "</td></tr>\n";
    }

    if(parsedFile.bodyWeight != defaultFile.bodyWeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Build</th>";
        var differencebodyWeight = defaultFile.bodyWeight - parsedFile.bodyWeight;
        if(differencebodyWeight < 0) {
            end += "<td class='icon'>";
            end += icons["menu parts"].weight;
            end += "</td><td>";
            end += parsedFile.bodyWeight + "/127 (" + Math.abs(differencebodyWeight) + " clicks right)";
        } else {
            end += "<td class='icon'>";
            end += icons["menu parts"].weight;
            end += "</td><td>";
            end += parsedFile.bodyWeight + "/127 (" + Math.abs(differencebodyWeight) + " clicks left)";
        }
        end += "</td></tr>\n";
    }

    if(parsedFile.favoriteColor != defaultFile.favoriteColor) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Favorite Color</th>";
        end += addInstruction("favoriteColor", parsedFile, defaultFile);
    }

    end += "</tbody></table>\n</div>";
    return head + face + hair + eyebrows + eyes +  nose + mouth + mole + facialHair + glasses + end;
}

function addInstruction (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
            output += "<td class='icon'>";
            output += icons[attrbute][location.row - 1][location.column - 1];
            output += "</td><td>";
            output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
            output += converter.toOrdinal(location.row) + " row, ";
            output += converter.toOrdinal(location.column) + " column";
            output += "</td></tr>\n";
            global[counter] = global[counter] + 1;
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionColor (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
            if(location != undefined) {
                output += "<td class='icon'>";
                output += icons[attrbute][location.row - 1][location.column - 1];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
                output += " Default colors, ";
                output += converter.toOrdinal(location.row) + " row, ";
                output += converter.toOrdinal(location.column) + " column";
                output += "</td></tr>\n";
                global[counter] = global[counter] + 1;
            } else {
                var locationCustom = getStringLocation(map.customColors[0], toHex(parsedFile[attrbute]));
                output += "<td class='icon'>";
                output += icons.customColors[locationCustom.row - 1][locationCustom.column - 1];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
                output += " Custom colors, ";
                output += converter.toOrdinal(locationCustom.row) + " row, ";
                output += converter.toOrdinal(locationCustom.column) + " column";
                output += "</td></tr>\n";
                global[counter] = global[counter] + 1;
            }
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionPage (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute], toHex(parsedFile[attrbute]));
            output += "<td class='icon'>";
            output += icons[attrbute][location.page - 1][location.row - 1][location.column - 1];
            output += "</td><td>";
            output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
            output += converter.toOrdinal(location.page) + " page, ";
            output += converter.toOrdinal(location.row) + " row, ";
            output += converter.toOrdinal(location.column) + " column";
            output += "</td></tr>\n";
            global[counter] = global[counter] + 1;
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionNumber (attrbute, parsedFile, defaultFile, moreText, lessText, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var difference = defaultFile[attrbute] - parsedFile[attrbute];
            if(difference < 0) {
                output += "<td class='icon'>";
                output += icons["menu parts"][lessText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + lessText.replace('move ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + moreText.replace('move ','');
            }
            global[counter] = global[counter] + 1;
            output += "</td></tr>\n";
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionRotation (attrbute, parsedFile, defaultFile, moreText, lessText, defaultRotate, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultRotate) {
            var difference = defaultRotate - parsedFile[attrbute];
            if(difference < 0) {
                output += "<td class='icon'>";
                output += icons["menu parts"][lessText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + lessText.replace('rotate ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + moreText.replace('rotate ','');
            }
            global[counter] = global[counter] + 1;
            output += "</td></tr>\n";
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

const reader = new FileReader();

const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
    reader.readAsArrayBuffer(file);
    reader.onload = function(){
        var fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

        switch (fileExtension) {
            case "charinfo":
                fetch("defaultM.ufsd").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new ufsd(new KaitaiStream(buf))
                            fetch("defaultF.ufsd").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new ufsd(new KaitaiStream(buf))
                                        var parsedFile = new ufsd(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;        
            case "mnms":
                fetch("defaultM.mnms").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new mnms(new KaitaiStream(buf))
                            fetch("defaultF.mnms").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new mnms(new KaitaiStream(buf))
                                        var parsedFile = new mnms(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;        
            case "nfsd":
                fetch("defaultM.nfsd").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new nfsd(new KaitaiStream(buf))
                            fetch("defaultF.nfsd").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new nfsd(new KaitaiStream(buf))
                                        var parsedFile = new nfsd(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;
            default:
                throw new Error("Invalid mii format");
        }
  };
});

function displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF) {
    var instructions = generateInstructions(parsedFile, parsedDefaultM, parsedDefaultF)

    document.getElementById("input-container-container").style.transform = "translate(0%, 1vh)";
    document.getElementById("infoText").style.bottom = "0";
    document.getElementById("infoText").style.position = "relative";

    var iframe = document.getElementById("iframe");

    if(iframe != null) {
        iframe.style.opacity = "0";
        iframe.remove();
    }
    iframe = document.createElement('iframe');
    document.getElementById("input-container-container").appendChild(iframe);
    iframe.id = "iframe";
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(instructions);
    iframe.contentWindow.document.close();

    // Adjusting the iframe height onload event 
    iframe.onload = function() { 
        iframe.style.height =  iframe.contentWindow.document.body.scrollHeight + 'px'; 
        iframe.style.width  =  iframe.contentWindow.document.body.scrollWidth+'px';    
    };

    var copyText = document.getElementById("copyText");

    if(copyText != null) {
        copyText.style.opacity = "0";
        copyText.remove();
    }

    copyText = document.createElement('input');
    copyText.type = "text";
    copyText.value = instructions;
    copyText.id = "copyText";
    document.getElementById("input-container-container").appendChild(copyText);

    setTimeout(function(){ 
        iframe.style.opacity = "1";
        copyText.style.opacity = "1";
    }, 1000);
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./MiidataMs":63,"./MiidataSdb":64,"./MiidataSwi":65,"./flip.json":66,"./icons.json":67,"./maps_Switch.json":69,"./mouthColor.json":70,"./rotation.json":95,"kaitai-struct/KaitaiStream":92,"number-to-words":93}],69:[function(require,module,exports){
module.exports={
    "hairType":[
       [
          [
             "0x21",
             "0x2f",
             "0x28",
             "0x25",
             "0x20",
             "0x6b"
          ],
          [
             "0x30",
             "0x33",
             "0x37",
             "0x46",
             "0x2c",
             "0x42"
          ],
          [
             "0x34",
             "0x32",
             "0x26",
             "0x31",
             "0x2b",
             "0x1f"
          ],
          [
             "0x38",
             "0x44",
             "0x3e",
             "0x73",
             "0x4c",
             "0x77"
          ],
          [
             "0x40",
             "0x51",
             "0x74",
             "0x79",
             "0x16",
             "0x3a"
          ]
       ],
       [
          [
             "0x3c",
             "0x57",
             "0x7d",
             "0x75",
             "0x49",
             "0x4b"
          ],
          [
             "0x2a",
             "0x59",
             "0x39",
             "0x36",
             "0x50",
             "0x22"
          ],
          [
             "0x17",
             "0x56",
             "0x58",
             "0x76",
             "0x27",
             "0x24"
          ],
          [
             "0x2d",
             "0x43",
             "0x3b",
             "0x41",
             "0x29",
             "0x1e"
          ],
          [
             "0x0c",
             "0x10",
             "0x0a",
             "0x52",
             "0x80",
             "0x81"
          ]
       ],
       [
          [
             "0x0e",
             "0x5f",
             "0x69",
             "0x64",
             "0x06",
             "0x14"
          ],
          [
             "0x5d",
             "0x66",
             "0x1b",
             "0x04",
             "0x11",
             "0x6e"
          ],
          [
             "0x7b",
             "0x08",
             "0x6a",
             "0x48",
             "0x03",
             "0x15"
          ],
          [
             "0x00",
             "0x62",
             "0x3f",
             "0x5a",
             "0x0b",
             "0x78"
          ],
          [
             "0x05",
             "0x4a",
             "0x6c",
             "0x5e",
             "0x7c",
             "0x19"
          ]
       ],
       [
          [
             "0x63",
             "0x45",
             "0x23",
             "0x0d",
             "0x7a",
             "0x71"
          ],
          [
             "0x35",
             "0x18",
             "0x55",
             "0x53",
             "0x47",
             "0x83"
          ],
          [
             "0x60",
             "0x65",
             "0x1d",
             "0x07",
             "0x0f",
             "0x70"
          ],
          [
             "0x4f",
             "0x01",
             "0x6d",
             "0x7f",
             "0x5b",
             "0x1a"
          ],
          [
             "0x3d",
             "0x67",
             "0x02",
             "0x4d",
             "0x12",
             "0x5c"
          ]
       ],
       [
          [
             "0x54",
             "0x09",
             "0x13",
             "0x82",
             "0x61",
             "0x68"
          ],
          [
             "0x2e",
             "0x4e",
             "0x1c",
             "0x72",
             "0x7e",
             "0x6f"
          ]
       ]
    ],
    "hairColor":[
       [
          [
             "0x08",
             "0x01",
             "0x02",
             "0x03"
          ],
          [
             "0x04",
             "0x05",
             "0x06",
             "0x07"
          ]
       ]
    ],
    "eyebrowColor":[
       [
          [
             "0x08",
             "0x01",
             "0x02",
             "0x03"
          ],
          [
             "0x04",
             "0x05",
             "0x06",
             "0x07"
          ]
       ]
    ],
    "facialHairColor":[
       [
          [
             "0x08",
             "0x01",
             "0x02",
             "0x03"
          ],
          [
             "0x04",
             "0x05",
             "0x06",
             "0x07"
          ]
       ]
    ],
    "eyeColor":[
       [
          [
             "0x08",
             "0x09",
             "0x0a"
          ],
          [
             "0x0b",
             "0x0c",
             "0x0d"
          ]
       ]
    ],
    "mouthColor":[
       [
          ["0x13",
          "0x14",
          "0x15",
          "0x16",
          "0x17"]
       ]
    ],
    "glassesColor":[
       [
          [
             "0x08",
             "0x0e",
             "0x0f"
          ],
          [
             "0x10",
             "0x11",
             "0x12"
          ]
       ]
    ],
    "eyeType":[
       [
          [
             "0x02",
             "0x04",
             "0x00",
             "0x08",
             "0x27",
             "0x11"
          ],
          [
             "0x01",
             "0x1a",
             "0x10",
             "0x0f",
             "0x1b",
             "0x14"
          ],
          [
             "0x21",
             "0x0b",
             "0x13",
             "0x20",
             "0x09",
             "0x0c"
          ],
          [
             "0x17",
             "0x22",
             "0x15",
             "0x19",
             "0x28",
             "0x23"
          ],
          [
             "0x05",
             "0x29",
             "0x0d",
             "0x24",
             "0x25",
             "0x06"
          ]
       ],
       [
          [
             "0x18",
             "0x1e",
             "0x1f",
             "0x12",
             "0x1c",
             "0x2e"
          ],
          [
             "0x07",
             "0x2c",
             "0x26",
             "0x2a",
             "0x2d",
             "0x1d"
          ],
          [
             "0x03",
             "0x2b",
             "0x16",
             "0x0a",
             "0x0e",
             "0x2f"
          ],
          [
             "0x30",
             "0x31",
             "0x32",
             "0x35",
             "0x3b",
             "0x38"
          ],
          [
             "0x36",
             "0x3a",
             "0x39",
             "0x37",
             "0x33",
             "0x34"
          ]
       ]
    ],
    "mouthType":[
       [
          [
             "0x17",
             "0x01",
             "0x13",
             "0x15",
             "0x16",
             "0x05"
          ],
          [
             "0x00",
             "0x08",
             "0x0a",
             "0x10",
             "0x06",
             "0x0d"
          ],
          [
             "0x07",
             "0x09",
             "0x02",
             "0x11",
             "0x03",
             "0x04"
          ],
          [
             "0x0f",
             "0x0b",
             "0x14",
             "0x12",
             "0x0e",
             "0x0c"
          ],
          [
             "0x1b",
             "0x1e",
             "0x18",
             "0x19",
             "0x1d",
             "0x1c"
          ],
          [
             "0x1a",
             "0x23",
             "0x1f",
             "0x22",
             "0x21",
             "0x20"
          ]
       ]
    ],
    "eyebrowType":[
       [
          [
             "0x06",
             "0x00",
             "0x0c",
             "0x01",
             "0x09",
             "0x13"
          ],
          [
             "0x07",
             "0x15",
             "0x08",
             "0x11",
             "0x05",
             "0x04"
          ],
          [
             "0x0b",
             "0x0a",
             "0x02",
             "0x03",
             "0x0e",
             "0x14"
          ],
          [
             "0x0f",
             "0x0d",
             "0x16",
             "0x12",
             "0x10",
             "0x17"
          ]
       ]
    ],
    "noseType":[
       [
          [
             "0x01",
             "0x0a",
             "0x02",
             "0x03",
             "0x06",
             "0x00"
          ],
          [
             "0x05",
             "0x04",
             "0x08",
             "0x09",
             "0x07",
             "0x0b"
          ],
          [
             "0x0d",
             "0x0e",
             "0x0c",
             "0x11",
             "0x10",
             "0x0f"
          ]
       ]
    ],
    "glassesType":[
       [
          [
             "0x00",
             "0x04",
             "0x09",
             "0x02",
             "0x0a"
          ],
          [
             "0x03",
             "0x0c",
             "0x05",
             "0x01",
             "0x0b"
          ],
          [
             "0x0d",
             "0x08",
             "0x0e",
             "0x07",
             "0x06"
          ],
          [
             "0x12",
             "0x11",
             "0x13",
             "0x10",
             "0x0f"
          ]
       ]
    ],
    "faceType":[
       [
          [
             "0x00",
             "0x01",
             "0x08",
             "0x02"
          ],
          [
             "0x03",
             "0x09",
             "0x04",
             "0x05"
          ],
          [
             "0x0a",
             "0x06",
             "0x07",
             "0x0b"
          ]
       ]
    ],
    "faceColor":[
       [
          [
             "0x00",
             "0x07",
             "0x01",
             "0x04",
             "0x05"
          ],
          [
             "0x06",
             "0x03",
             "0x02",
             "0x08",
             "0x09"
          ]
       ]
    ],
    "customColors":[
       [
          [
             "0x02",
             "0x18",
             "0x0a",
             "0x17",
             "0x0f",
             "0x14",
             "0x15",
             "0x19",
             "0x1a",
             "0x1b"
          ],
          [
             "0x1c",
             "0x1d",
             "0x1e",
             "0x1f",
             "0x20",
             "0x21",
             "0x22",
             "0x23",
             "0x24",
             "0x25"
          ],
          [
             "0x26",
             "0x27",
             "0x28",
             "0x29",
             "0x2a",
             "0x2b",
             "0x2c",
             "0x2d",
             "0x2e",
             "0x2f"
          ],
          [
             "0x30",
             "0x10",
             "0x31",
             "0x0c",
             "0x32",
             "0x33",
             "0x34",
             "0x35",
             "0x36",
             "0x37"
          ],
          [
             "0x38",
             "0x39",
             "0x3a",
             "0x3b",
             "0x0d",
             "0x3c",
             "0x3d",
             "0x3e",
             "0x3f",
             "0x40"
          ],
          [
             "0x41",
             "0x42",
             "0x43",
             "0x44",
             "0x45",
             "0x46",
             "0x47",
             "0x48",
             "0x49",
             "0x4a"
          ],
          [
             "0x05",
             "0x0b",
             "0x4b",
             "0x4c",
             "0x4d",
             "0x4e",
             "0x4f",
             "0x50",
             "0x51",
             "0x52"
          ],
          [
             "0x0e",
             "0x53",
             "0x06",
             "0x11",
             "0x07",
             "0x54",
             "0x55",
             "0x56",
             "0x57",
             "0x58"
          ],
          [
             "0x01",
             "0x03",
             "0x59",
             "0x13",
             "0x5a",
             "0x5b",
             "0x16",
             "0x5c",
             "0x5d",
             "0x5e"
          ],
          [
             "0x08",
             "0x00",
             "0x5f",
             "0x09",
             "0x12",
             "0x04",
             "0x60",
             "0x61",
             "0x62",
             "0x63"
          ]
       ]
    ],
    "faceWrinkles": [
      [["0x00","0x01","0x02","0x03"],
      ["0x04","0x05","0x06","0x07"],
      ["0x08","0x09","0x0a","0x0b"]]
    ],
    "facialHairMustache": [
      [["0x00","0x01","0x02"],
      ["0x03","0x04","0x05"]]
   ],
  "facialHairBeard": [
      [["0x00","0x01","0x02"],
      ["0x03","0x04","0x05"]]
   ],
   "moleEnable": [
      [["0x00","0x01"]]
   ],
   "faceMakeup": [
      [["0x00","0x01","0x02","0x03"],
      ["0x04","0x05","0x06","0x07"],
      ["0x08","0x09","0x0a","0x0b"]]
   ],
   "favoriteColor": [
      [["0x00","0x01","0x02","0x03","0x04","0x05"],
      ["0x06","0x07","0x08","0x09","0x0a","0x0b"]]
   ]
 }
},{}],70:[function(require,module,exports){
module.exports={
    "possible":[
        "0x01","0x05","0x00","0x0d","0x07","0x04",
        "0x0b","0x1b","0x18","0x1d"
    ]
}
},{}],71:[function(require,module,exports){
"use strict";
var Buffer = require("safer-buffer").Buffer;

// Multibyte codec. In this scheme, a character is represented by 1 or more bytes.
// Our codec supports UTF-16 surrogates, extensions for GB18030 and unicode sequences.
// To save memory and loading time, we read table files only when requested.

exports._dbcs = DBCSCodec;

var UNASSIGNED = -1,
    GB18030_CODE = -2,
    SEQ_START  = -10,
    NODE_START = -1000,
    UNASSIGNED_NODE = new Array(0x100),
    DEF_CHAR = -1;

for (var i = 0; i < 0x100; i++)
    UNASSIGNED_NODE[i] = UNASSIGNED;


// Class DBCSCodec reads and initializes mapping tables.
function DBCSCodec(codecOptions, iconv) {
    this.encodingName = codecOptions.encodingName;
    if (!codecOptions)
        throw new Error("DBCS codec is called without the data.")
    if (!codecOptions.table)
        throw new Error("Encoding '" + this.encodingName + "' has no data.");

    // Load tables.
    var mappingTable = codecOptions.table();


    // Decode tables: MBCS -> Unicode.

    // decodeTables is a trie, encoded as an array of arrays of integers. Internal arrays are trie nodes and all have len = 256.
    // Trie root is decodeTables[0].
    // Values: >=  0 -> unicode character code. can be > 0xFFFF
    //         == UNASSIGNED -> unknown/unassigned sequence.
    //         == GB18030_CODE -> this is the end of a GB18030 4-byte sequence.
    //         <= NODE_START -> index of the next node in our trie to process next byte.
    //         <= SEQ_START  -> index of the start of a character code sequence, in decodeTableSeq.
    this.decodeTables = [];
    this.decodeTables[0] = UNASSIGNED_NODE.slice(0); // Create root node.

    // Sometimes a MBCS char corresponds to a sequence of unicode chars. We store them as arrays of integers here. 
    this.decodeTableSeq = [];

    // Actual mapping tables consist of chunks. Use them to fill up decode tables.
    for (var i = 0; i < mappingTable.length; i++)
        this._addDecodeChunk(mappingTable[i]);

    // Load & create GB18030 tables when needed.
    if (typeof codecOptions.gb18030 === 'function') {
        this.gb18030 = codecOptions.gb18030(); // Load GB18030 ranges.

        // Add GB18030 common decode nodes.
        var commonThirdByteNodeIdx = this.decodeTables.length;
        this.decodeTables.push(UNASSIGNED_NODE.slice(0));

        var commonFourthByteNodeIdx = this.decodeTables.length;
        this.decodeTables.push(UNASSIGNED_NODE.slice(0));

        // Fill out the tree
        var firstByteNode = this.decodeTables[0];
        for (var i = 0x81; i <= 0xFE; i++) {
            var secondByteNode = this.decodeTables[NODE_START - firstByteNode[i]];
            for (var j = 0x30; j <= 0x39; j++) {
                if (secondByteNode[j] === UNASSIGNED) {
                    secondByteNode[j] = NODE_START - commonThirdByteNodeIdx;
                } else if (secondByteNode[j] > NODE_START) {
                    throw new Error("gb18030 decode tables conflict at byte 2");
                }

                var thirdByteNode = this.decodeTables[NODE_START - secondByteNode[j]];
                for (var k = 0x81; k <= 0xFE; k++) {
                    if (thirdByteNode[k] === UNASSIGNED) {
                        thirdByteNode[k] = NODE_START - commonFourthByteNodeIdx;
                    } else if (thirdByteNode[k] === NODE_START - commonFourthByteNodeIdx) {
                        continue;
                    } else if (thirdByteNode[k] > NODE_START) {
                        throw new Error("gb18030 decode tables conflict at byte 3");
                    }

                    var fourthByteNode = this.decodeTables[NODE_START - thirdByteNode[k]];
                    for (var l = 0x30; l <= 0x39; l++) {
                        if (fourthByteNode[l] === UNASSIGNED)
                            fourthByteNode[l] = GB18030_CODE;
                    }
                }
            }
        }
    }

    this.defaultCharUnicode = iconv.defaultCharUnicode;

    
    // Encode tables: Unicode -> DBCS.

    // `encodeTable` is array mapping from unicode char to encoded char. All its values are integers for performance.
    // Because it can be sparse, it is represented as array of buckets by 256 chars each. Bucket can be null.
    // Values: >=  0 -> it is a normal char. Write the value (if <=256 then 1 byte, if <=65536 then 2 bytes, etc.).
    //         == UNASSIGNED -> no conversion found. Output a default char.
    //         <= SEQ_START  -> it's an index in encodeTableSeq, see below. The character starts a sequence.
    this.encodeTable = [];
    
    // `encodeTableSeq` is used when a sequence of unicode characters is encoded as a single code. We use a tree of
    // objects where keys correspond to characters in sequence and leafs are the encoded dbcs values. A special DEF_CHAR key
    // means end of sequence (needed when one sequence is a strict subsequence of another).
    // Objects are kept separately from encodeTable to increase performance.
    this.encodeTableSeq = [];

    // Some chars can be decoded, but need not be encoded.
    var skipEncodeChars = {};
    if (codecOptions.encodeSkipVals)
        for (var i = 0; i < codecOptions.encodeSkipVals.length; i++) {
            var val = codecOptions.encodeSkipVals[i];
            if (typeof val === 'number')
                skipEncodeChars[val] = true;
            else
                for (var j = val.from; j <= val.to; j++)
                    skipEncodeChars[j] = true;
        }
        
    // Use decode trie to recursively fill out encode tables.
    this._fillEncodeTable(0, 0, skipEncodeChars);

    // Add more encoding pairs when needed.
    if (codecOptions.encodeAdd) {
        for (var uChar in codecOptions.encodeAdd)
            if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar))
                this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
    }

    this.defCharSB  = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]['?'];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);
}

DBCSCodec.prototype.encoder = DBCSEncoder;
DBCSCodec.prototype.decoder = DBCSDecoder;

// Decoder helpers
DBCSCodec.prototype._getDecodeTrieNode = function(addr) {
    var bytes = [];
    for (; addr > 0; addr >>>= 8)
        bytes.push(addr & 0xFF);
    if (bytes.length == 0)
        bytes.push(0);

    var node = this.decodeTables[0];
    for (var i = bytes.length-1; i > 0; i--) { // Traverse nodes deeper into the trie.
        var val = node[bytes[i]];

        if (val == UNASSIGNED) { // Create new node.
            node[bytes[i]] = NODE_START - this.decodeTables.length;
            this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
        }
        else if (val <= NODE_START) { // Existing node.
            node = this.decodeTables[NODE_START - val];
        }
        else
            throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
    }
    return node;
}


DBCSCodec.prototype._addDecodeChunk = function(chunk) {
    // First element of chunk is the hex mbcs code where we start.
    var curAddr = parseInt(chunk[0], 16);

    // Choose the decoding node where we'll write our chars.
    var writeTable = this._getDecodeTrieNode(curAddr);
    curAddr = curAddr & 0xFF;

    // Write all other elements of the chunk to the table.
    for (var k = 1; k < chunk.length; k++) {
        var part = chunk[k];
        if (typeof part === "string") { // String, write as-is.
            for (var l = 0; l < part.length;) {
                var code = part.charCodeAt(l++);
                if (0xD800 <= code && code < 0xDC00) { // Decode surrogate
                    var codeTrail = part.charCodeAt(l++);
                    if (0xDC00 <= codeTrail && codeTrail < 0xE000)
                        writeTable[curAddr++] = 0x10000 + (code - 0xD800) * 0x400 + (codeTrail - 0xDC00);
                    else
                        throw new Error("Incorrect surrogate pair in "  + this.encodingName + " at chunk " + chunk[0]);
                }
                else if (0x0FF0 < code && code <= 0x0FFF) { // Character sequence (our own encoding used)
                    var len = 0xFFF - code + 2;
                    var seq = [];
                    for (var m = 0; m < len; m++)
                        seq.push(part.charCodeAt(l++)); // Simple variation: don't support surrogates or subsequences in seq.

                    writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
                    this.decodeTableSeq.push(seq);
                }
                else
                    writeTable[curAddr++] = code; // Basic char
            }
        } 
        else if (typeof part === "number") { // Integer, meaning increasing sequence starting with prev character.
            var charCode = writeTable[curAddr - 1] + 1;
            for (var l = 0; l < part; l++)
                writeTable[curAddr++] = charCode++;
        }
        else
            throw new Error("Incorrect type '" + typeof part + "' given in "  + this.encodingName + " at chunk " + chunk[0]);
    }
    if (curAddr > 0xFF)
        throw new Error("Incorrect chunk in "  + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
}

// Encoder helpers
DBCSCodec.prototype._getEncodeBucket = function(uCode) {
    var high = uCode >> 8; // This could be > 0xFF because of astral characters.
    if (this.encodeTable[high] === undefined)
        this.encodeTable[high] = UNASSIGNED_NODE.slice(0); // Create bucket on demand.
    return this.encodeTable[high];
}

DBCSCodec.prototype._setEncodeChar = function(uCode, dbcsCode) {
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 0xFF;
    if (bucket[low] <= SEQ_START)
        this.encodeTableSeq[SEQ_START-bucket[low]][DEF_CHAR] = dbcsCode; // There's already a sequence, set a single-char subsequence of it.
    else if (bucket[low] == UNASSIGNED)
        bucket[low] = dbcsCode;
}

DBCSCodec.prototype._setEncodeSequence = function(seq, dbcsCode) {
    
    // Get the root of character tree according to first character of the sequence.
    var uCode = seq[0];
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 0xFF;

    var node;
    if (bucket[low] <= SEQ_START) {
        // There's already a sequence with  - use it.
        node = this.encodeTableSeq[SEQ_START-bucket[low]];
    }
    else {
        // There was no sequence object - allocate a new one.
        node = {};
        if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low]; // If a char was set before - make it a single-char subsequence.
        bucket[low] = SEQ_START - this.encodeTableSeq.length;
        this.encodeTableSeq.push(node);
    }

    // Traverse the character tree, allocating new nodes as needed.
    for (var j = 1; j < seq.length-1; j++) {
        var oldVal = node[uCode];
        if (typeof oldVal === 'object')
            node = oldVal;
        else {
            node = node[uCode] = {}
            if (oldVal !== undefined)
                node[DEF_CHAR] = oldVal
        }
    }

    // Set the leaf to given dbcsCode.
    uCode = seq[seq.length-1];
    node[uCode] = dbcsCode;
}

DBCSCodec.prototype._fillEncodeTable = function(nodeIdx, prefix, skipEncodeChars) {
    var node = this.decodeTables[nodeIdx];
    var hasValues = false;
    var subNodeEmpty = {};
    for (var i = 0; i < 0x100; i++) {
        var uCode = node[i];
        var mbCode = prefix + i;
        if (skipEncodeChars[mbCode])
            continue;

        if (uCode >= 0) {
            this._setEncodeChar(uCode, mbCode);
            hasValues = true;
        } else if (uCode <= NODE_START) {
            var subNodeIdx = NODE_START - uCode;
            if (!subNodeEmpty[subNodeIdx]) {  // Skip empty subtrees (they are too large in gb18030).
                var newPrefix = (mbCode << 8) >>> 0;  // NOTE: '>>> 0' keeps 32-bit num positive.
                if (this._fillEncodeTable(subNodeIdx, newPrefix, skipEncodeChars))
                    hasValues = true;
                else
                    subNodeEmpty[subNodeIdx] = true;
            }
        } else if (uCode <= SEQ_START) {
            this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
            hasValues = true;
        }
    }
    return hasValues;
}



// == Encoder ==================================================================

function DBCSEncoder(options, codec) {
    // Encoder state
    this.leadSurrogate = -1;
    this.seqObj = undefined;
    
    // Static data
    this.encodeTable = codec.encodeTable;
    this.encodeTableSeq = codec.encodeTableSeq;
    this.defaultCharSingleByte = codec.defCharSB;
    this.gb18030 = codec.gb18030;
}

DBCSEncoder.prototype.write = function(str) {
    var newBuf = Buffer.alloc(str.length * (this.gb18030 ? 4 : 3)),
        leadSurrogate = this.leadSurrogate,
        seqObj = this.seqObj, nextChar = -1,
        i = 0, j = 0;

    while (true) {
        // 0. Get next character.
        if (nextChar === -1) {
            if (i == str.length) break;
            var uCode = str.charCodeAt(i++);
        }
        else {
            var uCode = nextChar;
            nextChar = -1;    
        }

        // 1. Handle surrogates.
        if (0xD800 <= uCode && uCode < 0xE000) { // Char is one of surrogates.
            if (uCode < 0xDC00) { // We've got lead surrogate.
                if (leadSurrogate === -1) {
                    leadSurrogate = uCode;
                    continue;
                } else {
                    leadSurrogate = uCode;
                    // Double lead surrogate found.
                    uCode = UNASSIGNED;
                }
            } else { // We've got trail surrogate.
                if (leadSurrogate !== -1) {
                    uCode = 0x10000 + (leadSurrogate - 0xD800) * 0x400 + (uCode - 0xDC00);
                    leadSurrogate = -1;
                } else {
                    // Incomplete surrogate pair - only trail surrogate found.
                    uCode = UNASSIGNED;
                }
                
            }
        }
        else if (leadSurrogate !== -1) {
            // Incomplete surrogate pair - only lead surrogate found.
            nextChar = uCode; uCode = UNASSIGNED; // Write an error, then current char.
            leadSurrogate = -1;
        }

        // 2. Convert uCode character.
        var dbcsCode = UNASSIGNED;
        if (seqObj !== undefined && uCode != UNASSIGNED) { // We are in the middle of the sequence
            var resCode = seqObj[uCode];
            if (typeof resCode === 'object') { // Sequence continues.
                seqObj = resCode;
                continue;

            } else if (typeof resCode == 'number') { // Sequence finished. Write it.
                dbcsCode = resCode;

            } else if (resCode == undefined) { // Current character is not part of the sequence.

                // Try default character for this sequence
                resCode = seqObj[DEF_CHAR];
                if (resCode !== undefined) {
                    dbcsCode = resCode; // Found. Write it.
                    nextChar = uCode; // Current character will be written too in the next iteration.

                } else {
                    // TODO: What if we have no default? (resCode == undefined)
                    // Then, we should write first char of the sequence as-is and try the rest recursively.
                    // Didn't do it for now because no encoding has this situation yet.
                    // Currently, just skip the sequence and write current char.
                }
            }
            seqObj = undefined;
        }
        else if (uCode >= 0) {  // Regular character
            var subtable = this.encodeTable[uCode >> 8];
            if (subtable !== undefined)
                dbcsCode = subtable[uCode & 0xFF];
            
            if (dbcsCode <= SEQ_START) { // Sequence start
                seqObj = this.encodeTableSeq[SEQ_START-dbcsCode];
                continue;
            }

            if (dbcsCode == UNASSIGNED && this.gb18030) {
                // Use GB18030 algorithm to find character(s) to write.
                var idx = findIdx(this.gb18030.uChars, uCode);
                if (idx != -1) {
                    var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 12600); dbcsCode = dbcsCode % 12600;
                    newBuf[j++] = 0x30 + Math.floor(dbcsCode / 1260); dbcsCode = dbcsCode % 1260;
                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 10); dbcsCode = dbcsCode % 10;
                    newBuf[j++] = 0x30 + dbcsCode;
                    continue;
                }
            }
        }

        // 3. Write dbcsCode character.
        if (dbcsCode === UNASSIGNED)
            dbcsCode = this.defaultCharSingleByte;
        
        if (dbcsCode < 0x100) {
            newBuf[j++] = dbcsCode;
        }
        else if (dbcsCode < 0x10000) {
            newBuf[j++] = dbcsCode >> 8;   // high byte
            newBuf[j++] = dbcsCode & 0xFF; // low byte
        }
        else if (dbcsCode < 0x1000000) {
            newBuf[j++] = dbcsCode >> 16;
            newBuf[j++] = (dbcsCode >> 8) & 0xFF;
            newBuf[j++] = dbcsCode & 0xFF;
        } else {
            newBuf[j++] = dbcsCode >>> 24;
            newBuf[j++] = (dbcsCode >>> 16) & 0xFF;
            newBuf[j++] = (dbcsCode >>> 8) & 0xFF;
            newBuf[j++] = dbcsCode & 0xFF;
        }
    }

    this.seqObj = seqObj;
    this.leadSurrogate = leadSurrogate;
    return newBuf.slice(0, j);
}

DBCSEncoder.prototype.end = function() {
    if (this.leadSurrogate === -1 && this.seqObj === undefined)
        return; // All clean. Most often case.

    var newBuf = Buffer.alloc(10), j = 0;

    if (this.seqObj) { // We're in the sequence.
        var dbcsCode = this.seqObj[DEF_CHAR];
        if (dbcsCode !== undefined) { // Write beginning of the sequence.
            if (dbcsCode < 0x100) {
                newBuf[j++] = dbcsCode;
            }
            else {
                newBuf[j++] = dbcsCode >> 8;   // high byte
                newBuf[j++] = dbcsCode & 0xFF; // low byte
            }
        } else {
            // See todo above.
        }
        this.seqObj = undefined;
    }

    if (this.leadSurrogate !== -1) {
        // Incomplete surrogate pair - only lead surrogate found.
        newBuf[j++] = this.defaultCharSingleByte;
        this.leadSurrogate = -1;
    }
    
    return newBuf.slice(0, j);
}

// Export for testing
DBCSEncoder.prototype.findIdx = findIdx;


// == Decoder ==================================================================

function DBCSDecoder(options, codec) {
    // Decoder state
    this.nodeIdx = 0;
    this.prevBytes = [];

    // Static data
    this.decodeTables = codec.decodeTables;
    this.decodeTableSeq = codec.decodeTableSeq;
    this.defaultCharUnicode = codec.defaultCharUnicode;
    this.gb18030 = codec.gb18030;
}

DBCSDecoder.prototype.write = function(buf) {
    var newBuf = Buffer.alloc(buf.length*2),
        nodeIdx = this.nodeIdx, 
        prevBytes = this.prevBytes, prevOffset = this.prevBytes.length,
        seqStart = -this.prevBytes.length, // idx of the start of current parsed sequence.
        uCode;

    for (var i = 0, j = 0; i < buf.length; i++) {
        var curByte = (i >= 0) ? buf[i] : prevBytes[i + prevOffset];

        // Lookup in current trie node.
        var uCode = this.decodeTables[nodeIdx][curByte];

        if (uCode >= 0) { 
            // Normal character, just use it.
        }
        else if (uCode === UNASSIGNED) { // Unknown char.
            // TODO: Callback with seq.
            uCode = this.defaultCharUnicode.charCodeAt(0);
            i = seqStart; // Skip one byte ('i' will be incremented by the for loop) and try to parse again.
        }
        else if (uCode === GB18030_CODE) {
            if (i >= 3) {
                var ptr = (buf[i-3]-0x81)*12600 + (buf[i-2]-0x30)*1260 + (buf[i-1]-0x81)*10 + (curByte-0x30);
            } else {
                var ptr = (prevBytes[i-3+prevOffset]-0x81)*12600 + 
                          (((i-2 >= 0) ? buf[i-2] : prevBytes[i-2+prevOffset])-0x30)*1260 + 
                          (((i-1 >= 0) ? buf[i-1] : prevBytes[i-1+prevOffset])-0x81)*10 + 
                          (curByte-0x30);
            }
            var idx = findIdx(this.gb18030.gbChars, ptr);
            uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
        }
        else if (uCode <= NODE_START) { // Go to next trie node.
            nodeIdx = NODE_START - uCode;
            continue;
        }
        else if (uCode <= SEQ_START) { // Output a sequence of chars.
            var seq = this.decodeTableSeq[SEQ_START - uCode];
            for (var k = 0; k < seq.length - 1; k++) {
                uCode = seq[k];
                newBuf[j++] = uCode & 0xFF;
                newBuf[j++] = uCode >> 8;
            }
            uCode = seq[seq.length-1];
        }
        else
            throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);

        // Write the character to buffer, handling higher planes using surrogate pair.
        if (uCode >= 0x10000) { 
            uCode -= 0x10000;
            var uCodeLead = 0xD800 | (uCode >> 10);
            newBuf[j++] = uCodeLead & 0xFF;
            newBuf[j++] = uCodeLead >> 8;

            uCode = 0xDC00 | (uCode & 0x3FF);
        }
        newBuf[j++] = uCode & 0xFF;
        newBuf[j++] = uCode >> 8;

        // Reset trie node.
        nodeIdx = 0; seqStart = i+1;
    }

    this.nodeIdx = nodeIdx;
    this.prevBytes = (seqStart >= 0)
        ? Array.prototype.slice.call(buf, seqStart)
        : prevBytes.slice(seqStart + prevOffset).concat(Array.prototype.slice.call(buf));

    return newBuf.slice(0, j).toString('ucs2');
}

DBCSDecoder.prototype.end = function() {
    var ret = '';

    // Try to parse all remaining chars.
    while (this.prevBytes.length > 0) {
        // Skip 1 character in the buffer.
        ret += this.defaultCharUnicode;
        var bytesArr = this.prevBytes.slice(1);

        // Parse remaining as usual.
        this.prevBytes = [];
        this.nodeIdx = 0;
        if (bytesArr.length > 0)
            ret += this.write(bytesArr);
    }

    this.prevBytes = [];
    this.nodeIdx = 0;
    return ret;
}

// Binary search for GB18030. Returns largest i such that table[i] <= val.
function findIdx(table, val) {
    if (table[0] > val)
        return -1;

    var l = 0, r = table.length;
    while (l < r-1) { // always table[l] <= val < table[r]
        var mid = l + ((r-l+1) >> 1);
        if (table[mid] <= val)
            l = mid;
        else
            r = mid;
    }
    return l;
}


},{"safer-buffer":94}],72:[function(require,module,exports){
"use strict";

// Description of supported double byte encodings and aliases.
// Tables are not require()-d until they are needed to speed up library load.
// require()-s are direct to support Browserify.

module.exports = {
    
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)

    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html

    'shiftjis': {
        type: '_dbcs',
        table: function() { return require('./tables/shiftjis.json') },
        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
        encodeSkipVals: [{from: 0xED40, to: 0xF940}],
    },
    'csshiftjis': 'shiftjis',
    'mskanji': 'shiftjis',
    'sjis': 'shiftjis',
    'windows31j': 'shiftjis',
    'ms31j': 'shiftjis',
    'xsjis': 'shiftjis',
    'windows932': 'shiftjis',
    'ms932': 'shiftjis',
    '932': 'shiftjis',
    'cp932': 'shiftjis',

    'eucjp': {
        type: '_dbcs',
        table: function() { return require('./tables/eucjp.json') },
        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
    },

    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.


    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder

    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    'gb2312': 'cp936',
    'gb231280': 'cp936',
    'gb23121980': 'cp936',
    'csgb2312': 'cp936',
    'csiso58gb231280': 'cp936',
    'euccn': 'cp936',

    // Microsoft's CP936 is a subset and approximation of GBK.
    'windows936': 'cp936',
    'ms936': 'cp936',
    '936': 'cp936',
    'cp936': {
        type: '_dbcs',
        table: function() { return require('./tables/cp936.json') },
    },

    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    'gbk': {
        type: '_dbcs',
        table: function() { return require('./tables/cp936.json').concat(require('./tables/gbk-added.json')) },
    },
    'xgbk': 'gbk',
    'isoir58': 'gbk',

    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    'gb18030': {
        type: '_dbcs',
        table: function() { return require('./tables/cp936.json').concat(require('./tables/gbk-added.json')) },
        gb18030: function() { return require('./tables/gb18030-ranges.json') },
        encodeSkipVals: [0x80],
        encodeAdd: {'€': 0xA2E3},
    },

    'chinese': 'gb18030',


    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    'windows949': 'cp949',
    'ms949': 'cp949',
    '949': 'cp949',
    'cp949': {
        type: '_dbcs',
        table: function() { return require('./tables/cp949.json') },
    },

    'cseuckr': 'cp949',
    'csksc56011987': 'cp949',
    'euckr': 'cp949',
    'isoir149': 'cp949',
    'korean': 'cp949',
    'ksc56011987': 'cp949',
    'ksc56011989': 'cp949',
    'ksc5601': 'cp949',


    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.

    'windows950': 'cp950',
    'ms950': 'cp950',
    '950': 'cp950',
    'cp950': {
        type: '_dbcs',
        table: function() { return require('./tables/cp950.json') },
    },

    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    'big5': 'big5hkscs',
    'big5hkscs': {
        type: '_dbcs',
        table: function() { return require('./tables/cp950.json').concat(require('./tables/big5-added.json')) },
        encodeSkipVals: [0xa2cc],
    },

    'cnbig5': 'big5hkscs',
    'csbig5': 'big5hkscs',
    'xxbig5': 'big5hkscs',
};

},{"./tables/big5-added.json":78,"./tables/cp936.json":79,"./tables/cp949.json":80,"./tables/cp950.json":81,"./tables/eucjp.json":82,"./tables/gb18030-ranges.json":83,"./tables/gbk-added.json":84,"./tables/shiftjis.json":85}],73:[function(require,module,exports){
"use strict";

// Update this array if you add/rename/remove files in this directory.
// We support Browserify by skipping automatic module discovery and requiring modules directly.
var modules = [
    require("./internal"),
    require("./utf32"),
    require("./utf16"),
    require("./utf7"),
    require("./sbcs-codec"),
    require("./sbcs-data"),
    require("./sbcs-data-generated"),
    require("./dbcs-codec"),
    require("./dbcs-data"),
];

// Put all encoding/alias/codec definitions to single object and export it.
for (var i = 0; i < modules.length; i++) {
    var module = modules[i];
    for (var enc in module)
        if (Object.prototype.hasOwnProperty.call(module, enc))
            exports[enc] = module[enc];
}

},{"./dbcs-codec":71,"./dbcs-data":72,"./internal":74,"./sbcs-codec":75,"./sbcs-data":77,"./sbcs-data-generated":76,"./utf16":86,"./utf32":87,"./utf7":88}],74:[function(require,module,exports){
"use strict";
var Buffer = require("safer-buffer").Buffer;

// Export Node.js internal encodings.

module.exports = {
    // Encodings
    utf8:   { type: "_internal", bomAware: true},
    cesu8:  { type: "_internal", bomAware: true},
    unicode11utf8: "utf8",

    ucs2:   { type: "_internal", bomAware: true},
    utf16le: "ucs2",

    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex:    { type: "_internal" },

    // Codec.
    _internal: InternalCodec,
};

//------------------------------------------------------------------------------

function InternalCodec(codecOptions, iconv) {
    this.enc = codecOptions.encodingName;
    this.bomAware = codecOptions.bomAware;

    if (this.enc === "base64")
        this.encoder = InternalEncoderBase64;
    else if (this.enc === "cesu8") {
        this.enc = "utf8"; // Use utf8 for decoding.
        this.encoder = InternalEncoderCesu8;

        // Add decoder for versions of Node not supporting CESU-8
        if (Buffer.from('eda0bdedb2a9', 'hex').toString() !== '💩') {
            this.decoder = InternalDecoderCesu8;
            this.defaultCharUnicode = iconv.defaultCharUnicode;
        }
    }
}

InternalCodec.prototype.encoder = InternalEncoder;
InternalCodec.prototype.decoder = InternalDecoder;

//------------------------------------------------------------------------------

// We use node.js internal decoder. Its signature is the same as ours.
var StringDecoder = require('string_decoder').StringDecoder;

if (!StringDecoder.prototype.end) // Node v0.8 doesn't have this method.
    StringDecoder.prototype.end = function() {};


function InternalDecoder(options, codec) {
    this.decoder = new StringDecoder(codec.enc);
}

InternalDecoder.prototype.write = function(buf) {
    if (!Buffer.isBuffer(buf)) {
        buf = Buffer.from(buf);
    }

    return this.decoder.write(buf);
}

InternalDecoder.prototype.end = function() {
    return this.decoder.end();
}


//------------------------------------------------------------------------------
// Encoder is mostly trivial

function InternalEncoder(options, codec) {
    this.enc = codec.enc;
}

InternalEncoder.prototype.write = function(str) {
    return Buffer.from(str, this.enc);
}

InternalEncoder.prototype.end = function() {
}


//------------------------------------------------------------------------------
// Except base64 encoder, which must keep its state.

function InternalEncoderBase64(options, codec) {
    this.prevStr = '';
}

InternalEncoderBase64.prototype.write = function(str) {
    str = this.prevStr + str;
    var completeQuads = str.length - (str.length % 4);
    this.prevStr = str.slice(completeQuads);
    str = str.slice(0, completeQuads);

    return Buffer.from(str, "base64");
}

InternalEncoderBase64.prototype.end = function() {
    return Buffer.from(this.prevStr, "base64");
}


//------------------------------------------------------------------------------
// CESU-8 encoder is also special.

function InternalEncoderCesu8(options, codec) {
}

InternalEncoderCesu8.prototype.write = function(str) {
    var buf = Buffer.alloc(str.length * 3), bufIdx = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        // Naive implementation, but it works because CESU-8 is especially easy
        // to convert from UTF-16 (which all JS strings are encoded in).
        if (charCode < 0x80)
            buf[bufIdx++] = charCode;
        else if (charCode < 0x800) {
            buf[bufIdx++] = 0xC0 + (charCode >>> 6);
            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
        }
        else { // charCode will always be < 0x10000 in javascript.
            buf[bufIdx++] = 0xE0 + (charCode >>> 12);
            buf[bufIdx++] = 0x80 + ((charCode >>> 6) & 0x3f);
            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
        }
    }
    return buf.slice(0, bufIdx);
}

InternalEncoderCesu8.prototype.end = function() {
}

//------------------------------------------------------------------------------
// CESU-8 decoder is not implemented in Node v4.0+

function InternalDecoderCesu8(options, codec) {
    this.acc = 0;
    this.contBytes = 0;
    this.accBytes = 0;
    this.defaultCharUnicode = codec.defaultCharUnicode;
}

InternalDecoderCesu8.prototype.write = function(buf) {
    var acc = this.acc, contBytes = this.contBytes, accBytes = this.accBytes, 
        res = '';
    for (var i = 0; i < buf.length; i++) {
        var curByte = buf[i];
        if ((curByte & 0xC0) !== 0x80) { // Leading byte
            if (contBytes > 0) { // Previous code is invalid
                res += this.defaultCharUnicode;
                contBytes = 0;
            }

            if (curByte < 0x80) { // Single-byte code
                res += String.fromCharCode(curByte);
            } else if (curByte < 0xE0) { // Two-byte code
                acc = curByte & 0x1F;
                contBytes = 1; accBytes = 1;
            } else if (curByte < 0xF0) { // Three-byte code
                acc = curByte & 0x0F;
                contBytes = 2; accBytes = 1;
            } else { // Four or more are not supported for CESU-8.
                res += this.defaultCharUnicode;
            }
        } else { // Continuation byte
            if (contBytes > 0) { // We're waiting for it.
                acc = (acc << 6) | (curByte & 0x3f);
                contBytes--; accBytes++;
                if (contBytes === 0) {
                    // Check for overlong encoding, but support Modified UTF-8 (encoding NULL as C0 80)
                    if (accBytes === 2 && acc < 0x80 && acc > 0)
                        res += this.defaultCharUnicode;
                    else if (accBytes === 3 && acc < 0x800)
                        res += this.defaultCharUnicode;
                    else
                        // Actually add character.
                        res += String.fromCharCode(acc);
                }
            } else { // Unexpected continuation byte
                res += this.defaultCharUnicode;
            }
        }
    }
    this.acc = acc; this.contBytes = contBytes; this.accBytes = accBytes;
    return res;
}

InternalDecoderCesu8.prototype.end = function() {
    var res = 0;
    if (this.contBytes > 0)
        res += this.defaultCharUnicode;
    return res;
}

},{"safer-buffer":94,"string_decoder":57}],75:[function(require,module,exports){
"use strict";
var Buffer = require("safer-buffer").Buffer;

// Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
// correspond to encoded bytes (if 128 - then lower half is ASCII). 

exports._sbcs = SBCSCodec;
function SBCSCodec(codecOptions, iconv) {
    if (!codecOptions)
        throw new Error("SBCS codec is called without the data.")
    
    // Prepare char buffer for decoding.
    if (!codecOptions.chars || (codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256))
        throw new Error("Encoding '"+codecOptions.type+"' has incorrect 'chars' (must be of len 128 or 256)");
    
    if (codecOptions.chars.length === 128) {
        var asciiString = "";
        for (var i = 0; i < 128; i++)
            asciiString += String.fromCharCode(i);
        codecOptions.chars = asciiString + codecOptions.chars;
    }

    this.decodeBuf = Buffer.from(codecOptions.chars, 'ucs2');
    
    // Encoding buffer.
    var encodeBuf = Buffer.alloc(65536, iconv.defaultCharSingleByte.charCodeAt(0));

    for (var i = 0; i < codecOptions.chars.length; i++)
        encodeBuf[codecOptions.chars.charCodeAt(i)] = i;

    this.encodeBuf = encodeBuf;
}

SBCSCodec.prototype.encoder = SBCSEncoder;
SBCSCodec.prototype.decoder = SBCSDecoder;


function SBCSEncoder(options, codec) {
    this.encodeBuf = codec.encodeBuf;
}

SBCSEncoder.prototype.write = function(str) {
    var buf = Buffer.alloc(str.length);
    for (var i = 0; i < str.length; i++)
        buf[i] = this.encodeBuf[str.charCodeAt(i)];
    
    return buf;
}

SBCSEncoder.prototype.end = function() {
}


function SBCSDecoder(options, codec) {
    this.decodeBuf = codec.decodeBuf;
}

SBCSDecoder.prototype.write = function(buf) {
    // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
    var decodeBuf = this.decodeBuf;
    var newBuf = Buffer.alloc(buf.length*2);
    var idx1 = 0, idx2 = 0;
    for (var i = 0; i < buf.length; i++) {
        idx1 = buf[i]*2; idx2 = i*2;
        newBuf[idx2] = decodeBuf[idx1];
        newBuf[idx2+1] = decodeBuf[idx1+1];
    }
    return newBuf.toString('ucs2');
}

SBCSDecoder.prototype.end = function() {
}

},{"safer-buffer":94}],76:[function(require,module,exports){
"use strict";

// Generated data for sbcs codec. Don't edit manually. Regenerate using generation/gen-sbcs.js script.
module.exports = {
  "437": "cp437",
  "737": "cp737",
  "775": "cp775",
  "850": "cp850",
  "852": "cp852",
  "855": "cp855",
  "856": "cp856",
  "857": "cp857",
  "858": "cp858",
  "860": "cp860",
  "861": "cp861",
  "862": "cp862",
  "863": "cp863",
  "864": "cp864",
  "865": "cp865",
  "866": "cp866",
  "869": "cp869",
  "874": "windows874",
  "922": "cp922",
  "1046": "cp1046",
  "1124": "cp1124",
  "1125": "cp1125",
  "1129": "cp1129",
  "1133": "cp1133",
  "1161": "cp1161",
  "1162": "cp1162",
  "1163": "cp1163",
  "1250": "windows1250",
  "1251": "windows1251",
  "1252": "windows1252",
  "1253": "windows1253",
  "1254": "windows1254",
  "1255": "windows1255",
  "1256": "windows1256",
  "1257": "windows1257",
  "1258": "windows1258",
  "28591": "iso88591",
  "28592": "iso88592",
  "28593": "iso88593",
  "28594": "iso88594",
  "28595": "iso88595",
  "28596": "iso88596",
  "28597": "iso88597",
  "28598": "iso88598",
  "28599": "iso88599",
  "28600": "iso885910",
  "28601": "iso885911",
  "28603": "iso885913",
  "28604": "iso885914",
  "28605": "iso885915",
  "28606": "iso885916",
  "windows874": {
    "type": "_sbcs",
    "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "win874": "windows874",
  "cp874": "windows874",
  "windows1250": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "win1250": "windows1250",
  "cp1250": "windows1250",
  "windows1251": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "win1251": "windows1251",
  "cp1251": "windows1251",
  "windows1252": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "win1252": "windows1252",
  "cp1252": "windows1252",
  "windows1253": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "win1253": "windows1253",
  "cp1253": "windows1253",
  "windows1254": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "win1254": "windows1254",
  "cp1254": "windows1254",
  "windows1255": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "win1255": "windows1255",
  "cp1255": "windows1255",
  "windows1256": {
    "type": "_sbcs",
    "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
  },
  "win1256": "windows1256",
  "cp1256": "windows1256",
  "windows1257": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
  },
  "win1257": "windows1257",
  "cp1257": "windows1257",
  "windows1258": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "win1258": "windows1258",
  "cp1258": "windows1258",
  "iso88591": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "cp28591": "iso88591",
  "iso88592": {
    "type": "_sbcs",
    "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "cp28592": "iso88592",
  "iso88593": {
    "type": "_sbcs",
    "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
  },
  "cp28593": "iso88593",
  "iso88594": {
    "type": "_sbcs",
    "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
  },
  "cp28594": "iso88594",
  "iso88595": {
    "type": "_sbcs",
    "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
  },
  "cp28595": "iso88595",
  "iso88596": {
    "type": "_sbcs",
    "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
  },
  "cp28596": "iso88596",
  "iso88597": {
    "type": "_sbcs",
    "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "cp28597": "iso88597",
  "iso88598": {
    "type": "_sbcs",
    "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "cp28598": "iso88598",
  "iso88599": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "cp28599": "iso88599",
  "iso885910": {
    "type": "_sbcs",
    "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
  },
  "cp28600": "iso885910",
  "iso885911": {
    "type": "_sbcs",
    "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "cp28601": "iso885911",
  "iso885913": {
    "type": "_sbcs",
    "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
  },
  "cp28603": "iso885913",
  "iso885914": {
    "type": "_sbcs",
    "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
  },
  "cp28604": "iso885914",
  "iso885915": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "cp28605": "iso885915",
  "iso885916": {
    "type": "_sbcs",
    "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
  },
  "cp28606": "iso885916",
  "cp437": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm437": "cp437",
  "csibm437": "cp437",
  "cp737": {
    "type": "_sbcs",
    "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
  },
  "ibm737": "cp737",
  "csibm737": "cp737",
  "cp775": {
    "type": "_sbcs",
    "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
  },
  "ibm775": "cp775",
  "csibm775": "cp775",
  "cp850": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm850": "cp850",
  "csibm850": "cp850",
  "cp852": {
    "type": "_sbcs",
    "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
  },
  "ibm852": "cp852",
  "csibm852": "cp852",
  "cp855": {
    "type": "_sbcs",
    "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
  },
  "ibm855": "cp855",
  "csibm855": "cp855",
  "cp856": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm856": "cp856",
  "csibm856": "cp856",
  "cp857": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
  },
  "ibm857": "cp857",
  "csibm857": "cp857",
  "cp858": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm858": "cp858",
  "csibm858": "cp858",
  "cp860": {
    "type": "_sbcs",
    "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm860": "cp860",
  "csibm860": "cp860",
  "cp861": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm861": "cp861",
  "csibm861": "cp861",
  "cp862": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm862": "cp862",
  "csibm862": "cp862",
  "cp863": {
    "type": "_sbcs",
    "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm863": "cp863",
  "csibm863": "cp863",
  "cp864": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
  },
  "ibm864": "cp864",
  "csibm864": "cp864",
  "cp865": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm865": "cp865",
  "csibm865": "cp865",
  "cp866": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
  },
  "ibm866": "cp866",
  "csibm866": "cp866",
  "cp869": {
    "type": "_sbcs",
    "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
  },
  "ibm869": "cp869",
  "csibm869": "cp869",
  "cp922": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
  },
  "ibm922": "cp922",
  "csibm922": "cp922",
  "cp1046": {
    "type": "_sbcs",
    "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
  },
  "ibm1046": "cp1046",
  "csibm1046": "cp1046",
  "cp1124": {
    "type": "_sbcs",
    "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
  },
  "ibm1124": "cp1124",
  "csibm1124": "cp1124",
  "cp1125": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
  },
  "ibm1125": "cp1125",
  "csibm1125": "cp1125",
  "cp1129": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1129": "cp1129",
  "csibm1129": "cp1129",
  "cp1133": {
    "type": "_sbcs",
    "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
  },
  "ibm1133": "cp1133",
  "csibm1133": "cp1133",
  "cp1161": {
    "type": "_sbcs",
    "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
  },
  "ibm1161": "cp1161",
  "csibm1161": "cp1161",
  "cp1162": {
    "type": "_sbcs",
    "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "ibm1162": "cp1162",
  "csibm1162": "cp1162",
  "cp1163": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1163": "cp1163",
  "csibm1163": "cp1163",
  "maccroatian": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
  },
  "maccyrillic": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "macgreek": {
    "type": "_sbcs",
    "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
  },
  "maciceland": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macroman": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macromania": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macthai": {
    "type": "_sbcs",
    "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
  },
  "macturkish": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macukraine": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "koi8r": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8u": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8ru": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8t": {
    "type": "_sbcs",
    "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "armscii8": {
    "type": "_sbcs",
    "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
  },
  "rk1048": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "tcvn": {
    "type": "_sbcs",
    "chars": "\u0000ÚỤ\u0003ỪỬỮ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010ỨỰỲỶỸÝỴ\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
  },
  "georgianacademy": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "georgianps": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "pt154": {
    "type": "_sbcs",
    "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "viscii": {
    "type": "_sbcs",
    "chars": "\u0000\u0001Ẳ\u0003\u0004ẴẪ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013Ỷ\u0015\u0016\u0017\u0018Ỹ\u001a\u001b\u001c\u001dỴ\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
  },
  "iso646cn": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "iso646jp": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "hproman8": {
    "type": "_sbcs",
    "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
  },
  "macintosh": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "ascii": {
    "type": "_sbcs",
    "chars": "��������������������������������������������������������������������������������������������������������������������������������"
  },
  "tis620": {
    "type": "_sbcs",
    "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  }
}
},{}],77:[function(require,module,exports){
"use strict";

// Manually added data to be used by sbcs codec in addition to generated one.

module.exports = {
    // Not supported by iconv, not sure why.
    "10029": "maccenteuro",
    "maccenteuro": {
        "type": "_sbcs",
        "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },

    "808": "cp808",
    "ibm808": "cp808",
    "cp808": {
        "type": "_sbcs",
        "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },

    "mik": {
        "type": "_sbcs",
        "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },

    "cp720": {
        "type": "_sbcs",
        "chars": "\x80\x81éâ\x84à\x86çêëèïî\x8d\x8e\x8f\x90\u0651\u0652ô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡\u064b\u064c\u064d\u064e\u064f\u0650≈°∙·√ⁿ²■\u00a0"
    },

    // Aliases of generated encodings.
    "ascii8bit": "ascii",
    "usascii": "ascii",
    "ansix34": "ascii",
    "ansix341968": "ascii",
    "ansix341986": "ascii",
    "csascii": "ascii",
    "cp367": "ascii",
    "ibm367": "ascii",
    "isoir6": "ascii",
    "iso646us": "ascii",
    "iso646irv": "ascii",
    "us": "ascii",

    "latin1": "iso88591",
    "latin2": "iso88592",
    "latin3": "iso88593",
    "latin4": "iso88594",
    "latin5": "iso88599",
    "latin6": "iso885910",
    "latin7": "iso885913",
    "latin8": "iso885914",
    "latin9": "iso885915",
    "latin10": "iso885916",

    "csisolatin1": "iso88591",
    "csisolatin2": "iso88592",
    "csisolatin3": "iso88593",
    "csisolatin4": "iso88594",
    "csisolatincyrillic": "iso88595",
    "csisolatinarabic": "iso88596",
    "csisolatingreek" : "iso88597",
    "csisolatinhebrew": "iso88598",
    "csisolatin5": "iso88599",
    "csisolatin6": "iso885910",

    "l1": "iso88591",
    "l2": "iso88592",
    "l3": "iso88593",
    "l4": "iso88594",
    "l5": "iso88599",
    "l6": "iso885910",
    "l7": "iso885913",
    "l8": "iso885914",
    "l9": "iso885915",
    "l10": "iso885916",

    "isoir14": "iso646jp",
    "isoir57": "iso646cn",
    "isoir100": "iso88591",
    "isoir101": "iso88592",
    "isoir109": "iso88593",
    "isoir110": "iso88594",
    "isoir144": "iso88595",
    "isoir127": "iso88596",
    "isoir126": "iso88597",
    "isoir138": "iso88598",
    "isoir148": "iso88599",
    "isoir157": "iso885910",
    "isoir166": "tis620",
    "isoir179": "iso885913",
    "isoir199": "iso885914",
    "isoir203": "iso885915",
    "isoir226": "iso885916",

    "cp819": "iso88591",
    "ibm819": "iso88591",

    "cyrillic": "iso88595",

    "arabic": "iso88596",
    "arabic8": "iso88596",
    "ecma114": "iso88596",
    "asmo708": "iso88596",

    "greek" : "iso88597",
    "greek8" : "iso88597",
    "ecma118" : "iso88597",
    "elot928" : "iso88597",

    "hebrew": "iso88598",
    "hebrew8": "iso88598",

    "turkish": "iso88599",
    "turkish8": "iso88599",

    "thai": "iso885911",
    "thai8": "iso885911",

    "celtic": "iso885914",
    "celtic8": "iso885914",
    "isoceltic": "iso885914",

    "tis6200": "tis620",
    "tis62025291": "tis620",
    "tis62025330": "tis620",

    "10000": "macroman",
    "10006": "macgreek",
    "10007": "maccyrillic",
    "10079": "maciceland",
    "10081": "macturkish",

    "cspc8codepage437": "cp437",
    "cspc775baltic": "cp775",
    "cspc850multilingual": "cp850",
    "cspcp852": "cp852",
    "cspc862latinhebrew": "cp862",
    "cpgr": "cp869",

    "msee": "cp1250",
    "mscyrl": "cp1251",
    "msansi": "cp1252",
    "msgreek": "cp1253",
    "msturk": "cp1254",
    "mshebr": "cp1255",
    "msarab": "cp1256",
    "winbaltrim": "cp1257",

    "cp20866": "koi8r",
    "20866": "koi8r",
    "ibm878": "koi8r",
    "cskoi8r": "koi8r",

    "cp21866": "koi8u",
    "21866": "koi8u",
    "ibm1168": "koi8u",

    "strk10482002": "rk1048",

    "tcvn5712": "tcvn",
    "tcvn57121": "tcvn",

    "gb198880": "iso646cn",
    "cn": "iso646cn",

    "csiso14jisc6220ro": "iso646jp",
    "jisc62201969ro": "iso646jp",
    "jp": "iso646jp",

    "cshproman8": "hproman8",
    "r8": "hproman8",
    "roman8": "hproman8",
    "xroman8": "hproman8",
    "ibm1051": "hproman8",

    "mac": "macintosh",
    "csmacintosh": "macintosh",
};


},{}],78:[function(require,module,exports){
module.exports=[
["8740","䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"],
["8767","綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"],
["87a1","𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"],
["8840","㇀",4,"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"],
["88a1","ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"],
["8940","𪎩𡅅"],
["8943","攊"],
["8946","丽滝鵎釟"],
["894c","𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"],
["89a1","琑糼緍楆竉刧"],
["89ab","醌碸酞肼"],
["89b0","贋胶𠧧"],
["89b5","肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"],
["89c1","溚舾甙"],
["89c5","䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"],
["8a40","𧶄唥"],
["8a43","𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"],
["8a64","𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"],
["8a76","䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"],
["8aa1","𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"],
["8aac","䠋𠆩㿺塳𢶍"],
["8ab2","𤗈𠓼𦂗𠽌𠶖啹䂻䎺"],
["8abb","䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"],
["8ac9","𪘁𠸉𢫏𢳉"],
["8ace","𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"],
["8adf","𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"],
["8af6","𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"],
["8b40","𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"],
["8b55","𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"],
["8ba1","𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"],
["8bde","𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"],
["8c40","倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"],
["8ca1","𣏹椙橃𣱣泿"],
["8ca7","爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"],
["8cc9","顨杫䉶圽"],
["8cce","藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"],
["8ce6","峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"],
["8d40","𠮟"],
["8d42","𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"],
["8da1","㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"],
["8e40","𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"],
["8ea1","繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"],
["8f40","蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"],
["8fa1","𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"],
["9040","趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"],
["90a1","𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"],
["9140","𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"],
["91a1","鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"],
["9240","𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"],
["92a1","働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"],
["9340","媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"],
["93a1","摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"],
["9440","銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"],
["94a1","㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"],
["9540","𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"],
["95a1","衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"],
["9640","桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"],
["96a1","𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"],
["9740","愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"],
["97a1","𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"],
["9840","𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"],
["98a1","咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"],
["9940","䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"],
["99a1","䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"],
["9a40","鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"],
["9aa1","黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"],
["9b40","𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"],
["9b62","𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"],
["9ba1","椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"],
["9c40","嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"],
["9ca1","㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"],
["9d40","𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"],
["9da1","辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"],
["9e40","𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"],
["9ea1","鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"],
["9ead","𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"],
["9ec5","㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"],
["9ef5","噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"],
["9f40","籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"],
["9f4f","凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"],
["9fa1","椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"],
["9fae","酙隁酜"],
["9fb2","酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"],
["9fc1","𤤙盖鮝个𠳔莾衂"],
["9fc9","届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"],
["9fdb","歒酼龥鮗頮颴骺麨麄煺笔"],
["9fe7","毺蠘罸"],
["9feb","嘠𪙊蹷齓"],
["9ff0","跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"],
["a040","𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"],
["a055","𡠻𦸅"],
["a058","詾𢔛"],
["a05b","惽癧髗鵄鍮鮏蟵"],
["a063","蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"],
["a073","坟慯抦戹拎㩜懢厪𣏵捤栂㗒"],
["a0a1","嵗𨯂迚𨸹"],
["a0a6","僙𡵆礆匲阸𠼻䁥"],
["a0ae","矾"],
["a0b0","糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"],
["a0d4","覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"],
["a0e2","罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"],
["a3c0","␀",31,"␡"],
["c6a1","①",9,"⑴",9,"ⅰ",9,"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",23],
["c740","す",58,"ァアィイ"],
["c7a1","ゥ",81,"А",5,"ЁЖ",4],
["c840","Л",26,"ёж",25,"⇧↸↹㇏𠃌乚𠂊刂䒑"],
["c8a1","龰冈龱𧘇"],
["c8cd","￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"],
["c8f5","ʃɐɛɔɵœøŋʊɪ"],
["f9fe","￭"],
["fa40","𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"],
["faa1","鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"],
["fb40","𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"],
["fba1","𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"],
["fc40","廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"],
["fca1","𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"],
["fd40","𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"],
["fda1","𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"],
["fe40","鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"],
["fea1","𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"]
]

},{}],79:[function(require,module,exports){
module.exports=[
["0","\u0000",127,"€"],
["8140","丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",5,"乲乴",9,"乿",6,"亇亊"],
["8180","亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",6,"伋伌伒",4,"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",4,"佄佅佇",5,"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"],
["8240","侤侫侭侰",4,"侶",8,"俀俁係俆俇俈俉俋俌俍俒",4,"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",11],
["8280","個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",10,"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",4,"偖偗偘偙偛偝",7,"偦",5,"偭",8,"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",20,"傤傦傪傫傭",4,"傳",6,"傼"],
["8340","傽",17,"僐",5,"僗僘僙僛",10,"僨僩僪僫僯僰僱僲僴僶",4,"僼",9,"儈"],
["8380","儉儊儌",5,"儓",13,"儢",28,"兂兇兊兌兎兏児兒兓兗兘兙兛兝",4,"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",4,"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",5],
["8440","凘凙凚凜凞凟凢凣凥",5,"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",5,"剋剎剏剒剓剕剗剘"],
["8480","剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",9,"剾劀劃",4,"劉",6,"劑劒劔",6,"劜劤劥劦劧劮劯劰労",9,"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",5,"勠勡勢勣勥",10,"勱",7,"勻勼勽匁匂匃匄匇匉匊匋匌匎"],
["8540","匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",9,"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"],
["8580","厐",4,"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",6,"厷厸厹厺厼厽厾叀參",4,"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",4,"呣呥呧呩",7,"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"],
["8640","咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",4,"哫哬哯哰哱哴",5,"哻哾唀唂唃唄唅唈唊",4,"唒唓唕",5,"唜唝唞唟唡唥唦"],
["8680","唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",4,"啑啒啓啔啗",4,"啝啞啟啠啢啣啨啩啫啯",5,"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",6,"喨",8,"喲喴営喸喺喼喿",4,"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",4,"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",4,"嗿嘂嘃嘄嘅"],
["8740","嘆嘇嘊嘋嘍嘐",7,"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",11,"噏",4,"噕噖噚噛噝",4],
["8780","噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",7,"嚇",6,"嚐嚑嚒嚔",14,"嚤",10,"嚰",6,"嚸嚹嚺嚻嚽",12,"囋",8,"囕囖囘囙囜団囥",5,"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",6],
["8840","園",9,"圝圞圠圡圢圤圥圦圧圫圱圲圴",4,"圼圽圿坁坃坄坅坆坈坉坋坒",4,"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"],
["8880","垁垇垈垉垊垍",4,"垔",6,"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",8,"埄",6,"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",7,"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",4,"堫",4,"報堲堳場堶",7],
["8940","堾",5,"塅",6,"塎塏塐塒塓塕塖塗塙",4,"塟",5,"塦",4,"塭",16,"塿墂墄墆墇墈墊墋墌"],
["8980","墍",4,"墔",4,"墛墜墝墠",7,"墪",17,"墽墾墿壀壂壃壄壆",10,"壒壓壔壖",13,"壥",5,"壭壯壱売壴壵壷壸壺",7,"夃夅夆夈",4,"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"],
["8a40","夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",4,"奡奣奤奦",12,"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"],
["8a80","妧妬妭妰妱妳",5,"妺妼妽妿",6,"姇姈姉姌姍姎姏姕姖姙姛姞",4,"姤姦姧姩姪姫姭",11,"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",6,"娳娵娷",4,"娽娾娿婁",4,"婇婈婋",9,"婖婗婘婙婛",5],
["8b40","婡婣婤婥婦婨婩婫",8,"婸婹婻婼婽婾媀",17,"媓",6,"媜",13,"媫媬"],
["8b80","媭",4,"媴媶媷媹",4,"媿嫀嫃",5,"嫊嫋嫍",4,"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",4,"嫲",22,"嬊",11,"嬘",25,"嬳嬵嬶嬸",7,"孁",6],
["8c40","孈",7,"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"],
["8c80","寑寔",8,"寠寢寣實寧審",4,"寯寱",6,"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",6,"屰屲",6,"屻屼屽屾岀岃",4,"岉岊岋岎岏岒岓岕岝",4,"岤",4],
["8d40","岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",5,"峌",5,"峓",5,"峚",6,"峢峣峧峩峫峬峮峯峱",9,"峼",4],
["8d80","崁崄崅崈",5,"崏",4,"崕崗崘崙崚崜崝崟",4,"崥崨崪崫崬崯",4,"崵",7,"崿",7,"嵈嵉嵍",10,"嵙嵚嵜嵞",10,"嵪嵭嵮嵰嵱嵲嵳嵵",12,"嶃",21,"嶚嶛嶜嶞嶟嶠"],
["8e40","嶡",21,"嶸",12,"巆",6,"巎",12,"巜巟巠巣巤巪巬巭"],
["8e80","巰巵巶巸",4,"巿帀帄帇帉帊帋帍帎帒帓帗帞",7,"帨",4,"帯帰帲",4,"帹帺帾帿幀幁幃幆",5,"幍",6,"幖",4,"幜幝幟幠幣",14,"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",4,"庮",4,"庴庺庻庼庽庿",6],
["8f40","廆廇廈廋",5,"廔廕廗廘廙廚廜",11,"廩廫",8,"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"],
["8f80","弨弫弬弮弰弲",6,"弻弽弾弿彁",14,"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",5,"復徫徬徯",5,"徶徸徹徺徻徾",4,"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"],
["9040","怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",4,"怶",4,"怽怾恀恄",6,"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"],
["9080","悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",7,"惇惈惉惌",4,"惒惓惔惖惗惙惛惞惡",4,"惪惱惲惵惷惸惻",4,"愂愃愄愅愇愊愋愌愐",4,"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",18,"慀",6],
["9140","慇慉態慍慏慐慒慓慔慖",6,"慞慟慠慡慣慤慥慦慩",6,"慱慲慳慴慶慸",18,"憌憍憏",4,"憕"],
["9180","憖",6,"憞",8,"憪憫憭",9,"憸",5,"憿懀懁懃",4,"應懌",4,"懓懕",16,"懧",13,"懶",8,"戀",5,"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",4,"扂扄扅扆扊"],
["9240","扏扐払扖扗扙扚扜",6,"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",5,"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"],
["9280","拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",5,"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",7,"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",6,"採掤掦掫掯掱掲掵掶掹掻掽掿揀"],
["9340","揁揂揃揅揇揈揊揋揌揑揓揔揕揗",6,"揟揢揤",4,"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",4,"損搎搑搒搕",5,"搝搟搢搣搤"],
["9380","搥搧搨搩搫搮",5,"搵",4,"搻搼搾摀摂摃摉摋",6,"摓摕摖摗摙",4,"摟",7,"摨摪摫摬摮",9,"摻",6,"撃撆撈",8,"撓撔撗撘撚撛撜撝撟",4,"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",6,"擏擑擓擔擕擖擙據"],
["9440","擛擜擝擟擠擡擣擥擧",24,"攁",7,"攊",7,"攓",4,"攙",8],
["9480","攢攣攤攦",4,"攬攭攰攱攲攳攷攺攼攽敀",4,"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",14,"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",7,"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",7,"旡旣旤旪旫"],
["9540","旲旳旴旵旸旹旻",4,"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",4,"昽昿晀時晄",6,"晍晎晐晑晘"],
["9580","晙晛晜晝晞晠晢晣晥晧晩",4,"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",4,"暞",8,"暩",4,"暯",4,"暵暶暷暸暺暻暼暽暿",25,"曚曞",7,"曧曨曪",5,"曱曵曶書曺曻曽朁朂會"],
["9640","朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",5,"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",4,"杝杢杣杤杦杧杫杬杮東杴杶"],
["9680","杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",7,"柂柅",9,"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",7,"柾栁栂栃栄栆栍栐栒栔栕栘",4,"栞栟栠栢",6,"栫",6,"栴栵栶栺栻栿桇桋桍桏桒桖",5],
["9740","桜桝桞桟桪桬",7,"桵桸",8,"梂梄梇",7,"梐梑梒梔梕梖梘",9,"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"],
["9780","梹",6,"棁棃",5,"棊棌棎棏棐棑棓棔棖棗棙棛",4,"棡棢棤",9,"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",4,"椌椏椑椓",11,"椡椢椣椥",7,"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",16,"楕楖楘楙楛楜楟"],
["9840","楡楢楤楥楧楨楩楪楬業楯楰楲",4,"楺楻楽楾楿榁榃榅榊榋榌榎",5,"榖榗榙榚榝",9,"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"],
["9880","榾榿槀槂",7,"構槍槏槑槒槓槕",5,"槜槝槞槡",11,"槮槯槰槱槳",9,"槾樀",9,"樋",11,"標",5,"樠樢",5,"権樫樬樭樮樰樲樳樴樶",6,"樿",4,"橅橆橈",7,"橑",6,"橚"],
["9940","橜",4,"橢橣橤橦",10,"橲",6,"橺橻橽橾橿檁檂檃檅",8,"檏檒",4,"檘",7,"檡",5],
["9980","檧檨檪檭",114,"欥欦欨",6],
["9a40","欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",11,"歚",7,"歨歩歫",13,"歺歽歾歿殀殅殈"],
["9a80","殌殎殏殐殑殔殕殗殘殙殜",4,"殢",7,"殫",7,"殶殸",6,"毀毃毄毆",4,"毌毎毐毑毘毚毜",4,"毢",7,"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",6,"氈",4,"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",4,"汑汒汓汖汘"],
["9b40","汙汚汢汣汥汦汧汫",4,"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"],
["9b80","泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",5,"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",4,"涃涄涆涇涊涋涍涏涐涒涖",4,"涜涢涥涬涭涰涱涳涴涶涷涹",5,"淁淂淃淈淉淊"],
["9c40","淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",7,"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"],
["9c80","渶渷渹渻",7,"湅",7,"湏湐湑湒湕湗湙湚湜湝湞湠",10,"湬湭湯",14,"満溁溂溄溇溈溊",4,"溑",6,"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",5],
["9d40","滰滱滲滳滵滶滷滸滺",7,"漃漄漅漇漈漊",4,"漐漑漒漖",9,"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",6,"漿潀潁潂"],
["9d80","潃潄潅潈潉潊潌潎",9,"潙潚潛潝潟潠潡潣潤潥潧",5,"潯潰潱潳潵潶潷潹潻潽",6,"澅澆澇澊澋澏",12,"澝澞澟澠澢",4,"澨",10,"澴澵澷澸澺",5,"濁濃",5,"濊",6,"濓",10,"濟濢濣濤濥"],
["9e40","濦",7,"濰",32,"瀒",7,"瀜",6,"瀤",6],
["9e80","瀫",9,"瀶瀷瀸瀺",17,"灍灎灐",13,"灟",11,"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",12,"炰炲炴炵炶為炾炿烄烅烆烇烉烋",12,"烚"],
["9f40","烜烝烞烠烡烢烣烥烪烮烰",6,"烸烺烻烼烾",10,"焋",4,"焑焒焔焗焛",10,"焧",7,"焲焳焴"],
["9f80","焵焷",13,"煆煇煈煉煋煍煏",12,"煝煟",4,"煥煩",4,"煯煰煱煴煵煶煷煹煻煼煾",5,"熅",4,"熋熌熍熎熐熑熒熓熕熖熗熚",4,"熡",6,"熩熪熫熭",5,"熴熶熷熸熺",8,"燄",9,"燏",4],
["a040","燖",9,"燡燢燣燤燦燨",5,"燯",9,"燺",11,"爇",19],
["a080","爛爜爞",9,"爩爫爭爮爯爲爳爴爺爼爾牀",6,"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",4,"犌犎犐犑犓",11,"犠",11,"犮犱犲犳犵犺",6,"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"],
["a1a1","　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",7,"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"],
["a2a1","ⅰ",9],
["a2b1","⒈",19,"⑴",19,"①",9],
["a2e5","㈠",9],
["a2f1","Ⅰ",11],
["a3a1","！＂＃￥％",88,"￣"],
["a4a1","ぁ",82],
["a5a1","ァ",85],
["a6a1","Α",16,"Σ",6],
["a6c1","α",16,"σ",6],
["a6e0","︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"],
["a6ee","︻︼︷︸︱"],
["a6f4","︳︴"],
["a7a1","А",5,"ЁЖ",25],
["a7d1","а",5,"ёж",25],
["a840","ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",35,"▁",6],
["a880","█",7,"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"],
["a8a1","āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"],
["a8bd","ńň"],
["a8c0","ɡ"],
["a8c5","ㄅ",36],
["a940","〡",8,"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"],
["a959","℡㈱"],
["a95c","‐"],
["a960","ー゛゜ヽヾ〆ゝゞ﹉",9,"﹔﹕﹖﹗﹙",8],
["a980","﹢",4,"﹨﹩﹪﹫"],
["a996","〇"],
["a9a4","─",75],
["aa40","狜狝狟狢",5,"狪狫狵狶狹狽狾狿猀猂猄",5,"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",8],
["aa80","獉獊獋獌獎獏獑獓獔獕獖獘",7,"獡",10,"獮獰獱"],
["ab40","獲",11,"獿",4,"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",5,"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",4],
["ab80","珋珌珎珒",6,"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",4],
["ac40","珸",10,"琄琇琈琋琌琍琎琑",8,"琜",5,"琣琤琧琩琫琭琯琱琲琷",4,"琽琾琿瑀瑂",11],
["ac80","瑎",6,"瑖瑘瑝瑠",12,"瑮瑯瑱",4,"瑸瑹瑺"],
["ad40","瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",10,"璝璟",7,"璪",15,"璻",12],
["ad80","瓈",9,"瓓",8,"瓝瓟瓡瓥瓧",6,"瓰瓱瓲"],
["ae40","瓳瓵瓸",6,"甀甁甂甃甅",7,"甎甐甒甔甕甖甗甛甝甞甠",4,"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"],
["ae80","畝",7,"畧畨畩畫",6,"畳畵當畷畺",4,"疀疁疂疄疅疇"],
["af40","疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",4,"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"],
["af80","瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"],
["b040","癅",6,"癎",5,"癕癗",4,"癝癟癠癡癢癤",6,"癬癭癮癰",7,"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"],
["b080","皜",7,"皥",8,"皯皰皳皵",9,"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"],
["b140","盄盇盉盋盌盓盕盙盚盜盝盞盠",4,"盦",7,"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",10,"眛眜眝眞眡眣眤眥眧眪眫"],
["b180","眬眮眰",4,"眹眻眽眾眿睂睄睅睆睈",7,"睒",7,"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"],
["b240","睝睞睟睠睤睧睩睪睭",11,"睺睻睼瞁瞂瞃瞆",5,"瞏瞐瞓",11,"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",4],
["b280","瞼瞾矀",12,"矎",8,"矘矙矚矝",4,"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"],
["b340","矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",5,"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"],
["b380","硛硜硞",11,"硯",7,"硸硹硺硻硽",6,"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"],
["b440","碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",7,"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",9],
["b480","磤磥磦磧磩磪磫磭",4,"磳磵磶磸磹磻",5,"礂礃礄礆",6,"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"],
["b540","礍",5,"礔",9,"礟",4,"礥",14,"礵",4,"礽礿祂祃祄祅祇祊",8,"祔祕祘祙祡祣"],
["b580","祤祦祩祪祫祬祮祰",6,"祹祻",4,"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"],
["b640","禓",6,"禛",11,"禨",10,"禴",4,"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",5,"秠秡秢秥秨秪"],
["b680","秬秮秱",6,"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",4,"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"],
["b740","稝稟稡稢稤",14,"稴稵稶稸稺稾穀",5,"穇",9,"穒",4,"穘",16],
["b780","穩",6,"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"],
["b840","窣窤窧窩窪窫窮",4,"窴",10,"竀",10,"竌",9,"竗竘竚竛竜竝竡竢竤竧",5,"竮竰竱竲竳"],
["b880","竴",4,"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"],
["b940","笯笰笲笴笵笶笷笹笻笽笿",5,"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",10,"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",6,"箎箏"],
["b980","箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",7,"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"],
["ba40","篅篈築篊篋篍篎篏篐篒篔",4,"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",4,"篸篹篺篻篽篿",7,"簈簉簊簍簎簐",5,"簗簘簙"],
["ba80","簚",4,"簠",5,"簨簩簫",12,"簹",5,"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"],
["bb40","籃",9,"籎",36,"籵",5,"籾",9],
["bb80","粈粊",6,"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",4,"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"],
["bc40","粿糀糂糃糄糆糉糋糎",6,"糘糚糛糝糞糡",6,"糩",5,"糰",7,"糹糺糼",13,"紋",5],
["bc80","紑",14,"紡紣紤紥紦紨紩紪紬紭紮細",6,"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"],
["bd40","紷",54,"絯",7],
["bd80","絸",32,"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"],
["be40","継",12,"綧",6,"綯",42],
["be80","線",32,"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"],
["bf40","緻",62],
["bf80","縺縼",4,"繂",4,"繈",21,"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"],
["c040","繞",35,"纃",23,"纜纝纞"],
["c080","纮纴纻纼绖绤绬绹缊缐缞缷缹缻",6,"罃罆",9,"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"],
["c140","罖罙罛罜罝罞罠罣",4,"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",7,"羋羍羏",4,"羕",4,"羛羜羠羢羣羥羦羨",6,"羱"],
["c180","羳",4,"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",4,"翖翗翙",5,"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"],
["c240","翤翧翨翪翫翬翭翯翲翴",6,"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",5,"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"],
["c280","聙聛",13,"聫",5,"聲",11,"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"],
["c340","聾肁肂肅肈肊肍",5,"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",4,"胏",6,"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"],
["c380","脌脕脗脙脛脜脝脟",12,"脭脮脰脳脴脵脷脹",4,"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"],
["c440","腀",5,"腇腉腍腎腏腒腖腗腘腛",4,"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",4,"膉膋膌膍膎膐膒",5,"膙膚膞",4,"膤膥"],
["c480","膧膩膫",7,"膴",5,"膼膽膾膿臄臅臇臈臉臋臍",6,"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"],
["c540","臔",14,"臤臥臦臨臩臫臮",4,"臵",5,"臽臿舃與",4,"舎舏舑舓舕",5,"舝舠舤舥舦舧舩舮舲舺舼舽舿"],
["c580","艀艁艂艃艅艆艈艊艌艍艎艐",7,"艙艛艜艝艞艠",7,"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"],
["c640","艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"],
["c680","苺苼",4,"茊茋茍茐茒茓茖茘茙茝",9,"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"],
["c740","茾茿荁荂荄荅荈荊",4,"荓荕",4,"荝荢荰",6,"荹荺荾",6,"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",6,"莬莭莮"],
["c780","莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"],
["c840","菮華菳",4,"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",5,"萙萚萛萞",5,"萩",7,"萲",5,"萹萺萻萾",7,"葇葈葉"],
["c880","葊",6,"葒",4,"葘葝葞葟葠葢葤",4,"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"],
["c940","葽",4,"蒃蒄蒅蒆蒊蒍蒏",7,"蒘蒚蒛蒝蒞蒟蒠蒢",12,"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"],
["c980","蓘",4,"蓞蓡蓢蓤蓧",4,"蓭蓮蓯蓱",10,"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"],
["ca40","蔃",8,"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",8,"蔭",9,"蔾",4,"蕄蕅蕆蕇蕋",10],
["ca80","蕗蕘蕚蕛蕜蕝蕟",4,"蕥蕦蕧蕩",8,"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"],
["cb40","薂薃薆薈",6,"薐",10,"薝",6,"薥薦薧薩薫薬薭薱",5,"薸薺",6,"藂",6,"藊",4,"藑藒"],
["cb80","藔藖",5,"藝",6,"藥藦藧藨藪",14,"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"],
["cc40","藹藺藼藽藾蘀",4,"蘆",10,"蘒蘓蘔蘕蘗",15,"蘨蘪",13,"蘹蘺蘻蘽蘾蘿虀"],
["cc80","虁",11,"虒虓處",4,"虛虜虝號虠虡虣",7,"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"],
["cd40","虭虯虰虲",6,"蚃",6,"蚎",4,"蚔蚖",5,"蚞",4,"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",4,"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"],
["cd80","蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"],
["ce40","蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",6,"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",5,"蝡蝢蝦",7,"蝯蝱蝲蝳蝵"],
["ce80","蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",4,"螔螕螖螘",6,"螠",4,"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"],
["cf40","螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",4,"蟇蟈蟉蟌",4,"蟔",6,"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",9],
["cf80","蟺蟻蟼蟽蟿蠀蠁蠂蠄",5,"蠋",7,"蠔蠗蠘蠙蠚蠜",4,"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"],
["d040","蠤",13,"蠳",5,"蠺蠻蠽蠾蠿衁衂衃衆",5,"衎",5,"衕衖衘衚",6,"衦衧衪衭衯衱衳衴衵衶衸衹衺"],
["d080","衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",4,"袝",4,"袣袥",5,"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"],
["d140","袬袮袯袰袲",4,"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",4,"裠裡裦裧裩",6,"裲裵裶裷裺裻製裿褀褁褃",5],
["d180","褉褋",4,"褑褔",4,"褜",4,"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"],
["d240","褸",8,"襂襃襅",24,"襠",5,"襧",19,"襼"],
["d280","襽襾覀覂覄覅覇",26,"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"],
["d340","覢",30,"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",6],
["d380","觻",4,"訁",5,"計",21,"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"],
["d440","訞",31,"訿",8,"詉",21],
["d480","詟",25,"詺",6,"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"],
["d540","誁",7,"誋",7,"誔",46],
["d580","諃",32,"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"],
["d640","諤",34,"謈",27],
["d680","謤謥謧",30,"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"],
["d740","譆",31,"譧",4,"譭",25],
["d780","讇",24,"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"],
["d840","谸",8,"豂豃豄豅豈豊豋豍",7,"豖豗豘豙豛",5,"豣",6,"豬",6,"豴豵豶豷豻",6,"貃貄貆貇"],
["d880","貈貋貍",6,"貕貖貗貙",20,"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"],
["d940","貮",62],
["d980","賭",32,"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"],
["da40","贎",14,"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",8,"趂趃趆趇趈趉趌",4,"趒趓趕",9,"趠趡"],
["da80","趢趤",12,"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"],
["db40","跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",6,"踆踇踈踋踍踎踐踑踒踓踕",7,"踠踡踤",4,"踫踭踰踲踳踴踶踷踸踻踼踾"],
["db80","踿蹃蹅蹆蹌",4,"蹓",5,"蹚",11,"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"],
["dc40","蹳蹵蹷",4,"蹽蹾躀躂躃躄躆躈",6,"躑躒躓躕",6,"躝躟",11,"躭躮躰躱躳",6,"躻",7],
["dc80","軃",10,"軏",21,"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"],
["dd40","軥",62],
["dd80","輤",32,"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"],
["de40","轅",32,"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"],
["de80","迉",4,"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"],
["df40","這逜連逤逥逧",5,"逰",4,"逷逹逺逽逿遀遃遅遆遈",4,"過達違遖遙遚遜",5,"遤遦遧適遪遫遬遯",4,"遶",6,"遾邁"],
["df80","還邅邆邇邉邊邌",4,"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"],
["e040","郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",19,"鄚鄛鄜"],
["e080","鄝鄟鄠鄡鄤",10,"鄰鄲",6,"鄺",8,"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"],
["e140","酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",4,"醆醈醊醎醏醓",6,"醜",5,"醤",5,"醫醬醰醱醲醳醶醷醸醹醻"],
["e180","醼",10,"釈釋釐釒",9,"針",8,"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"],
["e240","釦",62],
["e280","鈥",32,"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",5,"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"],
["e340","鉆",45,"鉵",16],
["e380","銆",7,"銏",24,"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"],
["e440","銨",5,"銯",24,"鋉",31],
["e480","鋩",32,"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"],
["e540","錊",51,"錿",10],
["e580","鍊",31,"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"],
["e640","鍬",34,"鎐",27],
["e680","鎬",29,"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"],
["e740","鏎",7,"鏗",54],
["e780","鐎",32,"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",6,"缪缫缬缭缯",4,"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"],
["e840","鐯",14,"鐿",43,"鑬鑭鑮鑯"],
["e880","鑰",20,"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"],
["e940","锧锳锽镃镈镋镕镚镠镮镴镵長",7,"門",42],
["e980","閫",32,"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"],
["ea40","闌",27,"闬闿阇阓阘阛阞阠阣",6,"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"],
["ea80","陘陙陚陜陝陞陠陣陥陦陫陭",4,"陳陸",12,"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"],
["eb40","隌階隑隒隓隕隖隚際隝",9,"隨",7,"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",9,"雡",6,"雫"],
["eb80","雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",4,"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"],
["ec40","霡",8,"霫霬霮霯霱霳",4,"霺霻霼霽霿",18,"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",7],
["ec80","靲靵靷",4,"靽",7,"鞆",4,"鞌鞎鞏鞐鞓鞕鞖鞗鞙",4,"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"],
["ed40","鞞鞟鞡鞢鞤",6,"鞬鞮鞰鞱鞳鞵",46],
["ed80","韤韥韨韮",4,"韴韷",23,"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"],
["ee40","頏",62],
["ee80","顎",32,"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",4,"钼钽钿铄铈",6,"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"],
["ef40","顯",5,"颋颎颒颕颙颣風",37,"飏飐飔飖飗飛飜飝飠",4],
["ef80","飥飦飩",30,"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",4,"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",8,"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"],
["f040","餈",4,"餎餏餑",28,"餯",26],
["f080","饊",9,"饖",12,"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",4,"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",6,"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"],
["f140","馌馎馚",10,"馦馧馩",47],
["f180","駙",32,"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"],
["f240","駺",62],
["f280","騹",32,"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"],
["f340","驚",17,"驲骃骉骍骎骔骕骙骦骩",6,"骲骳骴骵骹骻骽骾骿髃髄髆",4,"髍髎髏髐髒體髕髖髗髙髚髛髜"],
["f380","髝髞髠髢髣髤髥髧髨髩髪髬髮髰",8,"髺髼",6,"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"],
["f440","鬇鬉",5,"鬐鬑鬒鬔",10,"鬠鬡鬢鬤",10,"鬰鬱鬳",7,"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",5],
["f480","魛",32,"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"],
["f540","魼",62],
["f580","鮻",32,"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"],
["f640","鯜",62],
["f680","鰛",32,"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",5,"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",5,"鲥",4,"鲫鲭鲮鲰",7,"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"],
["f740","鰼",62],
["f780","鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",4,"鳈鳉鳑鳒鳚鳛鳠鳡鳌",4,"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"],
["f840","鳣",62],
["f880","鴢",32],
["f940","鵃",62],
["f980","鶂",32],
["fa40","鶣",62],
["fa80","鷢",32],
["fb40","鸃",27,"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",9,"麀"],
["fb80","麁麃麄麅麆麉麊麌",5,"麔",8,"麞麠",5,"麧麨麩麪"],
["fc40","麫",8,"麵麶麷麹麺麼麿",4,"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",8,"黺黽黿",6],
["fc80","鼆",4,"鼌鼏鼑鼒鼔鼕鼖鼘鼚",5,"鼡鼣",8,"鼭鼮鼰鼱"],
["fd40","鼲",4,"鼸鼺鼼鼿",4,"齅",10,"齒",38],
["fd80","齹",5,"龁龂龍",11,"龜龝龞龡",4,"郎凉秊裏隣"],
["fe40","兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"]
]

},{}],80:[function(require,module,exports){
module.exports=[
["0","\u0000",127],
["8141","갂갃갅갆갋",4,"갘갞갟갡갢갣갥",6,"갮갲갳갴"],
["8161","갵갶갷갺갻갽갾갿걁",9,"걌걎",5,"걕"],
["8181","걖걗걙걚걛걝",18,"걲걳걵걶걹걻",4,"겂겇겈겍겎겏겑겒겓겕",6,"겞겢",5,"겫겭겮겱",6,"겺겾겿곀곂곃곅곆곇곉곊곋곍",7,"곖곘",7,"곢곣곥곦곩곫곭곮곲곴곷",4,"곾곿괁괂괃괅괇",4,"괎괐괒괓"],
["8241","괔괕괖괗괙괚괛괝괞괟괡",7,"괪괫괮",5],
["8261","괶괷괹괺괻괽",6,"굆굈굊",5,"굑굒굓굕굖굗"],
["8281","굙",7,"굢굤",7,"굮굯굱굲굷굸굹굺굾궀궃",4,"궊궋궍궎궏궑",10,"궞",5,"궥",17,"궸",7,"귂귃귅귆귇귉",6,"귒귔",7,"귝귞귟귡귢귣귥",18],
["8341","귺귻귽귾긂",5,"긊긌긎",5,"긕",7],
["8361","긝",18,"긲긳긵긶긹긻긼"],
["8381","긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",4,"깞깢깣깤깦깧깪깫깭깮깯깱",6,"깺깾",5,"꺆",5,"꺍",46,"꺿껁껂껃껅",6,"껎껒",5,"껚껛껝",8],
["8441","껦껧껩껪껬껮",5,"껵껶껷껹껺껻껽",8],
["8461","꼆꼉꼊꼋꼌꼎꼏꼑",18],
["8481","꼤",7,"꼮꼯꼱꼳꼵",6,"꼾꽀꽄꽅꽆꽇꽊",5,"꽑",10,"꽞",5,"꽦",18,"꽺",5,"꾁꾂꾃꾅꾆꾇꾉",6,"꾒꾓꾔꾖",5,"꾝",26,"꾺꾻꾽꾾"],
["8541","꾿꿁",5,"꿊꿌꿏",4,"꿕",6,"꿝",4],
["8561","꿢",5,"꿪",5,"꿲꿳꿵꿶꿷꿹",6,"뀂뀃"],
["8581","뀅",6,"뀍뀎뀏뀑뀒뀓뀕",6,"뀞",9,"뀩",26,"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",29,"끾끿낁낂낃낅",6,"낎낐낒",5,"낛낝낞낣낤"],
["8641","낥낦낧낪낰낲낶낷낹낺낻낽",6,"냆냊",5,"냒"],
["8661","냓냕냖냗냙",6,"냡냢냣냤냦",10],
["8681","냱",22,"넊넍넎넏넑넔넕넖넗넚넞",4,"넦넧넩넪넫넭",6,"넶넺",5,"녂녃녅녆녇녉",6,"녒녓녖녗녙녚녛녝녞녟녡",22,"녺녻녽녾녿놁놃",4,"놊놌놎놏놐놑놕놖놗놙놚놛놝"],
["8741","놞",9,"놩",15],
["8761","놹",18,"뇍뇎뇏뇑뇒뇓뇕"],
["8781","뇖",5,"뇞뇠",7,"뇪뇫뇭뇮뇯뇱",7,"뇺뇼뇾",5,"눆눇눉눊눍",6,"눖눘눚",5,"눡",18,"눵",6,"눽",26,"뉙뉚뉛뉝뉞뉟뉡",6,"뉪",4],
["8841","뉯",4,"뉶",5,"뉽",6,"늆늇늈늊",4],
["8861","늏늒늓늕늖늗늛",4,"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"],
["8881","늸",15,"닊닋닍닎닏닑닓",4,"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",6,"댒댖",5,"댝",54,"덗덙덚덝덠덡덢덣"],
["8941","덦덨덪덬덭덯덲덳덵덶덷덹",6,"뎂뎆",5,"뎍"],
["8961","뎎뎏뎑뎒뎓뎕",10,"뎢",5,"뎩뎪뎫뎭"],
["8981","뎮",21,"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",18,"돽",18,"됑",6,"됙됚됛됝됞됟됡",6,"됪됬",7,"됵",15],
["8a41","둅",10,"둒둓둕둖둗둙",6,"둢둤둦"],
["8a61","둧",4,"둭",18,"뒁뒂"],
["8a81","뒃",4,"뒉",19,"뒞",5,"뒥뒦뒧뒩뒪뒫뒭",7,"뒶뒸뒺",5,"듁듂듃듅듆듇듉",6,"듑듒듓듔듖",5,"듞듟듡듢듥듧",4,"듮듰듲",5,"듹",26,"딖딗딙딚딝"],
["8b41","딞",5,"딦딫",4,"딲딳딵딶딷딹",6,"땂땆"],
["8b61","땇땈땉땊땎땏땑땒땓땕",6,"땞땢",8],
["8b81","땫",52,"떢떣떥떦떧떩떬떭떮떯떲떶",4,"떾떿뗁뗂뗃뗅",6,"뗎뗒",5,"뗙",18,"뗭",18],
["8c41","똀",15,"똒똓똕똖똗똙",4],
["8c61","똞",6,"똦",5,"똭",6,"똵",5],
["8c81","똻",12,"뙉",26,"뙥뙦뙧뙩",50,"뚞뚟뚡뚢뚣뚥",5,"뚭뚮뚯뚰뚲",16],
["8d41","뛃",16,"뛕",8],
["8d61","뛞",17,"뛱뛲뛳뛵뛶뛷뛹뛺"],
["8d81","뛻",4,"뜂뜃뜄뜆",33,"뜪뜫뜭뜮뜱",6,"뜺뜼",7,"띅띆띇띉띊띋띍",6,"띖",9,"띡띢띣띥띦띧띩",6,"띲띴띶",5,"띾띿랁랂랃랅",6,"랎랓랔랕랚랛랝랞"],
["8e41","랟랡",6,"랪랮",5,"랶랷랹",8],
["8e61","럂",4,"럈럊",19],
["8e81","럞",13,"럮럯럱럲럳럵",6,"럾렂",4,"렊렋렍렎렏렑",6,"렚렜렞",5,"렦렧렩렪렫렭",6,"렶렺",5,"롁롂롃롅",11,"롒롔",7,"롞롟롡롢롣롥",6,"롮롰롲",5,"롹롺롻롽",7],
["8f41","뢅",7,"뢎",17],
["8f61","뢠",7,"뢩",6,"뢱뢲뢳뢵뢶뢷뢹",4],
["8f81","뢾뢿룂룄룆",5,"룍룎룏룑룒룓룕",7,"룞룠룢",5,"룪룫룭룮룯룱",6,"룺룼룾",5,"뤅",18,"뤙",6,"뤡",26,"뤾뤿륁륂륃륅",6,"륍륎륐륒",5],
["9041","륚륛륝륞륟륡",6,"륪륬륮",5,"륶륷륹륺륻륽"],
["9061","륾",5,"릆릈릋릌릏",15],
["9081","릟",12,"릮릯릱릲릳릵",6,"릾맀맂",5,"맊맋맍맓",4,"맚맜맟맠맢맦맧맩맪맫맭",6,"맶맻",4,"먂",5,"먉",11,"먖",33,"먺먻먽먾먿멁멃멄멅멆"],
["9141","멇멊멌멏멐멑멒멖멗멙멚멛멝",6,"멦멪",5],
["9161","멲멳멵멶멷멹",9,"몆몈몉몊몋몍",5],
["9181","몓",20,"몪몭몮몯몱몳",4,"몺몼몾",5,"뫅뫆뫇뫉",14,"뫚",33,"뫽뫾뫿묁묂묃묅",7,"묎묐묒",5,"묙묚묛묝묞묟묡",6],
["9241","묨묪묬",7,"묷묹묺묿",4,"뭆뭈뭊뭋뭌뭎뭑뭒"],
["9261","뭓뭕뭖뭗뭙",7,"뭢뭤",7,"뭭",4],
["9281","뭲",21,"뮉뮊뮋뮍뮎뮏뮑",18,"뮥뮦뮧뮩뮪뮫뮭",6,"뮵뮶뮸",7,"믁믂믃믅믆믇믉",6,"믑믒믔",35,"믺믻믽믾밁"],
["9341","밃",4,"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"],
["9361","밶밷밹",6,"뱂뱆뱇뱈뱊뱋뱎뱏뱑",8],
["9381","뱚뱛뱜뱞",37,"벆벇벉벊벍벏",4,"벖벘벛",4,"벢벣벥벦벩",6,"벲벶",5,"벾벿볁볂볃볅",7,"볎볒볓볔볖볗볙볚볛볝",22,"볷볹볺볻볽"],
["9441","볾",5,"봆봈봊",5,"봑봒봓봕",8],
["9461","봞",5,"봥",6,"봭",12],
["9481","봺",5,"뵁",6,"뵊뵋뵍뵎뵏뵑",6,"뵚",9,"뵥뵦뵧뵩",22,"붂붃붅붆붋",4,"붒붔붖붗붘붛붝",6,"붥",10,"붱",6,"붹",24],
["9541","뷒뷓뷖뷗뷙뷚뷛뷝",11,"뷪",5,"뷱"],
["9561","뷲뷳뷵뷶뷷뷹",6,"븁븂븄븆",5,"븎븏븑븒븓"],
["9581","븕",6,"븞븠",35,"빆빇빉빊빋빍빏",4,"빖빘빜빝빞빟빢빣빥빦빧빩빫",4,"빲빶",4,"빾빿뺁뺂뺃뺅",6,"뺎뺒",5,"뺚",13,"뺩",14],
["9641","뺸",23,"뻒뻓"],
["9661","뻕뻖뻙",6,"뻡뻢뻦",5,"뻭",8],
["9681","뻶",10,"뼂",5,"뼊",13,"뼚뼞",33,"뽂뽃뽅뽆뽇뽉",6,"뽒뽓뽔뽖",44],
["9741","뾃",16,"뾕",8],
["9761","뾞",17,"뾱",7],
["9781","뾹",11,"뿆",5,"뿎뿏뿑뿒뿓뿕",6,"뿝뿞뿠뿢",89,"쀽쀾쀿"],
["9841","쁀",16,"쁒",5,"쁙쁚쁛"],
["9861","쁝쁞쁟쁡",6,"쁪",15],
["9881","쁺",21,"삒삓삕삖삗삙",6,"삢삤삦",5,"삮삱삲삷",4,"삾샂샃샄샆샇샊샋샍샎샏샑",6,"샚샞",5,"샦샧샩샪샫샭",6,"샶샸샺",5,"섁섂섃섅섆섇섉",6,"섑섒섓섔섖",5,"섡섢섥섨섩섪섫섮"],
["9941","섲섳섴섵섷섺섻섽섾섿셁",6,"셊셎",5,"셖셗"],
["9961","셙셚셛셝",6,"셦셪",5,"셱셲셳셵셶셷셹셺셻"],
["9981","셼",8,"솆",5,"솏솑솒솓솕솗",4,"솞솠솢솣솤솦솧솪솫솭솮솯솱",11,"솾",5,"쇅쇆쇇쇉쇊쇋쇍",6,"쇕쇖쇙",6,"쇡쇢쇣쇥쇦쇧쇩",6,"쇲쇴",7,"쇾쇿숁숂숃숅",6,"숎숐숒",5,"숚숛숝숞숡숢숣"],
["9a41","숤숥숦숧숪숬숮숰숳숵",16],
["9a61","쉆쉇쉉",6,"쉒쉓쉕쉖쉗쉙",6,"쉡쉢쉣쉤쉦"],
["9a81","쉧",4,"쉮쉯쉱쉲쉳쉵",6,"쉾슀슂",5,"슊",5,"슑",6,"슙슚슜슞",5,"슦슧슩슪슫슮",5,"슶슸슺",33,"싞싟싡싢싥",5,"싮싰싲싳싴싵싷싺싽싾싿쌁",6,"쌊쌋쌎쌏"],
["9b41","쌐쌑쌒쌖쌗쌙쌚쌛쌝",6,"쌦쌧쌪",8],
["9b61","쌳",17,"썆",7],
["9b81","썎",25,"썪썫썭썮썯썱썳",4,"썺썻썾",5,"쎅쎆쎇쎉쎊쎋쎍",50,"쏁",22,"쏚"],
["9c41","쏛쏝쏞쏡쏣",4,"쏪쏫쏬쏮",5,"쏶쏷쏹",5],
["9c61","쏿",8,"쐉",6,"쐑",9],
["9c81","쐛",8,"쐥",6,"쐭쐮쐯쐱쐲쐳쐵",6,"쐾",9,"쑉",26,"쑦쑧쑩쑪쑫쑭",6,"쑶쑷쑸쑺",5,"쒁",18,"쒕",6,"쒝",12],
["9d41","쒪",13,"쒹쒺쒻쒽",8],
["9d61","쓆",25],
["9d81","쓠",8,"쓪",5,"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",9,"씍씎씏씑씒씓씕",6,"씝",10,"씪씫씭씮씯씱",6,"씺씼씾",5,"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",6,"앲앶",5,"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"],
["9e41","얖얙얚얛얝얞얟얡",7,"얪",9,"얶"],
["9e61","얷얺얿",4,"엋엍엏엒엓엕엖엗엙",6,"엢엤엦엧"],
["9e81","엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",6,"옚옝",6,"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",6,"왒왖",5,"왞왟왡",10,"왭왮왰왲",5,"왺왻왽왾왿욁",6,"욊욌욎",5,"욖욗욙욚욛욝",6,"욦"],
["9f41","욨욪",5,"욲욳욵욶욷욻",4,"웂웄웆",5,"웎"],
["9f61","웏웑웒웓웕",6,"웞웟웢",5,"웪웫웭웮웯웱웲"],
["9f81","웳",4,"웺웻웼웾",5,"윆윇윉윊윋윍",6,"윖윘윚",5,"윢윣윥윦윧윩",6,"윲윴윶윸윹윺윻윾윿읁읂읃읅",4,"읋읎읐읙읚읛읝읞읟읡",6,"읩읪읬",7,"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",4,"잢잧",4,"잮잯잱잲잳잵잶잷"],
["a041","잸잹잺잻잾쟂",5,"쟊쟋쟍쟏쟑",6,"쟙쟚쟛쟜"],
["a061","쟞",5,"쟥쟦쟧쟩쟪쟫쟭",13],
["a081","쟻",4,"젂젃젅젆젇젉젋",4,"젒젔젗",4,"젞젟젡젢젣젥",6,"젮젰젲",5,"젹젺젻젽젾젿졁",6,"졊졋졎",5,"졕",26,"졲졳졵졶졷졹졻",4,"좂좄좈좉좊좎",5,"좕",7,"좞좠좢좣좤"],
["a141","좥좦좧좩",18,"좾좿죀죁"],
["a161","죂죃죅죆죇죉죊죋죍",6,"죖죘죚",5,"죢죣죥"],
["a181","죦",14,"죶",5,"죾죿줁줂줃줇",4,"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",9,"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"],
["a241","줐줒",5,"줙",18],
["a261","줭",6,"줵",18],
["a281","쥈",7,"쥒쥓쥕쥖쥗쥙",6,"쥢쥤",7,"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"],
["a341","쥱쥲쥳쥵",6,"쥽",10,"즊즋즍즎즏"],
["a361","즑",6,"즚즜즞",16],
["a381","즯",16,"짂짃짅짆짉짋",4,"짒짔짗짘짛！",58,"￦］",32,"￣"],
["a441","짞짟짡짣짥짦짨짩짪짫짮짲",5,"짺짻짽짾짿쨁쨂쨃쨄"],
["a461","쨅쨆쨇쨊쨎",5,"쨕쨖쨗쨙",12],
["a481","쨦쨧쨨쨪",28,"ㄱ",93],
["a541","쩇",4,"쩎쩏쩑쩒쩓쩕",6,"쩞쩢",5,"쩩쩪"],
["a561","쩫",17,"쩾",5,"쪅쪆"],
["a581","쪇",16,"쪙",14,"ⅰ",9],
["a5b0","Ⅰ",9],
["a5c1","Α",16,"Σ",6],
["a5e1","α",16,"σ",6],
["a641","쪨",19,"쪾쪿쫁쫂쫃쫅"],
["a661","쫆",5,"쫎쫐쫒쫔쫕쫖쫗쫚",5,"쫡",6],
["a681","쫨쫩쫪쫫쫭",6,"쫵",18,"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",7],
["a741","쬋",4,"쬑쬒쬓쬕쬖쬗쬙",6,"쬢",7],
["a761","쬪",22,"쭂쭃쭄"],
["a781","쭅쭆쭇쭊쭋쭍쭎쭏쭑",6,"쭚쭛쭜쭞",5,"쭥",7,"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",9,"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",9,"㎀",4,"㎺",5,"㎐",4,"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"],
["a841","쭭",10,"쭺",14],
["a861","쮉",18,"쮝",6],
["a881","쮤",19,"쮹",11,"ÆÐªĦ"],
["a8a6","Ĳ"],
["a8a8","ĿŁØŒºÞŦŊ"],
["a8b1","㉠",27,"ⓐ",25,"①",14,"½⅓⅔¼¾⅛⅜⅝⅞"],
["a941","쯅",14,"쯕",10],
["a961","쯠쯡쯢쯣쯥쯦쯨쯪",18],
["a981","쯽",14,"찎찏찑찒찓찕",6,"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",27,"⒜",25,"⑴",14,"¹²³⁴ⁿ₁₂₃₄"],
["aa41","찥찦찪찫찭찯찱",6,"찺찿",4,"챆챇챉챊챋챍챎"],
["aa61","챏",4,"챖챚",5,"챡챢챣챥챧챩",6,"챱챲"],
["aa81","챳챴챶",29,"ぁ",82],
["ab41","첔첕첖첗첚첛첝첞첟첡",6,"첪첮",5,"첶첷첹"],
["ab61","첺첻첽",6,"쳆쳈쳊",5,"쳑쳒쳓쳕",5],
["ab81","쳛",8,"쳥",6,"쳭쳮쳯쳱",12,"ァ",85],
["ac41","쳾쳿촀촂",5,"촊촋촍촎촏촑",6,"촚촜촞촟촠"],
["ac61","촡촢촣촥촦촧촩촪촫촭",11,"촺",4],
["ac81","촿",28,"쵝쵞쵟А",5,"ЁЖ",25],
["acd1","а",5,"ёж",25],
["ad41","쵡쵢쵣쵥",6,"쵮쵰쵲",5,"쵹",7],
["ad61","춁",6,"춉",10,"춖춗춙춚춛춝춞춟"],
["ad81","춠춡춢춣춦춨춪",5,"춱",18,"췅"],
["ae41","췆",5,"췍췎췏췑",16],
["ae61","췢",5,"췩췪췫췭췮췯췱",6,"췺췼췾",4],
["ae81","츃츅츆츇츉츊츋츍",6,"츕츖츗츘츚",5,"츢츣츥츦츧츩츪츫"],
["af41","츬츭츮츯츲츴츶",19],
["af61","칊",13,"칚칛칝칞칢",5,"칪칬"],
["af81","칮",5,"칶칷칹칺칻칽",6,"캆캈캊",5,"캒캓캕캖캗캙"],
["b041","캚",5,"캢캦",5,"캮",12],
["b061","캻",5,"컂",19],
["b081","컖",13,"컦컧컩컪컭",6,"컶컺",5,"가각간갇갈갉갊감",7,"같",4,"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"],
["b141","켂켃켅켆켇켉",6,"켒켔켖",5,"켝켞켟켡켢켣"],
["b161","켥",6,"켮켲",5,"켹",11],
["b181","콅",14,"콖콗콙콚콛콝",6,"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"],
["b241","콭콮콯콲콳콵콶콷콹",6,"쾁쾂쾃쾄쾆",5,"쾍"],
["b261","쾎",18,"쾢",5,"쾩"],
["b281","쾪",5,"쾱",18,"쿅",6,"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"],
["b341","쿌",19,"쿢쿣쿥쿦쿧쿩"],
["b361","쿪",5,"쿲쿴쿶",5,"쿽쿾쿿퀁퀂퀃퀅",5],
["b381","퀋",5,"퀒",5,"퀙",19,"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",4,"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"],
["b441","퀮",5,"퀶퀷퀹퀺퀻퀽",6,"큆큈큊",5],
["b461","큑큒큓큕큖큗큙",6,"큡",10,"큮큯"],
["b481","큱큲큳큵",6,"큾큿킀킂",18,"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",4,"닳담답닷",4,"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"],
["b541","킕",14,"킦킧킩킪킫킭",5],
["b561","킳킶킸킺",5,"탂탃탅탆탇탊",5,"탒탖",4],
["b581","탛탞탟탡탢탣탥",6,"탮탲",5,"탹",11,"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"],
["b641","턅",7,"턎",17],
["b661","턠",15,"턲턳턵턶턷턹턻턼턽턾"],
["b681","턿텂텆",5,"텎텏텑텒텓텕",6,"텞텠텢",5,"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"],
["b741","텮",13,"텽",6,"톅톆톇톉톊"],
["b761","톋",20,"톢톣톥톦톧"],
["b781","톩",6,"톲톴톶톷톸톹톻톽톾톿퇁",14,"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"],
["b841","퇐",7,"퇙",17],
["b861","퇫",8,"퇵퇶퇷퇹",13],
["b881","툈툊",5,"툑",24,"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",4,"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"],
["b941","툪툫툮툯툱툲툳툵",6,"툾퉀퉂",5,"퉉퉊퉋퉌"],
["b961","퉍",14,"퉝",6,"퉥퉦퉧퉨"],
["b981","퉩",22,"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",4,"받",4,"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"],
["ba41","튍튎튏튒튓튔튖",5,"튝튞튟튡튢튣튥",6,"튭"],
["ba61","튮튯튰튲",5,"튺튻튽튾틁틃",4,"틊틌",5],
["ba81","틒틓틕틖틗틙틚틛틝",6,"틦",9,"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"],
["bb41","틻",4,"팂팄팆",5,"팏팑팒팓팕팗",4,"팞팢팣"],
["bb61","팤팦팧팪팫팭팮팯팱",6,"팺팾",5,"퍆퍇퍈퍉"],
["bb81","퍊",31,"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"],
["bc41","퍪",17,"퍾퍿펁펂펃펅펆펇"],
["bc61","펈펉펊펋펎펒",5,"펚펛펝펞펟펡",6,"펪펬펮"],
["bc81","펯",4,"펵펶펷펹펺펻펽",6,"폆폇폊",5,"폑",5,"샥샨샬샴샵샷샹섀섄섈섐섕서",4,"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"],
["bd41","폗폙",7,"폢폤",7,"폮폯폱폲폳폵폶폷"],
["bd61","폸폹폺폻폾퐀퐂",5,"퐉",13],
["bd81","퐗",5,"퐞",25,"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"],
["be41","퐸",7,"푁푂푃푅",14],
["be61","푔",7,"푝푞푟푡푢푣푥",7,"푮푰푱푲"],
["be81","푳",4,"푺푻푽푾풁풃",4,"풊풌풎",5,"풕",8,"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",6,"엌엎"],
["bf41","풞",10,"풪",14],
["bf61","풹",18,"퓍퓎퓏퓑퓒퓓퓕"],
["bf81","퓖",5,"퓝퓞퓠",7,"퓩퓪퓫퓭퓮퓯퓱",6,"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",5,"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"],
["c041","퓾",5,"픅픆픇픉픊픋픍",6,"픖픘",5],
["c061","픞",25],
["c081","픸픹픺픻픾픿핁핂핃핅",6,"핎핐핒",5,"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",7,"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"],
["c141","핤핦핧핪핬핮",5,"핶핷핹핺핻핽",6,"햆햊햋"],
["c161","햌햍햎햏햑",19,"햦햧"],
["c181","햨",31,"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"],
["c241","헊헋헍헎헏헑헓",4,"헚헜헞",5,"헦헧헩헪헫헭헮"],
["c261","헯",4,"헶헸헺",5,"혂혃혅혆혇혉",6,"혒"],
["c281","혖",5,"혝혞혟혡혢혣혥",7,"혮",9,"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"],
["c341","혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",4],
["c361","홢",4,"홨홪",5,"홲홳홵",11],
["c381","횁횂횄횆",5,"횎횏횑횒횓횕",7,"횞횠횢",5,"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"],
["c441","횫횭횮횯횱",7,"횺횼",7,"훆훇훉훊훋"],
["c461","훍훎훏훐훒훓훕훖훘훚",5,"훡훢훣훥훦훧훩",4],
["c481","훮훯훱훲훳훴훶",5,"훾훿휁휂휃휅",11,"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"],
["c541","휕휖휗휚휛휝휞휟휡",6,"휪휬휮",5,"휶휷휹"],
["c561","휺휻휽",6,"흅흆흈흊",5,"흒흓흕흚",4],
["c581","흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",6,"흾흿힀힂",5,"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"],
["c641","힍힎힏힑",6,"힚힜힞",5],
["c6a1","퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"],
["c7a1","퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"],
["c8a1","혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"],
["caa1","伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"],
["cba1","匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"],
["cca1","瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"],
["cda1","棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"],
["cea1","科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"],
["cfa1","區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"],
["d0a1","鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"],
["d1a1","朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",5,"那樂",4,"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"],
["d2a1","納臘蠟衲囊娘廊",4,"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",5,"駑魯",10,"濃籠聾膿農惱牢磊腦賂雷尿壘",7,"嫩訥杻紐勒",5,"能菱陵尼泥匿溺多茶"],
["d3a1","丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"],
["d4a1","棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"],
["d5a1","蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"],
["d6a1","煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"],
["d7a1","遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"],
["d8a1","立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"],
["d9a1","蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"],
["daa1","汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"],
["dba1","發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"],
["dca1","碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"],
["dda1","孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"],
["dea1","脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"],
["dfa1","傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"],
["e0a1","胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"],
["e1a1","聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"],
["e2a1","戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"],
["e3a1","嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"],
["e4a1","沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"],
["e5a1","櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"],
["e6a1","旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"],
["e7a1","簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"],
["e8a1","烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"],
["e9a1","窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"],
["eaa1","運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"],
["eba1","濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"],
["eca1","議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"],
["eda1","立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"],
["eea1","障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"],
["efa1","煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"],
["f0a1","靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"],
["f1a1","踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"],
["f2a1","咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"],
["f3a1","鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"],
["f4a1","責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"],
["f5a1","椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"],
["f6a1","贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"],
["f7a1","鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"],
["f8a1","阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"],
["f9a1","品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"],
["faa1","行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"],
["fba1","形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"],
["fca1","禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"],
["fda1","爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"]
]

},{}],81:[function(require,module,exports){
module.exports=[
["0","\u0000",127],
["a140","　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"],
["a1a1","﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",4,"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"],
["a240","＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",7,"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"],
["a2a1","╮╰╯═╞╪╡◢◣◥◤╱╲╳０",9,"Ⅰ",9,"〡",8,"十卄卅Ａ",25,"ａ",21],
["a340","ｗｘｙｚΑ",16,"Σ",6,"α",16,"σ",6,"ㄅ",10],
["a3a1","ㄐ",25,"˙ˉˊˇˋ"],
["a3e1","€"],
["a440","一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"],
["a4a1","丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"],
["a540","世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"],
["a5a1","央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"],
["a640","共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"],
["a6a1","式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"],
["a740","作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"],
["a7a1","均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"],
["a840","杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"],
["a8a1","芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"],
["a940","咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"],
["a9a1","屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"],
["aa40","昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"],
["aaa1","炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"],
["ab40","陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"],
["aba1","哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"],
["ac40","拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"],
["aca1","活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"],
["ad40","耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"],
["ada1","迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"],
["ae40","哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"],
["aea1","恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"],
["af40","浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"],
["afa1","砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"],
["b040","虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"],
["b0a1","陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"],
["b140","娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"],
["b1a1","情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"],
["b240","毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"],
["b2a1","瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"],
["b340","莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"],
["b3a1","部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"],
["b440","婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"],
["b4a1","插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"],
["b540","溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"],
["b5a1","窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"],
["b640","詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"],
["b6a1","間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"],
["b740","媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"],
["b7a1","楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"],
["b840","睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"],
["b8a1","腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"],
["b940","辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"],
["b9a1","飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"],
["ba40","愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"],
["baa1","滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"],
["bb40","罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"],
["bba1","說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"],
["bc40","劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"],
["bca1","慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"],
["bd40","瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"],
["bda1","翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"],
["be40","輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"],
["bea1","鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"],
["bf40","濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"],
["bfa1","縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"],
["c040","錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"],
["c0a1","嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"],
["c140","瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"],
["c1a1","薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"],
["c240","駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"],
["c2a1","癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"],
["c340","鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"],
["c3a1","獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"],
["c440","願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"],
["c4a1","纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"],
["c540","護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"],
["c5a1","禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"],
["c640","讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"],
["c940","乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"],
["c9a1","氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"],
["ca40","汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"],
["caa1","吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"],
["cb40","杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"],
["cba1","芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"],
["cc40","坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"],
["cca1","怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"],
["cd40","泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"],
["cda1","矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"],
["ce40","哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"],
["cea1","峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"],
["cf40","柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"],
["cfa1","洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"],
["d040","穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"],
["d0a1","苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"],
["d140","唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"],
["d1a1","恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"],
["d240","毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"],
["d2a1","牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"],
["d340","笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"],
["d3a1","荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"],
["d440","酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"],
["d4a1","唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"],
["d540","崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"],
["d5a1","捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"],
["d640","淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"],
["d6a1","痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"],
["d740","耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"],
["d7a1","蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"],
["d840","釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"],
["d8a1","堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"],
["d940","惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"],
["d9a1","晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"],
["da40","湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"],
["daa1","琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"],
["db40","罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"],
["dba1","菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"],
["dc40","軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"],
["dca1","隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"],
["dd40","媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"],
["dda1","搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"],
["de40","毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"],
["dea1","煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"],
["df40","稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"],
["dfa1","腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"],
["e040","觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"],
["e0a1","遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"],
["e140","凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"],
["e1a1","寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"],
["e240","榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"],
["e2a1","漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"],
["e340","禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"],
["e3a1","耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"],
["e440","裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"],
["e4a1","銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"],
["e540","噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"],
["e5a1","憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"],
["e640","澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"],
["e6a1","獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"],
["e740","膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"],
["e7a1","蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"],
["e840","踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"],
["e8a1","銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"],
["e940","噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"],
["e9a1","憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"],
["ea40","澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"],
["eaa1","瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"],
["eb40","蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"],
["eba1","諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"],
["ec40","錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"],
["eca1","魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"],
["ed40","檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"],
["eda1","瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"],
["ee40","蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"],
["eea1","謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"],
["ef40","鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"],
["efa1","鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"],
["f040","璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"],
["f0a1","臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"],
["f140","蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"],
["f1a1","鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"],
["f240","徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"],
["f2a1","礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"],
["f340","譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"],
["f3a1","鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"],
["f440","嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"],
["f4a1","禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"],
["f540","鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"],
["f5a1","鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"],
["f640","蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"],
["f6a1","騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"],
["f740","糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"],
["f7a1","驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"],
["f840","讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"],
["f8a1","齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"],
["f940","纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"],
["f9a1","龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"]
]

},{}],82:[function(require,module,exports){
module.exports=[
["0","\u0000",127],
["8ea1","｡",62],
["a1a1","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"],
["a2a1","◆□■△▲▽▼※〒→←↑↓〓"],
["a2ba","∈∋⊆⊇⊂⊃∪∩"],
["a2ca","∧∨￢⇒⇔∀∃"],
["a2dc","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],
["a2f2","Å‰♯♭♪†‡¶"],
["a2fe","◯"],
["a3b0","０",9],
["a3c1","Ａ",25],
["a3e1","ａ",25],
["a4a1","ぁ",82],
["a5a1","ァ",85],
["a6a1","Α",16,"Σ",6],
["a6c1","α",16,"σ",6],
["a7a1","А",5,"ЁЖ",25],
["a7d1","а",5,"ёж",25],
["a8a1","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],
["ada1","①",19,"Ⅰ",9],
["adc0","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],
["addf","㍻〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],
["b0a1","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],
["b1a1","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"],
["b2a1","押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],
["b3a1","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"],
["b4a1","粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],
["b5a1","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"],
["b6a1","供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],
["b7a1","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"],
["b8a1","検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],
["b9a1","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"],
["baa1","此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],
["bba1","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"],
["bca1","次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],
["bda1","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"],
["bea1","勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],
["bfa1","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"],
["c0a1","澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],
["c1a1","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"],
["c2a1","臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],
["c3a1","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"],
["c4a1","帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],
["c5a1","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"],
["c6a1","董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],
["c7a1","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"],
["c8a1","函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],
["c9a1","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"],
["caa1","福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],
["cba1","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"],
["cca1","漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],
["cda1","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"],
["cea1","痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],
["cfa1","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],
["d0a1","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],
["d1a1","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"],
["d2a1","辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],
["d3a1","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"],
["d4a1","圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],
["d5a1","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"],
["d6a1","屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],
["d7a1","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"],
["d8a1","悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],
["d9a1","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"],
["daa1","據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],
["dba1","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"],
["dca1","棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],
["dda1","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"],
["dea1","沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],
["dfa1","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"],
["e0a1","燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],
["e1a1","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"],
["e2a1","癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],
["e3a1","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"],
["e4a1","筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],
["e5a1","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"],
["e6a1","罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],
["e7a1","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"],
["e8a1","茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],
["e9a1","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"],
["eaa1","蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],
["eba1","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"],
["eca1","譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],
["eda1","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"],
["eea1","遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],
["efa1","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"],
["f0a1","陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],
["f1a1","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"],
["f2a1","髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],
["f3a1","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"],
["f4a1","堯槇遙瑤凜熙"],
["f9a1","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"],
["faa1","忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],
["fba1","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"],
["fca1","釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],
["fcf1","ⅰ",9,"￢￤＇＂"],
["8fa2af","˘ˇ¸˙˝¯˛˚～΄΅"],
["8fa2c2","¡¦¿"],
["8fa2eb","ºª©®™¤№"],
["8fa6e1","ΆΈΉΊΪ"],
["8fa6e7","Ό"],
["8fa6e9","ΎΫ"],
["8fa6ec","Ώ"],
["8fa6f1","άέήίϊΐόςύϋΰώ"],
["8fa7c2","Ђ",10,"ЎЏ"],
["8fa7f2","ђ",10,"ўџ"],
["8fa9a1","ÆĐ"],
["8fa9a4","Ħ"],
["8fa9a6","Ĳ"],
["8fa9a8","ŁĿ"],
["8fa9ab","ŊØŒ"],
["8fa9af","ŦÞ"],
["8fa9c1","æđðħıĳĸłŀŉŋøœßŧþ"],
["8faaa1","ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"],
["8faaba","ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"],
["8faba1","áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"],
["8fabbd","ġĥíìïîǐ"],
["8fabc5","īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"],
["8fb0a1","丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"],
["8fb1a1","侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"],
["8fb2a1","傒傓傔傖傛傜傞",4,"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"],
["8fb3a1","凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"],
["8fb4a1","匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"],
["8fb5a1","咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"],
["8fb6a1","嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",5,"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",4,"囱囫园"],
["8fb7a1","囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",4,"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"],
["8fb8a1","堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"],
["8fb9a1","奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"],
["8fbaa1","嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",4,"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"],
["8fbba1","屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"],
["8fbca1","巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",4,"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"],
["8fbda1","彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",4,"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"],
["8fbea1","悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",4,"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"],
["8fbfa1","懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"],
["8fc0a1","捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"],
["8fc1a1","擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"],
["8fc2a1","昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"],
["8fc3a1","杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",4,"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"],
["8fc4a1","棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"],
["8fc5a1","樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"],
["8fc6a1","歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"],
["8fc7a1","泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"],
["8fc8a1","湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"],
["8fc9a1","濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",4,"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",4,"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"],
["8fcaa1","煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"],
["8fcba1","狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"],
["8fcca1","珿琀琁琄琇琊琑琚琛琤琦琨",9,"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"],
["8fcda1","甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",5,"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"],
["8fcea1","瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",6,"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"],
["8fcfa1","睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"],
["8fd0a1","碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"],
["8fd1a1","秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"],
["8fd2a1","笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",5],
["8fd3a1","籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"],
["8fd4a1","綞綦綧綪綳綶綷綹緂",4,"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"],
["8fd5a1","罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"],
["8fd6a1","胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"],
["8fd7a1","艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"],
["8fd8a1","荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"],
["8fd9a1","蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",4,"蕖蕙蕜",6,"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"],
["8fdaa1","藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",4,"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"],
["8fdba1","蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",6,"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"],
["8fdca1","蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",4,"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"],
["8fdda1","襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",4,"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"],
["8fdea1","誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",4,"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"],
["8fdfa1","貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"],
["8fe0a1","踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"],
["8fe1a1","轃轇轏轑",4,"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"],
["8fe2a1","郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"],
["8fe3a1","釂釃釅釓釔釗釙釚釞釤釥釩釪釬",5,"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",4,"鉻鉼鉽鉿銈銉銊銍銎銒銗"],
["8fe4a1","銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",4,"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"],
["8fe5a1","鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",4,"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"],
["8fe6a1","镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"],
["8fe7a1","霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"],
["8fe8a1","頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",4,"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"],
["8fe9a1","馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",4],
["8feaa1","鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",4,"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"],
["8feba1","鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",4,"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"],
["8feca1","鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"],
["8feda1","黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",4,"齓齕齖齗齘齚齝齞齨齩齭",4,"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"]
]

},{}],83:[function(require,module,exports){
module.exports={"uChars":[128,165,169,178,184,216,226,235,238,244,248,251,253,258,276,284,300,325,329,334,364,463,465,467,469,471,473,475,477,506,594,610,712,716,730,930,938,962,970,1026,1104,1106,8209,8215,8218,8222,8231,8241,8244,8246,8252,8365,8452,8454,8458,8471,8482,8556,8570,8596,8602,8713,8720,8722,8726,8731,8737,8740,8742,8748,8751,8760,8766,8777,8781,8787,8802,8808,8816,8854,8858,8870,8896,8979,9322,9372,9548,9588,9616,9622,9634,9652,9662,9672,9676,9680,9702,9735,9738,9793,9795,11906,11909,11913,11917,11928,11944,11947,11951,11956,11960,11964,11979,12284,12292,12312,12319,12330,12351,12436,12447,12535,12543,12586,12842,12850,12964,13200,13215,13218,13253,13263,13267,13270,13384,13428,13727,13839,13851,14617,14703,14801,14816,14964,15183,15471,15585,16471,16736,17208,17325,17330,17374,17623,17997,18018,18212,18218,18301,18318,18760,18811,18814,18820,18823,18844,18848,18872,19576,19620,19738,19887,40870,59244,59336,59367,59413,59417,59423,59431,59437,59443,59452,59460,59478,59493,63789,63866,63894,63976,63986,64016,64018,64021,64025,64034,64037,64042,65074,65093,65107,65112,65127,65132,65375,65510,65536],"gbChars":[0,36,38,45,50,81,89,95,96,100,103,104,105,109,126,133,148,172,175,179,208,306,307,308,309,310,311,312,313,341,428,443,544,545,558,741,742,749,750,805,819,820,7922,7924,7925,7927,7934,7943,7944,7945,7950,8062,8148,8149,8152,8164,8174,8236,8240,8262,8264,8374,8380,8381,8384,8388,8390,8392,8393,8394,8396,8401,8406,8416,8419,8424,8437,8439,8445,8482,8485,8496,8521,8603,8936,8946,9046,9050,9063,9066,9076,9092,9100,9108,9111,9113,9131,9162,9164,9218,9219,11329,11331,11334,11336,11346,11361,11363,11366,11370,11372,11375,11389,11682,11686,11687,11692,11694,11714,11716,11723,11725,11730,11736,11982,11989,12102,12336,12348,12350,12384,12393,12395,12397,12510,12553,12851,12962,12973,13738,13823,13919,13933,14080,14298,14585,14698,15583,15847,16318,16434,16438,16481,16729,17102,17122,17315,17320,17402,17418,17859,17909,17911,17915,17916,17936,17939,17961,18664,18703,18814,18962,19043,33469,33470,33471,33484,33485,33490,33497,33501,33505,33513,33520,33536,33550,37845,37921,37948,38029,38038,38064,38065,38066,38069,38075,38076,38078,39108,39109,39113,39114,39115,39116,39265,39394,189000]}
},{}],84:[function(require,module,exports){
module.exports=[
["a140","",62],
["a180","",32],
["a240","",62],
["a280","",32],
["a2ab","",5],
["a2e3","€"],
["a2ef",""],
["a2fd",""],
["a340","",62],
["a380","",31,"　"],
["a440","",62],
["a480","",32],
["a4f4","",10],
["a540","",62],
["a580","",32],
["a5f7","",7],
["a640","",62],
["a680","",32],
["a6b9","",7],
["a6d9","",6],
["a6ec",""],
["a6f3",""],
["a6f6","",8],
["a740","",62],
["a780","",32],
["a7c2","",14],
["a7f2","",12],
["a896","",10],
["a8bc","ḿ"],
["a8bf","ǹ"],
["a8c1",""],
["a8ea","",20],
["a958",""],
["a95b",""],
["a95d",""],
["a989","〾⿰",11],
["a997","",12],
["a9f0","",14],
["aaa1","",93],
["aba1","",93],
["aca1","",93],
["ada1","",93],
["aea1","",93],
["afa1","",93],
["d7fa","",4],
["f8a1","",93],
["f9a1","",93],
["faa1","",93],
["fba1","",93],
["fca1","",93],
["fda1","",93],
["fe50","⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"],
["fe80","䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",6,"䶮",93],
["8135f437",""]
]

},{}],85:[function(require,module,exports){
module.exports=[
["0","\u0000",128],
["a1","｡",62],
["8140","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×"],
["8180","÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"],
["81b8","∈∋⊆⊇⊂⊃∪∩"],
["81c8","∧∨￢⇒⇔∀∃"],
["81da","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],
["81f0","Å‰♯♭♪†‡¶"],
["81fc","◯"],
["824f","０",9],
["8260","Ａ",25],
["8281","ａ",25],
["829f","ぁ",82],
["8340","ァ",62],
["8380","ム",22],
["839f","Α",16,"Σ",6],
["83bf","α",16,"σ",6],
["8440","А",5,"ЁЖ",25],
["8470","а",5,"ёж",7],
["8480","о",17],
["849f","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],
["8740","①",19,"Ⅰ",9],
["875f","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],
["877e","㍻"],
["8780","〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],
["889f","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],
["8940","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"],
["8980","園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],
["8a40","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"],
["8a80","橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],
["8b40","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"],
["8b80","朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],
["8c40","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"],
["8c80","劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],
["8d40","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"],
["8d80","項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],
["8e40","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"],
["8e80","死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],
["8f40","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"],
["8f80","準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],
["9040","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"],
["9080","逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],
["9140","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"],
["9180","操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],
["9240","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"],
["9280","逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],
["9340","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"],
["9380","凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],
["9440","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"],
["9480","楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],
["9540","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"],
["9580","斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],
["9640","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"],
["9680","摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],
["9740","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"],
["9780","沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],
["9840","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],
["989f","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],
["9940","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"],
["9980","凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],
["9a40","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"],
["9a80","噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],
["9b40","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"],
["9b80","它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],
["9c40","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"],
["9c80","怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],
["9d40","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"],
["9d80","捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],
["9e40","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"],
["9e80","梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],
["9f40","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"],
["9f80","麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],
["e040","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"],
["e080","烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],
["e140","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"],
["e180","痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],
["e240","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"],
["e280","窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],
["e340","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"],
["e380","縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],
["e440","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"],
["e480","艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],
["e540","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"],
["e580","蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],
["e640","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"],
["e680","諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],
["e740","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"],
["e780","轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],
["e840","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"],
["e880","閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],
["e940","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"],
["e980","騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],
["ea40","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"],
["ea80","黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"],
["ed40","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"],
["ed80","塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],
["ee40","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"],
["ee80","蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],
["eeef","ⅰ",9,"￢￤＇＂"],
["f040","",62],
["f080","",124],
["f140","",62],
["f180","",124],
["f240","",62],
["f280","",124],
["f340","",62],
["f380","",124],
["f440","",62],
["f480","",124],
["f540","",62],
["f580","",124],
["f640","",62],
["f680","",124],
["f740","",62],
["f780","",124],
["f840","",62],
["f880","",124],
["f940",""],
["fa40","ⅰ",9,"Ⅰ",9,"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"],
["fa80","兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"],
["fb40","涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"],
["fb80","祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"],
["fc40","髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"]
]

},{}],86:[function(require,module,exports){
"use strict";
var Buffer = require("safer-buffer").Buffer;

// Note: UTF16-LE (or UCS2) codec is Node.js native. See encodings/internal.js

// == UTF16-BE codec. ==========================================================

exports.utf16be = Utf16BECodec;
function Utf16BECodec() {
}

Utf16BECodec.prototype.encoder = Utf16BEEncoder;
Utf16BECodec.prototype.decoder = Utf16BEDecoder;
Utf16BECodec.prototype.bomAware = true;


// -- Encoding

function Utf16BEEncoder() {
}

Utf16BEEncoder.prototype.write = function(str) {
    var buf = Buffer.from(str, 'ucs2');
    for (var i = 0; i < buf.length; i += 2) {
        var tmp = buf[i]; buf[i] = buf[i+1]; buf[i+1] = tmp;
    }
    return buf;
}

Utf16BEEncoder.prototype.end = function() {
}


// -- Decoding

function Utf16BEDecoder() {
    this.overflowByte = -1;
}

Utf16BEDecoder.prototype.write = function(buf) {
    if (buf.length == 0)
        return '';

    var buf2 = Buffer.alloc(buf.length + 1),
        i = 0, j = 0;

    if (this.overflowByte !== -1) {
        buf2[0] = buf[0];
        buf2[1] = this.overflowByte;
        i = 1; j = 2;
    }

    for (; i < buf.length-1; i += 2, j+= 2) {
        buf2[j] = buf[i+1];
        buf2[j+1] = buf[i];
    }

    this.overflowByte = (i == buf.length-1) ? buf[buf.length-1] : -1;

    return buf2.slice(0, j).toString('ucs2');
}

Utf16BEDecoder.prototype.end = function() {
    this.overflowByte = -1;
}


// == UTF-16 codec =============================================================
// Decoder chooses automatically from UTF-16LE and UTF-16BE using BOM and space-based heuristic.
// Defaults to UTF-16LE, as it's prevalent and default in Node.
// http://en.wikipedia.org/wiki/UTF-16 and http://encoding.spec.whatwg.org/#utf-16le
// Decoder default can be changed: iconv.decode(buf, 'utf16', {defaultEncoding: 'utf-16be'});

// Encoder uses UTF-16LE and prepends BOM (which can be overridden with addBOM: false).

exports.utf16 = Utf16Codec;
function Utf16Codec(codecOptions, iconv) {
    this.iconv = iconv;
}

Utf16Codec.prototype.encoder = Utf16Encoder;
Utf16Codec.prototype.decoder = Utf16Decoder;


// -- Encoding (pass-through)

function Utf16Encoder(options, codec) {
    options = options || {};
    if (options.addBOM === undefined)
        options.addBOM = true;
    this.encoder = codec.iconv.getEncoder('utf-16le', options);
}

Utf16Encoder.prototype.write = function(str) {
    return this.encoder.write(str);
}

Utf16Encoder.prototype.end = function() {
    return this.encoder.end();
}


// -- Decoding

function Utf16Decoder(options, codec) {
    this.decoder = null;
    this.initialBufs = [];
    this.initialBufsLen = 0;

    this.options = options || {};
    this.iconv = codec.iconv;
}

Utf16Decoder.prototype.write = function(buf) {
    if (!this.decoder) {
        // Codec is not chosen yet. Accumulate initial bytes.
        this.initialBufs.push(buf);
        this.initialBufsLen += buf.length;
        
        if (this.initialBufsLen < 16) // We need more bytes to use space heuristic (see below)
            return '';

        // We have enough bytes -> detect endianness.
        var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);

        var resStr = '';
        for (var i = 0; i < this.initialBufs.length; i++)
            resStr += this.decoder.write(this.initialBufs[i]);

        this.initialBufs.length = this.initialBufsLen = 0;
        return resStr;
    }

    return this.decoder.write(buf);
}

Utf16Decoder.prototype.end = function() {
    if (!this.decoder) {
        var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);

        var resStr = '';
        for (var i = 0; i < this.initialBufs.length; i++)
            resStr += this.decoder.write(this.initialBufs[i]);

        var trail = this.decoder.end();
        if (trail)
            resStr += trail;

        this.initialBufs.length = this.initialBufsLen = 0;
        return resStr;
    }
    return this.decoder.end();
}

function detectEncoding(bufs, defaultEncoding) {
    var b = [];
    var charsProcessed = 0;
    var asciiCharsLE = 0, asciiCharsBE = 0; // Number of ASCII chars when decoded as LE or BE.

    outer_loop:
    for (var i = 0; i < bufs.length; i++) {
        var buf = bufs[i];
        for (var j = 0; j < buf.length; j++) {
            b.push(buf[j]);
            if (b.length === 2) {
                if (charsProcessed === 0) {
                    // Check BOM first.
                    if (b[0] === 0xFF && b[1] === 0xFE) return 'utf-16le';
                    if (b[0] === 0xFE && b[1] === 0xFF) return 'utf-16be';
                }

                if (b[0] === 0 && b[1] !== 0) asciiCharsBE++;
                if (b[0] !== 0 && b[1] === 0) asciiCharsLE++;

                b.length = 0;
                charsProcessed++;

                if (charsProcessed >= 100) {
                    break outer_loop;
                }
            }
        }
    }

    // Make decisions.
    // Most of the time, the content has ASCII chars (U+00**), but the opposite (U+**00) is uncommon.
    // So, we count ASCII as if it was LE or BE, and decide from that.
    if (asciiCharsBE > asciiCharsLE) return 'utf-16be';
    if (asciiCharsBE < asciiCharsLE) return 'utf-16le';

    // Couldn't decide (likely all zeros or not enough data).
    return defaultEncoding || 'utf-16le';
}



},{"safer-buffer":94}],87:[function(require,module,exports){
'use strict';

var Buffer = require('safer-buffer').Buffer;

// == UTF32-LE/BE codec. ==========================================================

exports._utf32 = Utf32Codec;

function Utf32Codec(codecOptions, iconv) {
    this.iconv = iconv;
    this.bomAware = true;
    this.isLE = codecOptions.isLE;
}

exports.utf32le = { type: '_utf32', isLE: true };
exports.utf32be = { type: '_utf32', isLE: false };

// Aliases
exports.ucs4le = 'utf32le';
exports.ucs4be = 'utf32be';

Utf32Codec.prototype.encoder = Utf32Encoder;
Utf32Codec.prototype.decoder = Utf32Decoder;

// -- Encoding

function Utf32Encoder(options, codec) {
    this.isLE = codec.isLE;
    this.highSurrogate = 0;
}

Utf32Encoder.prototype.write = function(str) {
    var src = Buffer.from(str, 'ucs2');
    var dst = Buffer.alloc(src.length * 2);
    var write32 = this.isLE ? dst.writeUInt32LE : dst.writeUInt32BE;
    var offset = 0;

    for (var i = 0; i < src.length; i += 2) {
        var code = src.readUInt16LE(i);
        var isHighSurrogate = (0xD800 <= code && code < 0xDC00);
        var isLowSurrogate = (0xDC00 <= code && code < 0xE000);

        if (this.highSurrogate) {
            if (isHighSurrogate || !isLowSurrogate) {
                // There shouldn't be two high surrogates in a row, nor a high surrogate which isn't followed by a low
                // surrogate. If this happens, keep the pending high surrogate as a stand-alone semi-invalid character
                // (technically wrong, but expected by some applications, like Windows file names).
                write32.call(dst, this.highSurrogate, offset);
                offset += 4;
            }
            else {
                // Create 32-bit value from high and low surrogates;
                var codepoint = (((this.highSurrogate - 0xD800) << 10) | (code - 0xDC00)) + 0x10000;

                write32.call(dst, codepoint, offset);
                offset += 4;
                this.highSurrogate = 0;

                continue;
            }
        }

        if (isHighSurrogate)
            this.highSurrogate = code;
        else {
            // Even if the current character is a low surrogate, with no previous high surrogate, we'll
            // encode it as a semi-invalid stand-alone character for the same reasons expressed above for
            // unpaired high surrogates.
            write32.call(dst, code, offset);
            offset += 4;
            this.highSurrogate = 0;
        }
    }

    if (offset < dst.length)
        dst = dst.slice(0, offset);

    return dst;
};

Utf32Encoder.prototype.end = function() {
    // Treat any leftover high surrogate as a semi-valid independent character.
    if (!this.highSurrogate)
        return;

    var buf = Buffer.alloc(4);

    if (this.isLE)
        buf.writeUInt32LE(this.highSurrogate, 0);
    else
        buf.writeUInt32BE(this.highSurrogate, 0);

    this.highSurrogate = 0;

    return buf;
};

// -- Decoding

function Utf32Decoder(options, codec) {
    this.isLE = codec.isLE;
    this.badChar = codec.iconv.defaultCharUnicode.charCodeAt(0);
    this.overflow = [];
}

Utf32Decoder.prototype.write = function(src) {
    if (src.length === 0)
        return '';

    var i = 0;
    var codepoint = 0;
    var dst = Buffer.alloc(src.length + 4);
    var offset = 0;
    var isLE = this.isLE;
    var overflow = this.overflow;
    var badChar = this.badChar;

    if (overflow.length > 0) {
        for (; i < src.length && overflow.length < 4; i++)
            overflow.push(src[i]);
        
        if (overflow.length === 4) {
            // NOTE: codepoint is a signed int32 and can be negative.
            // NOTE: We copied this block from below to help V8 optimize it (it works with array, not buffer).
            if (isLE) {
                codepoint = overflow[i] | (overflow[i+1] << 8) | (overflow[i+2] << 16) | (overflow[i+3] << 24);
            } else {
                codepoint = overflow[i+3] | (overflow[i+2] << 8) | (overflow[i+1] << 16) | (overflow[i] << 24);
            }
            overflow.length = 0;

            offset = _writeCodepoint(dst, offset, codepoint, badChar);
        }
    }

    // Main loop. Should be as optimized as possible.
    for (; i < src.length - 3; i += 4) {
        // NOTE: codepoint is a signed int32 and can be negative.
        if (isLE) {
            codepoint = src[i] | (src[i+1] << 8) | (src[i+2] << 16) | (src[i+3] << 24);
        } else {
            codepoint = src[i+3] | (src[i+2] << 8) | (src[i+1] << 16) | (src[i] << 24);
        }
        offset = _writeCodepoint(dst, offset, codepoint, badChar);
    }

    // Keep overflowing bytes.
    for (; i < src.length; i++) {
        overflow.push(src[i]);
    }

    return dst.slice(0, offset).toString('ucs2');
};

function _writeCodepoint(dst, offset, codepoint, badChar) {
    // NOTE: codepoint is signed int32 and can be negative. We keep it that way to help V8 with optimizations.
    if (codepoint < 0 || codepoint > 0x10FFFF) {
        // Not a valid Unicode codepoint
        codepoint = badChar;
    } 

    // Ephemeral Planes: Write high surrogate.
    if (codepoint >= 0x10000) {
        codepoint -= 0x10000;

        var high = 0xD800 | (codepoint >> 10);
        dst[offset++] = high & 0xff;
        dst[offset++] = high >> 8;

        // Low surrogate is written below.
        var codepoint = 0xDC00 | (codepoint & 0x3FF);
    }

    // Write BMP char or low surrogate.
    dst[offset++] = codepoint & 0xff;
    dst[offset++] = codepoint >> 8;

    return offset;
};

Utf32Decoder.prototype.end = function() {
    this.overflow.length = 0;
};

// == UTF-32 Auto codec =============================================================
// Decoder chooses automatically from UTF-32LE and UTF-32BE using BOM and space-based heuristic.
// Defaults to UTF-32LE. http://en.wikipedia.org/wiki/UTF-32
// Encoder/decoder default can be changed: iconv.decode(buf, 'utf32', {defaultEncoding: 'utf-32be'});

// Encoder prepends BOM (which can be overridden with (addBOM: false}).

exports.utf32 = Utf32AutoCodec;
exports.ucs4 = 'utf32';

function Utf32AutoCodec(options, iconv) {
    this.iconv = iconv;
}

Utf32AutoCodec.prototype.encoder = Utf32AutoEncoder;
Utf32AutoCodec.prototype.decoder = Utf32AutoDecoder;

// -- Encoding

function Utf32AutoEncoder(options, codec) {
    options = options || {};

    if (options.addBOM === undefined)
        options.addBOM = true;

    this.encoder = codec.iconv.getEncoder(options.defaultEncoding || 'utf-32le', options);
}

Utf32AutoEncoder.prototype.write = function(str) {
    return this.encoder.write(str);
};

Utf32AutoEncoder.prototype.end = function() {
    return this.encoder.end();
};

// -- Decoding

function Utf32AutoDecoder(options, codec) {
    this.decoder = null;
    this.initialBufs = [];
    this.initialBufsLen = 0;
    this.options = options || {};
    this.iconv = codec.iconv;
}

Utf32AutoDecoder.prototype.write = function(buf) {
    if (!this.decoder) { 
        // Codec is not chosen yet. Accumulate initial bytes.
        this.initialBufs.push(buf);
        this.initialBufsLen += buf.length;

        if (this.initialBufsLen < 32) // We need more bytes to use space heuristic (see below)
            return '';

        // We have enough bytes -> detect endianness.
        var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);

        var resStr = '';
        for (var i = 0; i < this.initialBufs.length; i++)
            resStr += this.decoder.write(this.initialBufs[i]);

        this.initialBufs.length = this.initialBufsLen = 0;
        return resStr;
    }

    return this.decoder.write(buf);
};

Utf32AutoDecoder.prototype.end = function() {
    if (!this.decoder) {
        var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);

        var resStr = '';
        for (var i = 0; i < this.initialBufs.length; i++)
            resStr += this.decoder.write(this.initialBufs[i]);

        var trail = this.decoder.end();
        if (trail)
            resStr += trail;

        this.initialBufs.length = this.initialBufsLen = 0;
        return resStr;
    }

    return this.decoder.end();
};

function detectEncoding(bufs, defaultEncoding) {
    var b = [];
    var charsProcessed = 0;
    var invalidLE = 0, invalidBE = 0;   // Number of invalid chars when decoded as LE or BE.
    var bmpCharsLE = 0, bmpCharsBE = 0; // Number of BMP chars when decoded as LE or BE.

    outer_loop:
    for (var i = 0; i < bufs.length; i++) {
        var buf = bufs[i];
        for (var j = 0; j < buf.length; j++) {
            b.push(buf[j]);
            if (b.length === 4) {
                if (charsProcessed === 0) {
                    // Check BOM first.
                    if (b[0] === 0xFF && b[1] === 0xFE && b[2] === 0 && b[3] === 0) {
                        return 'utf-32le';
                    }
                    if (b[0] === 0 && b[1] === 0 && b[2] === 0xFE && b[3] === 0xFF) {
                        return 'utf-32be';
                    }
                }

                if (b[0] !== 0 || b[1] > 0x10) invalidBE++;
                if (b[3] !== 0 || b[2] > 0x10) invalidLE++;

                if (b[0] === 0 && b[1] === 0 && (b[2] !== 0 || b[3] !== 0)) bmpCharsBE++;
                if ((b[0] !== 0 || b[1] !== 0) && b[2] === 0 && b[3] === 0) bmpCharsLE++;

                b.length = 0;
                charsProcessed++;

                if (charsProcessed >= 100) {
                    break outer_loop;
                }
            }
        }
    }

    // Make decisions.
    if (bmpCharsBE - invalidBE > bmpCharsLE - invalidLE)  return 'utf-32be';
    if (bmpCharsBE - invalidBE < bmpCharsLE - invalidLE)  return 'utf-32le';

    // Couldn't decide (likely all zeros or not enough data).
    return defaultEncoding || 'utf-32le';
}

},{"safer-buffer":94}],88:[function(require,module,exports){
"use strict";
var Buffer = require("safer-buffer").Buffer;

// UTF-7 codec, according to https://tools.ietf.org/html/rfc2152
// See also below a UTF-7-IMAP codec, according to http://tools.ietf.org/html/rfc3501#section-5.1.3

exports.utf7 = Utf7Codec;
exports.unicode11utf7 = 'utf7'; // Alias UNICODE-1-1-UTF-7
function Utf7Codec(codecOptions, iconv) {
    this.iconv = iconv;
};

Utf7Codec.prototype.encoder = Utf7Encoder;
Utf7Codec.prototype.decoder = Utf7Decoder;
Utf7Codec.prototype.bomAware = true;


// -- Encoding

var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;

function Utf7Encoder(options, codec) {
    this.iconv = codec.iconv;
}

Utf7Encoder.prototype.write = function(str) {
    // Naive implementation.
    // Non-direct chars are encoded as "+<base64>-"; single "+" char is encoded as "+-".
    return Buffer.from(str.replace(nonDirectChars, function(chunk) {
        return "+" + (chunk === '+' ? '' : 
            this.iconv.encode(chunk, 'utf16-be').toString('base64').replace(/=+$/, '')) 
            + "-";
    }.bind(this)));
}

Utf7Encoder.prototype.end = function() {
}


// -- Decoding

function Utf7Decoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = '';
}

var base64Regex = /[A-Za-z0-9\/+]/;
var base64Chars = [];
for (var i = 0; i < 256; i++)
    base64Chars[i] = base64Regex.test(String.fromCharCode(i));

var plusChar = '+'.charCodeAt(0), 
    minusChar = '-'.charCodeAt(0),
    andChar = '&'.charCodeAt(0);

Utf7Decoder.prototype.write = function(buf) {
    var res = "", lastI = 0,
        inBase64 = this.inBase64,
        base64Accum = this.base64Accum;

    // The decoder is more involved as we must handle chunks in stream.

    for (var i = 0; i < buf.length; i++) {
        if (!inBase64) { // We're in direct mode.
            // Write direct chars until '+'
            if (buf[i] == plusChar) {
                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
                lastI = i+1;
                inBase64 = true;
            }
        } else { // We decode base64.
            if (!base64Chars[buf[i]]) { // Base64 ended.
                if (i == lastI && buf[i] == minusChar) {// "+-" -> "+"
                    res += "+";
                } else {
                    var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i), "ascii");
                    res += this.iconv.decode(Buffer.from(b64str, 'base64'), "utf16-be");
                }

                if (buf[i] != minusChar) // Minus is absorbed after base64.
                    i--;

                lastI = i+1;
                inBase64 = false;
                base64Accum = '';
            }
        }
    }

    if (!inBase64) {
        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
    } else {
        var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii");

        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
        b64str = b64str.slice(0, canBeDecoded);

        res += this.iconv.decode(Buffer.from(b64str, 'base64'), "utf16-be");
    }

    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;

    return res;
}

Utf7Decoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
        res = this.iconv.decode(Buffer.from(this.base64Accum, 'base64'), "utf16-be");

    this.inBase64 = false;
    this.base64Accum = '';
    return res;
}


// UTF-7-IMAP codec.
// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
// Differences:
//  * Base64 part is started by "&" instead of "+"
//  * Direct characters are 0x20-0x7E, except "&" (0x26)
//  * In Base64, "," is used instead of "/"
//  * Base64 must not be used to represent direct characters.
//  * No implicit shift back from Base64 (should always end with '-')
//  * String must end in non-shifted position.
//  * "-&" while in base64 is not allowed.


exports.utf7imap = Utf7IMAPCodec;
function Utf7IMAPCodec(codecOptions, iconv) {
    this.iconv = iconv;
};

Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
Utf7IMAPCodec.prototype.bomAware = true;


// -- Encoding

function Utf7IMAPEncoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = Buffer.alloc(6);
    this.base64AccumIdx = 0;
}

Utf7IMAPEncoder.prototype.write = function(str) {
    var inBase64 = this.inBase64,
        base64Accum = this.base64Accum,
        base64AccumIdx = this.base64AccumIdx,
        buf = Buffer.alloc(str.length*5 + 10), bufIdx = 0;

    for (var i = 0; i < str.length; i++) {
        var uChar = str.charCodeAt(i);
        if (0x20 <= uChar && uChar <= 0x7E) { // Direct character or '&'.
            if (inBase64) {
                if (base64AccumIdx > 0) {
                    bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
                    base64AccumIdx = 0;
                }

                buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
                inBase64 = false;
            }

            if (!inBase64) {
                buf[bufIdx++] = uChar; // Write direct character

                if (uChar === andChar)  // Ampersand -> '&-'
                    buf[bufIdx++] = minusChar;
            }

        } else { // Non-direct character
            if (!inBase64) {
                buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.
                inBase64 = true;
            }
            if (inBase64) {
                base64Accum[base64AccumIdx++] = uChar >> 8;
                base64Accum[base64AccumIdx++] = uChar & 0xFF;

                if (base64AccumIdx == base64Accum.length) {
                    bufIdx += buf.write(base64Accum.toString('base64').replace(/\//g, ','), bufIdx);
                    base64AccumIdx = 0;
                }
            }
        }
    }

    this.inBase64 = inBase64;
    this.base64AccumIdx = base64AccumIdx;

    return buf.slice(0, bufIdx);
}

Utf7IMAPEncoder.prototype.end = function() {
    var buf = Buffer.alloc(10), bufIdx = 0;
    if (this.inBase64) {
        if (this.base64AccumIdx > 0) {
            bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
            this.base64AccumIdx = 0;
        }

        buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
        this.inBase64 = false;
    }

    return buf.slice(0, bufIdx);
}


// -- Decoding

function Utf7IMAPDecoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = '';
}

var base64IMAPChars = base64Chars.slice();
base64IMAPChars[','.charCodeAt(0)] = true;

Utf7IMAPDecoder.prototype.write = function(buf) {
    var res = "", lastI = 0,
        inBase64 = this.inBase64,
        base64Accum = this.base64Accum;

    // The decoder is more involved as we must handle chunks in stream.
    // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).

    for (var i = 0; i < buf.length; i++) {
        if (!inBase64) { // We're in direct mode.
            // Write direct chars until '&'
            if (buf[i] == andChar) {
                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
                lastI = i+1;
                inBase64 = true;
            }
        } else { // We decode base64.
            if (!base64IMAPChars[buf[i]]) { // Base64 ended.
                if (i == lastI && buf[i] == minusChar) { // "&-" -> "&"
                    res += "&";
                } else {
                    var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i), "ascii").replace(/,/g, '/');
                    res += this.iconv.decode(Buffer.from(b64str, 'base64'), "utf16-be");
                }

                if (buf[i] != minusChar) // Minus may be absorbed after base64.
                    i--;

                lastI = i+1;
                inBase64 = false;
                base64Accum = '';
            }
        }
    }

    if (!inBase64) {
        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
    } else {
        var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii").replace(/,/g, '/');

        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
        b64str = b64str.slice(0, canBeDecoded);

        res += this.iconv.decode(Buffer.from(b64str, 'base64'), "utf16-be");
    }

    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;

    return res;
}

Utf7IMAPDecoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
        res = this.iconv.decode(Buffer.from(this.base64Accum, 'base64'), "utf16-be");

    this.inBase64 = false;
    this.base64Accum = '';
    return res;
}



},{"safer-buffer":94}],89:[function(require,module,exports){
"use strict";

var BOMChar = '\uFEFF';

exports.PrependBOM = PrependBOMWrapper
function PrependBOMWrapper(encoder, options) {
    this.encoder = encoder;
    this.addBOM = true;
}

PrependBOMWrapper.prototype.write = function(str) {
    if (this.addBOM) {
        str = BOMChar + str;
        this.addBOM = false;
    }

    return this.encoder.write(str);
}

PrependBOMWrapper.prototype.end = function() {
    return this.encoder.end();
}


//------------------------------------------------------------------------------

exports.StripBOM = StripBOMWrapper;
function StripBOMWrapper(decoder, options) {
    this.decoder = decoder;
    this.pass = false;
    this.options = options || {};
}

StripBOMWrapper.prototype.write = function(buf) {
    var res = this.decoder.write(buf);
    if (this.pass || !res)
        return res;

    if (res[0] === BOMChar) {
        res = res.slice(1);
        if (typeof this.options.stripBOM === 'function')
            this.options.stripBOM();
    }

    this.pass = true;
    return res;
}

StripBOMWrapper.prototype.end = function() {
    return this.decoder.end();
}


},{}],90:[function(require,module,exports){
"use strict";

var Buffer = require("safer-buffer").Buffer;

var bomHandling = require("./bom-handling"),
    iconv = module.exports;

// All codecs and aliases are kept here, keyed by encoding name/alias.
// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.
iconv.encodings = null;

// Characters emitted in case of error.
iconv.defaultCharUnicode = '�';
iconv.defaultCharSingleByte = '?';

// Public API.
iconv.encode = function encode(str, encoding, options) {
    str = "" + (str || ""); // Ensure string.

    var encoder = iconv.getEncoder(encoding, options);

    var res = encoder.write(str);
    var trail = encoder.end();
    
    return (trail && trail.length > 0) ? Buffer.concat([res, trail]) : res;
}

iconv.decode = function decode(buf, encoding, options) {
    if (typeof buf === 'string') {
        if (!iconv.skipDecodeWarning) {
            console.error('Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding');
            iconv.skipDecodeWarning = true;
        }

        buf = Buffer.from("" + (buf || ""), "binary"); // Ensure buffer.
    }

    var decoder = iconv.getDecoder(encoding, options);

    var res = decoder.write(buf);
    var trail = decoder.end();

    return trail ? (res + trail) : res;
}

iconv.encodingExists = function encodingExists(enc) {
    try {
        iconv.getCodec(enc);
        return true;
    } catch (e) {
        return false;
    }
}

// Legacy aliases to convert functions
iconv.toEncoding = iconv.encode;
iconv.fromEncoding = iconv.decode;

// Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.
iconv._codecDataCache = {};
iconv.getCodec = function getCodec(encoding) {
    if (!iconv.encodings)
        iconv.encodings = require("../encodings"); // Lazy load all encoding definitions.
    
    // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
    var enc = iconv._canonicalizeEncoding(encoding);

    // Traverse iconv.encodings to find actual codec.
    var codecOptions = {};
    while (true) {
        var codec = iconv._codecDataCache[enc];
        if (codec)
            return codec;

        var codecDef = iconv.encodings[enc];

        switch (typeof codecDef) {
            case "string": // Direct alias to other encoding.
                enc = codecDef;
                break;

            case "object": // Alias with options. Can be layered.
                for (var key in codecDef)
                    codecOptions[key] = codecDef[key];

                if (!codecOptions.encodingName)
                    codecOptions.encodingName = enc;
                
                enc = codecDef.type;
                break;

            case "function": // Codec itself.
                if (!codecOptions.encodingName)
                    codecOptions.encodingName = enc;

                // The codec function must load all tables and return object with .encoder and .decoder methods.
                // It'll be called only once (for each different options object).
                codec = new codecDef(codecOptions, iconv);

                iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.
                return codec;

            default:
                throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '"+enc+"')");
        }
    }
}

iconv._canonicalizeEncoding = function(encoding) {
    // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
    return (''+encoding).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
}

iconv.getEncoder = function getEncoder(encoding, options) {
    var codec = iconv.getCodec(encoding),
        encoder = new codec.encoder(options, codec);

    if (codec.bomAware && options && options.addBOM)
        encoder = new bomHandling.PrependBOM(encoder, options);

    return encoder;
}

iconv.getDecoder = function getDecoder(encoding, options) {
    var codec = iconv.getCodec(encoding),
        decoder = new codec.decoder(options, codec);

    if (codec.bomAware && !(options && options.stripBOM === false))
        decoder = new bomHandling.StripBOM(decoder, options);

    return decoder;
}

// Streaming API
// NOTE: Streaming API naturally depends on 'stream' module from Node.js. Unfortunately in browser environments this module can add
// up to 100Kb to the output bundle. To avoid unnecessary code bloat, we don't enable Streaming API in browser by default.
// If you would like to enable it explicitly, please add the following code to your app:
// > iconv.enableStreamingAPI(require('stream'));
iconv.enableStreamingAPI = function enableStreamingAPI(stream_module) {
    if (iconv.supportsStreams)
        return;

    // Dependency-inject stream module to create IconvLite stream classes.
    var streams = require("./streams")(stream_module);

    // Not public API yet, but expose the stream classes.
    iconv.IconvLiteEncoderStream = streams.IconvLiteEncoderStream;
    iconv.IconvLiteDecoderStream = streams.IconvLiteDecoderStream;

    // Streaming API.
    iconv.encodeStream = function encodeStream(encoding, options) {
        return new iconv.IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
    }

    iconv.decodeStream = function decodeStream(encoding, options) {
        return new iconv.IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
    }

    iconv.supportsStreams = true;
}

// Enable Streaming API automatically if 'stream' module is available and non-empty (the majority of environments).
var stream_module;
try {
    stream_module = require("stream");
} catch (e) {}

if (stream_module && stream_module.Transform) {
    iconv.enableStreamingAPI(stream_module);

} else {
    // In rare cases where 'stream' module is not available by default, throw a helpful exception.
    iconv.encodeStream = iconv.decodeStream = function() {
        throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
    };
}

if ("Ā" != "\u0100") {
    console.error("iconv-lite warning: js files use non-utf8 encoding. See https://github.com/ashtuchkin/iconv-lite/wiki/Javascript-source-file-encodings for more info.");
}

},{"../encodings":73,"./bom-handling":89,"./streams":91,"safer-buffer":94,"stream":8}],91:[function(require,module,exports){
"use strict";

var Buffer = require("safer-buffer").Buffer;

// NOTE: Due to 'stream' module being pretty large (~100Kb, significant in browser environments), 
// we opt to dependency-inject it instead of creating a hard dependency.
module.exports = function(stream_module) {
    var Transform = stream_module.Transform;

    // == Encoder stream =======================================================

    function IconvLiteEncoderStream(conv, options) {
        this.conv = conv;
        options = options || {};
        options.decodeStrings = false; // We accept only strings, so we don't need to decode them.
        Transform.call(this, options);
    }

    IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
        constructor: { value: IconvLiteEncoderStream }
    });

    IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
        if (typeof chunk != 'string')
            return done(new Error("Iconv encoding stream needs strings as its input."));
        try {
            var res = this.conv.write(chunk);
            if (res && res.length) this.push(res);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteEncoderStream.prototype._flush = function(done) {
        try {
            var res = this.conv.end();
            if (res && res.length) this.push(res);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteEncoderStream.prototype.collect = function(cb) {
        var chunks = [];
        this.on('error', cb);
        this.on('data', function(chunk) { chunks.push(chunk); });
        this.on('end', function() {
            cb(null, Buffer.concat(chunks));
        });
        return this;
    }


    // == Decoder stream =======================================================

    function IconvLiteDecoderStream(conv, options) {
        this.conv = conv;
        options = options || {};
        options.encoding = this.encoding = 'utf8'; // We output strings.
        Transform.call(this, options);
    }

    IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
        constructor: { value: IconvLiteDecoderStream }
    });

    IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
        if (!Buffer.isBuffer(chunk) && !(chunk instanceof Uint8Array))
            return done(new Error("Iconv decoding stream needs buffers as its input."));
        try {
            var res = this.conv.write(chunk);
            if (res && res.length) this.push(res, this.encoding);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteDecoderStream.prototype._flush = function(done) {
        try {
            var res = this.conv.end();
            if (res && res.length) this.push(res, this.encoding);                
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteDecoderStream.prototype.collect = function(cb) {
        var res = '';
        this.on('error', cb);
        this.on('data', function(chunk) { res += chunk; });
        this.on('end', function() {
            cb(null, res);
        });
        return this;
    }

    return {
        IconvLiteEncoderStream: IconvLiteEncoderStream,
        IconvLiteDecoderStream: IconvLiteDecoderStream,
    };
};

},{"safer-buffer":94}],92:[function(require,module,exports){
(function (Buffer){(function (){
// -*- mode: js; js-indent-level: 2; -*-
'use strict';
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KaitaiStream = factory();
  }
}(this, function () {

/**
  KaitaiStream is an implementation of Kaitai Struct API for JavaScript.
  Based on DataStream - https://github.com/kig/DataStream.js

  @param {ArrayBuffer} arrayBuffer ArrayBuffer to read from.
  @param {?Number} byteOffset Offset from arrayBuffer beginning for the KaitaiStream.
  */
var KaitaiStream = function(arrayBuffer, byteOffset) {
  this._byteOffset = byteOffset || 0;
  if (arrayBuffer instanceof ArrayBuffer) {
    this.buffer = arrayBuffer;
  } else if (typeof arrayBuffer == "object") {
    this.dataView = arrayBuffer;
    if (byteOffset) {
      this._byteOffset += byteOffset;
    }
  } else {
    this.buffer = new ArrayBuffer(arrayBuffer || 1);
  }
  this.pos = 0;
  this.alignToByte();
};


KaitaiStream.prototype = {};

/**
  Dependency configuration data. Holds urls for (optional) dynamic loading
  of code dependencies from a remote server. For use by (static) processing functions.

  Caller should the supported keys to the asset urls as needed.
  NOTE: `depUrls` is a static property of KaitaiStream (the factory),like the various
        processing functions. It is NOT part of the prototype of instances.
  @type {Object}
  */
KaitaiStream.depUrls = {
  // processZlib uses this and expected a link to a copy of pako.
  // specifically the pako_inflate.min.js script at:
  // https://raw.githubusercontent.com/nodeca/pako/master/dist/pako_inflate.min.js
  zlib: undefined
};

/**
  Virtual byte length of the KaitaiStream backing buffer.
  Updated to be max of original buffer size and last written size.
  If dynamicSize is false is set to buffer size.
  @type {number}
  */
KaitaiStream.prototype._byteLength = 0;

/**
  Set/get the backing ArrayBuffer of the KaitaiStream object.
  The setter updates the DataView to point to the new buffer.
  @type {Object}
  */
Object.defineProperty(KaitaiStream.prototype, 'buffer',
  { get: function() {
      this._trimAlloc();
      return this._buffer;
    },
    set: function(v) {
      this._buffer = v;
      this._dataView = new DataView(this._buffer, this._byteOffset);
      this._byteLength = this._buffer.byteLength;
    } });

/**
  Set/get the byteOffset of the KaitaiStream object.
  The setter updates the DataView to point to the new byteOffset.
  @type {number}
  */
Object.defineProperty(KaitaiStream.prototype, 'byteOffset',
  { get: function() {
      return this._byteOffset;
    },
    set: function(v) {
      this._byteOffset = v;
      this._dataView = new DataView(this._buffer, this._byteOffset);
      this._byteLength = this._buffer.byteLength;
    } });

/**
  Set/get the backing DataView of the KaitaiStream object.
  The setter updates the buffer and byteOffset to point to the DataView values.
  @type {Object}
  */
Object.defineProperty(KaitaiStream.prototype, 'dataView',
  { get: function() {
      return this._dataView;
    },
    set: function(v) {
      this._byteOffset = v.byteOffset;
      this._buffer = v.buffer;
      this._dataView = new DataView(this._buffer, this._byteOffset);
      this._byteLength = this._byteOffset + v.byteLength;
    } });

/**
  Internal function to trim the KaitaiStream buffer when required.
  Used for stripping out the extra bytes from the backing buffer when
  the virtual byteLength is smaller than the buffer byteLength (happens after
  growing the buffer with writes and not filling the extra space completely).

  @return {null}
  */
KaitaiStream.prototype._trimAlloc = function() {
  if (this._byteLength === this._buffer.byteLength) {
    return;
  }
  var buf = new ArrayBuffer(this._byteLength);
  var dst = new Uint8Array(buf);
  var src = new Uint8Array(this._buffer, 0, dst.length);
  dst.set(src);
  this.buffer = buf;
};

// ========================================================================
// Stream positioning
// ========================================================================

/**
  Returns true if the KaitaiStream seek pointer is at the end of buffer and
  there's no more data to read.

  @return {boolean} True if the seek pointer is at the end of the buffer.
  */
KaitaiStream.prototype.isEof = function() {
  return this.pos >= this.size && this.bitsLeft === 0;
};

/**
  Sets the KaitaiStream read/write position to given position.
  Clamps between 0 and KaitaiStream length.

  @param {number} pos Position to seek to.
  @return {null}
  */
KaitaiStream.prototype.seek = function(pos) {
  var npos = Math.max(0, Math.min(this.size, pos));
  this.pos = (isNaN(npos) || !isFinite(npos)) ? 0 : npos;
};

/**
  Returns the byte length of the KaitaiStream object.
  @type {number}
  */
Object.defineProperty(KaitaiStream.prototype, 'size',
  { get: function() {
    return this._byteLength - this._byteOffset;
  }});

// ========================================================================
// Integer numbers
// ========================================================================

// ------------------------------------------------------------------------
// Signed
// ------------------------------------------------------------------------

/**
  Reads an 8-bit signed int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS1 = function() {
  this.ensureBytesLeft(1);
  var v = this._dataView.getInt8(this.pos);
  this.pos += 1;
  return v;
};

// ........................................................................
// Big-endian
// ........................................................................

/**
  Reads a 16-bit big-endian signed int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS2be = function() {
  this.ensureBytesLeft(2);
  var v = this._dataView.getInt16(this.pos);
  this.pos += 2;
  return v;
};

/**
  Reads a 32-bit big-endian signed int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS4be = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getInt32(this.pos);
  this.pos += 4;
  return v;
};

/**
  Reads a 64-bit big-endian unsigned int from the stream. Note that
  JavaScript does not support 64-bit integers natively, so it will
  automatically upgrade internal representation to use IEEE 754
  double precision float.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS8be = function() {
  this.ensureBytesLeft(8);
  var v1 = this.readU4be();
  var v2 = this.readU4be();

  if ((v1 & 0x80000000) !== 0) {
    // negative number
    return -(0x100000000 * (v1 ^ 0xffffffff) + (v2 ^ 0xffffffff)) - 1;
  } else {
    return 0x100000000 * v1 + v2;
  }
};

// ........................................................................
// Little-endian
// ........................................................................

/**
  Reads a 16-bit little-endian signed int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS2le = function() {
  this.ensureBytesLeft(2);
  var v = this._dataView.getInt16(this.pos, true);
  this.pos += 2;
  return v;
};

/**
  Reads a 32-bit little-endian signed int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS4le = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getInt32(this.pos, true);
  this.pos += 4;
  return v;
};

/**
  Reads a 64-bit little-endian unsigned int from the stream. Note that
  JavaScript does not support 64-bit integers natively, so it will
  automatically upgrade internal representation to use IEEE 754
  double precision float.
  @return {number} The read number.
 */
KaitaiStream.prototype.readS8le = function() {
  this.ensureBytesLeft(8);
  var v1 = this.readU4le();
  var v2 = this.readU4le();

  if ((v2 & 0x80000000) !== 0) {
    // negative number
    return -(0x100000000 * (v2 ^ 0xffffffff) + (v1 ^ 0xffffffff)) - 1;
  } else {
    return 0x100000000 * v2 + v1;
  }
};

// ------------------------------------------------------------------------
// Unsigned
// ------------------------------------------------------------------------

/**
  Reads an 8-bit unsigned int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU1 = function() {
  this.ensureBytesLeft(1);
  var v = this._dataView.getUint8(this.pos);
  this.pos += 1;
  return v;
};

// ........................................................................
// Big-endian
// ........................................................................

/**
  Reads a 16-bit big-endian unsigned int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU2be = function() {
  this.ensureBytesLeft(2);
  var v = this._dataView.getUint16(this.pos);
  this.pos += 2;
  return v;
};

/**
  Reads a 32-bit big-endian unsigned int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU4be = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getUint32(this.pos);
  this.pos += 4;
  return v;
};

/**
  Reads a 64-bit big-endian unsigned int from the stream. Note that
  JavaScript does not support 64-bit integers natively, so it will
  automatically upgrade internal representation to use IEEE 754
  double precision float.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU8be = function() {
  this.ensureBytesLeft(8);
  var v1 = this.readU4be();
  var v2 = this.readU4be();
  return 0x100000000 * v1 + v2;
};

// ........................................................................
// Little-endian
// ........................................................................

/**
  Reads a 16-bit little-endian unsigned int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU2le = function() {
  this.ensureBytesLeft(2);
  var v = this._dataView.getUint16(this.pos, true);
  this.pos += 2;
  return v;
};

/**
  Reads a 32-bit little-endian unsigned int from the stream.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU4le = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getUint32(this.pos, true);
  this.pos += 4;
  return v;
};

/**
  Reads a 64-bit little-endian unsigned int from the stream. Note that
  JavaScript does not support 64-bit integers natively, so it will
  automatically upgrade internal representation to use IEEE 754
  double precision float.
  @return {number} The read number.
 */
KaitaiStream.prototype.readU8le = function() {
  this.ensureBytesLeft(8);
  var v1 = this.readU4le();
  var v2 = this.readU4le();
  return 0x100000000 * v2 + v1;
};

// ========================================================================
// Floating point numbers
// ========================================================================

// ------------------------------------------------------------------------
// Big endian
// ------------------------------------------------------------------------

KaitaiStream.prototype.readF4be = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getFloat32(this.pos);
  this.pos += 4;
  return v;
};

KaitaiStream.prototype.readF8be = function() {
  this.ensureBytesLeft(8);
  var v = this._dataView.getFloat64(this.pos);
  this.pos += 8;
  return v;
};

// ------------------------------------------------------------------------
// Little endian
// ------------------------------------------------------------------------

KaitaiStream.prototype.readF4le = function() {
  this.ensureBytesLeft(4);
  var v = this._dataView.getFloat32(this.pos, true);
  this.pos += 4;
  return v;
};

KaitaiStream.prototype.readF8le = function() {
  this.ensureBytesLeft(8);
  var v = this._dataView.getFloat64(this.pos, true);
  this.pos += 8;
  return v;
};

// ------------------------------------------------------------------------
// Unaligned bit values
// ------------------------------------------------------------------------

KaitaiStream.prototype.alignToByte = function() {
  this.bits = 0;
  this.bitsLeft = 0;
};

KaitaiStream.prototype.readBitsIntBe = function(n) {
  // JS only supports bit operations on 32 bits
  if (n > 32) {
    throw new Error(`readBitsIntBe: the maximum supported bit length is 32 (tried to read ${n} bits)`);
  }
  var bitsNeeded = n - this.bitsLeft;
  if (bitsNeeded > 0) {
    // 1 bit  => 1 byte
    // 8 bits => 1 byte
    // 9 bits => 2 bytes
    var bytesNeeded = Math.ceil(bitsNeeded / 8);
    var buf = this.readBytes(bytesNeeded);
    for (var i = 0; i < bytesNeeded; i++) {
      this.bits <<= 8;
      this.bits |= buf[i];
      this.bitsLeft += 8;
    }
  }

  // raw mask with required number of 1s, starting from lowest bit
  var mask = n === 32 ? 0xffffffff : (1 << n) - 1;
  // shift this.bits to align the highest bits with the mask & derive reading result
  var shiftBits = this.bitsLeft - n;
  var res = (this.bits >>> shiftBits) & mask;
  // clear top bits that we've just read => AND with 1s
  this.bitsLeft -= n;
  mask = (1 << this.bitsLeft) - 1;
  this.bits &= mask;

  return res;
};

/**
 * Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions
 *
 * @deprecated use {@link readBitsIntBe} instead
 */
KaitaiStream.prototype.readBitsInt = KaitaiStream.prototype.readBitsIntBe;

KaitaiStream.prototype.readBitsIntLe = function(n) {
  // JS only supports bit operations on 32 bits
  if (n > 32) {
    throw new Error(`readBitsIntLe: the maximum supported bit length is 32 (tried to read ${n} bits)`);
  }
  var bitsNeeded = n - this.bitsLeft;
  if (bitsNeeded > 0) {
      // 1 bit  => 1 byte
      // 8 bits => 1 byte
      // 9 bits => 2 bytes
      var bytesNeeded = Math.ceil(bitsNeeded / 8);
      var buf = this.readBytes(bytesNeeded);
      for (var i = 0; i < bytesNeeded; i++) {
          this.bits |= (buf[i] << this.bitsLeft);
          this.bitsLeft += 8;
      }
  }

  // raw mask with required number of 1s, starting from lowest bit
  var mask = n === 32 ? 0xffffffff : (1 << n) - 1;
  // derive reading result
  var res = this.bits & mask;
  // remove bottom bits that we've just read by shifting
  this.bits >>= n;
  this.bitsLeft -= n;

  return res;
};

/**
  Native endianness. Either KaitaiStream.BIG_ENDIAN or KaitaiStream.LITTLE_ENDIAN
  depending on the platform endianness.

  @type {boolean}
 */
KaitaiStream.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0;

// ========================================================================
// Byte arrays
// ========================================================================

KaitaiStream.prototype.readBytes = function(len) {
  return this.mapUint8Array(len);
};

KaitaiStream.prototype.readBytesFull = function() {
  return this.mapUint8Array(this.size - this.pos);
};

KaitaiStream.prototype.readBytesTerm = function(terminator, include, consume, eosError) {
  var blen = this.size - this.pos;
  var u8 = new Uint8Array(this._buffer, this._byteOffset + this.pos);
  for (var i = 0; i < blen && u8[i] !== terminator; i++); // find first zero byte
  if (i === blen) {
    // we've read all the buffer and haven't found the terminator
    if (eosError) {
      throw "End of stream reached, but no terminator " + terminator + " found";
    } else {
      return this.mapUint8Array(i);
    }
  } else {
    var arr;
    if (include) {
      arr = this.mapUint8Array(i + 1);
    } else {
      arr = this.mapUint8Array(i);
    }
    if (consume) {
      this.pos += 1;
    }
    return arr;
  }
};

// Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions
KaitaiStream.prototype.ensureFixedContents = function(expected) {
  var actual = this.readBytes(expected.length);
  if (actual.length !== expected.length) {
    throw new UnexpectedDataError(expected, actual);
  }
  var actLen = actual.length;
  for (var i = 0; i < actLen; i++) {
    if (actual[i] !== expected[i]) {
      throw new UnexpectedDataError(expected, actual);
    }
  }
  return actual;
};

KaitaiStream.bytesStripRight = function(data, padByte) {
  var newLen = data.length;
  while (data[newLen - 1] === padByte)
    newLen--;
  return data.slice(0, newLen);
};

KaitaiStream.bytesTerminate = function(data, term, include) {
  var newLen = 0;
  var maxLen = data.length;
  while (newLen < maxLen && data[newLen] !== term)
    newLen++;
  if (include && newLen < maxLen)
    newLen++;
  return data.slice(0, newLen);
};

KaitaiStream.bytesToStr = function(arr, encoding) {
  if (encoding == null || encoding.toLowerCase() === "ascii") {
    return KaitaiStream.createStringFromArray(arr);
  } else {
    if (typeof TextDecoder === 'function') {
      // we're in the browser that supports TextDecoder
      return (new TextDecoder(encoding)).decode(arr);
    } else {
      // probably we're in node.js

      // check if it's supported natively by node.js Buffer
      // see https://github.com/nodejs/node/blob/master/lib/buffer.js#L187 for details
      switch (encoding.toLowerCase()) {
        case 'utf8':
        case 'utf-8':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return new Buffer(arr).toString(encoding);
          break;
        default:
          // unsupported encoding, we'll have to resort to iconv-lite
          if (typeof KaitaiStream.iconvlite === 'undefined')
            KaitaiStream.iconvlite = require('iconv-lite');

          return KaitaiStream.iconvlite.decode(arr, encoding);
      }
    }
  }
};

// ========================================================================
// Byte array processing
// ========================================================================

KaitaiStream.processXorOne = function(data, key) {
  var r = new Uint8Array(data.length);
  var dl = data.length;
  for (var i = 0; i < dl; i++)
    r[i] = data[i] ^ key;
  return r;
};

KaitaiStream.processXorMany = function(data, key) {
  var dl = data.length;
  var r = new Uint8Array(dl);
  var kl = key.length;
  var ki = 0;
  for (var i = 0; i < dl; i++) {
    r[i] = data[i] ^ key[ki];
    ki++;
    if (ki >= kl)
      ki = 0;
  }
  return r;
};

KaitaiStream.processRotateLeft = function(data, amount, groupSize) {
  if (groupSize !== 1)
    throw("unable to rotate group of " + groupSize + " bytes yet");

  var mask = groupSize * 8 - 1;
  var antiAmount = -amount & mask;

  var r = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++)
    r[i] = (data[i] << amount) & 0xff | (data[i] >> antiAmount);

  return r;
};

KaitaiStream.processZlib = function(buf) {
  if (typeof require !== 'undefined')  {
    // require is available - we're running under node
    if (typeof KaitaiStream.zlib === 'undefined')
      KaitaiStream.zlib = require('zlib');
    // use node's zlib module API
    var r = KaitaiStream.zlib.inflateSync(
      Buffer.from(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
    );
    return r;
  } else {
    // no require() - assume we're running as a web worker in browser.
    // user should have configured KaitaiStream.depUrls.zlib, if not
    // we'll throw.
    if (typeof KaitaiStream.zlib === 'undefined'
      && typeof KaitaiStream.depUrls.zlib !== 'undefined') {
      importScripts(KaitaiStream.depUrls.zlib);
      KaitaiStream.zlib = pako;
    }
    // use pako API
    r = KaitaiStream.zlib.inflate(buf);
    return r;
  }
};

// ========================================================================
// Misc runtime operations
// ========================================================================

KaitaiStream.mod = function(a, b) {
  if (b <= 0)
    throw "mod divisor <= 0";
  var r = a % b;
  if (r < 0)
    r += b;
  return r;
};

KaitaiStream.arrayMin = function(arr) {
  var min = arr[0];
  var x;
  for (var i = 1, n = arr.length; i < n; ++i) {
    x = arr[i];
    if (x < min) min = x;
  }
  return min;
};

KaitaiStream.arrayMax = function(arr) {
  var max = arr[0];
  var x;
  for (var i = 1, n = arr.length; i < n; ++i) {
    x = arr[i];
    if (x > max) max = x;
  }
  return max;
};

KaitaiStream.byteArrayCompare = function(a, b) {
  if (a === b)
    return 0;
  var al = a.length;
  var bl = b.length;
  var minLen = al < bl ? al : bl;
  for (var i = 0; i < minLen; i++) {
    var cmp = a[i] - b[i];
    if (cmp !== 0)
      return cmp;
  }

  // Reached the end of at least one of the arrays
  if (al === bl) {
    return 0;
  } else {
    return al - bl;
  }
};

// ========================================================================
// Internal implementation details
// ========================================================================

var EOFError = KaitaiStream.EOFError = function(bytesReq, bytesAvail) {
  this.name = "EOFError";
  this.message = "requested " + bytesReq + " bytes, but only " + bytesAvail + " bytes available";
  this.bytesReq = bytesReq;
  this.bytesAvail = bytesAvail;
  this.stack = (new Error()).stack;
};

EOFError.prototype = Object.create(Error.prototype);
EOFError.prototype.constructor = EOFError;

// Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions
var UnexpectedDataError = KaitaiStream.UnexpectedDataError = function(expected, actual) {
  this.name = "UnexpectedDataError";
  this.message = "expected [" + expected + "], but got [" + actual + "]";
  this.expected = expected;
  this.actual = actual;
  this.stack = (new Error()).stack;
};

UnexpectedDataError.prototype = Object.create(Error.prototype);
UnexpectedDataError.prototype.constructor = UnexpectedDataError;

var UndecidedEndiannessError = KaitaiStream.UndecidedEndiannessError = function() {
  this.name = "UndecidedEndiannessError";
  this.stack = (new Error()).stack;
};

UndecidedEndiannessError.prototype = Object.create(Error.prototype);
UndecidedEndiannessError.prototype.constructor = UndecidedEndiannessError;

var ValidationNotEqualError = KaitaiStream.ValidationNotEqualError = function(expected, actual) {
  this.name = "ValidationNotEqualError";
  this.message = "not equal, expected [" + expected + "], but got [" + actual + "]";
  this.expected = expected;
  this.actual = actual;
  this.stack = (new Error()).stack;
};

ValidationNotEqualError.prototype = Object.create(Error.prototype);
ValidationNotEqualError.prototype.constructor = ValidationNotEqualError;

var ValidationLessThanError = KaitaiStream.ValidationLessThanError = function(min, actual) {
  this.name = "ValidationLessThanError";
  this.message = "not in range, min [" + min + "], but got [" + actual + "]";
  this.min = min;
  this.actual = actual;
  this.stack = (new Error()).stack;
};

ValidationLessThanError.prototype = Object.create(Error.prototype);
ValidationLessThanError.prototype.constructor = ValidationLessThanError;

var ValidationGreaterThanError = KaitaiStream.ValidationGreaterThanError = function(max, actual) {
  this.name = "ValidationGreaterThanError";
  this.message = "not in range, max [" + max + "], but got [" + actual + "]";
  this.max = max;
  this.actual = actual;
  this.stack = (new Error()).stack;
};

ValidationGreaterThanError.prototype = Object.create(Error.prototype);
ValidationGreaterThanError.prototype.constructor = ValidationGreaterThanError;

var ValidationNotAnyOfError = KaitaiStream.ValidationNotAnyOfError = function(actual, io, srcPath) {
  this.name = "ValidationNotAnyOfError";
  this.message = "not any of the list, got [" + actual + "]";
  this.actual = actual;
  this.stack = (new Error()).stack;
};

ValidationNotAnyOfError.prototype = Object.create(Error.prototype);
ValidationNotAnyOfError.prototype.constructor = ValidationNotAnyOfError;

var ValidationExprError = KaitaiStream.ValidationExprError = function(actual, io, srcPath) {
  this.name = "ValidationExprError";
  this.message = "not matching the expression, got [" + actual + "]";
  this.actual = actual;
  this.stack = (new Error()).stack;
};

ValidationExprError.prototype = Object.create(Error.prototype);
ValidationExprError.prototype.constructor = ValidationExprError;

/**
  Ensures that we have an least `length` bytes left in the stream.
  If that's not true, throws an EOFError.

  @param {number} length Number of bytes to require
  */
KaitaiStream.prototype.ensureBytesLeft = function(length) {
  if (this.pos + length > this.size) {
    throw new EOFError(length, this.size - this.pos);
  }
};

/**
  Maps a Uint8Array into the KaitaiStream buffer.

  Nice for quickly reading in data.

  @param {number} length Number of elements to map.
  @return {Object} Uint8Array to the KaitaiStream backing buffer.
  */
KaitaiStream.prototype.mapUint8Array = function(length) {
  length |= 0;

  this.ensureBytesLeft(length);

  var arr = new Uint8Array(this._buffer, this.byteOffset + this.pos, length);
  this.pos += length;
  return arr;
};

/**
  Creates an array from an array of character codes.
  Uses String.fromCharCode in chunks for memory efficiency and then concatenates
  the resulting string chunks.

  @param {array|Uint8Array} array Array of character codes.
  @return {string} String created from the character codes.
**/
KaitaiStream.createStringFromArray = function(array) {
  var chunk_size = 0x8000;
  var chunks = [];
  var useSubarray = typeof array.subarray === 'function';
  for (var i=0; i < array.length; i += chunk_size) {
    chunks.push(String.fromCharCode.apply(null, useSubarray ? array.subarray(i, i + chunk_size) : array.slice(i, i + chunk_size)));
  }
  return chunks.join("");
};

return KaitaiStream;

}));

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":11,"iconv-lite":90,"zlib":10}],93:[function(require,module,exports){
(function (global){(function (){
/*!
 * Number-To-Words util
 * @version v1.2.4
 * @link https://github.com/marlun78/number-to-words
 * @author Martin Eneqvist (https://github.com/marlun78)
 * @contributors Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn)
 * @license MIT
 */
!function(){"use strict";var e="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this,t=9007199254740991;function f(e){return!("number"!=typeof e||e!=e||e===1/0||e===-1/0)}function l(e){return"number"==typeof e&&Math.abs(e)<=t}var n=/(hundred|thousand|(m|b|tr|quadr)illion)$/,r=/teen$/,o=/y$/,i=/(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/,s={zero:"zeroth",one:"first",two:"second",three:"third",four:"fourth",five:"fifth",six:"sixth",seven:"seventh",eight:"eighth",nine:"ninth",ten:"tenth",eleven:"eleventh",twelve:"twelfth"};function h(e){return n.test(e)||r.test(e)?e+"th":o.test(e)?e.replace(o,"ieth"):i.test(e)?e.replace(i,a):e}function a(e,t){return s[t]}var u=10,d=100,p=1e3,v=1e6,b=1e9,y=1e12,c=1e15,g=9007199254740992,m=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],w=["zero","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];function x(e,t){var n,r=parseInt(e,10);if(!f(r))throw new TypeError("Not a finite number: "+e+" ("+typeof e+")");if(!l(r))throw new RangeError("Input is not a safe number, it’s either too large or too small.");return n=function e(t){var n,r,o=arguments[1];if(0===t)return o?o.join(" ").replace(/,$/,""):"zero";o||(o=[]);t<0&&(o.push("minus"),t=Math.abs(t));t<20?(n=0,r=m[t]):t<d?(n=t%u,r=w[Math.floor(t/u)],n&&(r+="-"+m[n],n=0)):t<p?(n=t%d,r=e(Math.floor(t/d))+" hundred"):t<v?(n=t%p,r=e(Math.floor(t/p))+" thousand,"):t<b?(n=t%v,r=e(Math.floor(t/v))+" million,"):t<y?(n=t%b,r=e(Math.floor(t/b))+" billion,"):t<c?(n=t%y,r=e(Math.floor(t/y))+" trillion,"):t<=g&&(n=t%c,r=e(Math.floor(t/c))+" quadrillion,");o.push(r);return e(n,o)}(r),t?h(n):n}var M={toOrdinal:function(e){var t=parseInt(e,10);if(!f(t))throw new TypeError("Not a finite number: "+e+" ("+typeof e+")");if(!l(t))throw new RangeError("Input is not a safe number, it’s either too large or too small.");var n=String(t),r=Math.abs(t%100),o=11<=r&&r<=13,i=n.charAt(n.length-1);return n+(o?"th":"1"===i?"st":"2"===i?"nd":"3"===i?"rd":"th")},toWords:x,toWordsOrdinal:function(e){return h(x(e))}};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=M),exports.numberToWords=M):e.numberToWords=M}();
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],94:[function(require,module,exports){
(function (process){(function (){
/* eslint-disable node/no-deprecated-api */

'use strict'

var buffer = require('buffer')
var Buffer = buffer.Buffer

var safer = {}

var key

for (key in buffer) {
  if (!buffer.hasOwnProperty(key)) continue
  if (key === 'SlowBuffer' || key === 'Buffer') continue
  safer[key] = buffer[key]
}

var Safer = safer.Buffer = {}
for (key in Buffer) {
  if (!Buffer.hasOwnProperty(key)) continue
  if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue
  Safer[key] = Buffer[key]
}

safer.Buffer.prototype = Buffer.prototype

if (!Safer.from || Safer.from === Uint8Array.from) {
  Safer.from = function (value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value)
    }
    if (value && typeof value.length === 'undefined') {
      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value)
    }
    return Buffer(value, encodingOrOffset, length)
  }
}

if (!Safer.alloc) {
  Safer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size)
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"')
    }
    var buf = Buffer(size)
    if (!fill || fill.length === 0) {
      buf.fill(0)
    } else if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
    return buf
  }
}

if (!safer.kStringMaxLength) {
  try {
    safer.kStringMaxLength = process.binding('buffer').kStringMaxLength
  } catch (e) {
    // we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
  }
}

if (!safer.constants) {
  safer.constants = {
    MAX_LENGTH: safer.kMaxLength
  }
  if (safer.kStringMaxLength) {
    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength
  }
}

module.exports = safer

}).call(this)}).call(this,require('_process'))
},{"_process":40,"buffer":11}],95:[function(require,module,exports){
module.exports={
    "eyes":[
       [
          "0x04",
          "0x00",
          "0x08",
          "0x27",
          "0x1a",
          "0x21",
          "0x13",
          "0x17",
          "0x22",
          "0x15",
          "0x28",
          "0x23",
          "0x0d",
          "0x18",
          "0x12",
          "0x2e",
          "0x2c",
          "0x26",
          "0x2d",
          "0x1d",
          "0x2b",
          "0x0e",
          "0x2f",
          "0x30",
          "0x31",
          "0x32",
          "0x3b",
          "0x38",
          "0x33"
       ],
       [
          "0x02",
          "0x11",
          "0x01",
          "0x10",
          "0x0f",
          "0x1b",
          "0x14",
          "0x0b",
          "0x20",
          "0x09",
          "0x0c",
          "0x19",
          "0x05",
          "0x29",
          "0x24",
          "0x25",
          "0x06",
          "0x1e",
          "0x1f",
          "0x1c",
          "0x07",
          "0x2a",
          "0x03",
          "0x16",
          "0x0a",
          "0x35",
          "0x36",
          "0x3a",
          "0x39",
          "0x37",
          "0x34"
       ]
    ],
    "eyebrows":[
       [
          "0x0c",
          "0x08",
          "0x02",
          "0x14",
          "0x0d"
       ],
       [
          "0x06",
          "0x00",
          "0x01",
          "0x13",
          "0x15",
          "0x04",
          "0x0a",
          "0x0e",
          "0x0f",
          "0x12"
       ],
       [
          "0x09",
          "0x07",
          "0x11",
          "0x05",
          "0x03",
          "0x16",
          "0x10"
       ],
       [
          "0x0b"
       ]
    ]
 }
},{}]},{},[68]);
