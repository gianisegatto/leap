const fs = require("fs");
const ComponentScan = require("./scan/ComponentScan");
const ComponentFactory = require("./instance/ComponentFactory");
const PostValidator = require("./validator/PostValidator");

class ContextLoader {

    constructor() {
        this.componentScan = new ComponentScan();
        this.componentFactory = new ComponentFactory();
        this.postValidator = new PostValidator();
    }

    load(directory) {

        const components = this.componentScan.scan(directory);

        const instances = this.componentFactory.createInstances(components);

        const valid = this.postValidator.validate(instances);
        if (valid) {
            console.log("Cheers mate. Leap is up and running 🍻");
        } else {
            this.postValidator.printMessage();
            process.exit(1);
        }
            
        // console.log(JSON.stringify(instances));
    }
}

module.exports = ContextLoader;