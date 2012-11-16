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

    window.spinner = new SpinnerController();
    document.body.appendChild(window.spinner.view);
    centerElementsVertically();
    window.spinner.start();

    IndexedDBManager.initialize(function() {
        DataLoader.getDataForTonite(success, failure);
    });
}

function success(data) {
    window.spinner.removeView();
    window.header.channelsList = data;
    var clc = new ChannelsListController(data);
    document.body.appendChild(clc.view);
    centerElementsVertically();

    URLHashController.callHashActionFromURL();

    DataLoader.loadDataForTheNextDays((new Date()).toISO(8));
}

function failure() {
    console.log("error");
}

window.addEventListener("load", main);