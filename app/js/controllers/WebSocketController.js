/*
    ==========================
    = WebSocketController.js =
    ==========================

    Controller for the websocket handler, binds functions to receive events and send data to the server

    Author : Alexis Camus

*/

(function() {

    var className = "WebSocketController";

    var properties = ["callbacks", "url", "connection"];

    var methods = {

        bind: function(event_name, callback) {
            this.callbacks[event_name] = this.callbacks[event_name] || [];
            this.callbacks[event_name].push(callback);
        },

        send: function(event_name, event_data) {
            this.connection.send(event_data);
        },

        connect: function() {
            if(typeof(MozWebSocket) == 'function') this.connection = new MozWebSocket(this.url);
            else this.connection = new WebSocket(this.url);

            // dispatch to the right handlers
            this.connection.onmessage = this.dispatch;
        },

        disconnect: function() {
            this.connection.close();
        },

        dispatch: function(evt) {
            evt = strJsonToObject(evt.data);

            var chain = callbacks[evt.type];
            if(typeof chain == 'undefined') return; // no callbacks for this event
            for(var i = 0; i < chain.length; i++)
            chain[i](evt.clientID, evt.content);
        },

        setNickName: function(nick) {
            WebSocketController.nickname = nick;
        },

        isConnected: function() {
            return this.connection.readyState == 1;
        }
    };

    var initializer = function(webSocketUrl) {
        if(WebSocketController.hasBeenInstanciated()) {
            throw "An instance of WebSocketController has already been instanciated";
        } else {
            this.callbacks = {};
            this.url = webSocketUrl;
            this.bind('nickname', this.setNickName);
            this.connect();
        }
    };

    var staticMethods = {
        getInstance: function(webSocketUrl) {
            if(!WebSocketController.hasBeenInstanciated()) {
                if(!hasAValue(webSocketUrl)) throw "You must specify an URL for the websocket";
                WebSocketController.instance = new WebSocketController(webSocketUrl);
            }
            return WebSocketController.instance;
        },

        hasBeenInstanciated: function() {
            return hasAValue(WebSocketController.instance);
        }
    };

    var staticProperties = {
        instance: null,
        nickname: null
    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();