const ContextLoader = require("./src/main/node/ContextLoader");

const start = new Date().getTime();

const contextLoader = new ContextLoader();

contextLoader.main();

console.log("Context loaded in: " + (new Date().getTime() - start) + " ms");