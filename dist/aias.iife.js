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
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
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

  /* MIT License

  Copyright (c) 2009 Ludovic CLUBER

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  https://github.com/LCluber/Ch.js
  */
  function isObject(object) {
    return object !== null && typeof object === "object" && !isArray(object);
  }

  function isArray(array) {
    return array !== null && array.constructor === Array;
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

  /** MIT License
  * 
  * Copyright (c) 2015 Ludovic CLUBER 
  * 
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  * http://mouettejs.lcluber.com
  */
  var LEVELS = {
    info: {
      id: 1,
      name: "info",
      color: "#28a745"
    },
    trace: {
      id: 2,
      name: "trace",
      color: "#17a2b8"
    },
    warn: {
      id: 3,
      name: "warn",
      color: "#ffc107"
    },
    error: {
      id: 4,
      name: "error",
      color: "#dc3545"
    },
    off: {
      id: 99,
      name: "off",
      color: null
    }
  };

  function addZero(value) {
    return value < 10 ? "0" + value : value;
  }

  function formatDate() {
    var now = new Date();
    var date = [addZero(now.getMonth() + 1), addZero(now.getDate()), now.getFullYear().toString().substr(-2)];
    var time = [addZero(now.getHours()), addZero(now.getMinutes()), addZero(now.getSeconds())];
    return date.join("/") + " " + time.join(":");
  }

  var Message =
  /*#__PURE__*/
  function () {
    function Message(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
      this.date = formatDate();
    }

    var _proto = Message.prototype;

    _proto.display = function display(groupName) {
      console[this.name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    };

    return Message;
  }();

  var Group =
  /*#__PURE__*/
  function () {
    function Group(name, level) {
      this.messages = [];
      this.name = name;
      this.messages = [];
      this._level = level;
    }

    var _proto2 = Group.prototype;

    _proto2.info = function info(message) {
      this.log(LEVELS.info, message);
    };

    _proto2.trace = function trace(message) {
      this.log(LEVELS.trace, message);
    };

    _proto2.warn = function warn(message) {
      this.log(LEVELS.warn, message);
    };

    _proto2.error = function error(message) {
      this.log(LEVELS.error, message);
    };

    _proto2.log = function log(level, messageContent) {
      var message = new Message(level, messageContent);
      this.messages.push(message);

      if (this._level.id <= message.id) {
        message.display(this.name);
      }
    };

    _createClass(Group, [{
      key: "level",
      set: function set(name) {
        this._level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : this._level;
      },
      get: function get() {
        return this._level.name;
      }
    }]);

    return Group;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.setLevel = function setLevel(name) {
      Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;

      for (var _iterator = Logger.groups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var group = _ref;
        group.level = Logger.level.name;
      }

      return Logger.getLevel();
    };

    Logger.getLevel = function getLevel() {
      return Logger.level.name;
    };

    Logger.getGroup = function getGroup(name) {
      for (var _iterator2 = Logger.groups, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var group = _ref2;

        if (group.name === name) {
          return group;
        }
      }

      return null;
    };

    Logger.addGroup = function addGroup(name) {
      return this.getGroup(name) || this.pushGroup(name);
    };

    Logger.pushGroup = function pushGroup(name) {
      var group = new Group(name, Logger.level);
      Logger.groups.push(group);
      return group;
    };

    return Logger;
  }();

  Logger.level = LEVELS.error;
  Logger.groups = [];

  var Method =
  /*#__PURE__*/
  function () {
    function Method(method, defaultHeaders) {
      this.log = Logger.addGroup("Aias");
      this.method = method;
      this.async = true;
      this.noCache = false;
      this.headers = defaultHeaders;
    }

    var _proto = Method.prototype;

    _proto.setHeaders = function setHeaders(headers) {
      for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
          this.headers[property] = headers[property];
        }
      }
    };

    _proto.getHeaders = function getHeaders() {
      return this.headers;
    };

    _proto.call = function call(url, responseType, data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var http = new XMLHttpRequest();
        url += _this.noCache ? "?cache=" + new Date().getTime() : "";
        http.open(_this.method, url, _this.async);
        http.responseType = responseType;

        _this.setRequestHeaders(http);

        switch (http.responseType) {
          case "json":
          case "arraybuffer":
          case "blob":
            http.onload = function () {
              var response = http.response;

              if (response) {
                _this.logInfo(url, http.status, http.statusText);

                resolve(response);
              } else {
                _this.logError(url, http.status, http.statusText);

                reject({
                  status: http.status,
                  statusText: http.statusText
                });
              }
            };

            break;

          default:
            http.onreadystatechange = function () {
              if (http.readyState == 4) {
                if (http.status == 200) {
                  _this.logInfo(url, http.status, http.statusText);

                  resolve(http.responseText);
                } else {
                  _this.logError(url, http.status, http.statusText);

                  reject({
                    status: http.status,
                    statusText: http.statusText
                  });
                }
              }
            };

        }

        if (isObject(data)) {
          data = JSON.stringify(data);
        }

        http.send(data || null);

        _this.log.info("xhr (" + _this.method + ":" + url + ")" + "sent");
      });
    };

    _proto.setRequestHeaders = function setRequestHeaders(http) {
      for (var property in this.headers) {
        if (this.headers.hasOwnProperty(property)) {
          http.setRequestHeader(property, this.headers[property]);
        }
      }
    };

    _proto.logInfo = function logInfo(url, status, statusText) {
      this.log.info("xhr (" + this.method + ":" + url + ") done with status " + status + " " + statusText);
    };

    _proto.logError = function logError(url, status, statusText) {
      this.log.error("xhr (" + this.method + ":" + url + ") failed with status " + status + " " + statusText);
    };

    return Method;
  }();

  var HTTP =
  /*#__PURE__*/
  function () {
    function HTTP() {}

    HTTP.GET = function GET(url, responseType) {
      return this.get.call(url, responseType);
    };

    HTTP.HEAD = function HEAD(url, responseType) {
      return this.head.call(url, responseType);
    };

    HTTP.POST = function POST(url, responseType, data) {
      return this.post.call(url, responseType, data);
    };

    HTTP.PUT = function PUT(url, responseType, data) {
      return this.put.call(url, responseType, data);
    };

    HTTP.DELETE = function DELETE(url, responseType) {
      return this.delete.call(url, responseType);
    };

    HTTP.CONNECT = function CONNECT(url, responseType) {
      return this.connect.call(url, responseType);
    };

    HTTP.OPTIONS = function OPTIONS(url, responseType) {
      return this.options.call(url, responseType);
    };

    HTTP.TRACE = function TRACE(url, responseType) {
      return this.trace.call(url, responseType);
    };

    HTTP.PATCH = function PATCH(url, responseType, data) {
      return this.patch.call(url, responseType, data);
    };

    return HTTP;
  }();
  HTTP.get = new Method("GET", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.head = new Method("HEAD", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.post = new Method("POST", {
    "Content-Type": "application/json"
  });
  HTTP.put = new Method("PUT", {
    "Content-Type": "application/json"
  });
  HTTP.delete = new Method("DELETE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.connect = new Method("CONNECT", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.options = new Method("OPTIONS", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.trace = new Method("TRACE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  HTTP.patch = new Method("PATCH", {
    "Content-Type": "application/json"
  });

  exports.HTTP = HTTP;

  return exports;

}({}));
