/*  = Useful methods = */

function hasAValue(obj) {
    return(typeof(obj) !== "undefined") && obj !== null;
}

function hasAValueOr(obj, defaultValue) {
    if(hasAValue(obj)) {
        return obj;
    } else {
        return defaultValue;
    }
}

Arguments = {
    slice: function(args, index) {
        return Array.prototype.slice.call(args, index);
    }
};

// Returns a function that call the function named "fun" on object


function getThisCallingFunction(object, fun) {
    return function(evt) {
        (object[fun])(evt);
    };
}

/*  = Transitions extensions = */
HTMLElement.prototype.addTransitionCallback = function(callback) {
    this.addEventListener('webkitTransitionEnd', callback, false);
    this.addEventListener('transitionend', callback, false);
    this.addEventListener('OTransitionEnd', callback, false);
};

HTMLElement.prototype.disableTransition = function() {
    this.classList.add("transitionDisabled");
};

HTMLElement.prototype.enableTransition = function() {
    this.classList.remove("transitionDisabled");
};

/*  = String extensions = */

String.prototype.startsWith = function(str) {
    var prefix = this.substring(0, str.length);
    return str === prefix;
};

String.prototype.capitalized = function() {
    return this[0].toUpperCase() + this.substr(1);
};

String.prototype.addZeros = function(nbDigits) {
    var string = this;
    while(string.length < nbDigits) {
        string = '0' + string;
    }
    return string;
};

/*  = URL extensions = */
function urlWithoutHash(url) {
    var urlParts = url.split("#",2);
    return urlParts[0];
}

/*  = Element extensions = */
Element.prototype.getData = function() {
    return this.childNodes[0].data;
};

/*  = Maths extensions = */
Math.naturalRandom = function(end) {
    var random = Math.random();
    random = random * end;
    return Math.round(random);
};

/*  = Date extensions = */
(function() {

    // ---- ISO -> Date ----


    function getDateComponents(iso) {
        var dateComponents = {};

        dateComponents.year = parseInt(iso.substr(0, 4), 10);
        dateComponents.month = parseInt(iso.substr(4, 2), 10) - 1;
        dateComponents.day = parseInt(iso.substr(6, 2), 10);
        dateComponents.hour = parseInt(iso.substr(8, 2), 10);
        dateComponents.minutes = parseInt(iso.substr(10, 2), 10);
        dateComponents.seconds = parseInt(iso.substr(12, 2), 10);

        return dateComponents;
    }


    Date.dateFromISO = function(iso) {
        iso = (iso).toString();
        var comp = getDateComponents(iso);
        return new Date(comp.year, comp.month, comp.day, comp.hour, comp.minutes, comp.seconds);
    };

    Date.prototype.toISO = function(limit) {
        limit = limit || 12;

        var minute = this.getMinutes();
        var hour = this.getHours();
        var day = this.getDate();
        var month = this.getMonth() + 1;
        var year = this.getFullYear();

        if(minute < 10) minute = '0' + minute;
        if(hour < 10) hour = '0' + hour;
        if(day < 10) day = '0' + day;
        if(month < 10) month = '0' + month;

        var iso = year.toString() + month.toString() + day.toString() + hour.toString() + minute.toString();
        return iso.substr(0, limit);
    };

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    Date.prototype.getHoursMinutesString = function(separator) {
        if(!hasAValue(separator)) {
            separator = ":";
        }

        var hoursString = this.getHours();
        var minutesString = (this.getMinutes()).toString().addZeros(2);
        return hoursString + separator + minutesString;
    };

    // ---- Remaining String ----
    Date.prototype.getMinutesString = function() {
        var nbMinutes = this.getMinutes();

        var minutesLabel = " minute";
        if(nbMinutes > 1) {
            minutesLabel += "s";
        }

        return nbMinutes + minutesLabel;
    };

    // Ex : "29 minutes", "2h20"
    Date.prototype.getPeriodString = function() {
        var period = new Date(this.getTime() - 3600000);
        if(period.getHours() > 0) {
            return period.getHoursMinutesString("h");
        } else if(period.getMinutes() > 0) {
            return period.getMinutesString();
        } else {
            return "un instant";
        }

    };

}());