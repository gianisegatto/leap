class Component {
    
    constructor(name, fullPath, preInstance, params) {
        this.name = name;
        this.fullPath = fullPath;
        this.preInstance = preInstance;
        this.params = params;
        this.instance = null;
        this.creationAttempts = 0;
    }

    getName() {
        return this.name;
    }

    getFullPath() {
        return this.fullPath;
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
    
    incrementCreationAttempts() {
        this.creationAttempts++;
    }

    getCreationAttempts() {
        return this.creationAttempts;
    }
}

module.exports = Component;