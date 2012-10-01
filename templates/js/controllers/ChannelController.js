/*
    ========================
    = ChannelController.js =
    ========================

    Manage a channel

    Author : Ludovic Loridan

*/
(function () {

var className = "ChannelController";

var properties = ["channel","view","HTMLTitle","HTMLTiles"];

var methods = {

    // -- Sync with Model --
    setChannel : function(newChannel) {
        if (!(newChannel instanceof Channel)) {
            throw "Error : Given object is not a Channel.";
        }

        channel = newChannel;
        this.updateView();
    },

    updateView : function() {
        this.updateTitle();
        this.updateClass();
        this.updateTiles();
    },

    // --- Title ---
    updateTitle : function() {
        this.HTMLTitle.setText(this.channel.name);
    },

    // --- ChannelsClass ---
    // Remove the channel classes corresponding to channel names (ex: "channel1")
    removeChannelClasses : function () {
        for (var i = 0; i < this.view.classList.length; i++) {
            var CSSclass = this.view.classList[i];
            if (CSSclass !== "channel" && CSSclass.startsWith("channel")) {
                this.view.classList.remove(CSSclass);
                i--;
            }
        }
    },

    addChannelClass : function () {
        var CSSclass = "channel"+this.channel.id;
        this.view.classList.add(CSSclass);
    },

    updateClass : function() {
        this.removeChannelClasses();
        this.addChannelClass();
    },

    // --- Tiles ---
    // Add tiles according to the channel programs for tonight
    updateTiles : function() {
        this.removeAllTiles();
        this.addTilesFromChannel();
    },

    removeAllTiles : function() {
        this.HTMLTiles.removeAllChildren();
    },

    addTilesFromChannel : function() {
        for (var i = 0; i < this.channel.tonightPrograms.length; i++) {
            this.addTileForProgram(this.channel.tonightPrograms[i]);
        }
    },

    addTileForProgram : function(program) {
        var tileController = new TileController(program);
        this.HTMLTiles.appendChild(tileController.view);
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("div","class","channel");
        this.HTMLTitle = this.view.addElement("div","class","title");
        this.HTMLTiles = this.view.addElement("div","class","tiles");
        this.view.controller = this;
    }

};

var initializer = function (channel) {
    this.createView();
    this.channel = channel;
};

var staticMethods = {};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();