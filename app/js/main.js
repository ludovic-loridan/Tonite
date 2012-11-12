/*
    ===========
    = main.js =
    ===========

    Main Javascript code.

    Author : Ludovic Loridan

*/

function main() {
    var xmlParser = new XMLParser((new Date()).toISO(8));
    var channelsList = xmlParser.parseData();

    var header = new HeaderController(channelsList);
    var clc = new ChannelsListController(channelsList);
    var modal = new ModalPanelController();
    
    document.body.appendChild(header.view);
    document.body.appendChild(clc.view);
    clc.centerView();

    return;

    IndexedDBManager.initialize(function() {
        var xmlParser = new XMLParser("20121111");
        var channelsList = xmlParser.parseData();

        console.log(channelsList);

        /*for(var i = 0; i < channelsList.length; i++) {
            var channel = channelsList[i];
            for(var j = 0; j < channel.programs.length; j++) {
                var program = channel.programs[j];
                ProgramModel.storeProgram(program);
                console.log(program);
            }
        }*/

        ProgramModel.getProgramsForDate("20121115", function(programs) {
            var channelsList;
            if(programs.length == 0) {
                var xmlParser = new XMLParser("20121111");
                channelsList = xmlParser.parseData();
            } else {
                //channelsList = ...
            }

            /*var header = new HeaderController(channelsList);
            var clc = new ChannelsListController(channelsList);
            var modal = new ModalPanelController();
            
            document.body.appendChild(header.view);
            document.body.appendChild(clc.view);
            clc.centerView();*/
        });
    });
}

window.addEventListener("load", main);