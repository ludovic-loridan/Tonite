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
    this.start   = start;
    this.stop    = stop;
    this.channel = channel;
};

var staticMethods = {

    // TODO : Program from XML DOM

    // TODO : Program from DB ID

};

var staticProperties = {};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();

