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

    loadTonightPrograms : function() {

        this.tonightPrograms = [];

        // TODO : Do a real DB request to retrieve the programs.
        var p1 = new Program("New York, section criminelle",20120928001500,20120928010000,this);
        var p2 = new Program("The Office",20120928010000,20120928015500,this);
        var p3 = new Program("Truc machin",20120928033000,20120928073000,this);

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

    channelList : ["TF1","France 2","France 3","Canal+","France 5","M6","Arte"],

    instancedChannels : {}

};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();