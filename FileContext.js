class FileContext {
    
    constructor(instanceName, preInstance, params) {
        this.instanceName = instanceName;
        this.preInstance = preInstance;
        this.params = params;
        this.instance = null;
    }

    getName() {
        return this.instanceName;
    }

    getPreInstance() {
        return this.preInstance;
    }

    getParams() {
        return this.params;
    }

    setInstance(instance) {
        this.instance = instance;
    }

    getInstance() {
        return this.instance;
    }
}

module.exports = FileContext;