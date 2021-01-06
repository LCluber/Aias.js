## Synopsis

Aias.js is an open source promise and observable based HTTP client ES6 library.
It includes features like "audiobuffer" response type and works on old browsers.

## Motivation

The main purpose of this library is to provide a simple tool for sending asynchronous HTTP (Ajax) requests.

## Installation

### NPM

```bash
$ npm install @lcluber/aiasjs
```

### Yarn

```bash
$ yarn add @lcluber/aiasjs
```

## Usage

### ES6

```javascript
import { HTTP } from "@lcluber/aiasjs";

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

// Set headers globally
HTTP.setHeaders("POST", { "Content-Type": "application/json" }); // Default setting for POST requests
HTTP.setHeaders("GET", { "Content-Type": "application/x-www-form-urlencoded" }); // Default setting for GET requests

// example for authorization headers :
var bearer = `Bearer ${token}`; // where token is your json web token 
HTTP.setHeaders("GET", { Authorization: bearer });
HTTP.setHeaders("POST", { Authorization: bearer });
HTTP.setHeaders("PATCH", { Authorization: bearer });
HTTP.setHeaders("PUT", { Authorization: bearer });

// Using promises

// POST request using promise
HTTP.promise.post("http://url.com/api/scientists", "json", scientist)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// GET request using promise
HTTP.promise.get("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// GET request using observable
HTTP.observable.get("http://url.com/api/scientists/2", "json").subscribe(
  response => {
    console.log(response);
  },
  err => console.log("error", err)
);

// POST request with multipart/form-data
HTTP.observable.post(`${environment.api}post/img`, 
                          'json',
                          imgFile, // the file as FormData
                          { "Content-Type": '' } // set headers only for this request. Set to '' to delete a property set in global headers.
                    ).subscribe(
  response => {
    console.log(response);
  },
  err => console.log("error", err)
); 

```

### IIFE

```html
<script src="node-modules/@lcluber/aiasjs/dist/aias.iife.min.js"></script>
```

```javascript
var scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

// Set headers globally
Aias.HTTP.setHeaders("POST", { "Content-Type": "application/json" }); // Default setting for POST requests
Aias.HTTP.setHeaders("GET", { "Content-Type": "application/x-www-form-urlencoded" }); // Default setting for GET requests

// example for authorization headers :
var bearer = `Bearer ${token}`; // where token is your json web token 
Aias.HTTP.setHeaders("GET", { Authorization: bearer });
Aias.HTTP.setHeaders("POST", { Authorization: bearer });
Aias.HTTP.setHeaders("PATCH", { Authorization: bearer });
Aias.HTTP.setHeaders("PUT", { Authorization: bearer });

// Using promises

// POST request using promise
Aias.HTTP.promise.post("http://url.com/api/scientists", "json", scientist)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log("error", err);
  });

// GET request using promise
Aias.HTTP.promise.get("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// GET request using observables
Aias.HTTP.observable.get("http://url.com/api/scientists/2", "json").subscribe(
  response => {
    console.log(response);
  },
  err => console.log("error", err)
);

// POST request with multipart/form-data
Aias.HTTP.observable.post(`${environment.api}post/img`, 
                          'json',
                          imgFile, // the file as FormData
                          { "Content-Type": '' } // set headers only for this request. Set to '' to delete a property set in global headers.
                    ).subscribe(
  response => {
    console.log(response);
  },
  err => console.log("error", err)
); 

```

## API Reference

```javascript

type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | Object | null;

type ResponseDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | AudioBuffer | FormData | URLSearchParams | ReadableStream | Object | null;

type ResponseType = 'arraybuffer' | 'audiobuffer' | 'blob' | 'document' | 'json' | 'text' | '';

interface Methods {
  GET: Method;
  HEAD: Method;
  POST: Method;
  PUT: Method;
  DELETE: Method;
  CONNECT: Method;
  OPTIONS: Method;
  TRACE: Method;
  PATCH: Method;

interface HTTPHeaders {
  "A-IM"?: string;
  Accept?: string;
  "Accept-Charset"?: string;
  "Accept-Encoding"?: string;
  "Accept-Language"?: string;
  "Accept-Datetime"?: string;
  "Access-Control-Request-Method"?: string;
  "Access-Control-Request-Headers"?: string;
  Authorization?: string;
  "Cache-Control"?: string;
  Connection?: string;
  "Content-Length"?: number;
  "Content-MD5"?: string;
  "Content-Type"?: string;
  Cookie?: string;
  Date?: string;
  Expect?: string;
  Forwarded?: string;
  From?: string;
  Host?: string;
  "HTTP2-Settings"?: string;
  "If-Match"?: string;
  "If-Modified-Since"?: string;
  "If-None-Match"?: string;
  "If-Range"?: string;
  "If-Unmodified-Since"?: string;
  "Max-Forwards"?: string;
  Origin?: string;
  Pragma?: string;
  "Proxy-Authorization"?: string;
  Range?: string;
  Referer?: string;
  TE?: string;
  "User-Agent"?: string;
  Upgrade?: string;
  Via?: string;
  Warning?: string;
}

static HTTP.promise.get( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined ): Promise<ResponseDataType> {}
static HTTP.promise.head( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.post( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.put( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.delete( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.connect( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.options( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.trace( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}
static HTTP.promise.patch( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Promise<ResponseDataType> {}

static HTTP.observable.get( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.head( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.post( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.put( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.delete( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.connect( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.options( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.trace( url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}
static HTTP.observable.patch( url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined  ): Observable<ResponseDataType> {}

// set headers globally
static HTTP.setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders): void {}

```

### Methods definition

```javascript
METHODS: Methods = {
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
}
```

## Tests

```bash
$ npm run test
```

## License

MIT License

Copyright (c) 2010 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
