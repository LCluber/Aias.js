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
* http://aiasjs.lcluber.com
*/

var Aias = (function (exports) {
    'use strict';

    var HTTP = (function () {
        function HTTP() {
        }
        HTTP.get = function (url) {
            return this.call('GET', url);
        };
        HTTP.head = function (url) {
            return this.call('HEAD', url);
        };
        HTTP.post = function (url, data) {
            return this.call('POST', url, data);
        };
        HTTP.put = function (url) {
            return this.call('PUT', url);
        };
        HTTP.delete = function (url) {
            return this.call('DELETE', url);
        };
        HTTP.connect = function (url) {
            return this.call('CONNECT', url);
        };
        HTTP.options = function (url) {
            return this.call('OPTIONS', url);
        };
        HTTP.trace = function (url) {
            return this.call('TRACE', url);
        };
        HTTP.patch = function (url) {
            return this.call('PATCH', url);
        };
        HTTP.call = function (method, url, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var http = new XMLHttpRequest();
                if (_this.noCache) {
                    url += '?cache=' + (new Date()).getTime();
                }
                http.open(method, url, _this.async);
                http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                http.onreadystatechange = function () {
                    if (http.readyState == 4) {
                        if (http.status == 200) {
                            console.log('xhr done successfully (' + url + ')');
                            resolve(http.responseText);
                        }
                        else {
                            console.log('error', 'xhr failed (' + url + ')');
                            reject(http.status);
                        }
                    }
                };
                console.log('xhr processing starting (' + url + ')');
                http.send(data);
            });
        };
        HTTP.async = true;
        HTTP.noCache = false;
        return HTTP;
    }());

    exports.HTTP = HTTP;

    return exports;

}({}));
