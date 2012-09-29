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

var properties = ["id","name"];

var methods = {

};

var initializer = function (name) {
    this.name = name;
    this.id = Channel.getIdForChannelNamed(name);
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

    // -- Channels Sorting --
    // ex : "TF1" -> 1, "Gulli" -> 18
    getIdForChannelNamed : function(name) {
        var potentialId = Channel.channelSorting.indexOf(name) + 1;
        if (potentialId !== 0) {
            return potentialId;
        } else {
            return Channel.manageUnknownChannelNamed(name);
        }
    },

    // returns id of the new channel name
    manageUnknownChannelNamed : function(name) {
        Channel.channelSorting.push(name);
        return Channel.channelSorting.length;
    }

};

var staticProperties = {

    channelSorting : ["TF1","France 2","France 3","Canal+","France 5","M6","Arte"],

    instancedChannels : {}

};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();