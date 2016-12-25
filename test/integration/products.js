'use strict';

const Products = require('../../lib/client/products');
const helper = require('./helper');
const assert = require('assert');

describe('Packages Client', function() {
    let products;
    let apiKey = helper.getApiKey();

    beforeEach(function() {
        products = new Products(apiKey);
    });

    describe('search', function() {
        it('should search packages', function() {
            return products.search('hoge', 'fuga').then(json => {
                assert(Array.isArray(json.results));
            });
        });
    });
});
