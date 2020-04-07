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
import { Logger } from '@lcluber/mouettejs';
import { isObject } from '@lcluber/chjs';
import { Observable } from 'rxjs';
import Promise from 'promise-polyfill';
import 'polyfill-array-includes';

const AudioContext = window.AudioContext ||
    window.webkitAudioContext ||
    false;
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
    usePromise(url, responseType, data) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            url += this.noCache ? "?cache=" + new Date().getTime() : "";
            http.open(this.method, url, this.async);
            http.responseType =
                responseType === "audiobuffer" ? "arraybuffer" : responseType;
            this.setRequestHeaders(http);
            switch (responseType) {
                case "json":
                case "arraybuffer":
                case "audiobuffer":
                case "blob":
                    http.onload = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                const response = http.response;
                                if (response) {
                                    this.logInfo(url, http.status, http.statusText);
                                    if (responseType === "audiobuffer") {
                                        if (AudioContext) {
                                            const audioContext = new AudioContext();
                                            audioContext.decodeAudioData(response, buffer => {
                                                audioContext.close();
                                                resolve(buffer);
                                            }, (error) => {
                                                this.log.error("xhr (" +
                                                    this.method +
                                                    ":" +
                                                    url +
                                                    ") failed with decodeAudioData error : " +
                                                    error.message);
                                                audioContext.close();
                                                reject({
                                                    status: error.name,
                                                    statusText: error.message
                                                });
                                            });
                                        }
                                        else {
                                            this.log.error("xhr (" +
                                                this.method +
                                                ":" +
                                                url +
                                                ") failed with error : " +
                                                "Web Audio API is not supported by your browser.");
                                            reject({
                                                status: "Web Audio API not supported by your browser",
                                                statusText: "Web Audio API is not supported by your browser"
                                            });
                                        }
                                    }
                                    else {
                                        resolve(response);
                                    }
                                }
                                else {
                                    this.logError(url, http.status, http.statusText);
                                    reject({
                                        status: http.status,
                                        statusText: http.statusText
                                    });
                                }
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
    useObservable(url, responseType, data) {
        return new Observable(observer => {
            const http = new XMLHttpRequest();
            url += this.noCache ? "?cache=" + new Date().getTime() : "";
            http.open(this.method, url, this.async);
            http.responseType =
                responseType === "audiobuffer" ? "arraybuffer" : responseType;
            this.setRequestHeaders(http);
            switch (responseType) {
                case "json":
                case "arraybuffer":
                case "audiobuffer":
                case "blob":
                    http.onload = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                const response = http.response;
                                if (response) {
                                    this.logInfo(url, http.status, http.statusText);
                                    if (responseType === "audiobuffer") {
                                        if (AudioContext) {
                                            const audioContext = new AudioContext();
                                            audioContext.decodeAudioData(response, buffer => {
                                                audioContext.close();
                                                observer.next(buffer);
                                                observer.complete();
                                            }, (error) => {
                                                this.log.error("xhr (" +
                                                    this.method +
                                                    ":" +
                                                    url +
                                                    ") failed with decodeAudioData error : " +
                                                    error.message);
                                                audioContext.close();
                                                observer.error({
                                                    status: error.name,
                                                    statusText: error.message
                                                });
                                                observer.complete();
                                            });
                                        }
                                        else {
                                            this.log.error("xhr (" +
                                                this.method +
                                                ":" +
                                                url +
                                                ") failed with error : " +
                                                "Web Audio API is not supported by your browser.");
                                            observer.error({
                                                status: "Web Audio API not supported by your browser",
                                                statusText: "Web Audio API is not supported by your browser"
                                            });
                                            observer.complete();
                                        }
                                    }
                                    else {
                                        observer.next(response);
                                        observer.complete();
                                    }
                                }
                                else {
                                    this.logError(url, http.status, http.statusText);
                                    observer.error({
                                        status: http.status,
                                        statusText: http.statusText
                                    });
                                    observer.complete();
                                }
                            }
                            else {
                                this.logError(url, http.status, http.statusText);
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
                    http.onreadystatechange = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                this.logInfo(url, http.status, http.statusText);
                                observer.next(http.responseText);
                                observer.complete();
                            }
                            else {
                                this.logError(url, http.status, http.statusText);
                                observer.error({
                                    status: http.status,
                                    statusText: http.statusText
                                });
                                observer.complete();
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
    call(url, responseType, eventType, data) {
        switch (eventType) {
            case "observable":
                return this.useObservable(url, responseType, data);
            default:
                return this.usePromise(url, responseType, data);
        }
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
    static setEventType(eventType) {
        this.eventType = this.isOfTypeEventType(eventType) ? eventType : "promise";
    }
    static isOfTypeEventType(eventType) {
        return ["promise", "observable"].includes(eventType);
    }
    static setLogLevel(name) {
        return this.log.setLevel(name);
    }
    static getLogLevel() {
        return this.log.getLevel();
    }
    static setMockup(mockup) {
        var _a, _b;
        this.mockup.data = (_a = mockup.data, (_a !== null && _a !== void 0 ? _a : this.mockup.data));
        this.mockup.delay = (_b = mockup.delay, (_b !== null && _b !== void 0 ? _b : this.mockup.delay));
        return this.mockup;
    }
    static getMockupData() {
        switch (this.eventType) {
            case "observable":
                return new Observable(observer => {
                    setTimeout(() => {
                        if (this.mockup.data) {
                            observer.next(this.mockup.data);
                            observer.complete();
                        }
                        else {
                            observer.error(null);
                        }
                    }, this.mockup.delay);
                });
            default:
                return this.promiseTimeout().then(() => {
                    return new Promise((resolve, reject) => {
                        this.mockup.data ? resolve(this.mockup.data) : reject(null);
                    });
                });
        }
    }
    static promiseTimeout() {
        return new Promise((resolve) => setTimeout(resolve, this.mockup.delay));
    }
    static GET(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.get.call(url, responseType, this.eventType);
    }
    static HEAD(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.head.call(url, responseType, this.eventType);
    }
    static POST(url, responseType, data) {
        return this.mockup.data
            ? this.getMockupData()
            : this.post.call(url, responseType, this.eventType, data);
    }
    static PUT(url, responseType, data) {
        return this.mockup.data
            ? this.getMockupData()
            : this.put.call(url, responseType, this.eventType, data);
    }
    static DELETE(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.delete.call(url, responseType, this.eventType);
    }
    static CONNECT(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.connect.call(url, responseType, this.eventType);
    }
    static OPTIONS(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.options.call(url, responseType, this.eventType);
    }
    static TRACE(url, responseType) {
        return this.mockup.data
            ? this.getMockupData()
            : this.trace.call(url, responseType, this.eventType);
    }
    static PATCH(url, responseType, data) {
        return this.mockup.data
            ? this.getMockupData()
            : this.patch.call(url, responseType, this.eventType, data);
    }
}
HTTP.log = Logger.addGroup("Aias");
HTTP.eventType = "promise";
HTTP.mockup = {
    data: null,
    delay: 200
};
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
