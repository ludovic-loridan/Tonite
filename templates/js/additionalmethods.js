/*  = Useful methods = */
function hasAValue(obj) {
    return (typeof(obj) !== "undefined") && obj !== null;
}


/*  = String extensions = */

String.prototype.capitalized = function() {
    return this[0].toUpperCase() + this.substr(1);
};


/*  = Date extensions = */
(function() {


    function getDateComponents (iso) {
        var dateComponents = {};

        dateComponents.year    = parseInt( iso.substr(0,4)  , 10);
        dateComponents.month   = parseInt( iso.substr(4,2)  , 10) - 1;
        dateComponents.day     = parseInt( iso.substr(6,2)  , 10);
        dateComponents.hour    = parseInt( iso.substr(8,2)  , 10);
        dateComponents.minutes = parseInt( iso.substr(10,2) , 10);
        dateComponents.seconds = parseInt( iso.substr(12,2) , 10);

        return dateComponents;
    }


    Date.dateFromISO = function(iso) {
        iso = (iso).toString();
        var comp = getDateComponents(iso);
        return new Date(comp.year,comp.month,comp.day,comp.hour,comp.minutes,comp.seconds);
    };

    Date.prototype.getHoursMinutesString = function() {
        var hoursString = this.getHours();
        var minutesString = this.getMinutes();
        return hoursString+":"+minutesString;
    };

}());