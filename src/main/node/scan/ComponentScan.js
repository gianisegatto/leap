const fs = require("fs");
const ComponentMapper = require("./ComponentMapper");
const RESOURCES_FOLDER = "src/main/resources/"

class ComponentScan {

    constructor() {
        this.componentMapper = new ComponentMapper();
    }

    // TODO this method needs to be improved to use async readdir
    scan(directory) {

        directory = directory ;

        let components = [];
        if (directory.includes(RESOURCES_FOLDER)) {
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