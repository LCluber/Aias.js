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

class HTTP {
    static get(url) {
        return this.call('GET', url);
    }
    static head(url) {
        return this.call('HEAD', url);
    }
    static post(url) {
        return this.call('POST', url);
    }
    static put(url) {
        return this.call('PUT', url);
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
    static patch(url) {
        return this.call('PATCH', url);
    }
    static call(method, url) {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            if (this.noCache) {
                url += '?cache=' + (new Date()).getTime();
            }
            http.open(method, url, this.async);
            http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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
            http.send();
        });
    }
}
HTTP.async = true;
HTTP.noCache = false;

export { HTTP };
