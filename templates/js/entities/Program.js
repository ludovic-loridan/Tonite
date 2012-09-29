/*
    ==============
    = Program.js =
    ==============

    Entity that represents a single TV Program.

    Author : Ludovic Loridan

*/

(function () {

var className = "Program";

var properties = ["id", "title", "subtitle", "description", "genre", "subgenre", "start", "stop", "channel"];

var methods = {
    // Returns an unique id for this program
    getId : function() {
        return this.channel.id.toString()+"_"+this.start+"_"+this.stop;
    },

    setId : function(value) {
        throw "Changing the id of a program is forbidden";
    },

    // Channel can be a string or a channel object
    setChannel : function(value) {
        var potentialChannel = value;

        if (typeof(potentialChannel) === "string") { potentialChannel = Channel.channelFromName(value); }
        if (!(potentialChannel instanceof Channel)) { throw "Error setting the channel : "+value+" is not a valid channel.";}

        channel = potentialChannel;
        return channel;
    }
};

var initializer = function (title,start,stop,channel) {
    this.title   = title;
    this.start   = parseInt(start,10);
    this.stop    = parseInt(stop,10);
    this.channel = channel;

    Program.instancedPrograms[this.id] = this;
};

var staticMethods = {

    // TODO : Program from XML DOM

    programFromId : function(id) {
        var potentialProgram = Program.instancedPrograms[id];

        if (!(hasAValue(potentialProgram))) {
            // TODO : Load the program from DB
        }

        return potentialProgram;
    }
};

var staticProperties = {

    instancedPrograms : {}

};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();

