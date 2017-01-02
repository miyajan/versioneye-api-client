'use strict';

const Products = require('./lib/client/products');
const Services = require('./lib/client/services');
const Projects = require('./lib/client/projects');
const Organisations = require('./lib/client/organisations');
const Sessions = require('./lib/client/sessions');
const Me = require('./lib/client/me');
const Users = require('./lib/client/users');
const GitHub = require('./lib/client/github');
const Security = require('./lib/client/security');

/**
 * VersionEye API Client Class
 */
class VersionEye {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {?string=} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        /**
         * @type {!Products}
         */
        this.products = new Products(apiKey, opt_baseUri);
        /**
         * @type {!Services}
         */
        this.services = new Services(apiKey, opt_baseUri);
        /**
         * @type {!Projects}
         */
        this.projects = new Projects(apiKey, opt_baseUri);
        /**
         * @type {!Organisations}
         */
        this.organisations = new Organisations(apiKey, opt_baseUri);
        /**
         * @type {!Sessions}
         */
        this.sessions = new Sessions(apiKey, opt_baseUri);
        /**
         * @type {!Me}
         */
        this.me = new Me(apiKey, opt_baseUri);
        /**
         * @type {!Users}
         */
        this.users = new Users(apiKey, opt_baseUri);
        /**
         * @type {!GitHub}
         */
        this.github = new GitHub(apiKey, opt_baseUri);
        /**
         * @type {!Security}
         */
        this.security = new Security(apiKey, opt_baseUri);
    }
}

module.exports = VersionEye;
