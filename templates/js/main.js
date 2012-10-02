/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    var channelsList = new ChannelsListController(Channel.channelList);
    document.body.appendChild(channelsList.view);
    channelsList.centerView();
}

window.addEventListener("load",main);
