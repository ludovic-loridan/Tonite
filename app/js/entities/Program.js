/*
    ==============
    = Program.js =
    ==============

    Entity that represents a single TV Program.

    Author : Ludovic Loridan & Alexis Camus

*/

(function() {

    var className = "Program";

    var properties = ["id", "date", "title", "subtitle", "description", "category", "year", "imageURL", "start", "stop", "duration", "channel_id"];

    var methods = {
        // -- Getters & Setters --
        // Returns a unique id for this program
        getId: function() {
            return this.channel_id + "_" + this.start.toISO();
        },

        setId: function() {
            throw "Changing the id of a program is forbidden";
        },

        getChannel: function(value) {

        },

        // -- Date management --
        setStart: function(newStartDate) {
            if(!(newStartDate instanceof Date)) {
                newStartDate = Date.dateFromISO(newStartDate);
            }

            start = newStartDate;
            return start;
        },

        setStop: function(newStopDate) {
            if(!(newStopDate instanceof Date)) {
                newStopDate = Date.dateFromISO(newStopDate);
            }

            stop = newStopDate;
            return stop;
        },

        getDuration: function() {
            var duration = new Date(this.stop - this.start);
            return duration.getPeriodString();
        },

        setDuration: function() {
            throw "Not Implemented";
        },

        getMDuration: function() {
            var duration = new Date(this.stop - this.start);
            return duration/60000;
        },

        getDate: function() {
            return this.start.toISO(8).substr(0, 8);
        },

        setDate: function() {
            throw "Not Implemented";
        },

        isToCome: function() {
            var now = Date.now();
            return(now < this.start);
        },

        isNow: function() {
            var now = Date.now();
            return(now >= this.start) && (now < this.stop);
        },

        isPast: function() {
            var now = Date.now();
            return(now >= this.stop);
        }

    };

    var initializer = function(title, start, stop, channel_id) {
            this.title = title;
            this.start = start;
            this.stop = stop;
            this.channel_id = channel_id;

            Program.instancedPrograms[this.id] = this;
        };

    var staticMethods = {

        programFromId: function(id) {
            var potentialProgram = Program.instancedPrograms[id];
            return potentialProgram;
        },

        programFromXML: function(channel_id, program) {
            var title = program.getElementsByTagName("title")[0].getData();
            var start = program.getAttribute("start");
            var stop = program.getAttribute("stop");

            instance = new Program(title, start, stop, channel_id);

            var childs = program.childNodes;

            for(var i = 0; i < childs.length; i++) {
                if(childs[i].childNodes.length <= 1) {
                    switch(childs[i].tagName) {
                    case "desc":
                        instance.description = childs[i].getData();
                        break;
                    case "category":
                        instance.category = instance.category ? instance.category + " : " + childs[i].getData() : childs[i].getData();
                        break; // Alexis : JSHint says me there was no break here, so I added it. Was it helpful ?
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
        },

        programFromIndexedDB: function(program) {
            var instance = new Program(program.title, program.start, program.stop, program.channel_id);
            for(var key in program) {
                if(key !== "id" && key !== "date" && key !== "duration")
                    instance[key] = program[key];
            }
            return instance;
        }
    };

    var staticProperties = {

        instancedPrograms: {}

    };


    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();