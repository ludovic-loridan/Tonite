/*  = Useful methods = */
function hasAValue(obj) {
    return (typeof(obj) !== "undefined") && obj !== null;
}

// Returns a function that call the function named "fun" on object
function getThisCallingFunction(object, fun) {
    return function (evt) {(object[fun])(evt); };
}

/*  = Help for implementing transitions callbacks = */
HTMLElement.prototype.addTransitionCallback = function (callback) {
    this.addEventListener('webkitTransitionEnd', callback, false);
    this.addEventListener('transitionend', callback, false);
    this.addEventListener('OTransitionEnd', callback, false);
};

/*  = String extensions = */

String.prototype.startsWith = function (str) {
    var prefix = this.substring(0, str.length);
    return str === prefix;
};

String.prototype.capitalized = function () {
    return this[0].toUpperCase() + this.substr(1);
};

String.prototype.addZeros = function (nbDigits) {
    var string = this;
    while (string.length < nbDigits) {
        string = '0' + string;
    }
    return string;
};

/*  = Maths extensions = */
Math.naturalRandom = function (end) {
    var random = Math.random();
    random = random * end;
    return Math.round(random);
};

/*  = Date extensions = */
(function () {

    // ---- ISO -> Date ----
    function getDateComponents(iso) {
        var dateComponents = {};

        dateComponents.year    = parseInt(iso.substr(0, 4), 10);
        dateComponents.month   = parseInt(iso.substr(4, 2), 10) - 1;
        dateComponents.day     = parseInt(iso.substr(6, 2), 10);
        dateComponents.hour    = parseInt(iso.substr(8, 2), 10);
        dateComponents.minutes = parseInt(iso.substr(10, 2), 10);
        dateComponents.seconds = parseInt(iso.substr(12, 2), 10);

        return dateComponents;
    }


    Date.dateFromISO = function (iso) {
        iso = (iso).toString();
        var comp = getDateComponents(iso);
        return new Date(comp.year, comp.month, comp.day, comp.hour, comp.minutes, comp.seconds);
    };

    Date.prototype.getHoursMinutesString = function (separator) {
        if (!hasAValue(separator)) {separator = ":"; }

        var hoursString = this.getHours();
        var minutesString = (this.getMinutes()).toString().addZeros(2);
        return hoursString + separator + minutesString;
    };

    // ---- Remaining String ----
    Date.prototype.getMinutesString = function () {
        var nbMinutes = this.getMinutes();

        var minutesLabel = " minute";
        if (nbMinutes > 1) { minutesLabel += "s"; }

        return nbMinutes + minutesLabel;
    };


    // Ex : "29 minutes", "2h20"
    Date.prototype.getPeriodString = function () {
        var period = new Date(this.getTime() - 3600000);
        if (period.getHours() > 0) {
            return period.getHoursMinutesString("h");
        } else if (period.getMinutes() > 0) {
            return period.getMinutesString();
        } else {
            return "un instant";
        }

    };

}());