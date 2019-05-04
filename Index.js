const ContextLoader = require("./src/main/node/ContextLoader");

const PATH = process.cwd() + "/test/";

const start = new Date().getTime();

const contextLoader = new ContextLoader();

contextLoader.load(PATH);

console.log("Context loaded in: " + (new Date().getTime() - start) + " ms");