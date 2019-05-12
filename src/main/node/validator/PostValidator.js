class PostValidator {

    constructor() {
        this.missingInstances;
    }

    validate(components) {

        this.missingInstances = components
            .filter(component => filterNoInstanceAndAttempts(component, components.length));
        
        if (this.missingInstances.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    printMessage() {
        console.error("Oh Oh 💩");
        console.error("Something went wrong mate. The Leap context loader failed to load " + this.missingInstances.length + " component(s)");
        this.missingInstances.forEach(component => {
            console.error("Cannot create component: " + component.getFullPath())
            component.getMissingParams().forEach(param => console.log("Cannot find parameter: " + param));
        });
    }
}

module.exports = PostValidator;

function filterNoInstanceAndAttempts(component, numberOfComponents) {
    return component.getCreationAttempts() >= numberOfComponents && component.getInstance() === null;
};