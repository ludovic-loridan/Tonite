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

    window.setTimeout(test,1000);

    function test() {
        IndexedDBManager.initialize(function() {
            DataLoader.getDataForTonite(success, failure);
        });
    }
    
}

function success(data) {
    window.spinner.removeView();

    window.header.channelsList = data;
    var clc = new ChannelsListController(data);
    document.body.appendChild(clc.view);
    setTimeout(function() {clc.showView();}, 10);
    centerElementsVertically();
    
    URLHashController.callHashActionFromURL();
}

function failure() {
    console.log("error");
}

window.addEventListener("load", main);