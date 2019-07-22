class ServiceTest {

    constructor(anotherToInject, database) {
        this.anotherToInject = anotherToInject;
        this.database = database;
    }

    run() {
        console.log("running ServiceTest");
        this.anotherToInject.run();
        this.database.query("SELECT test");
    }
}

module.exports = ServiceTest;