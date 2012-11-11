/*
    ==============
    = Program.js =
    ==============

    Entity that represents a single TV Program.

    Author : Ludovic Loridan

*/

(function () {

var className = "Program";

var properties = ["id", "title", "subtitle", "description", "category", "year", "imageURL", "start", "stop", "duration", "channel"];

var methods = {
    // -- Getters & Setters --
    // Returns an unique id for this program
    getId : function() {
        return this.channel.id.toString()+"_"+this.start.getTime()+"_"+this.stop.getTime();
    },

    setId : function() {
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

    getDuration : function() {
        var duration = new Date(this.stop - this.start);
        return duration.getPeriodString();
    },

    setDuration : function() {
        throw "Not Implemented";
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
    },

    programFromXML : function(channel, program) {
        //console.log(program);
        var title = program.getElementsByTagName("title")[0].getData();
        var start = program.getAttribute("start");
        var stop = program.getAttribute("stop");

        instance = new Program(title, start, stop, channel);

        var childs = program.childNodes;
        
        for(var i = 0; i < childs.length; i++) {
            if(childs[i].childNodes.length <= 1) {
                switch(childs[i].tagName) {
                    case "desc":
                        instance.description = childs[i].getData();
                        break;
                    case "category":
                        instance.category = instance.category ? instance.category + " : " + childs[i].getData() : childs[i].getData();
                    case "icon":
                        instance.imageURL = childs[i].getAttribute("src");
                        break;
                    case "sub-title":
                        instance.subtitle = childs[i].getData();
                        break;
                    case "date":
                        instance.year = childs[i].getData();
                        break;
                }
            }
        }

        return instance;
    }
};

var staticProperties = {

    instancedPrograms : {}

};


Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();

