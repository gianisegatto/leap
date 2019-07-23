class PreValidator {

    constructor() {
        this.filesAndClassesNameNotMatch = [];
        this.duplicatedComponents = [];
    }

    validate(components) {
        return this.validateFileClassNotMatch(components) && this.validateDuplicated(components);
    }

    validateFileClassNotMatch(components) {
        this.filesAndClassesNameNotMatch = components.filter(component => component.getName() !== component.getFileName());
        
        return this.filesAndClassesNameNotMatch.length === 0
    }

    validateDuplicated(components) {
        this.duplicatedComponents = components.filter(component =>
                                                        components
                                                            .filter(inner => inner.getName() === component.getName())
                                                            .length > 1);
        
        return this.duplicatedComponents.length === 0;
    }

    printMessage() {
        console.error("Oh Oh 💩");
        if (this.filesAndClassesNameNotMatch.length > 0) {
            this.printFilesAndClassesNameNotMatch();
        } else {
            this.printDuplicatedComponents();
        }
    }

    printFilesAndClassesNameNotMatch() {
        console.error("Something went wrong mate. The Leap context loader failed to load " + this.duplicatedComponents.length + " duplicated components");
        console.error("The following files name don't match to its class name!");
        this.filesAndClassesNameNotMatch.forEach(component => {
            console.error("File: " + component.getFullPath() + " - Class Name: " + component.getName());
        });
    }

    printDuplicatedComponents() {
        console.error("Something went wrong mate. The Leap context loader failed to load " + this.duplicatedComponents.length + " duplicated components");
        console.error("The following files have the same name. To make the context load properly you should rename the files!");
        this.duplicatedComponents.forEach(component => {
            console.error("File: " + component.getFullPath());
        });
    }
}

module.exports = PreValidator;