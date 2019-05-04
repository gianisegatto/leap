class Component {
    
    constructor(name, preInstance, params) {
        this.name = name;
        this.preInstance = preInstance;
        this.params = params;
        this.instance = null;
    }

    getName() {
        return this.name;
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

module.exports = Component;