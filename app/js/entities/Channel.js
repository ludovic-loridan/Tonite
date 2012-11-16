/*
    ==============
    = Channel.js =
    ==============

    Represents a TV Channel within the Tonite Application
    Have a static structure that remembers all the instanced channels

    Author : Ludovic Loridan

*/

(function() {

    var className = "Channel";

    var properties = ["id", "name", "programs"];

    var methods = {

        loadProgramsFromXML: function(programs) {
            var longProgramThreshold = 20; // threshold in minutes to determin the long programs
            var allPrograms = []; // will contain all entity programs
            var longPograms = []; // will contain only the entity of the long programs

            // creates program entities and feed both arrays
            for(var i = 0; i < programs.length; i++) {
                var program = Program.programFromXML(this.id, programs[i]);
                allPrograms.push(program);
                if(program.getMDuration() > 20)
                    longPograms.push(program);
            }

            // if we have 3 long programs or more, then we take the first 3
            if(longPograms.length >= 3) {
                this.programs = longPograms.slice(0, 3);
            }
            // otherwise we get shortest programs as well
            else {
                // calculates how many short programs we can take
                var freeSpot = 3 - longPograms.length;
                // iterate through all the programs entities we saved earlier
                for(var i = 0; i < allPrograms.length; i++) {
                    var program = allPrograms[i];
                    if(program.getMDuration() > 20)
                        this.programs.push(program);
                    else if(freeSpot > 0) {
                        this.programs.push(program);
                        freeSpot--;
                    }
                }
            }
        }

    };

    var initializer = function(name) {
            this.name = name;
            this.id = Channel.channelIdFromName(name);
            this.programs = [];
        };

    var staticMethods = {

        // Channel ids (ex : "TF1" -> 1, "Gulli" -> 18)
        channelIdFromName: function(name) {
            var potentialId = Channel.channelList.indexOf(name) + 1;
            if(potentialId !== 0) {
                return potentialId;
            } else {
                return Channel.manageUnknownChannelNamed(name);
            }
        },

        channelNameFromId: function(id) {
            return Channel.channelList[id-1];
        },

        // returns id of the new channel name
        manageUnknownChannelNamed: function(name) {
            Channel.channelList.push(name);
            return Channel.channelList.length;
        },

        channelFromIndexedDB: function(channel) {
            var instance = new Channel(channel.name);
            return instance;
        }

    };

    var staticProperties = {

        channelList: [],

    };


    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();