/*
    ========================
    = URLHashController.js =
    ========================

    Manage the "URL Logic" of the application.
    For example, "tonite.com#program.2320439" will load tonite with
    the details of the program "2320439" opened.

    Author : Ludovic Loridan

*/

URLHashController = {

    hashActions : {
        program : ProgramDetailsController.openDetailsForProgramById,
        mainPage : ModalPanelController.close
    },

    // Hash Actions Management
    getHashAction : function (actionName) {
        return URLHashController.hashActions[actionName];
    },

    hasHashAction : function (actionName) {
        return hasAValue(URLHashController.hashActions[actionName]);
    },

    callHashAction : function (actionName, param) {
        if (URLHashController.hasHashAction(actionName)) {
            var hashAction = URLHashController.getHashAction(actionName);
            hashAction.call(this,param);
            return true;
        } else {
            return URLHashController.callHashAction("mainPage","");
        }
    },

    // Hash param
    getHashParamsFromString : function (hashValue) {
        var hashParams = hashValue.split(".",2);
        return {actionName : hashParams[0], param: hasAValueOr(hashParams[1], null)};
    },

    getHashParamsFromURL : function () {
        var hashValue = location.hash.substring(1);
        return URLHashController.getHashParamsFromString(hashValue);
    },

    callHashActionFromString: function(hashValue) {
        var hash = URLHashController.getHashParamsFromString(hashValue);
        URLHashController.callHashAction(hash.actionName,hash.param);
    },

    callHashActionFromURL : function () {
        var hash = URLHashController.getHashParamsFromURL();
        URLHashController.callHashAction(hash.actionName,hash.param);
    }


};

// Handle "back" events
window.onpopstate = function (e) {
    if (hasAValue(e.state)) {
        console.log("Popped " + e.state);
        URLHashController.callHashActionFromString(e.state);
    } else {
        try {
            URLHashController.callHashActionFromURL();
        } catch (exc) {

        }
    }
};