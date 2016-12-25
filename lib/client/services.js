'use strict';

const Base = require('./base');

class Services extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * Ping to VersionEye
     * @return {!Promise}
     */
    ping() {
        const params = {};
        const path = this.buildPathWithQuery('/services/ping', params);
        return this.request('GET', path);
    }
}

module.exports = Services;
