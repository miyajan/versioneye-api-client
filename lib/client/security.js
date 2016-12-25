'use strict';

const Base = require('./base');

class Security extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * List security vulnerabilities
     * @param {string} lang Filter by a programming language
     * @param {?string=} opt_prodKey Product name
     * @param {?number=} opt_page Number for paging
     * @param {?string=} opt_ascSort Asc sort by value
     * @param {?string=} opt_descSort Desc sort by value
     * @return {!Promise}
     */
    listVulnerabilities(lang, opt_prodKey, opt_page, opt_ascSort, opt_descSort) {
        const params = {
            'language': lang
        };
        if (opt_prodKey !== undefined) {
            params['prod_key'] = opt_prodKey;
        }
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        if (opt_ascSort !== undefined) {
            params['asc_sort'] = opt_ascSort;
        }
        if (opt_descSort !== undefined) {
            params['desc_sort'] = opt_descSort;
        }
        const path = this.buildPathWithQuery('/security', params);
        return this.request('GET', path);
    }

}

module.exports = Security;
