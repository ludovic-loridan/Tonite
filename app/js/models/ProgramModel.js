/*
    ===================
    = ProgramModel.js =
    ===================

    Handle requests concerning the program object store

    Author : Alexis Camus

*/

(function() {

    var className = "ProgramModel";

    var properties = ["database"];

    var methods = {};

    var initializer = function() {};

    var staticMethods = {

        // returns a list of Program for the requested date (ex: "20121111", or null if no entries)
        getProgramsForDate: function(date, callback) {
            var db = IndexedDBManager.database;
            var objectStore = db.transaction("program").objectStore("program");
            var index = objectStore.index("date");
            var singleKeyRange = IDBKeyRange.only(date); // only match entries with this date as index
            var programs = [];

            index.openCursor(singleKeyRange).onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    programs.push(Program.programFromIndexedDB(cursor.value));
                    cursor.continue();
                }
                else {
                    callback(programs);
                }
            };
        },

        storeProgram: function(program) {
            var db = IndexedDBManager.database;
            var objectStore = db.transaction(["program"], "readwrite").objectStore("program");
            objectStore.put(program);
            console.log("program stored");
        }

    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();