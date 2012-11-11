/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    var xmlParser = new XMLParser("20121111");
    xmlParser.parseData()

    var channelsList = Channel.channelList;
    var header = new HeaderController(channelsList);
    var clc = new ChannelsListController(channelsList);
    var modal = new ModalPanelController();
    
    document.body.appendChild(header.view);
    document.body.appendChild(clc.view);
    clc.centerView();
}

window.addEventListener("load", main);
