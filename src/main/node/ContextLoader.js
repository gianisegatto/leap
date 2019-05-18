const fs = require("fs");
const ComponentScan = require("./scan/ComponentScan");
const ComponentFactory = require("./factory/ComponentFactory");
const PostValidator = require("./validator/PostValidator");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;

class ContextLoader {

    constructor(externalComponents) {
        this.componentScan = new ComponentScan();
        this.environmentLoader = new EnvironmentLoader();
        this.componentFactory = new ComponentFactory(this.environmentLoader.load());
        this.postValidator = new PostValidator();
        this.externalComponents = externalComponents;
    }


    // To load the startes I'm going to read the package.json file find everything related to leap-starter
    // The starters are going to have a common interface to load the objects which they provides
    // Context loader is going to pass the environment variables throught thoses interfaces to be used
    //  for example the Datasource creation.

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
    }
}

module.exports = ContextLoader;