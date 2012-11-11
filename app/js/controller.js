/*
    =================
    = controller.js =
    =================

    A template to create all our controllers.

    Author : Ludovic Loridan

*/

(function () {

var className = "Controller";

var properties = ["model","view"];

var methods = {
    create : function() {
        // Method that use the model to create the DOM Elements
        // return document.createElementWithAttributes("p","monattribut","mavaleur");
    }
};

var initializer = function (model,view) {
    if (!hasAValue(this.view)) { view = this.create(); }

    this.model = model;
    this.view = view;
};

var staticMethods = {};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();