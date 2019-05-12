function filterNoInstanceAndAttempts(component, numberOfComponents) {
    return component.getCreationAttempts() >= numberOfComponents && component.getInstance() === null;
}

class PostValidator {

    validate(components) {

        const numberOfComponents = components.length;

        return components
            .filter(component => filterNoInstanceAndAttempts(component, numberOfComponents));
    }

}

module.exports = PostValidator;