## Synopsis

Aias.js is an open source promise and observable based HTTP client ES6 library.
It includes features like "audiobuffer" response type, comprehensive error handling and logging.

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

HTTP.setHeaders("POST", { "Content-Type": "application/json" }); // this is the default setting for POST requests
HTTP.setHeaders("GET", { "Content-Type": "application/x-www-form-urlencoded" }); // this is the default setting for

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

Aias.HTTP.setHeaders("POST", { "Content-Type": "application/json" }); // this is the default setting for POST requests
Aias.HTTP.setHeaders("GET", {
  "Content-Type": "application/x-www-form-urlencoded"
}); // this is the default setting for GET requests

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
```

## API Reference

```javascript

type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | Object | null | undefined;

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
  "A-IM"?: string | false;
  Accept?: string | false;
  "Accept-Charset"?: string | false;
  "Accept-Encoding"?: string | false;
  "Accept-Language"?: string | false;
  "Accept-Datetime"?: string | false;
  "Access-Control-Request-Method"?: string | false;
  "Access-Control-Request-Headers"?: string | false;
  Authorization?: string | false;
  "Cache-Control"?: string | false;
  Connection?: string | false;
  "Content-Length"?: number | false;
  "Content-MD5"?: string | false;
  "Content-Type"?: string | false;
  Cookie?: string | false;
  Date?: string | false;
  Expect?: string | false;
  Forwarded?: string | false;
  From?: string | false;
  Host?: string | false;
  "HTTP2-Settings"?: string | false;
  "If-Match"?: string | false;
  "If-Modified-Since"?: string | false;
  "If-None-Match"?: string | false;
  "If-Range"?: string | false;
  "If-Unmodified-Since"?: string | false;
  "Max-Forwards"?: string | false;
  Origin?: string | false;
  Pragma?: string | false;
  "Proxy-Authorization"?: string | false;
  Range?: string | false;
  Referer?: string | false;
  TE?: string | false;
  "User-Agent"?: string | false;
  Upgrade?: string | false;
  Via?: string | false;
  Warning?: string | false;
  [key: string]: string | number | false | undefined;
}

static HTTP.promise.get( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.head( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.post( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}
static HTTP.promise.put( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}
static HTTP.promise.delete( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.connect( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.options( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.trace( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.promise.patch( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}

static HTTP.observable.get( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.head( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.post( url: string, responseType: ResponseType, data: DataType ): Observable<ResponseDataType> {}
static HTTP.observable.put( url: string, responseType: ResponseType, data: DataType ): Observable<ResponseDataType> {}
static HTTP.observable.delete( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.connect( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.options( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.trace( url: string, responseType: ResponseType ): Observable<ResponseDataType> {}
static HTTP.observable.patch( url: string, responseType: ResponseType, data: DataType ): Observable<ResponseDataType> {}

static HTTP.setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders): void {}

```

### Methods definition

```javascript
METHODS: Methods = {
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
