/*
    ==============
    = Channel.js =
    ==============

    Represents a TV Channel within the Tonite Application
    Have a static structure that remembers all the instanced channels

    Author : Ludovic Loridan

*/

(function () {

var className = "Channel";

var properties = ["id","name","tonightPrograms"];

var methods = {
    getTonightPrograms : function () {
        if (tonightPrograms.length === 0) {
            this.loadTonightPrograms();
        }

        return tonightPrograms;
    },

    // Private
    loadTonightPrograms : function() {

        this.tonightPrograms = [];

        // TODO : Do a real DB request to retrieve the programs.
        var p1 = new Program("New York, section criminelle",new Date(Date.now() - 1000 * 3600 * 2),new Date(Date.now() - 1000 * 3600 * 1),this);
        p1.subtitle = "Une enquête pas très facile";
        var p2 = new Program("The Office",new Date(Date.now() - 1000 * 3600 * 1),new Date(Date.now() + 1000 * 1),this);
        p2.subtitle = "The Last Dundies";
        p2.year = 2007;
        var p3 = new Program("Truc machin",new Date(Date.now() + 1000 * 12),new Date(Date.now() + 1000 * 3600 * 2),this);
        p3.subtitle = "Bidule";

        this.tonightPrograms = [p1,p2,p3];
    }

};

var initializer = function (name) {
    this.name = name;
    this.id = Channel.channelIdFromName(name);
    this.tonightPrograms = [];

    Channel.instancedChannels[name] = this;
};

var staticMethods = {

    // Instances channel only if necessary
    channelFromName : function(name) {
        if (hasAValue(Channel.instancedChannels[name])) {
            return Channel.instancedChannels[name];
        } else {
            return new Channel(name);
        }
    },

    // -- Channel ids --
    // ex : "TF1" -> 1, "Gulli" -> 18
    channelIdFromName : function(name) {
        var potentialId = Channel.channelList.indexOf(name) + 1;
        if (potentialId !== 0) {
            return potentialId;
        } else {
            return Channel.manageUnknownChannelNamed(name);
        }
    },

    // returns id of the new channel name
    manageUnknownChannelNamed : function(name) {
        Channel.channelList.push(name);
        return Channel.channelList.length;
    }

};

var staticProperties = {

    channelList : ["TF1","France 2","France 3","Canal+","France 5","M6","Arte","D8","W9","TMC","NT1","NRJ12","LCP","France 4","BFM TV","I>Télé","D17","Gulli","France Ô"],

    instancedChannels : {}

};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();