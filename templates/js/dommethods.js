/*
    dommethods.js
    Add new methods to the DOM Objects.

    HTMLElement.addElement(name,...)
    HTMLElement.setAttributes(...)

    document.createElementsWithAttributes(name,...)
*/

Arguments = {
    slice : function(args,index) {
        return Array.prototype.slice.call(args,index);
    }
};

HTMLElement.prototype.setAttributes = function() {
    for (var i = 1; i < arguments.length; i+=2) {
        this.setAttribute(arguments[i-1], arguments[i]);
    }
    return this;
};

document.createElementWithAttributes = function(name) {
    var newElement = document.createElement(name);

    var attributes = Arguments.slice(arguments,1);
    HTMLElement.prototype.setAttributes.apply(newElement, attributesp);

    return newElement;
};


HTMLElement.prototype.addElement = function(name) {
    var attributes = Arguments.slice(arguments,1);
    var newElement = document.createElementWithAttributes.apply(this,[name].concat(attributes));

    this.appendChild(newElement);

    return newElement;
};