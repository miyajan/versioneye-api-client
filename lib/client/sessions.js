'use strict';

const Base = require('./base');
const FormData = require('form-data');

class Sessions extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * If current user has active session, then this method will return 200 with short user profile. In other cases, it will return error message with status code 401.
     * @return {!Promise}
     */
    show() {
        return this.request('GET', '/sessions');
    }

    /**
     * Create a new session
     * @param {string} apiKey your personal API key
     * @return {!Promise}
     */
    createSession(apiKey) {
        const form = new FormData();
        form.append('api_key', apiKey);
        return this.postForm('/sessions', form);
    }

    /**
     * Delete a current session
     * @return {!Promise}
     */
    deleteSession() {
        return this.request('DELETE', '/sessions');
    }
}

module.exports = Sessions;
