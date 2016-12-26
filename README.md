# versioneye-api-client

VersionEye API Client Library for node.js

[![npm version](https://img.shields.io/npm/v/versioneye-api-client.svg)](https://www.npmjs.com/package/versioneye-api-client)
![Node.js Version Support](https://img.shields.io/badge/Node.js%20support-v4,v6-brightgreen.svg)
[![Build Status](https://travis-ci.org/miyajan/versioneye-api-client.svg?branch=master)](https://travis-ci.org/miyajan/versioneye-api-client)
[![dependencies Status](https://david-dm.org/miyajan/versioneye-api-client/status.svg)](https://david-dm.org/miyajan/versioneye-api-client)
[![Coverage Status](https://coveralls.io/repos/github/miyajan/versioneye-api-client/badge.svg?branch=master)](https://coveralls.io/github/miyajan/versioneye-api-client?branch=master)
![License](https://img.shields.io/npm/l/versioneye-api-client.svg)

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
