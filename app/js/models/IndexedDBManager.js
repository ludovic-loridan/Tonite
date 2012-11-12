/*
    =======================
    = IndexedDBManager.js =
    =======================

    Manage the Indexed DataBase instantiation

    Author : Alexis Camus

*/

(function() {

    var className = "IndexedDBManager";

    var properties = [];

    var methods = {};

    var initializer = function() {};

    var staticMethods = {

        initialize: function(callback) {
            IndexedDBManager.callbackInitialized = callback;

            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
            window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

            if(window.indexedDB) {
                IndexedDBManager.request = indexedDB.open("tonite", 1);
                IndexedDBManager.request.onsuccess = IndexedDBManager.requestOnSuccess;
                IndexedDBManager.request.onerror = IndexedDBManager.errorHandler;
                IndexedDBManager.request.onupgradeneeded = IndexedDBManager.upgradeDataBase; // called when db version changed
                console.log("IndexedDB initialized");
            } else window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        },

        upgradeDataBase: function(e) {
            var db = e.target.result;
            // creates channel object store
            var channelObjectStore = db.createObjectStore("channel", {
                keyPath: "id"
            });
            // creates program object store
            var channelObjectStore = db.createObjectStore("program", {
                keyPath: "id"
            });
            channelObjectStore.createIndex("date", "date", {
                unique: false
            });
            console.log("indexedDB upgrade done");
        },

        requestOnSuccess: function(e) {
            IndexedDBManager.database = IndexedDBManager.request.result;
            IndexedDBManager.database.onerror = this.errorHandler; // generic error handler
            IndexedDBManager.callbackInitialized();
        },

        errorHandler: function(e) {
            console.log("error")
            console.log(e);
        }

    };

    var staticProperties = {

        callbackInitialized: null,
        request: null,
        database: null

    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();