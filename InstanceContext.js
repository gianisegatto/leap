class InstanceContext {

    constructor(name, instance) {
        this.name = name;
        this.instance = instance;
    }

    getName() {
        return this.name;
    }

    getInstance() {
        return this.instance;
    }
}

module.exports = InstanceContext;