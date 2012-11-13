/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    // var date = (new Date()).toISO(8);
    // var xmlParser = new XMLParser(date);
    // var channelsList = xmlParser.parseData();

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

    // var header = new HeaderController(channelsList);
    // var clc = new ChannelsListController(channelsList);
    // var modal = new ModalPanelController();
    
    // document.body.appendChild(header.view);
    // document.body.appendChild(clc.view);
    // clc.centerView();
}

window.addEventListener("load", main);