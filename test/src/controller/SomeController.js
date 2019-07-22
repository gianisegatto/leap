class SomeController {

    constructor(serviceTest) {
        this.serviceTest = serviceTest;
    }

    run() {
        console.log("running SomeController");
        this.serviceTest.run();
    }
}

module.exports = SomeController;