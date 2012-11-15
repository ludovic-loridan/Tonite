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
        program : ProgramDetailsController.openDetailsForProgramById
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
            return false;
        }
    },

    // Hash param
    getHashParams : function () {
        var hashValue = location.hash.substring(1);
        var hashParams = hashValue.split(".",2);
        return {actionName : hashParams[0], param: hasAValueOr(hashParams[1], null)};
    },

    callHashActionFromURL : function () {
        var hash = URLHashController.getHashParams();
        URLHashController.callHashAction(hash.actionName,hash.param);
    }


};