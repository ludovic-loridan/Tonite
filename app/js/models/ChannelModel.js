/*
    ===================
    = ChannelModel.js =
    ===================

    Handle requests concerning the channel object store

    Author : Alexis Camus

*/

(function() {

    var className = "ChannelModel";

    var properties = ["database"];

    var methods = {};

    var initializer = function() {};

    var staticMethods = {

        // returns a list of all the channels
        getChannels: function(callback, dict) {
            dict = dict || false;
            var db = IndexedDBManager.database;
            var objectStore = db.transaction("channel").objectStore("channel");
            var channels = [];
            if(dict) channels = {};

            objectStore.openCursor().onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    var channel = Channel.channelFromIndexedDB(cursor.value);
                    if(dict) channels[cursor.key] = channel;
                    else channels.push(channel);
                    cursor.continue();
                } else {
                    callback(channels);
                }
            };
        },

        // stores a channel and replaces it if exists
        storeChannel: function(channel) {
            var db = IndexedDBManager.database;
            var objectStore = db.transaction(["channel"], "readwrite").objectStore("channel");
            objectStore.put(channel);
        }

    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();