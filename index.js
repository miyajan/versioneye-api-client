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
        this.products = new Products(apiKey, opt_baseUri);
        this.services = new Services(apiKey, opt_baseUri);
        this.projects = new Projects(apiKey, opt_baseUri);
        this.organisations = new Organisations(apiKey, opt_baseUri);
        this.sessions = new Sessions(apiKey, opt_baseUri);
        this.me = new Me(apiKey, opt_baseUri);
        this.users = new Users(apiKey, opt_baseUri);
        this.github = new GitHub(apiKey, opt_baseUri);
        this.security = new Security(apiKey, opt_baseUri);
    }
}

module.exports = VersionEye;
