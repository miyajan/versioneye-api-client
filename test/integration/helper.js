'use strict';

class TestHelper {
    getApiKey() {
        return process.env['API_KEY'];
    }
}

module.exports = new TestHelper();
