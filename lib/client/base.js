'use strict';

const fetch = require('node-fetch');

/**
 * Base class for VersionEye API Client Classes
 */
class Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        this.apiKey = apiKey;
        this.baseUri = opt_baseUri || 'https://www.versioneye.com/api/v2';
    }

    /**
     * Send a request to VersionEye
     * @param {string} method HTTP method
     * @param {string} path Relative path
     * @param {Object=} opt_body Request body
     * @return {!Promise} Promise returns JSON response if the request succeeded and returns Error if it failed
     * @protected
     */
    request(method, path, opt_body) {
        return fetch(this.baseUri + path, {
            method: method,
            body: opt_body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(new Error(response));
            }
        });
    }

    /**
     * Post form data to VersionEye
     * @param {string} path
     * @param {!FormData} form
     * @return {!Promise}
     * @protected
     */
    postForm(path, form) {
        return fetch(this.baseUri + path, {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(new Error(response));
            }
        });
    }

    /**
     * Build a query string
     * @param {!Object} params Key-value object
     * @return {string} Query string starting with '?'
     * @protected
     */
    buildQueryString(params) {
        if (this.apiKey.length > 0) {
            params['api_key'] = this.apiKey;
        }
        let queryString = '';
        for (const key in params) {
            const value = params[key];
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
        if (queryString.length > 0) {
            queryString = '?' + queryString.substring(0, queryString.length - 1); // cut off last '&'
        }
        return queryString;
    }

    /**
     * Build a path
     * @param {string} path
     * @param {!Object} params
     * @return {string}
     * @protected
     */
    buildPathWithQuery(path, params) {
        return path + this.buildQueryString(params);
    }

    /**
     * Replace all slashes '/' with colons ':' and all dots '.' with '~'
     * @param {string} key Key to be escaped
     * @return {string}
     * @protected
     */
    escape(key) {
        return key.replace(/\//g, ':').replace(/\./g, '~');
    }
}

module.exports = Base;
