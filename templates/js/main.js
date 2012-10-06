/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    var channelsList = Channel.channelList;
    var header = new HeaderController(channelsList);
    var clc = new ChannelsListController(channelsList);
    
    document.body.appendChild(header.view);
    document.body.appendChild(clc.view);
    clc.centerView();
}

window.addEventListener("load",main);
