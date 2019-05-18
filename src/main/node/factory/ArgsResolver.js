class ArgsResolver {

    constructor(configuration) {
        this.configuration = configuration;
    }

    resolve(name, params, instances) {

        const paramInstances = [];

        if (params) {
            params.forEach(param => {
                const instance = instances[param.toLowerCase()];
                if (instance) {
                    paramInstances.push(instance);
                } else {
                    try {
                        const property = this.configuration[name.toLowerCase()][param];
                        if (property !== null && property !== undefined) {
                            paramInstances.push(property);
                        }
                    } catch (exception) {
                        // ignoring for now. Should find a better way
                    }
                }
            });
        }

        return paramInstances;
    }
}

module.exports = ArgsResolver;