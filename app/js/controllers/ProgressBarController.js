/*
    ============================
    = ProgressBarController.js =
    ============================

    Represents and manage a progress bar.

    Author : Ludovic Loridan

*/

(function () {

var className = "ProgressBarController";

var properties = ["startString","stopString","completion",
                  "view","HTMLStartString","HTMLStopString","HTMLCompletion"];

var methods = {

    // -- Sync with Models --
    setStartString : function(newStartString) {
        if (typeof(newStartString) !== "string") {
            throw "Error : Start String must be a string";
        }

        startString = newStartString;
        this.updateStartString();
    },

    setStopString : function(newStopString) {
        if (typeof(newStopString) !== "string") {
            throw "Error : Strop String must be a string";
        }

        stopString = newStopString;
        this.updateStopString();
    },

    setCompletion : function(newCompletion) {
        if (newCompletion < 0) { newCompletion = 0; }
        if (newCompletion > 100) {newCompletion = 100;}

        completion = newCompletion;
        this.updateCompletion();
    },

    updateView : function() {
        this.updateStartString();
        this.updateStopString();
        this.updateCompletion();
    },

    updateStartString : function () {
        this.HTMLStartString.setText(this.startString);
    },

    updateStopString : function () {
        this.HTMLStopString.setText(this.stopString);
    },

    updateCompletion : function () {
        this.HTMLCompletion.style.width = completion + "%";
    },


    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("div","class","progressBar");
        this.HTMLStartString = this.view.addElement("span","class","startString");
        var bar = this.view.addElement("div","class","bar");
        this.HTMLCompletion = bar.addElement("div","class","completion");
        this.HTMLStopString = this.view.addElement("span","class","stopString");
        this.view.controller = this;
    }


};

var initializer = function (startString, stopString, completion) {
    this.createView();
    this.startString = startString;
    this.stopString = stopString;
    this.completion = completion;
};

var staticMethods = {



};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();