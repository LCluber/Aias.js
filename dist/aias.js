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

import { Check } from '@lcluber/weejs';

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
