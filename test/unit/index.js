'use strict';

const basePath = '../..';
const VersionEye = require(basePath + '/index');
const Products = require(basePath + '/lib/client/products');
const Services = require(basePath + '/lib/client/services');
const Projects = require(basePath + '/lib/client/projects');
const Organisations = require(basePath + '/lib/client/organisations');
const Sessions = require(basePath + '/lib/client/sessions');
const Me = require(basePath + '/lib/client/me');
const Users = require(basePath + '/lib/client/users');
const GitHub = require(basePath + '/lib/client/github');
const Security = require(basePath + '/lib/client/security');
const assert = require('assert');

describe('VersionEye Class', function() {
    let versioneye;
    let apiKey = 'dummy';

    beforeEach(function() {
        versioneye = new VersionEye(apiKey);
    });

    it.only('should have clients', function() {
        assert(versioneye.products instanceof Products);
        assert(versioneye.services instanceof Services);
        assert(versioneye.projects instanceof Projects);
        assert(versioneye.organisations instanceof Organisations);
        assert(versioneye.sessions instanceof Sessions);
        assert(versioneye.me instanceof Me);
        assert(versioneye.users instanceof Users);
        assert(versioneye.github instanceof GitHub);
        assert(versioneye.security instanceof Security);
    });
});
