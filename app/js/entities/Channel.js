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

            for(var i = 0; i < programs.length; i++) {
                if(i < 3) {
                    program = Program.programFromXML(this, programs[i]);
                    program.channel_id = this.id;
                    this.programs.push(program);
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
            return Channel.channelList[id];
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