/*
    ========================
    = SpinnerController.js =
    ========================

    This class represents a canvas spinner

    Author : Alexis Camus

*/

(function () {

var className = "SpinnerController";

var properties = ["view", "timeInfosUpdateInterval", "dashNumber", "dashLength", "dashWidth", "radius", 
    "colors", "context", "rotate", "indice"];

var methods = {

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("canvas","id","toniteSpinner", "width", "100", "height", "100", "class", "vcenter");
        this.view.style.display = "block";
        this.view.style.margin = "auto";
        this.view.controller = this;
    },

    removeView: function() {
        this.stop();
        document.body.removeChild(this.view);
    },

    drawSpinner : function() {
        rotate += Math.PI * 2 / dashNumber;
        context.save();
        context.clearRect(0, 0, this.view.width, this.view.height);
        context.translate(view.width / 2, view.height / 2);
        context.rotate(rotate);
        
        for (i = 0; i < dashNumber; i++) {
            context.rotate(Math.PI * 2 / dashNumber);
            context.beginPath();
            context.moveTo(radius, 0);
            context.lineTo(radius + dashLength, 0);
            context.lineWidth = dashWidth;
            context.strokeStyle = SpinnerController.mixHexColor(colors[Math.floor(indice)%dashNumber], colors[Math.floor(indice+1)%dashNumber], indice%1, i / dashNumber);
            context.stroke();
        }
        context.restore();
        indice += 0.05;
    },

    start : function() {
        var updateFunction = getThisCallingFunction(this, "drawSpinner");
        this.timeInfosUpdateInterval = setInterval(updateFunction, 70);
    },

    stop : function () {
        console.log("stop");
        clearInterval(this.timeInfosUpdateInterval);
        this.timeInfosUpdateInterval = null;
    }
};

var initializer = function (channelsList) {
    this.createView();

    // spinner configuration
    this.dashNumber = 14;
    this.dashLength = 20;
    this.dashWidth = 4;
    this.radius = 15;

    this.colors = ['#093764', '#A32921', '#1460AF', '#000000', '#57A92C', '#666666', '#EC6A40', '#000000', '#5C2B8B', '#C6342A', '#E1961B', '#EB5733', '#1460AF', '#623669', '#EF8733', '#000000', '#733D8C', '#57A800', '#CE7A2B'];
    this.context = this.view.getContext("2d");
    this.rotate = 0;
    this.indice = 0;
};

var staticMethods = {
    hex2rgb : function(hex) {
        var rgb = hex.replace('#', '').match(/(.{2})/g);
        var i = 3;
        while(i--) rgb[i] = parseInt(rgb[i], 16);
        return rgb;
    },

    mixHexColor : function(hex1, hex2, indice, opacity) {
        var rgb1 = SpinnerController.hex2rgb(hex1);
        var rgb2 = SpinnerController.hex2rgb(hex2);
        var rgbmix = [];

        for (var i = 0; i < 3; i++)
            rgbmix[i] = Math.round(rgb1[i] + (rgb2[i] - rgb1[i]) * indice);

        return 'rgba(' + rgbmix.join(', ') + ', ' + (opacity || '1') + ')';
    }
};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();