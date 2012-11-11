/*
    =====================
    = TileController.js =
    =====================

    Gives life to tiles which represents programs

    Author : Ludovic Loridan

*/

(function () {

<<<<<<< HEAD
var className = "TileController";

var properties = ["program","view","HTMLTitle","HTMLCharacteristics","HTMLTimeInfos", "HTMLImage",
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
        this.updateImage();
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
        var cyclingFunction = getThisCallingFunction(this,"updateTimeInfos");
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
        if (hasAValue(this.program.category))    {characteristics.push(this.program.category);}
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
        var cyclingFunction = getThisCallingFunction(this,"goToNextCharacteristic");
        this.characteristicsCyclingInterval = setInterval(cyclingFunction, 6000);
    },

    startCharacteristicsCyclingWithDelay : function (delay) {
        var startCyclingFunction = getThisCallingFunction(this,"startCharacteristicsCycling");
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
=======
    var className = "TileController";

    var properties = ["program", "view", "HTMLTitle", "HTMLCharacteristics", "HTMLTimeInfos",  "HTMLImage",
                      "characteristicsCyclingInterval", "timeInfosUpdatingInterval"];

    var methods = {

        // -- Sync with Model --

        setProgram : function (newProgram) {
            if (!(newProgram instanceof Program)) {
                throw "Error : Tile's model should always be Program's instances";
            }

            program = newProgram;
            this.updateView();
        },

        updateView : function () {
            this.updateId();
            this.updateTitle();
            this.updateCharacteristics();
            this.updateTimeInfos();
            this.updateImage();
        },

        // -- Id --
        updateId : function () {
            var tileId = "program_" + this.program.id;
            this.view.setAttribute("id",tileId);
        },

        // -- Title --
        updateTitle : function () {
            this.HTMLTitle.setText(this.program.title);
        },

        // -- Time infos --
        getRemainingTimeString : function () {
            if (this.program.isPast()) {return "Oh non, c'est fini :'("; }
            else if (this.program.isNow()) {return ""; }
            else {
                var remainingMs = this.program.start.getTime() - Date.now();
                var remainingTime = new Date(remainingMs);
                return "Débute dans " + remainingTime.getPeriodString() + "...";
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

        startTimeInfosUpdatingCycling : function () {
            var cyclingFunction = getThisCallingFunction(this, "updateTimeInfos");
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
            if (hasAValue(this.program.subtitle)) {characteristics.push(this.program.subtitle); }
            if (hasAValue(this.program.genre))    {characteristics.push(this.program.genre); }
            if (hasAValue(this.program.year))     {characteristics.push(this.program.year); }
            if (hasAValue(this.program.start))    {characteristics.push(this.program.start.getHoursMinutesString(" h ")); }
            return characteristics;
        },

        updateCharacteristics : function () {
            var characteristics = this.getCharacteristicsFromModel();
            this.HTMLCharacteristics.removeAllChildren();
            this.HTMLCharacteristics.addListItems(characteristics);
            this.subscribeAllCharacteristicsToTransitionListener();
        },

        goToNextCharacteristic : function () {
            if (this.HTMLCharacteristics.childNodes.length > 1) {
                this.hideFirstCharacteristic();
            }
        },

        // There is no need to cycle through characteristics if the tile is not visible.
        // It's an optimization.
        goToNextCharacteristicIfTileIsVisible : function () {
            if (this.tileIsVisible()) {
                this.goToNextCharacteristic();
            }
        },

        tileIsVisible : function () {
            return this.view.isInTheViewport();
        },

        startCharacteristicsCycling : function () {
            var cyclingFunction = getThisCallingFunction(this, "goToNextCharacteristicIfTileIsVisible");
            this.characteristicsCyclingInterval = setInterval(cyclingFunction, 6000);
        },

        startCharacteristicsCyclingWithDelay : function (delay) {
            var startCyclingFunction = getThisCallingFunction(this, "startCharacteristicsCycling");
            setTimeout(startCyclingFunction, delay);
        },

        stopCharacteristicsCycling : function () {
            clearInterval(this.characteristicsCyclingInterval);
            this.characteristicsCyclingInterval = null;
        },

        // @Private
        subscribeAllCharacteristicsToTransitionListener : function () {
            var lis = this.HTMLCharacteristics.children;
            for (var i = 0; i < lis.length; i++) {
                lis[i].whenTransitionEndsDo({
                    handleEvent : TileController.handleEndOfCharacteristicTransition,
                    tile : this
                });
            }
        },

        // @Private
        hideFirstCharacteristic : function () {
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

        // -- Updating Image --
        updateImage : function () {
            this.HTMLImage.classList.remove("loaded");
            this.HTMLImage.setAttribute("src", this.program.imageURL);
        },

        // --                                 --
        // -- Subscription to event listeners --
        // --                                 --
        subscribeToListeners : function () {
            this.subscribeToClickListener();
        },

        subscribeToClickListener : function () {
            this.view.addEventListener("click", TileController.openRelatedProgramDetails);
        },

        // -- HTML Generation --
        createView : function () {
            this.view = document.createElementWithAttributes("div", "class", "tile");
            
            this.HTMLImage = this.view.addElement("img", "alt", "", "class", "background");
            this.HTMLImage.addClassWhenLoaded();

            this.HTMLTitle = this.view.addElement("div", "class", "title");
            this.HTMLCharacteristics = this.view.addElement("ul", "class", "characteristics");
            this.HTMLTimeInfos = this.view.addElement("div", "class", "time");
            this.view.controller = this;
            return this.view;
>>>>>>> 9216bf1fde5f2e90324a09841618f3c755ce44b7
        }
    };

    var initializer = function (program) {
        this.createView();
        this.subscribeToListeners();
        this.program = program;
        this.startCharacteristicsCyclingWithDelay(Math.naturalRandom(6000));
        this.startTimeInfosUpdatingCycling();
    };

    var staticMethods = {
        handleEndOfCharacteristicTransition : function (evt) {
            if (evt.propertyName === "margin-top") {
                this.tile.moveTopCharacteristicToBottom();
            }
        },

        // --                 --
        // -- Event listeners --
        // --                 --
        openRelatedProgramDetails : function (evt) {
            var relatedProgram = evt.target.controller.program;
            var pdc = new ProgramDetailsController(relatedProgram);
            var mpc = ModalPanelController.getController();

            mpc.primaryController = pdc;
            mpc.CSSClass = "channel" + relatedProgram.channel.id;
            mpc.openPrimary();
        }

    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();