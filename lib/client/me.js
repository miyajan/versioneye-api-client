'use strict';

const Base = require('./base');

class Me extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * Get the profile of the authorized user
     * @return {!Promise}
     */
    show() {
        const params = {};
        const path = this.buildPathWithQuery('/me', params);
        return this.request('GET', path);
    }

    /**
     * List the packages you are following
     * @param {?number=} opt_page page number for pagination
     * @return {!Promise}
     */
    listFavorites(opt_page) {
        const params = {};
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery('/me/favorites', params);
        return this.request('GET', path);
    }

    /**
     * List comments of the authorized user
     * @param opt_page
     * @return {!Promise}
     */
    listComments(opt_page) {
        const params = {};
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery('/me/comments', params);
        return this.request('GET', path);
    }

    /**
     * List 30 latest unread notifications
     * @return {!Promise}
     */
    listNotifications() {
        const params = {};
        const path = this.buildPathWithQuery('/me/notifications', params);
        return this.request('GET', path);
    }
}

module.exports = Me;
