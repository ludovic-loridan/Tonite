/*
    =======================
    = HeaderController.js =
    =======================

    Generates Tonite's header

    Author : Ludovic Loridan

*/

(function () {

var className = "HeaderController";

var properties = ["channelsList","view","HTMLGradient","HTMLStencil","HTMLCatchLine"];

var methods = {

    // -- Sync with Model --
    setChannelsList : function(newList) {
        if (!(newList instanceof Array)) {
            throw "Error : Given object is not an array.";
        }

        channelsList = newList;
        this.updateView();
    },

    updateView : function () {
        this.updateGradient();
        this.updateCatchLine();
    },

    // -- Gradient --
    updateGradient : function () {
        this.removeGradientParts();
        this.addGradientPartsFromModel();
    },

    removeGradientParts : function () {
        this.HTMLGradient.removeAllChildren();
    },

    addGradientPartsFromModel : function () {
        if (this.channelsList.length > 0) { this.HTMLGradient.addElement("div","class","part1");}

        var ipart = 1;
        for (ipart = 1; ipart < this.channelsList.length; ipart++) {
            this.HTMLGradient.addElement("div","class","part"+ipart+"to"+(ipart + 1));
        }

        if (this.channelsList.length > 1) { this.HTMLGradient.addElement("div","class","part"+ipart);}
    },

    // -- Catch Line --
    updateCatchLine : function () {
        this.HTMLCatchLine.setText("is gonna be a good night");
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("header","id","mainHeader");
        this.HTMLGradient = this.view.addElement("div","class","headerGradient");
        this.HTMLStencil = this.view.addElement("div","class","headerStencil");
        this.HTMLStencil.addElement("img","class","logo","src","images/tonitestencillogo.png","alt","tonite");
        this.HTMLCatchLine = this.HTMLStencil.addElement("p","class","catchLine");
        this.view.controller = this;
    }
};

var initializer = function (channelsList) {
    this.createView();
    this.channelsList = channelsList;
};

var staticMethods = {



};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();