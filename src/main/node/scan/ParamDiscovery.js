const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const CONSTRUCTOR_REGEX = /.*constructor\s*\((.*)\)/;

class ParamDiscovery {

    discover(file) {
        let params = [];

        const result = CONSTRUCTOR_REGEX.exec(file.toString().replace(STRIP_COMMENTS, ""));

        if (result !== null && result.length > 0 && result[1] !== "") {
            const constructorParams = result[1];
            constructorParams.split(",")
                .forEach(param => params.push(param.trim()));
        }

        return params;
    }
}

module.exports = ParamDiscovery;