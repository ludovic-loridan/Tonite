/*
    ==============
    = Program.js =
    ==============

    Entity that represents a single TV Program.

    Author : Ludovic Loridan

*/

(function () {

var className = "Program";

var properties = ["id", "title", "subtitle", "description", "genre", "subgenre", "year", "imageURL", "start", "stop", "channel"];

var methods = {
    // -- Getters & Setters --
    // Returns an unique id for this program
    getId : function() {
        return this.channel.id.toString()+"_"+this.start.getTime()+"_"+this.stop.getTime();
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
    },

    // TODO : Remove these methods
    getImageURL : function() {
        var random1 = Math.naturalRandom(20);
        var random2 = Math.naturalRandom(20);
        var w = 352 + random1;
        var h = 272 + random2;
        return "http://lorempixel.com/"+w+"/"+h+"/";
    },

    setImageURL : function () {
        throw "Example image can not be set";
    },

    // -- Date management --

    setStart : function(newStartDate) {
        if (!(newStartDate instanceof Date)) {
            newStartDate = Date.dateFromISO(newStartDate);
        }

        start = newStartDate;
        return start;
    },

    setStop : function(newStopDate) {
        if (!(newStopDate instanceof Date)) {
            newStopDate = Date.dateFromISO(newStopDate);
        }

        stop = newStopDate;
        return stop;
    },

    isToCome : function() {
        var now = Date.now();
        return (now < this.start);
    },

    isNow : function() {
        var now = Date.now();
        return (now >= this.start) && (now < this.stop);
    },

    isPast : function() {
        var now = Date.now();
        return (now >= this.stop);
    }

};

var initializer = function (title,start,stop,channel) {
    this.title   = title;
    this.start   = start;
    this.stop    = stop;
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

