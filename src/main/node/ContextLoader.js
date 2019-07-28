const fs = require("fs");
const ComponentScan = require("./scan/ComponentScan");
const ComponentFactory = require("./factory/ComponentFactory");
const PreValidator = require("./validator/PreValidator");
const PostValidator = require("./validator/PostValidator");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;

class ContextLoader {

    constructor(externalComponents) {
        this.componentScan = new ComponentScan();
        this.componentFactory = new ComponentFactory([]);
        this.preValidator = new PreValidator();
        this.postValidator = new PostValidator();
        this.externalComponents = externalComponents;
    }

    load(directory) {

        this.environmentLoader = new EnvironmentLoader(directory);
        this.componentFactory = new ComponentFactory(this.environmentLoader.load());

        const components = this.componentScan.scan(directory + "/");

        const preValid = this.preValidator.validate(components);
        if (!preValid) {
            this.preValidator.printMessage();
            process.exit(1);
        }

        const mergedComponents = components.concat();

        const instances = this.componentFactory.createInstances(mergedComponents)
                                               .filter(component => component !== undefined && component !== null);

        const valid = this.postValidator.validate(instances);
        if (valid) {
            console.log("Cheers mate. Leap is up and running 🍻");
            return instances;
        } else {
            this.postValidator.printMessage();
            process.exit(1);
        }
    }
}

module.exports = ContextLoader;