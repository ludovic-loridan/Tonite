/*
    ========
    Class.js
    ========
    
    An helper to write better looking classes with JS.
    Provides a function Class.create that creates a "class".

    Author: Ludovic Loridan
*/

(function () {

Class = {

    create : function(className,properties,methods,initializer,staticMethods) {
        
        storeClassArguments(className,properties,methods,initializer,staticMethods);
        unnulizeClassArguments();

        if (classArgumentsAreValid()) {
            createClassWithProvidedClassArguments();
        }
        else {
            throw "Class creation error : arguments are invalid.";
        }
        
    }
};


//
// Arguments Manipulation & Validation
//

function nullIsEmptyFunction(obj) {
    if (obj === null || typeof(obj) === "undefined") {
        return function () {};
    }
    return obj;
}

function nullIsEmptyArray(obj) {
    if (obj === null || typeof(obj) === "undefined") {
        return [];
    }
    return obj;
}

function storeClassArguments(className,properties,methods,initializer,staticMethods) {
    Class.className     = className;
    Class.properties    = properties;
    Class.methods       = methods;
    Class.initializer   = initializer;
    Class.staticMethods = staticMethods;
}

function unnulizeClassArguments () {
    Class.properties    = nullIsEmptyArray(Class.properties);
    Class.methods       = nullIsEmptyArray(Class.methods);
    Class.initializer   = nullIsEmptyFunction(Class.initializer);
    Class.staticMethods = nullIsEmptyArray(Class.staticMethods);
}

function classArgumentsAreValid () {
    var validity =
         (typeof(Class.className)     === "string")  &&
         (typeof(Class.properties)    === "object")  &&
         (typeof(Class.methods)       === "object")  &&
         (typeof(Class.initializer)   === "function")&&
         (typeof(Class.staticMethods) === "object");
    return validity;
}


//
// Class code generation
//

function generateClassCode() {
    Class.classCode = "";
    addPropertiesDeclaration();
    addClassInitialization();
    addGetterAndSetterDeclaration();
    addInstanceInitializaterCall();
}

// 1 - PROPERTIES DECLARATION
function addPropertiesDeclaration() {
    for (var i = 0; i < Class.properties.length; i++) {
        Class.classCode += "var "+Class.properties[i]+" = null; \n";
    }
}

// 2 - CLASS INITIALIZATION
function addClassInitialization() {
    Class.classCode += 'if (typeof '+Class.className+'.initialized == "undefined") {\n';

    addDefaultGettersAndSettersDeclarations();
    addInstanceInitializerDeclaration();
    addInstanceMethodsDeclarations();

    Class.classCode += Class.className+'.initialized == true';
    Class.classCode += '}\n\n';
}

// -- 2.a - Defaults Getters and Setters Declaration
function addDefaultGettersAndSettersDeclarations() {
    for (var i = 0; i < Class.properties.length; i++) {
        addDefaultGetterDeclaration(Class.properties[i]);
        addDefaultSetterDeclaration(Class.properties[i]);
    }
}

function addDefaultGetterDeclaration(propertyName) {
    Class.classCode += Class.className+".prototype."+getterName(propertyName)+" =  function() { \n";
    Class.classCode += "return "+propertyName+";\n";
    Class.classCode += "}\n\n";
}

function addDefaultSetterDeclaration(propertyName) {
    Class.classCode += Class.className+".prototype."+setterName(propertyName)+" =  function(value) { \n";
    Class.classCode += propertyName+" = value;\n";
    Class.classCode += "}\n\n";
}

function getterName(propertyName) {
    return "get"+propertyName.capitalized();
}

function setterName(propertyName) {
    return "set"+propertyName.capitalized();
}

// -- 2.b. - Instances Initializer Declaration
function addInstanceInitializerDeclaration() {
    addInstanceMethodDeclaration("init",Class.initializer);
}

// -- 2.c. - Instance Methods Declaration
function addInstanceMethodsDeclarations() {
    for (var methodName in Class.methods) {
        addInstanceMethodDeclaration(methodName,Class.methods[methodName]);
    }
}

function addInstanceMethodDeclaration(methodName,method) {
    Class.classCode += Class.className+".prototype."+methodName+" = \n";
    Class.classCode += method.toString();
    Class.classCode += ";\n";
}




// 3 - GETTERS AND SETTERS DEFINITION
function addGetterAndSetterDeclaration() {
    for (var i = 0; i < Class.properties.length; i++) {
        addGetterDeclaration(Class.properties[i]);
        addSetterDeclaration(Class.properties[i]);
    }
}

function addGetterDeclaration(propertyName) {
    Class.classCode += 'this.__defineGetter__("'+propertyName+'",'+Class.className+'.prototype.'+getterName(propertyName)+');\n';
}

function addSetterDeclaration(propertyName) {
    Class.classCode += 'this.__defineSetter__("'+propertyName+'",'+Class.className+'.prototype.'+setterName(propertyName)+');\n';
}

// 4 - INITIALIZER CALL
function addInstanceInitializaterCall() {
    Class.classCode += "this.init(";
    Class.classCode += getConstructorArguments().join(",");
    Class.classCode += ");";
}

function getConstructorArguments() {
    var constructorArguments = [];

    for (var i = 1; i <= Class.initializer.length; i++) {
        constructorArguments.push("arg"+i);
    }

    return constructorArguments;
}


//
// Class creation
//
function createClassWithProvidedClassArguments () {
    generateClassCode();
    createClassWithProvidedCode();
}

function createClassWithProvidedCode() {
    var applyArgs = getConstructorArguments();
    applyArgs.push(Class.classCode);

    window[Class.className]= Function.constructor.apply(this,applyArgs);
    addStaticMethodsDeclarations();
}


// Static Methods Declaration
function addStaticMethodsDeclarations() {
    for (var methodName in Class.staticMethods) {
        addStaticMethodDeclaration(methodName,Class.staticMethods[methodName]);
    }
}

function addStaticMethodDeclaration(methodName,method) {
    eval(Class.className+"."+methodName+"="+method.toString()+";");
}

})();
