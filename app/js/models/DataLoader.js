/*
    =================
    = DataLoader.js =
    =================

    Loads data :
        - from navigator database if entries exists
        - or from xml and stores it for future offline use

    Author : Alexis Camus

*/

(function() {

    var className = "DataLoader";

    var properties = ["db"];

    var initializer = function() {};

    var methods = {};

    var staticProperties = {};

    var staticMethods = {
        // loads data for the current day
        getDataForTonite: function(callbacksuccess, callbackerror) {
            // get date from  current day
            var date = (new Date()).toISO(8);

            // if we can use the indexedDB
            if(IndexedDBManager.available()) {

                // request the database to get the programs
                ProgramModel.getProgramsForDate(date, function(programs) {
                    if(programs.length == 0) {
                        console.log("data loaded from xml");
                        var xmlparser = new XMLParser();
                        // set listeners
                        xmlparser.addEventListener("dataParsed", callbacksuccess);
                        xmlparser.addEventListener("dataParsed", DataLoader.storeChannels);
                        xmlparser.addEventListener("error", callbackerror);
                        // parse data
                        xmlparser.parseData(date);
                    } else {
                        console.log("data loaded from indexedDB");

                        ChannelModel.getChannels(function(channels) {
                            // map programs to channels
                            for(var i = 0; i < programs.length; i++) {
                                var program = Program.programFromIndexedDB(programs[i]);
                                channels[program.channel_id].programs.push(program);
                            }
                            // makes channels list
                            var channelsList = [];
                            for(var key in channels) {
                                channelsList.push(channels[key]);
                            }
                            // send channel list
                            callbacksuccess(channelsList);
                        }, true);
                    }
                });
            } else {
                console.log("data loaded from xml because IndexedDB not supported");
                var xmlparser = new XMLParser();
                // set listeners
                xmlparser.addEventListener("dataParsed", callbacksuccess);
                xmlparser.addEventListener("error", callbackerror);
                // parse data
                xmlparser.parseData(date);
            }
        },

        loadDataForTheNextDays: function(date) {
            // if we can use the indexedDB
            if(IndexedDBManager.available()) {
                date = Date.dateFromISO(date + "000000");
                // loads and store data for the next 7 days
                for(var i = 1; i <= 7; i++) {
                    var newDate = date.addDays(i).toISO(8);
                    var xmlparser = new XMLParser();
                    xmlparser.addEventListener("dataParsed", DataLoader.storeChannels);
                    xmlparser.parseData(newDate);
                }
            }
        },

        storeChannels: function(channelsList) {
            console.log("store data " + channelsList[0].programs[0].date);
            for(var i = 0; i < channelsList.length; i++) {
                var channel = channelsList[i];
                // store channel in indexedDB
                ChannelModel.storeChannel(channel);
                for(var j = 0; j < channel.programs.length; j++) {
                    var program = channel.programs[j];
                    // store program in indexedDB
                    ProgramModel.storeProgram(program);
                }
            }
        }
    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();