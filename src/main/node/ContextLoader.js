const fs = require("fs");
const ComponentScan = require("./ComponentScan");
const ClassFactory = require("./ClassFactory");
const PostValidator = require("./validator/PostValidator");

class ContextLoader {

    constructor() {
        this.componentScan = new ComponentScan();
        this.classFactory = new ClassFactory();
        this.postValidator = new PostValidator();
    }

    load(directory) {

        const components = this.componentScan.scan(directory);

        const instances = this.classFactory.createInstances(components);

        try {
            this.postValidator.validate(instances);
        } catch (error) {
            console.log(JSON.stringify(error));
            process.exit(1);
        }

        // const component = instances["SomeController"];

        // component.run();
    }
}

module.exports = ContextLoader;