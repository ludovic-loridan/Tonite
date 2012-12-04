/*
    ===========================
    = ChatThreadController.js =
    ===========================

    Manages a chat thread.

    Author : Ludovic Loridan

*/

(function() {

    var className = "ChatThreadController";

    var properties = ["instance", "wsController", "view", "HTMLChatBubbles", "HTMLForm", "HTMLInput"];

    var methods = {

        setWsController: function(wsc) {
            wsController = wsc;
            // adds messages sent from server
            this.wsController.bind('message', this.messageHasBeenReceived);
        },

        addMessage: function(chatMessage) {
            if(!(chatMessage instanceof ChatMessage)) {
                throw "You should only add ChatMessages instances to a Chat Thread.";
            }

            var cmc = new ChatMessageController(chatMessage);
            this.HTMLChatBubbles.appendChild(cmc.view);
        },

        scrollThreadToBottom: function() {
            this.HTMLChatBubbles.scrollTop = this.HTMLChatBubbles.scrollHeight - this.HTMLChatBubbles.offsetHeight;
        },

        // -- Chat handling --
        messageHasBeenReceived: function(nickname, stringMessage) {
            var cm = new ChatMessage(nickname, stringMessage, new Date(), true);
            instance.addMessage(cm);
            instance.scrollThreadToBottom();
        },

        // Called when the user has used the form to send a message
        messageHasBeenSent: function(stringMessage) {
            if(WebSocketController.getInstance().isConnected()) {
                var cm = new ChatMessage(WebSocketController.nickname, stringMessage, new Date(), false);
                this.addMessage(cm);
                this.emptyInput();
                this.scrollThreadToBottom();

                this.wsController.send('message', stringMessage);
            }
            else {
                console.log("webSocket not available");
                this.emptyInput();
            } 
        },

        // -- Input management --
        emptyInput: function() {
            this.HTMLInput.value = "";
        },

        installFormEventListener: function() {
            this.HTMLForm.addEventListener("submit", {
                handleEvent: ChatThreadController.formHasBeenSubmit,
                chatThreadController: this
            });
        },

        // -- Event listeners --
        installEventListeners: function() {
            this.installFormEventListener();
        },

        // -- Create view --
        createView: function() {
            this.view = document.createElementWithAttributes("div", "class", "chatWidget");
            this.HTMLChatBubbles = this.view.addElement("div", "class", "chatBubbles");
            this.HTMLForm = this.view.addElement("form", "class", "chatForm");
            this.HTMLInput = this.HTMLForm.addElement("input", "type", "text", "class", "chatInput", "placeholder", "Entrez votre message");

            this.view.controller = this;
        }
    };

    var initializer = function(wsc) {
            instance = this;
            this.createView();
            this.installEventListeners();
            this.title = "Live chat";
            this.wsController = wsc;
        };

    var staticMethods = {
        formHasBeenSubmit: function(evt) {
            var ctc = this.chatThreadController;
            ctc.messageHasBeenSent(ctc.HTMLInput.value);
            evt.preventDefault();
        }
    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();