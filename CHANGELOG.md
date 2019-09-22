# [2.0.0](https://github.com/LCluber/Aias.js/compare/v1.0.2...v2.0.0) (2019-09-22)


### Features

* **responsetype:** added arraybuffer and blob response type ([cdd651b](https://github.com/LCluber/Aias.js/commit/cdd651b))


### BREAKING CHANGES

* **responsetype:** added responsetype as a second argument in call method

## [1.0.2](https://github.com/LCluber/Aias.js/compare/v1.0.1...v1.0.2) (2019-08-16)


### Bug Fixes

* **dependencies:** updated dependencies ([c5675a7](https://github.com/LCluber/Aias.js/commit/c5675a7))

## Version 1.0.1 (July 1st 2019)

- Fixed declaration file

## Version 1.0.0 (June 30th 2019)

- Call methods are now in uppercase (HTTP.GET(), HTTP.POST() ...)
- SetHeaders() and setResponseType() methods are now at Method level (HTTP.get.setHeaders({}), HTTP.post.setHeaders({}))
- Added getHeaders() and getResponseType() methods in Method class.

## Version 0.1.16 (June 27th 2019)

- Updated Mouette logger for log groups management

## Version 0.1.15 (April 06th 2019)

- Updated README.md

## Version 0.1.14 (March 17th 2019)

- Improved typings

## Version 0.1.13 (March 02nd 2019)

- Added setResponseType() method

## Version 0.1.12 (February 26th 2019)

- Fixed available data types

## Version 0.1.11 (February 25th 2019)

- Replaced HTTP.setHeader() method by HTTP.setHeaders()

## Version 0.1.10 (February 24th 2019)

- Improved logger messages
- Updated Mouette.js dependency to version 0.2.9

## Version 0.1.9 (December 24th 2018)

- Library is lighter
- Replaced Wee.js dependency by Ch.js
- Better Typing for data parameter
- Updated Mouette.js dependency to version 0.2.8
- New Usage section in README.md

## Version 0.1.8 (December 07th 2018)

- Added logs with @lcluber/Mouettejs

## Version 0.1.7 (December 04th 2018)

- Added setHeaders() method to configure HTTP header fields

## Version 0.1.6 (November 28th 2018)

- Aias.js published on NPM at @lcluber/aiasjs
- Updated README.md with NPM installation procedure

## Version 0.1.5 (November 07th 2018)

- Updated Ajax Class with all HTTP request methods

## Version 0.1.4 (July 14th 2018)

- The library is dockerized and can be used as a container

## Version 0.1.3 (June 19th 2018)

- Documentation automatically generated in /doc folder
- Typedoc and grunt-typedoc added in devDependencies
- New "typedoc" task in Gruntfile.js
- Typescript upgraded to version 2.9.2

## Version 0.1.2 (June 16th 2018)

- Library exported as ES6 and IIFE modules instead of UMD
- AIAS namespace becomes Aias

## Version 0.1.1 (April 29th 2018)

- Now uses promises

## Version 0.1.0 (November 23rd 2010)

- Initial version
