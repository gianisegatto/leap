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

        const missingInstances = this.postValidator.validate(instances);
        if (missingInstances.length > 0) {
            console.error("Oh Oh 💩");
            console.error("Something went wrong mate. The context loader failed to load " + missingInstances.length + " component(s)");
            missingInstances.forEach(component => {
                console.error("Cannot create component: " + component.getFullPath())
                component.getMissingParams().forEach(param => console.log("Cannot find parameter: " + param));
            });
            process.exit(1);
        } else {
            console.log("Cheers mate leap is up and running 🍻");
        }
            
        

        // const component = instances["SomeController"];

        // component.run();
    }
}

module.exports = ContextLoader;