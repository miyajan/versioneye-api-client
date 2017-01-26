'use strict';

const Base = require('./base');
const FormData = require('form-data');
const fs = require('fs');

class Projects extends Base {
    /**
     * Constructor
     * @param {string} apiKey API key for VersionEye
     * @param {string} opt_baseUri Base URI (default: https://www.versioneye.com/api/v2)
     */
    constructor(apiKey, opt_baseUri) {
        super(apiKey, opt_baseUri);
    }

    /**
     * List projects
     * @param {?string=} opt_org The name of the organization the project is assigned to
     * @param {?string=} opt_team The name of the team in the organization this project is assigned to
     * @return {!Promise}
     */
    list(opt_org, opt_team) {
        const params = {};
        if (opt_org !== undefined) {
            params['orga_name'] = opt_org;
        }
        if (opt_team !== undefined) {
            params['team_name'] = opt_team;
        }
        const path = this.buildPathWithQuery('/projects', params);
        return this.request('GET', path);
    }

    /**
     * Show detailed information for the specific project
     * @param {string} projectId Project ID
     * @return {!Promise}
     */
    show(projectId) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProjectPath(projectId), params);
        return this.request('GET', path);
    }

    /**
     * Upload a project file and create a new project
     * @param {string} filePath Project file - [maven.pom, Gemfile, ...]
     * @param {?string=} opt_visibility By default 'public'. If 'public' everybody can see the project
     * @param {?string=} opt_name The name of the VersionEye project. By default it is the filename
     * @param {?string=} opt_org The name of the organization this project should be assigned to
     * @param {?string=} opt_team The name of the team in the organization this project should be assigned to
     * @param {?boolean=} opt_temp If true this project will not show up in the UI and gets removed later
     * @return {!Promise}
     */
    create(filePath, opt_visibility, opt_name, opt_org, opt_team, opt_temp) {
        const params = {};
        const form = new FormData();
        form.append('upload', fs.createReadStream(filePath));
        if (opt_visibility !== undefined) {
            form.append('visibility', opt_visibility);
        }
        if (opt_name !== undefined) {
            form.append('name', opt_name);
        }
        if (opt_org !== undefined) {
            form.append('orga_name', opt_org);
        }
        if (opt_team !== undefined) {
            form.append('team_name', opt_team);
        }
        if (opt_team !== undefined) {
            form.append('temp', opt_temp);
        }
        const path = this.buildPathWithQuery('/projects', params);
        return this.postForm(path, form);
    }

    /**
     * Update a project with a new file
     * @param {string} projectId Project ID
     * @param {string} filePath Project file - [maven.pom, Gemfile, ...]
     * @return {!Promise}
     */
    update(projectId, filePath) {
        const params = {};
        const form = new FormData();
        form.append('project_key', projectId);
        form.append('project_file', fs.createReadStream(filePath));
        const path = this.buildPathWithQuery(this._getProjectPath(projectId), params);
        return this.postForm(path, form);
    }

    /**
     * Delete the specific project
     * @param {string} projectId Project ID
     * @return {!Promise}
     */
    deleteProject(projectId) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProjectPath(projectId), params);
        return this.request('DELETE', path);
    }

    /**
     * List licenses for the specific project
     * @param {string} projectId Project ID
     * @return {!Promise}
     */
    listLicenses(projectId) {
        const params = {};
        const path = this.buildPathWithQuery(this._getProjectPath(projectId) + '/licenses', params);
        return this.request('GET', path);
    }

    /**
     * Merge a project (childId) into another one (groupId/artifactId). This is specially for Maven based projects
     * @param {string} groupId Group ID of the parent
     * @param {string} artifactId Artifact ID of the parent
     * @param {string} childId Project ID of the child
     * @return {!Promise}
     */
    mergeProject(groupId, artifactId, childId) {
        const params = {};
        const path = this.buildPathWithQuery('/projects/' + groupId + '/' + artifactId + '/merge_ga/' + childId, params);
        return this.request('GET', path);
    }

    /**
     * Merge a project (childId) into another one (parentId)
     * @param parentId Project ID of the parent
     * @param childId Project ID of the child
     * @return {!Promise}
     */
    merge(parentId, childId) {
        const params = {};
        const path = this.buildPathWithQuery('/projects/' + parentId + '/merge/' + childId, params);
        return this.request('GET', path);
    }

    /**
     * Unmerge a project (childId) from another one (parentId)
     * @param parentId Project ID of the parent
     * @param childId Project ID of the child
     * @return {!Promise}
     */
    unmerge(parentId, childId) {
        const params = {};
        const path = this.buildPathWithQuery('/projects/' + parentId + '/unmerge/' + childId, params);
        return this.request('GET', path);
    }

    /**
     * @param {string} projectId
     * @return {string}
     * @private
     */
    _getProjectPath(projectId) {
        return '/projects/' + projectId;
    }
}

module.exports = Projects;
