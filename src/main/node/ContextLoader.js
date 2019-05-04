const fs = require("fs");
const ComponentScan = require("./ComponentScan");
const ClassFactory = require("./ClassFactory");

class ContextLoader {

    constructor() {
        this.componentScan = new ComponentScan();
        this.classFactory = new ClassFactory();
    }

    load(directory) {

        const components = this.componentScan.scan(directory);

        const instances = this.classFactory.createInstances(components);

        const component = instances["SomeController"];

        component.run();
    }
}

module.exports = ContextLoader;