/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    window.header = new HeaderController();
    document.body.appendChild(window.header.view);

    // TODO put a progressbar
    IndexedDBManager.initialize(function() {
        DataLoader.getDataForTonite(success, failure);
    });
}

function success(data) {
    window.header.channelsList = data;
    var clc = new ChannelsListController(data);
    document.body.appendChild(clc.view);
    clc.centerView();
}

function failure() {
    console.log("error");
}

window.addEventListener("load", main);