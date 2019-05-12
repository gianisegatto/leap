class ParamInstanceResolver {

    resolve(params, instances) {

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
}

module.exports = ParamInstanceResolver;