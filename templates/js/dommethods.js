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

// ---------------------------------------------- //
// -- Creation/Modification/Deletion of nodes  -- //
// ---------------------------------------------- //

document.createElementWithAttributes = function(name) {
    var newElement = document.createElement(name);

    var attributes = Arguments.slice(arguments,1);
    HTMLElement.prototype.setAttributes.apply(newElement, attributes);

    return newElement;
};


HTMLElement.prototype.addElement = function(name) {
    var attributes = Arguments.slice(arguments,1);
    var newElement = document.createElementWithAttributes.apply(this,[name].concat(attributes));

    this.appendChild(newElement);

    return newElement;
};

HTMLElement.prototype.removeAllChildren = function() {
    var child = this.childNodes;
    while (this.hasChildNodes()) {
        this.removeChild(child[0]);
    }
    return this;
};

// --------------------------- //
// -- Text content of nodes -- //
// --------------------------- //

HTMLElement.prototype.addTextNode = function (text) {
    var textNode = document.createTextNode(text);
    this.appendChild(textNode);
    return textNode;
};

HTMLElement.prototype.getTextNode = function() {
    var childs = this.childNodes;
    for (var i = 0; i < childs.length; i++) {
        if (childs[i].nodeType === Node.TEXT_NODE) {
            return childs[i];
        }
    }

    return null;
};

HTMLElement.prototype.getOrAddTextNode = function() {
    var textNode = this.getTextNode();
    if (!hasAValue(textNode)) {
        textNode = this.addTextNode();
    }
    return textNode;
};

HTMLElement.prototype.setText = function(text) {
    var textNode = this.getOrAddTextNode();
    textNode.data = text;
    return this;
};


// --------------------- //
// -- UL Manipulation -- //
// --------------------- //

HTMLUListElement.prototype.addListItem = function(text) {
    var li = this.addElement("li");
    li.setText(text.toString());
    this.appendChild(li);
};

HTMLUListElement.prototype.addListItemsWithArray = function(items) {
    for (var i = 0; i < items.length; i++) {
        this.addListItem(items[i]);
    }

    return this;
};

// Wait a list of items
HTMLUListElement.prototype.addListItems = function() {
    if (typeof(arguments[0]) === "object") {
        return this.addListItemsWithArray(arguments[0]);
    }

    for (var i = 0; i < arguments.length; i++) {
        this.addListItem(arguments[i]);
    }
    return this;
};


// ---------------- //
// -- Transition -- //
// ---------------- //
HTMLElement.prototype.whenTransitionEndsDo = function(callback) {
    this.addEventListener("transitionend", callback);
    this.addEventListener("webkitTransitionEnd", callback);
    this.addEventListener("oTransitionEnd", callback);
    this.addEventListener("MSTransitionEnd", callback);
};


