const CONSTRUCTOR_REGEX = /.*constructor\s*\((.*)\)/;

class FileConstructorResolver {

    resolve(file) {
        let params = [];

        const result = CONSTRUCTOR_REGEX.exec(file.toString());

        if (result !== null && result.length > 0 && result[1] !== "") {
            const constructorParams = result[1];
            constructorParams.split(",")
                .forEach(param => params.push(param.trim()));
        }

        return params;
    }
}

module.exports = FileConstructorResolver;