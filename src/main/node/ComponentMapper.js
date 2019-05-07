const FileContext = require("./Component");

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
// TODO this regex should cover only constructors and ignore functions
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getConstructorParameters(func) {
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    return result;
}

class ComponentMapper {

    map(path, file) {

        const fullPath = path + file;

        const fileInstance = require(fullPath);

        const property = Object.getOwnPropertyDescriptors(fileInstance);

        const parameters = getConstructorParameters(property.prototype.value.constructor);

        return new FileContext(file.substring(0, file.length -3), fullPath, fileInstance, parameters);
    }
}

module.exports = ComponentMapper;