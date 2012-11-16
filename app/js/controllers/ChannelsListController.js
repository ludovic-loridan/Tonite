/*
    =============================
    = ChannelsListController.js =
    =============================

    Represents the horizontal list of channels

    Author : Ludovic Loridan

*/

(function() {

    var className = "ChannelsListController";

    var properties = ["channelsList", "view", "realView"];

    var methods = {

        // -- Sync with Model --
        setChannelsList: function(newList) {
            if(!(newList instanceof Array)) {
                throw "Error : Given object is not an array.";
            }

            channelsList = newList;
            this.updateView();
        },

        getView: function() {
            var func = getThisCallingFunction(this, "showView");
            this.timeInfosUpdateInterval = setTimeout(func, 10);
            return this.realView;
        },

        updateView: function() {
            this.clearView();
            this.addChannelsFromModel();
        },

        clearView: function() {
            this.realView.removeAllChildren();
        },

        addChannelsFromModel: function() {
            for(var i = 0; i < this.channelsList.length; i++) {
                var channelController = new ChannelController(this.channelsList[i]);
                this.realView.appendChild(channelController.view);
            }
        },

        createView: function() {
            this.realView = document.createElementWithAttributes("div", "id", "channels", "class", "vcenter");
            this.realView.controller = this;
        },

        showView: function() {
            this.realView.addLoadedClass();
        }
    };

    var initializer = function(channelsList) {
            this.createView();
            this.channelsList = channelsList;
        };

    var staticMethods = {};

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();