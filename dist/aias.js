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
import { isObject } from '@lcluber/chjs';
import Promise from 'promise-polyfill';
import { Observable } from 'rxjs';
import 'polyfill-array-includes';

function getAudioContext() {
    if (typeof window === 'undefined') {
        return false;
    }
    else {
        return window.AudioContext ||
            window.webkitAudioContext ||
            false;
    }
}

const METHODS = {
    GET: {
        type: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    HEAD: {
        type: "HEAD",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    POST: {
        type: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: true
    },
    PUT: {
        type: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        data: true
    },
    DELETE: {
        type: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    CONNECT: {
        type: "CONNECT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    OPTIONS: {
        type: "OPTIONS",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    TRACE: {
        type: "TRACE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: false
    },
    PATCH: {
        type: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        data: false
    }
};

class request {
    constructor(method, url, responseType, data, headers) {
        this.method = method;
        this.url = url;
        this.responseType = responseType;
        this.async = true;
        this.noCache = false;
        this.headers = headers;
        this.data = data;
    }
    setRequestHeaders(http) {
        let requestHeaders = Object.assign(Object.assign({}, METHODS[this.method].headers), this.headers);
        for (const property in requestHeaders) {
            if (requestHeaders.hasOwnProperty(property)) {
                if (requestHeaders[property] === '') {
                    delete requestHeaders[property];
                }
            }
        }
        for (const property in requestHeaders) {
            if (requestHeaders.hasOwnProperty(property)) {
                http.setRequestHeader(property, requestHeaders[property]);
            }
        }
    }
}

const AudioContext = getAudioContext();
class promise extends request {
    constructor(method, url, responseType, data, headers) {
        super(method, url, responseType, data, headers);
    }
    call() {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            this.url += this.noCache ? "?cache=" + new Date().getTime() : "";
            http.open(this.method, this.url, this.async);
            http.responseType = this.responseType === "audiobuffer" ? "arraybuffer" : this.responseType;
            this.setRequestHeaders(http);
            switch (this.responseType) {
                case "json":
                case "arraybuffer":
                case "audiobuffer":
                case "blob":
                    http.onload = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                const response = http.response;
                                if (response) {
                                    if (this.responseType === "audiobuffer") {
                                        if (AudioContext) {
                                            const audioContext = new AudioContext();
                                            audioContext.decodeAudioData(response, buffer => {
                                                audioContext.close();
                                                resolve(buffer);
                                            }, (error) => {
                                                audioContext.close();
                                                reject({
                                                    status: error.name,
                                                    statusText: error.message
                                                });
                                            });
                                        }
                                        else {
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
                                    reject({
                                        status: http.status,
                                        statusText: http.statusText
                                    });
                                }
                            }
                            else {
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
                                resolve(http.responseText);
                            }
                            else {
                                reject({
                                    status: http.status,
                                    statusText: http.statusText
                                });
                            }
                        }
                    };
            }
            if (isObject(this.data)) {
                this.data = JSON.stringify(this.data);
            }
            http.send(this.data || null);
        });
    }
}

const AudioContext$1 = getAudioContext();
class observable extends request {
    constructor(method, url, responseType, data, headers) {
        super(method, url, responseType, data, headers);
    }
    call() {
        return new Observable(observer => {
            const http = new XMLHttpRequest();
            this.url += this.noCache ? "?cache=" + new Date().getTime() : "";
            http.open(this.method, this.url, this.async);
            http.responseType = this.responseType === "audiobuffer" ? "arraybuffer" : this.responseType;
            this.setRequestHeaders(http);
            switch (this.responseType) {
                case "json":
                case "arraybuffer":
                case "audiobuffer":
                case "blob":
                    http.onload = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                const response = http.response;
                                if (response) {
                                    if (this.responseType === "audiobuffer") {
                                        if (AudioContext$1) {
                                            const audioContext = new AudioContext$1();
                                            audioContext.decodeAudioData(response, buffer => {
                                                audioContext.close();
                                                observer.next(buffer);
                                                observer.complete();
                                            }, (error) => {
                                                audioContext.close();
                                                observer.error({
                                                    status: error.name,
                                                    statusText: error.message
                                                });
                                                observer.complete();
                                            });
                                        }
                                        else {
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
                                    observer.error({
                                        status: http.status,
                                        statusText: http.statusText
                                    });
                                    observer.complete();
                                }
                            }
                            else {
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
                                observer.next(http.responseText);
                                observer.complete();
                            }
                            else {
                                observer.error({
                                    status: http.status,
                                    statusText: http.statusText
                                });
                                observer.complete();
                            }
                        }
                    };
            }
            if (isObject(this.data)) {
                this.data = JSON.stringify(this.data);
            }
            http.send(this.data || null);
        });
    }
}

class HTTP {
    static setHeaders(method, headers) {
        if (METHODS.hasOwnProperty(method)) {
            for (const property in headers) {
                if (headers.hasOwnProperty(property)) {
                    if (headers[property] !== '') {
                        METHODS[method].headers[property] = headers[property];
                    }
                    else {
                        delete METHODS[method].headers[property];
                    }
                }
            }
        }
    }
}
HTTP.observable = {
    get: function (url, responseType, headers) {
        return new observable(METHODS.GET.type, url, responseType, null, headers).call();
    },
    head: function (url, responseType, headers) {
        return new observable(METHODS.HEAD.type, url, responseType, null, headers).call();
    },
    post: function (url, responseType, data, headers) {
        return new observable(METHODS.POST.type, url, responseType, data, headers).call();
    },
    put: function (url, responseType, data, headers) {
        return new observable(METHODS.PUT.type, url, responseType, data, headers).call();
    },
    delete: function (url, responseType, headers) {
        return new observable(METHODS.DELETE.type, url, responseType, null, headers).call();
    },
    connect: function (url, responseType, headers) {
        return new observable(METHODS.CONNECT.type, url, responseType, null, headers).call();
    },
    options: function (url, responseType, headers) {
        return new observable(METHODS.OPTIONS.type, url, responseType, null, headers).call();
    },
    trace: function (url, responseType, headers) {
        return new observable(METHODS.TRACE.type, url, responseType, null, headers).call();
    },
    patch: function (url, responseType, data, headers) {
        return new observable(METHODS.PATCH.type, url, responseType, data, headers).call();
    }
};
HTTP.promise = {
    get: function (url, responseType, headers) {
        return new promise(METHODS.GET.type, url, responseType, null, headers).call();
    },
    head: function (url, responseType, headers) {
        return new promise(METHODS.HEAD.type, url, responseType, null, headers).call();
    },
    post: function (url, responseType, data, headers) {
        return new promise(METHODS.POST.type, url, responseType, data, headers).call();
    },
    put: function (url, responseType, data, headers) {
        return new promise(METHODS.PUT.type, url, responseType, data, headers).call();
    },
    delete: function (url, responseType, headers) {
        return new promise(METHODS.DELETE.type, url, responseType, null, headers).call();
    },
    connect: function (url, responseType, headers) {
        return new promise(METHODS.CONNECT.type, url, responseType, null, headers).call();
    },
    options: function (url, responseType, headers) {
        return new promise(METHODS.OPTIONS.type, url, responseType, null, headers).call();
    },
    trace: function (url, responseType, headers) {
        return new promise(METHODS.TRACE.type, url, responseType, null, headers).call();
    },
    patch: function (url, responseType, data, headers) {
        return new promise(METHODS.PATCH.type, url, responseType, data, headers).call();
    }
};

export { HTTP };
