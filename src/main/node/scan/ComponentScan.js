const fs = require("fs");
const ComponentMapper = require("./ComponentMapper");
const RESOURCES_FOLDER = "src/main/resources/"
const TEST_FILES = "test"

class ComponentScan {

    constructor() {
        this.componentMapper = new ComponentMapper();
    }
    
    scan(directory) {

        let components = [];
        if (directory.includes(RESOURCES_FOLDER) || directory.includes(TEST_FILES)) {
            return components;
        }

        const results = fs.readdirSync(directory);

        results.forEach(result => {
            if (fs.statSync(directory + result).isDirectory()) {
                components = components.concat(this.scan(directory + result + "/"));
            } else {
                components.push(this.componentMapper.map(directory, result));
            }
        });

        return components;
    }
}

module.exports = ComponentScan;