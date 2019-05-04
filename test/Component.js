class Component {

    constructor(inject, anotherToInject, testClass, serviceTest) {
        this.inject = inject;
        this.anotherToInject = anotherToInject;
        this.testClass = testClass;
        this.serviceTest = serviceTest;
    }

    run() {
        console.log("running component");
        this.inject.run();
        this.anotherToInject.run();
        this.testClass.run();
        this.serviceTest.run();
    }
}

module.exports = Component;