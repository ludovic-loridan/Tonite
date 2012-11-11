/*
    ================
    = XMLParser.js =
    ================

    Parse XML to get data

    Author : Alexis Camus

*/

(function () {

var className = "XMLParser";

var properties = ["date", "channelsList"];

var methods = {

    parseData : function() {
        var request = new XMLHttpRequest();
        request.open("GET", "./data/" + this.date + ".xml", false);
        request.send();

        var xml = request.responseXML;
        var channels = xml.getElementsByTagName("channel");

        for(var i = 0; i < channels.length; i++) {
            var channel = new Channel(channels[i].getAttribute("name"))
            channel.loadTonightProgramsFromXML(channels[i].childNodes);
        }
    }

};

var initializer = function (date) {
    this.date = date;
};

var staticMethods = {};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();