'use strict';

const Base = require('./base');

class Organisations extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * List all components which are used as dependencies inside the given organisation
     * @see https://github.com/versioneye/versioneye-api/blob/master/docs/api/v2/organisation.md
     * @param {string} org Organization Name
     * @param {?string=} opt_team Filter by a team name
     * @param {?string=} opt_lang Filter by a programming language
     * @param {?string=} opt_projectVersion Filter by a project version
     * @param {?string=} opt_postFilter Post processing filter. Possible values are 'ALL', 'duplicates_only', 'show_duplicates'
     * @return {!Promise}
     */
    inventory(org, opt_team, opt_lang, opt_projectVersion, opt_postFilter) {
        const params = {};
        if (opt_team !== undefined) {
            params['team_name'] = opt_team;
        }
        if (opt_lang !== undefined) {
            params['language'] = opt_lang;
        }
        if (opt_projectVersion !== undefined) {
            params['project_version'] = opt_projectVersion;
        }
        if (opt_postFilter !== undefined) {
            params['post_filter'] = opt_postFilter;
        }
        const path = this.buildPathWithQuery('/organisations/' + org + '/inventory', params);
        return this.request('GET', path);
    }
}

module.exports = Organisations;
