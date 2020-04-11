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

// POST request
HTTP.post("http://url.com/api/scientists", "json", scientist)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// GET request
HTTP.get("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// Using observables

// GET request
HTTP.setEventType("observable");

HTTP.get("http://url.com/api/scientists/2", "json").subscribe(
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

// POST request
Aias.HTTP.post("http://url.com/api/scientists", "json", scientist)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log("error", err);
  });

// GET request
Aias.HTTP.get("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error", err);
  });

// Using observables

// GET request
Aias.HTTP.setEventType("observable");

Aias.HTTP.get("http://url.com/api/scientists/2", "json").subscribe(
  response => {
    console.log(response);
  },
  err => console.log("error", err)
);
```

### Mockup

You can simulate HTTP requests without actually sending them to a server in order to test your application by using setMockup() method.

```javascript
import { HTTP } from "@lcluber/aiasjs";

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

HTTP.setMockup({ data: scientist, delay: 200 });
HTTP.setHeaders("GET", { "Content-Type": "application/x-www-form-urlencoded" }); // this is the default setting for GET requests

// Using promises

HTTP.get("http://url.com/api/scientists/2", "json")
  .then(response => {
    console.log(response); //scientist
  })
  .catch(err => {
    console.log("error", err);
  });

// Using observables

HTTP.setEventType("observable");

HTTP.get("http://url.com/api/scientists/2", "json").subscribe(
  response => {
    console.log(response); //scientist
  },
  err => console.log("error", err)
);
```

## API Reference

```javascript

interface Mockup {
  data: ResponseDataType;
  delay: number;
}

type EventType = "promise" | "observable";

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

static HTTP.get( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.head( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.post( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.put( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.delete( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.connect( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.options( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.trace( url: string, responseType: ResponseType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}
static HTTP.patch( url: string, responseType: ResponseType, data: DataType ): Promise<ResponseDataType> | Observable<ResponseDataType> {}

static HTTP.setEventType(eventType: EventType): void {}

// Log levels from @lcluber Mouette.js logger library
type LevelName = "info" | "trace" | "warn" | "error" | "off";
static HTTP.setLogLevel(name: LevelName): LevelName {}
static HTTP.getLogLevel(): LevelName {}

static HTTP.setMockup(mockup: Partial<Mockup> = { data: ResponseDataType, delay: number}): void {}

static HTTP.setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders): void {}
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
