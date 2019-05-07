const InstanceContext = require("./InstanceContext");

function createInstance(fileContext, params) {
    return Reflect.construct(fileContext.getPreInstance(), params);
}

function getParams(params, instances) {

    const paramInstances = [];

    if (params) {
        params.forEach(param => {
            const instance = instances[param.toLowerCase()];
            if (instance) {
                paramInstances.push(instance);
            }
        });
    }

    return paramInstances;
}

function toMap(map, fileContext) {
    map[fileContext.getName()] = fileContext.getInstance();
    return map;
}

function getCreatedInstances(fileContextList) {
    return fileContextList
        .filter(fileContext => fileContext.getInstance() !== null)
        .reduce((map, fileContext) => {
            map[fileContext.getName().toLowerCase()] = fileContext.getInstance();
            return map;
        }, {});
}

class ClassFactory {

    createInstances(fileContextList) {

        let pendingInstances = false;

        const instances = getCreatedInstances(fileContextList);

        fileContextList.forEach(fileContext => {

            if (fileContext.getInstance() === null) {
                const paramInstances = getParams(fileContext.getParams(), instances);
                if (fileContext.getParams() != null && fileContext.getParams().length !== paramInstances.length) {
                    pendingInstances = true;
                } else {
                    const instance = createInstance(fileContext, paramInstances);
                    instances[fileContext.getName().toLowerCase()] = instance;
                    fileContext.setInstance(instance);
                }
            }
        });

        if (pendingInstances) {
            this.createInstances(fileContextList);
        }

        return fileContextList.reduce(toMap, {});
    }
}

module.exports = ClassFactory;