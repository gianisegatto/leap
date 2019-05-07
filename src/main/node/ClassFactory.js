function createInstance(component, params) {
    return Reflect.construct(component.getPreInstance(), params);
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
function toMap(map, component) {
    map[component.getName().toLowerCase()] = component.getInstance();
    return map;
}

function getCreatedInstances(components) {
    return components
        .filter(component => component.getInstance() !== null)
        .reduce(toMap, {});
}

class ClassFactory {

    createInstances(components) {

        let pendingInstances = false;

        const instances = getCreatedInstances(components);

        components.forEach(component => {

            if (component.getInstance() === null) {
                const paramInstances = getParams(component.getParams(), instances);
                if (component.getParams() != null && component.getParams().length !== paramInstances.length) {
                    pendingInstances = true;
                    component.incrementCreationAttempts();
                } else {
                    const instance = createInstance(component, paramInstances);
                    instances[component.getName().toLowerCase()] = instance;
                    component.setInstance(instance);
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

module.exports = ClassFactory;