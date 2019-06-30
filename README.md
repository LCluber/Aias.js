## Synopsis

Aias.js is an open source promise based HTTP client using written in TypeScript.

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
HTTP.POST("http://url.com/api/scientist", scientist)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err.message);
  });

HTTP.get.setHeaders({ "Content-Type": "application/x-www-form-urlencoded" }); // this is the default setting for GET requests
HTTP.GET("http://url.com/api/scientist/2")
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
Aias.HTTP.POST("http://url.com/api/scientist", scientist)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log("error", err.message);
  });

Aias.HTTP.get.setHeaders({
  "Content-Type": "application/x-www-form-urlencoded"
}); // this is the default setting for GET requests
Aias.HTTP.GET("http://url.com/api/scientist/2")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err.message);
  });
```

## API Reference

```javascript

type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | null;

type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | '';

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
  ....
}

static HTTP.GET( url: string ): Promise<DataType> {}
static HTTP.HEAD( url: string ): Promise<DataType> {}
static HTTP.POST( url: string, data: DataType|Object ): Promise<DataType> {}
static HTTP.PUT( url: string, data: DataType|Object ): Promise<DataType> {}
static HTTP.DELETE( url: string ): Promise<DataType> {}
static HTTP.CONNECT( url: string ): Promise<DataType> {}
static HTTP.OPTIONS( url: string ): Promise<DataType> {}
static HTTP.TRACE( url: string ): Promise<DataType> {}
static HTTP.PATCH( url: string, data: DataType|Object ): Promise<DataType> {}

static HTTP.get.setHeaders(headers: HTTPHeaders): void {}
static HTTP.get.setResponseType(responseType: ResponseType): void {}
static HTTP.get.getHeaders(): HTTPHeaders {}
static HTTP.get.getResponseType(): ResponseType {}

static HTTP.head.setHeaders(headers: HTTPHeaders): void {}
static HTTP.head.setResponseType(responseType: ResponseType): void {}
static HTTP.head.getHeaders(): HTTPHeaders {}
static HTTP.head.getResponseType(): ResponseType {}

static HTTP.post.setHeaders(headers: HTTPHeaders): void {}
static HTTP.post.setResponseType(responseType: ResponseType): void {}
static HTTP.post.getHeaders(): HTTPHeaders {}
static HTTP.post.getResponseType(): ResponseType {}

static HTTP.put.setHeaders(headers: HTTPHeaders): void {}
static HTTP.put.setResponseType(responseType: ResponseType): void {}
static HTTP.put.getHeaders(): HTTPHeaders {}
static HTTP.put.getResponseType(): ResponseType {}

static HTTP.delete.setHeaders(headers: HTTPHeaders): void {}
static HTTP.delete.setResponseType(responseType: ResponseType): void {}
static HTTP.delete.getHeaders(): HTTPHeaders {}
static HTTP.delete.getResponseType(): ResponseType {}

static HTTP.connect.setHeaders(headers: HTTPHeaders): void {}
static HTTP.connect.setResponseType(responseType: ResponseType): void {}
static HTTP.connect.getHeaders(): HTTPHeaders {}
static HTTP.connect.getResponseType(): ResponseType {}

static HTTP.options.setHeaders(headers: HTTPHeaders): void {}
static HTTP.options.setResponseType(responseType: ResponseType): void {}
static HTTP.options.getHeaders(): HTTPHeaders {}
static HTTP.options.getResponseType(): ResponseType {}

static HTTP.trace.setHeaders(headers: HTTPHeaders): void {}
static HTTP.trace.setResponseType(responseType: ResponseType): void {}
static HTTP.trace.getHeaders(): HTTPHeaders {}
static HTTP.trace.getResponseType(): ResponseType {}

static HTTP.patch.setHeaders(headers: HTTPHeaders): void {}
static HTTP.patch.setResponseType(responseType: ResponseType): void {}
static HTTP.patch.getHeaders(): HTTPHeaders {}
static HTTP.patch.getResponseType(): ResponseType {}
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
