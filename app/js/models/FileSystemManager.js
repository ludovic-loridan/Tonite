/*
    =======================
    = FileSystemManager.js =
    =======================

    Manage the File System api

    Author : Alexis Camus

*/

(function() {

    var className = "FileSystemManager";

    var properties = [];

    var methods = {};

    var initializer = function() {};

    var staticMethods = {

        initialize: function() {
            if(!window.webkitStorageInfo) return;
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(window.TEMPORARY, 20 * 1024 * 1024 /*20MB*/ , FileSystemManager.onInitFs, FileSystemManager.errorHandler);
        },

        onInitFs: function(fs) {
            console.log('filesystem initialized');
            FileSystemManager.fs = fs;
            FileSystemManager.storeImageToFs(); // TODO remove afterwards, this was just for testing
        },

        errorHandler: function(e) {
            var msg = '';

            switch(e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
            };

            console.log('Error: ' + msg);
        },

        /*saveImageToFolder: function(folder, filename, content) {
            if(FileSystemManager.fs === null) throw "you must initialize FileSystemManager before using it";
            FileSystemManager.fs.root.getDirectory('MyPictures', {
                create: true
            }, function(dirEntry) {

            }, FileSystemManager.errorHandler);
        },*/

        storeImageToFs: function() {
            // check that the file system has been initialized
            if(FileSystemManager.fs === null) 
                throw "you must initialize FileSystemManager before using it";

            var xhr = new XMLHttpRequest();
            var image = './images/fstest/test.jpg';
            xhr.open('GET', image, true);

            // prevent the browser from parsing the data as UTF-8
            xhr.overrideMimeType('text/plain; charset=x-user-defined');

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    // get the content type
                    var contentType = xhr.getResponseHeader('Content-type').split(";")[0];

                    // create file
                    FileSystemManager.fs.root.getFile('nav_logo72.png', { 'create': true }, function(fileEntry) {
                        fileEntry.createWriter(function(fileWriter) {
                            // create byteArray from xhr response
                            var byteArray = new Uint8Array(xhr.response.length);
                            for(var i = 0; i < xhr.response.length; i++)
                                byteArray[i] = xhr.response.charCodeAt(i) & 0xff;

                            // create blob and write it to the file
                            var blob = new Blob([byteArray], { "type" : contentType }); 
                            fileWriter.write(blob);
                        }, FileSystemManager.errorHandler);
                    });
                }
            }
            // send request
            xhr.send();
        }
    };

    var staticProperties = {
        fs: null
    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();