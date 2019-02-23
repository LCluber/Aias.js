## Synopsis

[Aias.js](http://aiasjs.lcluber.com) is an open source HTTP client using Ajax and promises written in TypeScript.

## Motivation

The main purpose of this library is to provide a simple tool for sending asynchronous HTTP (Ajax) request.

## Installation

```bash
$ npm install @lcluber/aiasjs
```
Or download it **[here](http://aiasjs.lcluber.com/#download)**.

## Usage

### ES6

```javascript
import { HTTP } from '@lcluber/aiasjs';

var data = {
  firstname:'Galileo',
  lastname:'Galilei',
  born:1564,
  died:1642
};

HTTP.post("url", data)
    .then(response => { console.log(response); })
    .catch(err => { console.log('error', err.message); });
```

### IIFE

```html
<script src="node-modules/@lcluber/aiasjs/dist/aias.iife.min.js"></script>
```

```javascript
var data = {
  firstname:'Galileo',
  lastname:'Galilei',
  born:1564,
  died:1642
};

Aias.HTTP.post("url", data)
         .then(function (response) { console.log(response); })
         .catch(function (err) { console.log('error', err.message); });
```

## API Reference

Read the documentation **[here](http://aiasjs.lcluber.com/doc/)**.

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
