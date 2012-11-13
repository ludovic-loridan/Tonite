/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/function main(){var e=(new Date).toISO(8),t=new XMLParser(e),n=t.parseData(),r=new HeaderController(n),i=new ChannelsListController(n),s=new ModalPanelController;document.body.appendChild(r.view);document.body.appendChild(i.view);i.centerView()}window.addEventListener("load",main);