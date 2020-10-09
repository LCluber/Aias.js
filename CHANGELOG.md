## Version 2.7.4 (October 09st 2020)

- Fix default headers setup

## Version 2.7.3 (August 01st 2020)

- Fix declaration file for Typescript

## Version 2.7.2 (August 01st 2020)

- Fix issue with setHeaders method not setting headers properly

## Version 2.7.1 (June 15th 2020)

- Fix issue with setHeaders method in declarations file
- Add IE polyfills to dependencies

## Version 2.7.0 (June 14th 2020)

- Add polyfills for Internet Explorer compatibility

## [2.6.1](https://github.com/LCluber/Aias.js/compare/v2.6.0...v2.6.1) (2019-12-28)

### Bug Fixes

- **declaration:** fix missing import in declaration file ([7d8ad7e](https://github.com/LCluber/Aias.js/commit/7d8ad7ee06c08f8d78e12568ca0656d07913d965))

# [2.6.0](https://github.com/LCluber/Aias.js/compare/v2.5.0...v2.6.0) (2019-12-27)

### Features

- **mockup:** manage delay to mockup requests ([da15cbf](https://github.com/LCluber/Aias.js/commit/da15cbfa21d1b51518f5a0ec5c11c49fe217aba8))

# [2.5.0](https://github.com/LCluber/Aias.js/compare/v2.4.0...v2.5.0) (2019-12-24)

### Features

- **observables:** added observable event type ([3d5fbf9](https://github.com/LCluber/Aias.js/commit/3d5fbf96d00cd68a662277bff9b6bbfa6b6aa710))

# [2.4.0](https://github.com/LCluber/Aias.js/compare/v2.3.2...v2.4.0) (2019-10-27)

### Features

- **mockup:** add mockup data for testing ([b18ef4e](https://github.com/LCluber/Aias.js/commit/b18ef4e))

## [2.3.2](https://github.com/LCluber/Aias.js/compare/v2.3.1...v2.3.2) (2019-10-05)

### Bug Fixes

- **audiocontext:** improved audio context handling ([a681252](https://github.com/LCluber/Aias.js/commit/a681252))

## [2.3.1](https://github.com/LCluber/Aias.js/compare/v2.3.0...v2.3.1) (2019-10-05)

### Bug Fixes

- **audiobuffer:** polyfill for webaudioapi on safari ([63f47a8](https://github.com/LCluber/Aias.js/commit/63f47a8))

# [2.3.0](https://github.com/LCluber/Aias.js/compare/v2.2.0...v2.3.0) (2019-09-25)

### Features

- **logger:** added setloglevel and getloglevel methods ([7376865](https://github.com/LCluber/Aias.js/commit/7376865))

# [2.2.0](https://github.com/LCluber/Aias.js/compare/v2.1.0...v2.2.0) (2019-09-24)

### Bug Fixes

- **json:** better json type handling ([586cb8a](https://github.com/LCluber/Aias.js/commit/586cb8a))

### Features

- **audiobuffer:** added audiobuffer response type ([aae002c](https://github.com/LCluber/Aias.js/commit/aae002c))

# [2.1.0](https://github.com/LCluber/Aias.js/compare/v2.0.0...v2.1.0) (2019-09-23)

### Features

- **errors:** improved error handling ([7b77617](https://github.com/LCluber/Aias.js/commit/7b77617))

# [2.0.0](https://github.com/LCluber/Aias.js/compare/v1.0.2...v2.0.0) (2019-09-22)

### Features

- **responsetype:** added arraybuffer and blob response type ([cdd651b](https://github.com/LCluber/Aias.js/commit/cdd651b))

### BREAKING CHANGES

- **responsetype:** added responsetype as a second argument in call() method

## [1.0.2](https://github.com/LCluber/Aias.js/compare/v1.0.1...v1.0.2) (2019-08-16)

### Bug Fixes

- **dependencies:** updated dependencies ([c5675a7](https://github.com/LCluber/Aias.js/commit/c5675a7))

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
