/*=============================================================
  = controller.js is the basis of every controller we'll make =
  ============================================================= */

Class.create(className,properties,methods,initializer,staticMethods);

var className = "Controller";

var initializer = function () {
    ...
};

var properties = ["attribute1","attribute2"];

var methods = {
    method1 : function() {

    },

    method2 : function() {

    }
};

var staticMethods = {
    staticMethod1 : function() {

    }
};



function Controller (arg1, arg2, arg3) {

    // Properties
    var p1 = null;
    var p2 = null;

    if (typeof Controller.initialized == "undefined") {

        // Classic getters/setters
        Controller.prototype.getP1 : function() {
            return p1;
        };

        Controller.prototype.setP1 : function(value) {
            return (p1 = value);
        };

        // Initializer
        Controller.prototype.init : function(arg1,arg2,arg3) {
            ...
        };

        // Instance methods
        Controller.prototype.myMethod : function() {
            return "something";
        };

        // Static methods
        Controller.myStatic : function () {

        }

        Controller.initialized = true;
            
    }

    // Definition of getters and setters
    this.__defineGetter__("p1",Controller.prototype.getP1);
    this.__defineSetter__("p1",Controller.prototype.setP1);

    this.init(arg1,arg2,arg3);

}