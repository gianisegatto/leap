const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const CONSTRUCTOR_REGEX = /.*constructor\s*\((.*)\)/;

class FileConstructorResolver {

    resolve(file) {
        let result = [];

        const params = CONSTRUCTOR_REGEX.exec(file.toString());

        if (params !== null && params.length > 0 && params[1] !== "") {
            params[1].split(",")
                .forEach(param => result.push(param.trim()));
        }

        return result;
    }
}

module.exports = FileConstructorResolver;