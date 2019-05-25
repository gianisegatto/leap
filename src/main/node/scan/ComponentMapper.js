const Component = require("leap-core").Component;
const ConstructorResolver = require("./ParamDiscovery");

class ComponentMapper {

    constructor() {
        this.constructorResolver = new ConstructorResolver();
    }

    map(path, file) {

        const fullPath = path + file;

        const fileInstance = require(fullPath);

        const property = Object.getOwnPropertyDescriptors(fileInstance, "constructor");

        const parameters = this.constructorResolver.discover(property.prototype.value.constructor);

        return new Component(file.substring(0, file.length -3), fullPath, fileInstance, parameters);
    }
}

module.exports = ComponentMapper;