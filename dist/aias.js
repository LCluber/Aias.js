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

import { Check, Dom } from '@lcluber/weejs';

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

const LEVELS = [
    { id: 1, name: 'info' },
    { id: 2, name: 'trace' },
    { id: 3, name: 'warn' },
    { id: 4, name: 'error' },
    { id: 99, name: 'off' }
];

class Message {
    constructor(levelName, content) {
        this.setLevel(levelName);
        this.content = content;
    }
    setLevel(name) {
        this.level = this.findLevel(name);
    }
    getLevelId() {
        return this.level.id;
    }
    display() {
        console[this.level.name](this.content);
    }
    findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this.level ? this.level : LEVELS[0];
    }
}

class Logger {
    set level(name) {
        Logger._level = Logger.findLevel(name);
    }
    get level() {
        return Logger._level.name;
    }
    static info(text) {
        Logger.log('info', text);
    }
    static trace(text) {
        Logger.log('trace', text);
    }
    static time(text) {
        Logger.log('time', text);
    }
    static warn(text) {
        Logger.log('warn', text);
    }
    static error(text) {
        Logger.log('error', text);
    }
    static log(levelName, content) {
        Logger.addMessage(levelName, content);
        let message = this.messages[this.nbMessages - 1];
        if (this._level.id <= message.getLevelId()) {
            message.display();
        }
    }
    static addMessage(levelName, content) {
        this.messages.push(new Message(levelName, content));
        this.nbMessages++;
    }
    static findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this._level ? this._level : LEVELS[0];
    }
}
Logger._level = Logger.findLevel(LEVELS[0].name);
Logger.messages = [];
Logger.nbMessages = 0;
Logger.target = Dom.findById('Mouette');

class HTTP {
    static get(url) {
        return this.call('GET', url);
    }
    static head(url) {
        return this.call('HEAD', url);
    }
    static post(url, data) {
        return this.call('POST', url, data);
    }
    static put(url, data) {
        return this.call('PUT', url, data);
    }
    static delete(url) {
        return this.call('DELETE', url);
    }
    static connect(url) {
        return this.call('CONNECT', url);
    }
    static options(url) {
        return this.call('OPTIONS', url);
    }
    static trace(url) {
        return this.call('TRACE', url);
    }
    static patch(url, data) {
        return this.call('PATCH', url, data);
    }
    static setHeaders(headers) {
        for (const property in headers) {
            if (headers.hasOwnProperty(property)) {
                this.headers[property] = headers[property];
            }
        }
    }
    static call(method, url, data) {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            if (this.noCache) {
                url += '?cache=' + (new Date()).getTime();
            }
            http.open(method, url, this.async);
            for (let property in this.headers) {
                if (this.headers.hasOwnProperty(property)) {
                    http.setRequestHeader(property, this.headers[property]);
                }
            }
            http.onreadystatechange = () => {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        Logger.info('xhr done successfully (' + url + ')');
                        resolve(http.responseText);
                    }
                    else {
                        Logger.error('xhr failed (' + url + ')');
                        reject(http.status);
                    }
                }
            };
            Logger.info('xhr processing starting (' + url + ')');
            if (data == undefined) {
                http.send();
                return;
            }
            if (Check.isObject(data)) {
                data = JSON.stringify(data);
            }
            http.send(data);
        });
    }
}
HTTP.async = true;
HTTP.noCache = false;
HTTP.headers = {
    'Content-Type': 'application/json'
};

export { HTTP };
