/*  = Useful methods = */
function hasAValue(obj) {
    return (typeof(obj) !== "undefined") && obj !== null;
}


/*  = String extensions = */

String.prototype.capitalized = function() {
    return this[0].toUpperCase() + this.substr(1);
};