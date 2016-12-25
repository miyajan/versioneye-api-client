'use strict';

const Base = require('./base');

class Users extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * Show the profile of the specific user
     * @param {string} username User Name
     * @return {!Promise}
     */
    show(username) {
        const params = {};
        const path = this.buildPathWithQuery('/users/' + username, params);
        return this.request('GET', path);
    }

    /**
     * List user's favorite packages
     * @param {string} username User Name
     * @param {?number=} opt_page Pagination number
     * @return {!Promise}
     */
    listFavorites(username, opt_page) {
        const params = {};
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery('/users/' + username + '/favorites', params);
        return this.request('GET', path);
    }

    /**
     * List user's comments
     * @param {string} username VersionEye's username
     * @param {?number=} opt_page Pagination number
     * @return {!Promise}
     */
    listComments(username, opt_page) {
        const params = {};
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery('/users/' + username + '/comments', params);
        return this.request('GET', path);
    }
}

module.exports = Users;
