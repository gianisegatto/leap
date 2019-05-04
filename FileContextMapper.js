const FileContext = require("./FileContext");

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

class FileContextMapper {

    map(path, file) {

        const fileInstance = require(path + file);

        const property = Object.getOwnPropertyDescriptors(fileInstance);

        const parameters = this.getConstructorParameters(property.prototype.value.constructor);

        return new FileContext(file.substring(0, file.length -3), fileInstance, parameters);
    }

    getConstructorParameters(func) {
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        return result;
    }
}

module.exports = FileContextMapper;