/*
    =============================
    = ChannelsListController.js =
    =============================

    Represents the horizontal list of channels

    Author : Ludovic Loridan

*/

(function () {

var className = "ChannelsListController";

var properties = ["channelsList","view"];

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
        this.clearView();
        this.addChannelsFromModel();
    },

    clearView : function() {
        this.view.removeAllChildren();
    },

    addChannelsFromModel : function () {
        for (var i = 0; i < this.channelsList.length; i++) {
            var channelController = new ChannelController(this.channelsList[i]);
            this.view.appendChild(channelController.view);
        }
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("div","id","channels", "class", "vcenter");
        this.view.controller = this;
    },

    showView : function() {
        this.view.addLoadedClass();
    }
};

var initializer = function (channelsList,view) {
    this.createView();
    this.channelsList = channelsList;
};

var staticMethods = {



};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();