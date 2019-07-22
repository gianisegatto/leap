const Database = require("./../database/Database");

class TestConfig {

    database() {
        return new Database();
    }
}

module.exports = TestConfig;