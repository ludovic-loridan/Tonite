/*
    ============================
    = KeyBindingsController.js =
    ============================

    Because when I was using Tonite I was always pressing "esc" to close the modalPanel,
    I decided to build this bonus class.

    Author : Ludovic Loridan

*/

KeyBindingsController = {

    enabled : true,

    keyActions : {
        27 : ModalPanelController.close // Escape key
    },

    hasKeyActionForKeyCode : function (keyCode) {
        return hasAValue(KeyBindingsController.keyActions[keyCode]);
    },

    getKeyActionForKeyCode : function (keyCode) {
        return KeyBindingsController.keyActions[keyCode];
    },

    doKeyActionForKeyCode : function (keyCode) {
        if (KeyBindingsController.enabled && 
            KeyBindingsController.hasKeyActionForKeyCode(keyCode)) {

            KeyBindingsController.getKeyActionForKeyCode(keyCode).call(this);
        }
    },


    // Enable/Disable keys
    enableKeyBindings : function () {
        KeyBindingsController.enabled = true;
    },

    disableKeyBindings : function () {
        KeyBindingsController.enabled = false;
    },

    temporarlyDisableKeyBindings : function () {
        KeyBindingsController.disableKeyBindings();
        clearTimeout(KeyBindingsController.keyDisabler);
        KeyBindingsController.keyDisabler = setTimeout(KeyBindingsController.enableKeyBindings,500);
    }

};

document.addEventListener("keydown", function (e) {
    KeyBindingsController.doKeyActionForKeyCode(e.keyCode);
});