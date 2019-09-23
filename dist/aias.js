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

import { isObject } from '@lcluber/chjs';
import { Logger } from '@lcluber/mouettejs';

class Method {
    constructor(method, defaultHeaders) {
        this.log = Logger.addGroup("Aias");
        this.method = method;
        this.async = true;
        this.noCache = false;
        this.headers = defaultHeaders;
    }
    setHeaders(headers) {
        for (const property in headers) {
            if (headers.hasOwnProperty(property)) {
                this.headers[property] = headers[property];
            }
        }
    }
    getHeaders() {
        return this.headers;
    }
    call(url, responseType, data) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            url += this.noCache ? "?cache=" + new Date().getTime() : "";
            http.open(this.method, url, this.async);
            http.responseType = responseType;
            this.setRequestHeaders(http);
            switch (http.responseType) {
                case "json":
                case "arraybuffer":
                case "blob":
                    http.onload = () => {
                        let response = http.response;
                        if (response) {
                            this.logInfo(url, http.status, http.statusText);
                            resolve(response);
                        }
                        else {
                            this.logError(url, http.status, http.statusText);
                            reject({
                                status: http.status,
                                statusText: http.statusText
                            });
                        }
                    };
                    break;
                default:
                    http.onreadystatechange = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                this.logInfo(url, http.status, http.statusText);
                                resolve(http.responseText);
                            }
                            else {
                                this.logError(url, http.status, http.statusText);
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
            this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
        });
    }
    setRequestHeaders(http) {
        for (const property in this.headers) {
            if (this.headers.hasOwnProperty(property)) {
                http.setRequestHeader(property, this.headers[property]);
            }
        }
    }
    logInfo(url, status, statusText) {
        this.log.info("xhr (" +
            this.method +
            ":" +
            url +
            ") done with status " +
            status +
            " " +
            statusText);
    }
    logError(url, status, statusText) {
        this.log.error("xhr (" +
            this.method +
            ":" +
            url +
            ") failed with status " +
            status +
            " " +
            statusText);
    }
}

class HTTP {
    static GET(url, responseType) {
        return this.get.call(url, responseType);
    }
    static HEAD(url, responseType) {
        return this.head.call(url, responseType);
    }
    static POST(url, responseType, data) {
        return this.post.call(url, responseType, data);
    }
    static PUT(url, responseType, data) {
        return this.put.call(url, responseType, data);
    }
    static DELETE(url, responseType) {
        return this.delete.call(url, responseType);
    }
    static CONNECT(url, responseType) {
        return this.connect.call(url, responseType);
    }
    static OPTIONS(url, responseType) {
        return this.options.call(url, responseType);
    }
    static TRACE(url, responseType) {
        return this.trace.call(url, responseType);
    }
    static PATCH(url, responseType, data) {
        return this.patch.call(url, responseType, data);
    }
}
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

export { HTTP };
