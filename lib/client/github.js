'use strict';

const Base = require('./base');

class GitHub extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * List all repositories from GitHub account
     * @param {?string=} opt_lang Filter by language
     * @param {?boolean=} opt_isPrivate Filter by visibility
     * @param {?string=} opt_orgName Filter by a name of an organization
     * @param {?string=} opt_orgType Filter by a type of an organization
     * @param {?number=} opt_page Number of page
     * @param {?boolean=} opt_onlyImported Show only imported repositories
     * @return {!Promise}
     */
    listRepositories(opt_lang, opt_isPrivate, opt_orgName, opt_orgType, opt_page, opt_onlyImported) {
        const params = {};
        if (opt_lang !== undefined) {
            params['lang'] = opt_lang;
        }
        if (opt_isPrivate !== undefined) {
            params['private'] = opt_isPrivate;
        }
        if (opt_orgName !== undefined) {
            params['org_name'] = opt_orgName;
        }
        if (opt_orgType !== undefined) {
            params['org_type'] = opt_orgType;
        }
        if (opt_page !== undefined) {
            params['page'] = opt_page;
        }
        if (opt_onlyImported !== undefined) {
            params['only_imported'] = opt_onlyImported;
        }
        const path = this.buildPathWithQuery('/github', params);
        return this.request('GET', path);
    }

    /**
     * Re-import GitHub repositories. This endpoint works asynchronously and returns a status code. The status code is either running or done.
     * @return {!Promise}
     */
    sync() {
        const params = {};
        const path = this.buildPathWithQuery('/github/sync', params);
        return this.request('GET', path);
    }

    /**
     * Get the detailed information for the specific repository
     * @param {string} repoKey Repository name
     * @return {!Promise}
     */
    showRepository(repoKey) {
        const params = {};
        const path = this.buildPathWithQuery(this._getRepositoryPath(repoKey), params);
        return this.request('GET', path);
    }

    /**
     * Import a project from GitHub
     * @param {string} repoKey Repository name
     * @param {?string=} opt_branch Branch name
     * @param {?string=} opt_file Project file (default is Gemfile)
     * @return {!Promise}
     */
    importRepository(repoKey, opt_branch, opt_file) {
        const params = {};
        const body = {};
        if (opt_branch !== undefined) {
            body['branch'] = opt_branch;
        }
        if (opt_file !== undefined) {
            body['file'] = opt_file;
        }
        const path = this.buildPathWithQuery(this._getRepositoryPath(repoKey), params);
        return this.request('POST', path, body);
    }

    /**
     * Delete the specific imported project
     * @param {string} repoKey Repository name
     * @param {?string=} opt_branch Branch name
     * @return {!Promise}
     */
    deleteRepository(repoKey, opt_branch) {
        const params = {};
        const body = {};
        if (opt_branch !== undefined) {
            body['branch'] = opt_branch;
        }
        const path = this.buildPathWithQuery(this._getRepositoryPath(repoKey), params);
        return this.request('DELETE', path, body);
    }

    /**
     * Trigger re-parsing the specific project
     * @param {string} projectId Project ID
     * @return {!Promise}
     */
    hook(projectId) {
        const path = '/github/hook/' + projectId;
        return this.request('POST', path);
    }

    /**
     * @param {string} repoKey Repository Key
     * @return {string} Repository Path
     * @private
     */
    _getRepositoryPath(repoKey) {
        return '/github/' + this.escape(repoKey);
    }
}

module.exports = GitHub;
