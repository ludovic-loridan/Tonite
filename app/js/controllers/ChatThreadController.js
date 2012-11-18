/*
    ===========================
    = ChatThreadController.js =
    ===========================

    Manages a chat thread.

    Author : Ludovic Loridan

*/

(function() {

    var className = "ChatThreadController";

    var properties = ["model", // TODO : What the fuck will be the model ?!?
    // ChatThreadController could listen to this model to see if there is new messages
                      "view",
                      "HTMLChatBubbles","HTMLForm"];

    var methods = {

        // -- Sync with Model --

        // TODO : setModel method.
       
        //
        // TODO : Since there is no model yet, there is no synchronisation.
        //

        // -- Adding messages --

        addMessage : function(chatMessage) {
            if (!(chatMessage instanceof ChatMessage)) {
                throw "You should only add ChatMessages instances to a Chat Thread.";
            }

            var cmc = new ChatMessageController(chatMessage);
            this.HTMLChatBubbles.appendChild(cmc.view);
        },

        // -- Fake conversation --
        fillWithAFunFakeConversation: function () {
            var cm = new ChatMessage("Ludovic","Coucou", new Date(), true);
            var cm2 = new ChatMessage("Alexis","Salut ça va ?", new Date(), false);
            var cm3 = new ChatMessage("Ludovic","Ouais, ouais génial ! :)", new Date(), true);

            this.addMessage(cm);
            this.addMessage(cm2);
            this.addMessage(cm3);
        },


        // -- Create view --

        createView: function() {
            this.view = document.createElementWithAttributes("div", "class", "chatWidget");
            this.HTMLChatBubbles = this.view.addElement("div","class","chatBubbles");
            this.HTMLForm = this.view.addElement("form","class","chatForm");
            this.HTMLForm.addElement("input","type","text",
                                             "class","chatInput",
                                             "placeholder","Entrez votre message");

            this.view.controller = this;
        }
    };

    var initializer = function(model) {
        this.createView();
        this.fillWithAFunFakeConversation();
        this.model = model;
    };

    var staticMethods = {};

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();