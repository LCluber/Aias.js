/** MIT License
 *
 * Copyright (c) 2010 Ludovic CLUBER
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice (including the next
 * paragraph) shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * https://github.com/LCluber/Aias.js
 */
var Aias = (function (exports) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject(object) {
    return object !== null && _typeof(object) === "object" && !isArray(object);
  }

  function isArray(array) {
    return array !== null && array.constructor === Array;
  }

  function getAudioContext() {
    if (typeof window === 'undefined') {
      return false;
    } else {
      return window.AudioContext || window.webkitAudioContext || false;
    }
  }

  var METHODS = {
    GET: {
      type: "GET",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    HEAD: {
      type: "HEAD",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    POST: {
      type: "POST",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {
        "Content-Type": "application/json"
      },
      data: true
    },
    PUT: {
      type: "PUT",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {
        "Content-Type": "application/json"
      },
      data: true
    },
    DELETE: {
      type: "DELETE",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    CONNECT: {
      type: "CONNECT",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    OPTIONS: {
      type: "OPTIONS",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    TRACE: {
      type: "TRACE",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: false
    },
    PATCH: {
      type: "PATCH",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {
        "Content-Type": "application/json"
      },
      data: false
    }
  };

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  }

  // other code modifying setTimeout (like sinon.useFakeTimers())

  var setTimeoutFunc = setTimeout;

  function isArray$1(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {} // Polyfill for Function.prototype.bind


  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }
  /**
   * @constructor
   * @param {Function} fn
   */


  function Promise$1(fn) {
    if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */

    this._state = 0;
    /** @type {!boolean} */

    this._handled = false;
    /** @type {Promise|undefined} */

    this._value = undefined;
    /** @type {!Array<!Function>} */

    this._deferreds = [];
    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }

    if (self._state === 0) {
      self._deferreds.push(deferred);

      return;
    }

    self._handled = true;

    Promise$1._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }

      var ret;

      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }

      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

      if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;

        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }

      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function () {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }

    self._deferreds = null;
  }
  /**
   * @constructor
   */


  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }
  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */


  function doResolve(fn, self) {
    var done = false;

    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$1(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
            var then = val.then;

            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }

          args[i] = val;

          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function (value) {
    if (value && _typeof(value) === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function (resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function (value) {
    return new Promise$1(function (resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$1(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  }; // Use polyfill for setImmediate for performance gains


  Promise$1._immediateFn = // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  var AudioContext = getAudioContext();
  var promise = /*#__PURE__*/function () {
    function promise(method, url, responseType, data) {
      _classCallCheck(this, promise);

      this.method = method;
      this.url = url;
      this.responseType = responseType;
      this.async = true;
      this.noCache = false;
      this.headers = METHODS[method].headers || METHODS[method].defaultHeaders;
      this.data = data;
    }

    _createClass(promise, [{
      key: "call",
      value: function call() {
        var _this = this;

        return new Promise$1(function (resolve, reject) {
          var http = new XMLHttpRequest();
          _this.url += _this.noCache ? "?cache=" + new Date().getTime() : "";
          http.open(_this.method, _this.url, _this.async);
          http.responseType = _this.responseType === "audiobuffer" ? "arraybuffer" : _this.responseType;

          _this.setRequestHeaders(http);

          switch (_this.responseType) {
            case "json":
            case "arraybuffer":
            case "audiobuffer":
            case "blob":
              http.onload = function () {
                if (http.readyState == 4) {
                  if (http.status == 200) {
                    var response = http.response;

                    if (response) {
                      if (_this.responseType === "audiobuffer") {
                        if (AudioContext) {
                          var audioContext = new AudioContext();
                          audioContext.decodeAudioData(response, function (buffer) {
                            audioContext.close();
                            resolve(buffer);
                          }, function (error) {
                            audioContext.close();
                            reject({
                              status: error.name,
                              statusText: error.message
                            });
                          });
                        } else {
                          reject({
                            status: "Web Audio API not supported by your browser",
                            statusText: "Web Audio API is not supported by your browser"
                          });
                        }
                      } else {
                        resolve(response);
                      }
                    } else {
                      reject({
                        status: http.status,
                        statusText: http.statusText
                      });
                    }
                  } else {
                    reject({
                      status: http.status,
                      statusText: http.statusText
                    });
                  }
                }
              };

              break;

            default:
              http.onreadystatechange = function () {
                if (http.readyState == 4) {
                  if (http.status == 200) {
                    resolve(http.responseText);
                  } else {
                    reject({
                      status: http.status,
                      statusText: http.statusText
                    });
                  }
                }
              };

          }

          if (isObject(_this.data)) {
            _this.data = JSON.stringify(_this.data);
          }

          http.send(_this.data || null);
        });
      }
    }, {
      key: "setRequestHeaders",
      value: function setRequestHeaders(http) {
        for (var property in this.headers) {
          if (this.headers.hasOwnProperty(property)) {
            http.setRequestHeader(property, this.headers[property]);
          }
        }
      }
    }]);

    return promise;
  }();

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isFunction(x) {
    return typeof x === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
    Promise: undefined,

    set useDeprecatedSynchronousErrorHandling(value) {
      if (value) {
        var error = /*@__PURE__*/new Error();
        /*@__PURE__*/

        console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
      }

      _enable_super_gross_mode_that_will_cause_bad_things = value;
    },

    get useDeprecatedSynchronousErrorHandling() {
      return _enable_super_gross_mode_that_will_cause_bad_things;
    }

  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function hostReportError(err) {
    setTimeout(function () {
      throw err;
    }, 0);
  }

  /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
  var empty = {
    closed: true,
    next: function next(value) {},
    error: function error(err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    },
    complete: function complete() {}
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArray$2 = /*@__PURE__*/function () {
    return Array.isArray || function (x) {
      return x && typeof x.length === 'number';
    };
  }();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isObject$1(x) {
    return x !== null && _typeof(x) === 'object';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
    function UnsubscriptionErrorImpl(errors) {
      Error.call(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
        return i + 1 + ") " + err.toString();
      }).join('\n  ') : '';
      this.name = 'UnsubscriptionError';
      this.errors = errors;
      return this;
    }

    UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
  }();

  var UnsubscriptionError = UnsubscriptionErrorImpl;

  var Subscription = /*@__PURE__*/function () {
    function Subscription(unsubscribe) {
      this.closed = false;
      this._parentOrParents = null;
      this._subscriptions = null;

      if (unsubscribe) {
        this._unsubscribe = unsubscribe;
      }
    }

    Subscription.prototype.unsubscribe = function () {
      var errors;

      if (this.closed) {
        return;
      }

      var _a = this,
          _parentOrParents = _a._parentOrParents,
          _unsubscribe = _a._unsubscribe,
          _subscriptions = _a._subscriptions;

      this.closed = true;
      this._parentOrParents = null;
      this._subscriptions = null;

      if (_parentOrParents instanceof Subscription) {
        _parentOrParents.remove(this);
      } else if (_parentOrParents !== null) {
        for (var index = 0; index < _parentOrParents.length; ++index) {
          var parent_1 = _parentOrParents[index];
          parent_1.remove(this);
        }
      }

      if (isFunction(_unsubscribe)) {
        try {
          _unsubscribe.call(this);
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
        }
      }

      if (isArray$2(_subscriptions)) {
        var index = -1;
        var len = _subscriptions.length;

        while (++index < len) {
          var sub = _subscriptions[index];

          if (isObject$1(sub)) {
            try {
              sub.unsubscribe();
            } catch (e) {
              errors = errors || [];

              if (e instanceof UnsubscriptionError) {
                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
              } else {
                errors.push(e);
              }
            }
          }
        }
      }

      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    };

    Subscription.prototype.add = function (teardown) {
      var subscription = teardown;

      if (!teardown) {
        return Subscription.EMPTY;
      }

      switch (_typeof(teardown)) {
        case 'function':
          subscription = new Subscription(teardown);

        case 'object':
          if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
            return subscription;
          } else if (this.closed) {
            subscription.unsubscribe();
            return subscription;
          } else if (!(subscription instanceof Subscription)) {
            var tmp = subscription;
            subscription = new Subscription();
            subscription._subscriptions = [tmp];
          }

          break;

        default:
          {
            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
          }
      }

      var _parentOrParents = subscription._parentOrParents;

      if (_parentOrParents === null) {
        subscription._parentOrParents = this;
      } else if (_parentOrParents instanceof Subscription) {
        if (_parentOrParents === this) {
          return subscription;
        }

        subscription._parentOrParents = [_parentOrParents, this];
      } else if (_parentOrParents.indexOf(this) === -1) {
        _parentOrParents.push(this);
      } else {
        return subscription;
      }

      var subscriptions = this._subscriptions;

      if (subscriptions === null) {
        this._subscriptions = [subscription];
      } else {
        subscriptions.push(subscription);
      }

      return subscription;
    };

    Subscription.prototype.remove = function (subscription) {
      var subscriptions = this._subscriptions;

      if (subscriptions) {
        var subscriptionIndex = subscriptions.indexOf(subscription);

        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    };

    Subscription.EMPTY = function (empty) {
      empty.closed = true;
      return empty;
    }(new Subscription());

    return Subscription;
  }();

  function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) {
      return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
    }, []);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var rxSubscriber = /*@__PURE__*/function () {
    return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
  }();

  var Subscriber = /*@__PURE__*/function (_super) {
    __extends(Subscriber, _super);

    function Subscriber(destinationOrNext, error, complete) {
      var _this = _super.call(this) || this;

      _this.syncErrorValue = null;
      _this.syncErrorThrown = false;
      _this.syncErrorThrowable = false;
      _this.isStopped = false;

      switch (arguments.length) {
        case 0:
          _this.destination = empty;
          break;

        case 1:
          if (!destinationOrNext) {
            _this.destination = empty;
            break;
          }

          if (_typeof(destinationOrNext) === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
              _this.destination = destinationOrNext;
              destinationOrNext.add(_this);
            } else {
              _this.syncErrorThrowable = true;
              _this.destination = new SafeSubscriber(_this, destinationOrNext);
            }

            break;
          }

        default:
          _this.syncErrorThrowable = true;
          _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
          break;
      }

      return _this;
    }

    Subscriber.prototype[rxSubscriber] = function () {
      return this;
    };

    Subscriber.create = function (next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };

    Subscriber.prototype.next = function (value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };

    Subscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;

        this._error(err);
      }
    };

    Subscriber.prototype.complete = function () {
      if (!this.isStopped) {
        this.isStopped = true;

        this._complete();
      }
    };

    Subscriber.prototype.unsubscribe = function () {
      if (this.closed) {
        return;
      }

      this.isStopped = true;

      _super.prototype.unsubscribe.call(this);
    };

    Subscriber.prototype._next = function (value) {
      this.destination.next(value);
    };

    Subscriber.prototype._error = function (err) {
      this.destination.error(err);
      this.unsubscribe();
    };

    Subscriber.prototype._complete = function () {
      this.destination.complete();
      this.unsubscribe();
    };

    Subscriber.prototype._unsubscribeAndRecycle = function () {
      var _parentOrParents = this._parentOrParents;
      this._parentOrParents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parentOrParents = _parentOrParents;
      return this;
    };

    return Subscriber;
  }(Subscription);

  var SafeSubscriber = /*@__PURE__*/function (_super) {
    __extends(SafeSubscriber, _super);

    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
      var _this = _super.call(this) || this;

      _this._parentSubscriber = _parentSubscriber;
      var next;
      var context = _this;

      if (isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;

        if (observerOrNext !== empty) {
          context = Object.create(observerOrNext);

          if (isFunction(context.unsubscribe)) {
            _this.add(context.unsubscribe.bind(context));
          }

          context.unsubscribe = _this.unsubscribe.bind(_this);
        }
      }

      _this._context = context;
      _this._next = next;
      _this._error = error;
      _this._complete = complete;
      return _this;
    }

    SafeSubscriber.prototype.next = function (value) {
      if (!this.isStopped && this._next) {
        var _parentSubscriber = this._parentSubscriber;

        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;
        var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

        if (this._error) {
          if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);

            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._error, err);

            this.unsubscribe();
          }
        } else if (!_parentSubscriber.syncErrorThrowable) {
          this.unsubscribe();

          if (useDeprecatedSynchronousErrorHandling) {
            throw err;
          }

          hostReportError(err);
        } else {
          if (useDeprecatedSynchronousErrorHandling) {
            _parentSubscriber.syncErrorValue = err;
            _parentSubscriber.syncErrorThrown = true;
          } else {
            hostReportError(err);
          }

          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.complete = function () {
      var _this = this;

      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;

        if (this._complete) {
          var wrappedComplete = function wrappedComplete() {
            return _this._complete.call(_this._context);
          };

          if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(wrappedComplete);

            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, wrappedComplete);

            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();

        if (config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError(err);
        }
      }
    };

    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
      if (!config.useDeprecatedSynchronousErrorHandling) {
        throw new Error('bad call');
      }

      try {
        fn.call(this._context, value);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          parent.syncErrorValue = err;
          parent.syncErrorThrown = true;
          return true;
        } else {
          hostReportError(err);
          return true;
        }
      }

      return false;
    };

    SafeSubscriber.prototype._unsubscribe = function () {
      var _parentSubscriber = this._parentSubscriber;
      this._context = null;
      this._parentSubscriber = null;

      _parentSubscriber.unsubscribe();
    };

    return SafeSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
  function canReportError(observer) {
    while (observer) {
      var _a = observer,
          closed_1 = _a.closed,
          destination = _a.destination,
          isStopped = _a.isStopped;

      if (closed_1 || isStopped) {
        return false;
      } else if (destination && destination instanceof Subscriber) {
        observer = destination;
      } else {
        observer = null;
      }
    }

    return true;
  }

  /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber) {
        return nextOrObserver;
      }

      if (nextOrObserver[rxSubscriber]) {
        return nextOrObserver[rxSubscriber]();
      }
    }

    if (!nextOrObserver && !error && !complete) {
      return new Subscriber(empty);
    }

    return new Subscriber(nextOrObserver, error, complete);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var observable = /*@__PURE__*/function () {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
  }();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function noop$1() {}

  /** PURE_IMPORTS_START _noop PURE_IMPORTS_END */
  function pipeFromArray(fns) {
    if (!fns) {
      return noop$1;
    }

    if (fns.length === 1) {
      return fns[0];
    }

    return function piped(input) {
      return fns.reduce(function (prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */

  var Observable = /*@__PURE__*/function () {
    function Observable(subscribe) {
      this._isScalar = false;

      if (subscribe) {
        this._subscribe = subscribe;
      }
    }

    Observable.prototype.lift = function (operator) {
      var observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    };

    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
      var operator = this.operator;
      var sink = toSubscriber(observerOrNext, error, complete);

      if (operator) {
        sink.add(operator.call(sink, this.source));
      } else {
        sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
      }

      if (config.useDeprecatedSynchronousErrorHandling) {
        if (sink.syncErrorThrowable) {
          sink.syncErrorThrowable = false;

          if (sink.syncErrorThrown) {
            throw sink.syncErrorValue;
          }
        }
      }

      return sink;
    };

    Observable.prototype._trySubscribe = function (sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          sink.syncErrorThrown = true;
          sink.syncErrorValue = err;
        }

        if (canReportError(sink)) {
          sink.error(err);
        } else {
          console.warn(err);
        }
      }
    };

    Observable.prototype.forEach = function (next, promiseCtor) {
      var _this = this;

      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function (resolve, reject) {
        var subscription;
        subscription = _this.subscribe(function (value) {
          try {
            next(value);
          } catch (err) {
            reject(err);

            if (subscription) {
              subscription.unsubscribe();
            }
          }
        }, reject, resolve);
      });
    };

    Observable.prototype._subscribe = function (subscriber) {
      var source = this.source;
      return source && source.subscribe(subscriber);
    };

    Observable.prototype[observable] = function () {
      return this;
    };

    Observable.prototype.pipe = function () {
      var operations = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }

      if (operations.length === 0) {
        return this;
      }

      return pipeFromArray(operations)(this);
    };

    Observable.prototype.toPromise = function (promiseCtor) {
      var _this = this;

      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function (resolve, reject) {
        var value;

        _this.subscribe(function (x) {
          return value = x;
        }, function (err) {
          return reject(err);
        }, function () {
          return resolve(value);
        });
      });
    };

    Observable.create = function (subscribe) {
      return new Observable(subscribe);
    };

    return Observable;
  }();

  function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
      promiseCtor =  Promise;
    }

    if (!promiseCtor) {
      throw new Error('no Promise impl found');
    }

    return promiseCtor;
  }

  var AudioContext$1 = getAudioContext();
  var observable$1 = /*#__PURE__*/function () {
    function observable(method, url, responseType, data) {
      _classCallCheck(this, observable);

      this.method = method;
      this.url = url;
      this.responseType = responseType;
      this.async = true;
      this.noCache = false;
      this.headers = METHODS[method].headers || METHODS[method].defaultHeaders;
      this.data = data;
    }

    _createClass(observable, [{
      key: "call",
      value: function call() {
        var _this = this;

        return new Observable(function (observer) {
          var http = new XMLHttpRequest();
          _this.url += _this.noCache ? "?cache=" + new Date().getTime() : "";
          http.open(_this.method, _this.url, _this.async);
          http.responseType = _this.responseType === "audiobuffer" ? "arraybuffer" : _this.responseType;

          _this.setRequestHeaders(http);

          switch (_this.responseType) {
            case "json":
            case "arraybuffer":
            case "audiobuffer":
            case "blob":
              http.onload = function () {
                if (http.readyState == 4) {
                  if (http.status == 200) {
                    var response = http.response;

                    if (response) {
                      if (_this.responseType === "audiobuffer") {
                        if (AudioContext$1) {
                          var audioContext = new AudioContext$1();
                          audioContext.decodeAudioData(response, function (buffer) {
                            audioContext.close();
                            observer.next(buffer);
                            observer.complete();
                          }, function (error) {
                            audioContext.close();
                            observer.error({
                              status: error.name,
                              statusText: error.message
                            });
                            observer.complete();
                          });
                        } else {
                          observer.error({
                            status: "Web Audio API not supported by your browser",
                            statusText: "Web Audio API is not supported by your browser"
                          });
                          observer.complete();
                        }
                      } else {
                        observer.next(response);
                        observer.complete();
                      }
                    } else {
                      observer.error({
                        status: http.status,
                        statusText: http.statusText
                      });
                      observer.complete();
                    }
                  } else {
                    observer.error({
                      status: http.status,
                      statusText: http.statusText
                    });
                    observer.complete();
                  }
                }
              };

              break;

            default:
              http.onreadystatechange = function () {
                if (http.readyState == 4) {
                  if (http.status == 200) {
                    observer.next(http.responseText);
                    observer.complete();
                  } else {
                    observer.error({
                      status: http.status,
                      statusText: http.statusText
                    });
                    observer.complete();
                  }
                }
              };

          }

          if (isObject(_this.data)) {
            _this.data = JSON.stringify(_this.data);
          }

          http.send(_this.data || null);
        });
      }
    }, {
      key: "setRequestHeaders",
      value: function setRequestHeaders(http) {
        for (var property in this.headers) {
          if (this.headers.hasOwnProperty(property)) {
            http.setRequestHeader(property, this.headers[property]);
          }
        }
      }
    }]);

    return observable;
  }();

  Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function value(r, e) {
      if (null == this) throw new TypeError('"this" is null or not defined');
      var t = Object(this),
          n = t.length >>> 0;
      if (0 === n) return !1;

      for (var i = 0 | e, o = Math.max(i >= 0 ? i : n - Math.abs(i), 0); o < n;) {
        if (function (r, e) {
          return r === e || "number" == typeof r && "number" == typeof e && isNaN(r) && isNaN(e);
        }(t[o], r)) return !0;
        o++;
      }

      return !1;
    }
  });

  var HTTP = /*#__PURE__*/function () {
    function HTTP() {
      _classCallCheck(this, HTTP);
    }

    _createClass(HTTP, null, [{
      key: "setHeaders",
      value: function setHeaders(method, headers) {
        if (METHODS.hasOwnProperty(method)) {
          for (var property in headers) {
            if (headers.hasOwnProperty(property)) {
              METHODS[method].headers[property] = headers[property];
            }
          }
        }
      }
    }]);

    return HTTP;
  }();
  HTTP.observable = {
    get: function get(url, responseType) {
      return new observable$1(METHODS.GET.type, url, responseType, null).call();
    },
    head: function head(url, responseType) {
      return new observable$1(METHODS.HEAD.type, url, responseType, null).call();
    },
    post: function post(url, responseType, data) {
      return new observable$1(METHODS.POST.type, url, responseType, data).call();
    },
    put: function put(url, responseType, data) {
      return new observable$1(METHODS.PUT.type, url, responseType, data).call();
    },
    "delete": function _delete(url, responseType) {
      return new observable$1(METHODS.DELETE.type, url, responseType, null).call();
    },
    connect: function connect(url, responseType) {
      return new observable$1(METHODS.CONNECT.type, url, responseType, null).call();
    },
    options: function options(url, responseType) {
      return new observable$1(METHODS.OPTIONS.type, url, responseType, null).call();
    },
    trace: function trace(url, responseType) {
      return new observable$1(METHODS.TRACE.type, url, responseType, null).call();
    },
    patch: function patch(url, responseType, data) {
      return new observable$1(METHODS.PATCH.type, url, responseType, data).call();
    }
  };
  HTTP.promise = {
    get: function get(url, responseType) {
      return new promise(METHODS.GET.type, url, responseType, null).call();
    },
    head: function head(url, responseType) {
      return new promise(METHODS.HEAD.type, url, responseType, null).call();
    },
    post: function post(url, responseType, data) {
      return new promise(METHODS.POST.type, url, responseType, data).call();
    },
    put: function put(url, responseType, data) {
      return new promise(METHODS.PUT.type, url, responseType, data).call();
    },
    "delete": function _delete(url, responseType) {
      return new promise(METHODS.DELETE.type, url, responseType, null).call();
    },
    connect: function connect(url, responseType) {
      return new promise(METHODS.CONNECT.type, url, responseType, null).call();
    },
    options: function options(url, responseType) {
      return new promise(METHODS.OPTIONS.type, url, responseType, null).call();
    },
    trace: function trace(url, responseType) {
      return new promise(METHODS.TRACE.type, url, responseType, null).call();
    },
    patch: function patch(url, responseType, data) {
      return new promise(METHODS.PATCH.type, url, responseType, data).call();
    }
  };

  exports.HTTP = HTTP;

  return exports;

}({}));
