const fs = require("fs");
const ComponentScan = require("./ComponentScan");
const ClassFactory = require("./ClassFactory");

const PATH = process.cwd() + "/test/";

class ContextLoader {

    constructor() {
        this.componentScan = new ComponentScan();
        this.classFactory = new ClassFactory();
    }

    load() {

        const components = this.componentScan.scan(PATH);

        const instances = this.classFactory.createInstances(components);

        const component = instances["SomeController"];

        component.run();
    }
}

module.exports = ContextLoader;