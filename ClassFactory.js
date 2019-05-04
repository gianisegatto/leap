const InstanceContext = require("./InstanceContext");

function createInstance(fileContext, params) {
    return Reflect.construct(fileContext.getPreInstance(), params);
}

function getParams(params, instances) {

    const paramInstances = [];

    if (params) {
        params.forEach(param => {
            const tempInstances = instances.filter(instance => instance.getName().toLowerCase() == param.toLowerCase())
                .map(instance => instance.getInstance());
            if (tempInstances.length > 0) {
                paramInstances.push(tempInstances[0]);
            }
        });
    }

    return paramInstances;
}

function getCreatedInstances(fileContextList) {
    return fileContextList.filter(fileContext => fileContext.getInstance() !== null)
        .map(fileContext => new InstanceContext(fileContext.getName(), fileContext.getInstance()))
}

function parseToMap(map, fileContext) {
    map[fileContext.getName()] = fileContext.getInstance();
    return map;
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
                    instances.push(new InstanceContext(fileContext.getName(), instance));
                    fileContext.setInstance(instance);
                }
            }
        });

        if (pendingInstances) {
            this.createInstances(fileContextList);
        }

        return fileContextList.reduce(parseToMap, {});
    }
}

module.exports = ClassFactory;