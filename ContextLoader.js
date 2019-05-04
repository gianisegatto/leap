const fs = require("fs");
const FileContextMapper = require("./FileContextMapper");
const InstanceContext = require("./InstanceContext");
const ClassFactory = require("./ClassFactory");

const PATH = "./test/";

class ContextLoader {

    constructor() {
        this.fileContextMapper = new FileContextMapper();
        this.classFactory = new ClassFactory();
    }

    main() {
        const files = fs.readdirSync(PATH);

        const fileContextList = files.map(file => this.fileContextMapper.map(PATH, file));

        const instances = this.classFactory.createInstances(fileContextList);

        const testClassInstance = instances["Component"];

        testClassInstance.run();
    }
}

module.exports = ContextLoader;