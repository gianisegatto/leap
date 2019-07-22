class TestClass {

    constructor(inject) {
        this.inject = inject;
    }

    run() {
        console.log("running testClass");
        this.inject.run();
    }
}

module.exports = TestClass;