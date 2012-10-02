/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/function main(){var e=new ChannelsListController(Channel.channelList);document.body.appendChild(e.view);e.centerView()}window.addEventListener("load",main);