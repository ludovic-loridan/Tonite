/*
    ================
    = XMLParser.js =
    ================

    Parse XML to get data

    Author : Alexis Camus

*/

(function() {

    var className = "XMLParser";

    var properties = ["xmlhttp", "listeners"];

    var initializer = function() {
            this.xmlhttp = new XMLHttpRequest();
            this.listeners = {};
        };

    var methods = {
        parseData: function(date) {
            var objectListener = {
                handleEvent: this.responseFromHttpRequest,
                xmlParser: this
            }
            this.xmlhttp.addEventListener("readystatechange", objectListener, false);
            // open and sends ajax request
            this.xmlhttp.open("GET", "./data/" + date + ".xml", true);
            this.xmlhttp.send();
        },

        responseFromHttpRequest: function() {
            if(this.xmlParser.xmlhttp.readyState == 4) {
                if(this.xmlParser.xmlhttp.status == 200) {
                    // if request finished and response ready
                    var xml = this.xmlParser.xmlhttp.responseXML;
                    var channels = xml.getElementsByTagName("channel");

                    var channelsList = [];
                    for(var i = 0; i < channels.length; i++) {
                        var channel = new Channel(channels[i].getAttribute("name"))
                        channel.loadProgramsFromXML(channels[i].childNodes);
                        channelsList.push(channel);
                    }

                    this.xmlParser.fireEvent("dataParsed", channelsList);
                }
                else {
                    // else, an error occured
                    this.xmlParser.fireEvent("error", this.xmlParser.xmlhttp.status);
                }
            }
        },

        addEventListener: function(e, f) {
            if(!hasAValue(this.listeners[e])) this.listeners[e] = [];
            this.listeners[e].push(f);
        },

        fireEvent: function(e) {
            if(arguments.length === 0)
                throw 'fireEvent should be used with at least one argument (event type)';
            // call the different listeners
            if(hasAValue(this.listeners[e])) {
                var l = this.listeners[e];
                for(var i = 0; i < l.length; i++)
                l[i].apply(this, Arguments.slice(arguments, 1));
            }
        }
    };

    var staticMethods = {};

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();