/*
    =====================
    = TileController.js =
    =====================

    Gives life to tiles which represents programs

    Author : Ludovic Loridan

*/

(function () {

var className = "TileController";

var properties = ["program","view","HTMLTitle","HTMLCharacteristics","HTMLInfo","characteristicsCyclingInterval"];

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
        // TODO : Those methods
        this.updateTitle();
        this.updateCharacteristics();
        //this.updateTimeInfos();
    },

    updateTitle : function () {
        this.HTMLTitle.setText(this.program.title);
    },

    // -- Management of characteristics list --
    // Returns an array
    getCharacteristicsFromModel : function () {
        var characteristics = [];
        if (hasAValue(this.program.subtitle)) {characteristics.push(this.program.subtitle);}
        if (hasAValue(this.program.genre))    {characteristics.push(this.program.genre);}
        if (hasAValue(this.program.year))     {characteristics.push(this.program.year);}
        if (hasAValue(this.program.start))    {characteristics.push(this.program.start.getHoursMinutesString());}
        return characteristics;
    },

    updateCharacteristics : function () {
        var characteristics = this.getCharacteristicsFromModel();
        this.HTMLCharacteristics.removeAllChildren();
        this.HTMLCharacteristics.addListItems(characteristics);
        this.subscribeAllCharacteristicsToTransitionListener();
    },

    goToNextCharacteristic : function() {
        this.hideFirstCharacteristic();
    },

    startCharacteristicsCycling : function() {
        var cyclingFunction = TileController.getCyclingFunction(this);
        this.characteristicsCyclingInterval = setInterval(cyclingFunction, 3000);
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
        this.HTMLInfo = this.view.addElement("div","class","info time");
        return this.view;
    }
};

var initializer = function (program) {
    this.createView();
    this.program = program;
    this.startCharacteristicsCycling();
};

var staticMethods = {
    handleEndOfCharacteristicTransition : function(evt) {
        if (evt.propertyName === "margin-top") {
            this.tile.moveTopCharacteristicToBottom();
        }
    },

    getCyclingFunction : function(tile) {
        return function() {tile.goToNextCharacteristic();};
    }

};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();