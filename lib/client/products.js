'use strict';

const Base = require('./base');
const FormData = require('form-data');
const fs = require('fs');

class Products extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * Search packages
     * @param {string} query Query string. At least 2 characters.
     * @param {?string|Array.<string>=} opt_lang Filter results by programming languages; For filtering multiple languages pass an array of language strings.
     * @param {?string=} opt_groupId Filter by GroupID. This is Java/Maven specific
     * @param {?number=} opt_page Specify page for paging
     * @return {!Promise}
     */
    search(query, opt_lang, opt_groupId, opt_page) {
        const params = {};
        if (opt_lang != undefined) {
            if (Array.isArray(opt_lang)) {
                opt_lang = opt_lang.join(',');
            }
            params['lang'] = opt_lang;
        }
        if (opt_groupId != undefined && opt_groupId.length > 0) {
            params['g'] = opt_groupId;
        }
        if (opt_page != undefined && opt_page > 0) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery('/products/search/' + query, params);
        return this.request('GET', path)
    }

    /**
     * Get detailed information for the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @param {?string=} opt_version Version
     * @return {!Promise}
     */
    show(lang, prodKey, opt_version) {
        const params = {};
        if (opt_version != undefined) {
            params['prod_version'] = opt_version;
        }
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey), params);
        return this.request('GET', path);
    }

    /**
     * List versions for the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @return {!Promise}
     */
    listVersions(lang, prodKey) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/versions', params);
        return this.request('GET', path);
    }

    /**
     * Get a following status for the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @return {!Promise}
     */
    getFollowStatus(lang, prodKey) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/follow', params);
        return this.request('GET', path);
    }

    /**
     * Follow the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @return {!Promise}
     */
    follow(lang, prodKey) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/follow', params);
        return this.request('POST', path);
    }

    /**
     * Unfollow the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @return {!Promise}
     */
    unfollow(lang, prodKey) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/follow', params);
        return this.request('DELETE', path);
    }

    /**
     * List references for the specific package
     * @param {string} lang Name of programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @param {?number} opt_page Page for paging
     * @return {!Promise}
     */
    listReferences(lang, prodKey, opt_page) {
        const params = {};
        if (opt_page != undefined && opt_page > 0) {
            params['page'] = opt_page;
        }
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/references', params);
        return this.request('GET', path);
    }

    /**
     * Upload a changelog.xml from the maven-changelog-plugin, assign it to a specific artifact and display the changelog information on the product page
     * @param {string} lang Programming language
     * @param {string} prodKey Product key. '/' and '.' will be escaped
     * @param {string} prodVersion Product version
     * @param {string} scmFilePath Path to changelog.xml
     * @return {!Promise}
     */
    uploadSCMChangelogs(lang, prodKey, prodVersion, scmFilePath) {
        const params = {};
        const form = new FormData();
        form.append('scm_changes_file', fs.createReadStream(scmFilePath));
        const path = this.buildPathWithQuery(this._getProductPath(lang, prodKey) + '/' + prodVersion + '/scm_changes', params);
        return this.postForm(path, form);
    }

    /**
     * @param {string} lang
     * @param {string} prodKey
     * @return {string}
     * @private
     */
    _getProductPath(lang, prodKey) {
        return '/products/' + lang + '/' + this.escape(prodKey);
    }
}

module.exports = Products;
