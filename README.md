# versioneye-api-client

VersionEye API Client Library for node.js

[![Build Status](https://travis-ci.org/miyajan/versioneye-api-client.svg?branch=master)](https://travis-ci.org/miyajan/versioneye-api-client)
[![dependencies Status](https://david-dm.org/miyajan/versioneye-api-client/status.svg)](https://david-dm.org/miyajan/versioneye-api-client)

## Description

See https://www.versioneye.com/api/ for API documents.

## Install

```
npm install versioneye-api-client
```

## Usage

```javascript
const VersionEye = require('versioneye-api-client');

const apiKey = 'your api token';
const versioneye = new VersionEye(apiKey);
versioneye.me.show().then(json => {
   console.log(json['username']); // print your username 
});
```

## Contribution

1. Fork
2. Create a feature branch
3. Commit your changes
4. Rebase your local changes against the master branch
5. Run `npm test`
6. Create new Pull Request

## License

MIT

## Author

[miyajan](https://github.com/miyajan): Jumpei Miyata miyajan777@gmail.com
