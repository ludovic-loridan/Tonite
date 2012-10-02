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
            var channelName = this.channelsList[i];
            this.addChannelNamed(channelName);
        }
    },

    addChannelNamed : function (channelName) {
        var channel = Channel.channelFromName(channelName);
        var channelController = new ChannelController(channel);
        this.view.appendChild(channelController.view);
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("div","id","channels");
        this.addAutoCentering();
        this.view.controller = this;
    },

    addAutoCentering : function() {
        var autoCenterFunction = getThisCallingFunction(this,"centerView");
        window.addEventListener("resize",autoCenterFunction);
    },

    centerView : function() {
        var height = this.view.offsetHeight;
        var newMarginTop = - height / 2;
        this.view.style.setProperty("margin-top",newMarginTop+"px","important");
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