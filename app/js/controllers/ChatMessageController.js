/*
    ===========================
    = ChatMessageController.js =
    ===========================

    Manages a chat bubble

    Author : Ludovic Loridan

*/

(function() {

    var className = "ChatMessageController";

    var properties = ["chatMessage", "view",
                      "HTMLNickname","HTMLMessage"];

    var methods = {

        // -- Sync with Model --
        setChatMessage: function(newMessage) {
            if(!(newMessage instanceof ChatMessage)) {
                throw "Error : Given object is not a correct chat message.";
            }

            chatMessage = newMessage;
            this.updateView();
        },

        updateView: function() {
            this.updateNickname();
            this.updateMessage();
            this.updateIncoming();
        },

        updateNickname: function () {
            this.HTMLNickname.setText(this.chatMessage.nickname);
        },

        updateMessage : function () {
            this.HTMLMessage.setText(this.chatMessage.message);
        },

        updateIncoming : function () {
            if (this.chatMessage.isIncoming) {
                this.view.classList.remove("out");
                this.view.classList.add("in");
            } else {
                this.view.classList.remove("in");
                this.view.classList.add("out");
            }
        },


        // -- Create view --

        createView: function() {
            this.view = document.createElementWithAttributes("article", "class", "chatBubble");
            var p = this.view.addElement("p");
            this.HTMLNickname = p.addElement("strong","class","nickname");
            this.HTMLMessage = p.addElement("span","class","message");

            this.view.controller = this;
        }
    };

    var initializer = function(chatMessage) {
        this.createView();
        this.chatMessage = chatMessage;
    };

    var staticMethods = {};

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();