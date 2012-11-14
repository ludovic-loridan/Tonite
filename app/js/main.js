/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    // TODO put a progressbar
    IndexedDBManager.initialize(function() {
        DataLoader.getDataForTonite(success, failure);
    });
}

function success(data) {
    var header = new HeaderController(data);
    var clc = new ChannelsListController(data);
    var modal = new ModalPanelController();

    document.body.appendChild(header.view);
    document.body.appendChild(clc.view);
    clc.centerView();
}

function failure() {
    console.log("error");
}

window.addEventListener("load", main);