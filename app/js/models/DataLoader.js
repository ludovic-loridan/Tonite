/*
    =================
    = DataLoader.js =
    =================

    Loads data :
        - from navigator database if entries exists
        - or from xml and stores it for future offline use

    Author : Alexis Camus

*/

(function() {

    var className = "DataLoader";

    var properties = ["db"];

    var initializer = function() {

        };

    var methods = {
        // loads data for the current day
        getDataForTonite: function() {
            var date = (new Date()).toISO(8);
        }
    };

    var staticProperties = {};

    var staticMethods = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();