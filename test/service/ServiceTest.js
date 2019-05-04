class ServiceTest {

    constructor(testClass, anotherToInject) {
        this.testClass = testClass;
        this.anotherToInject = anotherToInject;
    }

    run() {
        console.log("running ServiceTest");
        this.testClass.run();
        this.anotherToInject.run();
    }
}

module.exports = ServiceTest;