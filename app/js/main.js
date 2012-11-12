/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    /*var xmlParser = new XMLParser((new Date()).toISO(8));
    var channelsList = xmlParser.parseData();

    var header = new HeaderController(channelsList);
    var clc = new ChannelsListController(channelsList);
    var modal = new ModalPanelController();
    
    document.body.appendChild(header.view);
    document.body.appendChild(clc.view);
    clc.centerView();

    return;*/

    IndexedDBManager.initialize(function() {
        DataLoader.getDataForTonite(function(channelsList) {
            var header = new HeaderController(channelsList);
            var clc = new ChannelsListController(channelsList);
            var modal = new ModalPanelController();
            
            document.body.appendChild(header.view);
            document.body.appendChild(clc.view);
            clc.centerView();
        });
    });
}

window.addEventListener("load", main);