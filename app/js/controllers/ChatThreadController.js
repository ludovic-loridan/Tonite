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
                      "HTMLChatBubbles","HTMLForm","HTMLInput"];

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

        scrollThreadToBottom : function () {
            this.HTMLChatBubbles.scrollTop = this.HTMLChatBubbles.scrollHeight - this.HTMLChatBubbles.offsetHeight;
        },

        // -- Fake conversation --
        fillWithAFunFakeConversation: function () {
            for (var i = 0 ; i < 5; i++ ) {
                var cm = new ChatMessage("Ludovic","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat aliquam nulla, a iaculis ipsum posuere quis.", new Date(), Math.randomTrueFalse());
                this.addMessage(cm);
            }
        },

        // -- Chat handling --

        messageHasBeenReceived : function (chatMessageObject) {
            this.addMessage(cm);
            this.scrollThreadToBottom();
        },

        // Called when the user has used the form to send a message
        messageHasBeenSent : function (stringMessage) {
            // TODO : this is still a fake method !
            var cm = new ChatMessage("HommOursPorc",stringMessage, new Date(), false);
            this.addMessage(cm);
            this.emptyInput();
            this.scrollThreadToBottom();
        },

        // -- Input management --
        emptyInput : function () {
            this.HTMLInput.value = "";
        },

        installFormEventListener : function () {
            this.HTMLForm.addEventListener("submit", { handleEvent: ChatThreadController.formHasBeenSubmit,
                                             chatThreadController : this});
        },

        // -- Event listeners --
        installEventListeners : function () {
            this.installFormEventListener();
        },

        // -- Create view --

        createView: function() {
            this.view = document.createElementWithAttributes("section", "class", "chatWidget");
            this.HTMLChatBubbles = this.view.addElement("article","class","chatBubbles");
            this.HTMLForm = this.view.addElement("form","class","chatForm");
            this.HTMLInput = this.HTMLForm.addElement("input","type","text",
                                             "class","chatInput",
                                             "placeholder","Entrez votre message");

            this.view.controller = this;
        }
    };

    var initializer = function(model) {
        this.createView();
        this.fillWithAFunFakeConversation();
        this.installEventListeners();

        this.title = "Live chat";
        this.model = model;
    };

    var staticMethods = {

        formHasBeenSubmit : function (evt) {
            var ctc = this.chatThreadController;
            ctc.messageHasBeenSent(ctc.HTMLInput.value);
            evt.preventDefault();
        }


    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();