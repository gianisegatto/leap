class AnotherToInject {

    constructor(foo) {
    }

    run() {
        console.log("running anotherToInject");
    }
}

module.exports = AnotherToInject;