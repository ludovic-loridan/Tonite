/*
    =====================
    = TileController.js =
    =====================

    Gives life to tiles which represents programs

    Author : Ludovic Loridan

*/

(function () {

var className = "TileController";

var properties = ["program","view","HTMLTitle","HTMLCharacteristics","HTMLTimeInfos",
                  "characteristicsCyclingInterval","timeInfosUpdatingInterval"];

var methods = {

    // -- Sync with Model --

    setProgram : function(newProgram) {
        if (!(newProgram instanceof Program)) {
            throw "Error : Tile's model should always be Program's instances";
        }

        program = newProgram;
        this.updateView();
    },

    updateView : function() {
        this.updateTitle();
        this.updateCharacteristics();
        this.updateTimeInfos();
    },

    // -- Title --
    updateTitle : function () {
        this.HTMLTitle.setText(this.program.title);
    },

    // -- Time infos --
    getRemainingTimeString : function() {
        if (this.program.isPast()) {return "Oh non, c'est fini :'(";}
        else if (this.program.isNow()) {return "";}
        else {
            var remainingMs = this.program.start.getTime() - Date.now();
            var remainingTime = new Date(remainingMs);
            return "Débute dans "+remainingTime.getPeriodString()+"...";
        }
    },

    setTimeInfosText : function () {
        this.HTMLTimeInfos.setText(this.getRemainingTimeString());
    },

    updateTileFlag : function () {
        if (this.program.isPast()) { this.view.classList.add("past"); }
        else { this.view.classList.remove("past"); }

        if (this.program.isNow()) { this.view.classList.add("now"); }
        else { this.view.classList.remove("now"); }

        if (this.program.isToCome()) { this.view.classList.add("tocome"); }
        else { this.view.classList.remove("tocome"); }
    },

    updateTimeInfos : function () {
        this.setTimeInfosText();
        this.updateTileFlag();
    },

    startTimeInfosUpdatingCycling : function() {
        var cyclingFunction = TileController.getThisCallingFunction(this,"updateTimeInfos");
        this.timeInfosUpdatingCyclingInterval = setInterval(cyclingFunction, 30 * 1000);
    },

    stopTimeInfosUpdatingCycling : function () {
        clearInterval(this.timeInfosUpdatingCyclingInterval);
        this.timeInfosUpdatingCyclingInterval = null;
    },

    // -- Characteristic List --
    // Returns an array
    getCharacteristicsFromModel : function () {
        var characteristics = [];
        if (hasAValue(this.program.subtitle)) {characteristics.push(this.program.subtitle);}
        if (hasAValue(this.program.genre))    {characteristics.push(this.program.genre);}
        if (hasAValue(this.program.year))     {characteristics.push(this.program.year);}
        if (hasAValue(this.program.start))    {characteristics.push(this.program.start.getHoursMinutesString(" h "));}
        return characteristics;
    },

    updateCharacteristics : function () {
        var characteristics = this.getCharacteristicsFromModel();
        this.HTMLCharacteristics.removeAllChildren();
        this.HTMLCharacteristics.addListItems(characteristics);
        this.subscribeAllCharacteristicsToTransitionListener();
    },

    goToNextCharacteristic : function() {
        if (this.HTMLCharacteristics.childNodes.length > 1) {
            this.hideFirstCharacteristic();
        }
    },

    startCharacteristicsCycling : function() {
        var cyclingFunction = TileController.getThisCallingFunction(this,"goToNextCharacteristic");
        this.characteristicsCyclingInterval = setInterval(cyclingFunction, 3000);
    },

    startCharacteristicsCyclingWithDelay : function (delay) {
        var startCyclingFunction = TileController.getThisCallingFunction(this,"startCharacteristicsCycling");
        setTimeout(startCyclingFunction, delay);
    },

    stopCharacteristicsCycling : function () {
        clearInterval(this.characteristicsCyclingInterval);
        this.characteristicsCyclingInterval = null;
    },

    // @Private
    subscribeAllCharacteristicsToTransitionListener : function() {
        var lis = this.HTMLCharacteristics.children;
        for (var i = 0; i < lis.length; i++) {
            lis[i].whenTransitionEndsDo({
                handleEvent : TileController.handleEndOfCharacteristicTransition,
                tile : this
            });
        }
    },

    // @Private
    hideFirstCharacteristic : function() {
        var firstLi = this.HTMLCharacteristics.children[0];
        firstLi.classList.add("disappeared");
    },

    // @Private
    moveTopCharacteristicToBottom : function () {
        var firstLi = this.HTMLCharacteristics.children[0];
        this.HTMLCharacteristics.removeChild(firstLi);
        this.HTMLCharacteristics.appendChild(firstLi);
        firstLi.classList.remove("disappeared");
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("div","class","tile");
        this.HTMLTitle = this.view.addElement("div","class","title");
        this.HTMLCharacteristics = this.view.addElement("ul","class","characteristics");
        this.HTMLTimeInfos = this.view.addElement("div","class","time");
        this.view.controller = this;
        return this.view;
    }
};

var initializer = function (program) {
    this.createView();
    this.program = program;
    this.startCharacteristicsCyclingWithDelay(Math.naturalRandom(2000));
    this.startTimeInfosUpdatingCycling();
};

var staticMethods = {
    handleEndOfCharacteristicTransition : function(evt) {
        if (evt.propertyName === "margin-top") {
            this.tile.moveTopCharacteristicToBottom();
        }
    },

    getThisCallingFunction : function(object,fun) {
        return function() {(object[fun])();};
    }

};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();