## Synopsis

Aias.js is an open source promise based HTTP client written in TypeScript.
It adds features like "audiobuffer" response type, comprehensive error handling and logging.

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

HTTP.post.setHeaders({ "Content-Type": "application/json" }); // this is the default setting for POST requests
HTTP.POST("http://url.com/api/scientists", "json", scientist)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err.message);
  });

HTTP.get.setHeaders({ "Content-Type": "application/x-www-form-urlencoded" }); // this is the default setting for GET requests
HTTP.GET("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err.message);
  });
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

Aias.HTTP.post.setHeaders({ "Content-Type": "application/json" }); // this is the default setting for POST requests
Aias.HTTP.POST("http://url.com/api/scientists", "json", scientist)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log("error", err.message);
  });

Aias.HTTP.get.setHeaders({
  "Content-Type": "application/x-www-form-urlencoded"
}); // this is the default setting for GET requests
Aias.HTTP.GET("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err.message);
  });
```

## API Reference

```javascript

type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | Object | null;

type ResponseDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | AudioBuffer | FormData | URLSearchParams | ReadableStream | Object | null;

type ResponseType = 'arraybuffer' | 'audiobuffer' | 'blob' | 'document' | 'json' | 'text' | '';

interface HTTPHeaders {
  'A-IM'?: string;
  Accept?: string;
  'Accept-Charset'?: string;
  'Accept-Encoding'?: string;
  'Accept-Language'?: string;
  'Accept-Datetime'?: string;
  'Access-Control-Request-Method'?: string;
  'Access-Control-Request-Headers'?: string;
  Authorization?: string;
  'Cache-Control'?: string;
  Connection?: string;
  'Content-Length'?: number;
  'Content-MD5'?: string;
  'Content-Type'?: string;
  ...
}

static HTTP.GET( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.HEAD( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.POST( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}
static HTTP.PUT( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}
static HTTP.DELETE( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.CONNECT( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.OPTIONS( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.TRACE( url: string, responseType: ResponseType ): Promise<ResponseDataType> {}
static HTTP.PATCH( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> {}

static HTTP.get.setHeaders(headers: HTTPHeaders): void {}
static HTTP.get.getHeaders(): HTTPHeaders {}

static HTTP.head.setHeaders(headers: HTTPHeaders): void {}
static HTTP.head.getHeaders(): HTTPHeaders {}

static HTTP.post.setHeaders(headers: HTTPHeaders): void {}
static HTTP.post.getHeaders(): HTTPHeaders {}

static HTTP.put.setHeaders(headers: HTTPHeaders): void {}
static HTTP.put.getHeaders(): HTTPHeaders {}

static HTTP.delete.setHeaders(headers: HTTPHeaders): void {}
static HTTP.delete.getHeaders(): HTTPHeaders {}

static HTTP.connect.setHeaders(headers: HTTPHeaders): void {}
static HTTP.connect.getHeaders(): HTTPHeaders {}

static HTTP.options.setHeaders(headers: HTTPHeaders): void {}
static HTTP.options.getHeaders(): HTTPHeaders {}

static HTTP.trace.setHeaders(headers: HTTPHeaders): void {}
static HTTP.trace.getHeaders(): HTTPHeaders {}

static HTTP.patch.setHeaders(headers: HTTPHeaders): void {}
static HTTP.patch.getHeaders(): HTTPHeaders {}
```

## Tests

No tests to run yet

## Contributors

Aias.js is still in early development and I would be glad to get all the help you can provide for this project.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/Aias.js)** and See **NOTICE.md** for detailed installation walkthrough.

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
