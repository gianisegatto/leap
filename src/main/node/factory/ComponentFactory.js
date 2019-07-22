const ParamResolver = require("./ArgsResolver");

class ComponentFactory {

    constructor(configuration) {
        this.paramResolver = new ParamResolver(configuration);
        this.configuration = configuration;
    }

    createInstances(components) {

        let pendingInstances = false;

        const instances = getCreatedInstances(components);

        components.forEach(component => {

            if (component.getInstance() === null) {
                const paramInstances = this.paramResolver.resolve(component.getName(), component.getParams(), instances);
                if (component.getParams().length > 0 && component.getParams().length !== paramInstances.length) {
                    pendingInstances = true;
                    updateComponent(component, paramInstances);
                } else {
                    const instance = createInstance(component, paramInstances);
                    component.setInstance(instance);
                    instances[component.getName().toLowerCase()] = createTempInstance(component);
                }
            }
        });

        const componentsAttempts = components
            .filter(component => component.getCreationAttempts() >= components.length);

        if (pendingInstances && componentsAttempts.length === 0) {
            this.createInstances(components);
        }

        return components;
    }
}

module.exports = ComponentFactory;

function createTempInstance(component) {
    return {
        name: component.getName().toLowerCase(),
        instance: component.getInstance()
    };
}

function createInstance(component, params) {
    return Reflect.construct(component.getPreInstance(), params.map(param => param.instance));
}

function toMap(map, component) {
    map[component.getName().toLowerCase()] = createTempInstance(component);
    return map;
}

function getCreatedInstances(components) {
    if (components) {
        return components
            .filter(component => component.getInstance() !== null)
            .reduce(toMap, {});
    } else {
        return [];
    }
}

function updateComponent(component, paramInstances) {
    component.incrementCreationAttempts();
    const paramsDiff = component.getParams().filter(param => !paramInstances.map(paramInstance => paramInstance.name).includes(param.toLowerCase()));
    component.setMissingParams(paramsDiff)
}

