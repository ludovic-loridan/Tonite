/*
    ==================
    = ChatMessage.js =
    ==================

    Represents a ChatMessage.

    Author : Ludovic Loridan

*/

(function() {

    var className = "ChatMessage";

    var properties = ["id", "nickname", "message", "date", "isIncoming"];

    var methods = {

        setNickname : function (newNickname) {
            if (!ChatMessage.nickNameIsValid(newNickname)) {
                throw "Nickname must be a string";
            }
            nickname = newNickname;
        },

        setMessage : function (newMessage) {
            if (!ChatMessage.messageIsValid(newMessage)) {
                throw "There must be a message";
            }
            message = newMessage;
        }

    };

    var initializer = function(nickname, message, date, isIncoming) {
        this.nickname = nickname;
        this.message = message;
        this.date = date;
        this.isIncoming = isIncoming;
    };

    var staticMethods = {

        nickNameIsValid : function (nickname) {
            return isANonEmptyString(nickname);
        },

        messageIsValid : function (message) {
            return isANonEmptyString(message);
        }
    };

    var staticProperties = {


    };


    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();