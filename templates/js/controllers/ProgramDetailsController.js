/*
    ===============================
    = ProgramDetailsController.js =
    ===============================

    Construct the program details HTML of a program, given a Program instance.

    Author : Ludovic Loridan

*/

(function () {

var className = "ProgramDetailsController";

var properties = ["program","view",
                  "HTMLDescription", "HTMLTitle","HTMLCharacteristics","HTMLStatus","HTMLProgress",
                  "HTMLSynopsis","HTMLImage",
                  "timeInfosUpdateInterval"];

var methods = {

    // -- Sync with Model --
    setProgram : function(newProgram) {
        if (!(newProgram instanceof Program)) {
            throw "Error : Given object is not a program.";
        }

        program = newProgram;
        this.updateView();
    },

    updateView : function() {
        this.updateDescription();
        this.updateImage();
    },

    // -- Sync of the description part --
    updateDescription : function() {
        this.updateTitle();
        this.updateCharacteristics();
        this.updateStatus();
        this.updateProgress();
        this.updateSynopsis();
    },

    updateTitle : function() {
        this.HTMLTitle.setText(this.program.title);
    },

    updateCharacteristics : function () {
        this.HTMLCharacteristics.removeAllChildren();
        
        if (hasAValue(this.program.genre)) {
            this.HTMLCharacteristics.addListItem(this.program.genre);
        }

        this.HTMLCharacteristics.addListItem(this.program.channel.name);

        if (hasAValue(this.program.duration)) {
            this.HTMLCharacteristics.addListItem(this.program.duration);
        }
    },

    getStatusText : function () {
        if (this.program.isToCome()) {
            var remainingMs = this.program.start.getTime() - Date.now();
            var remainingTime = new Date(remainingMs);
            return "Débute dans "+remainingTime.getPeriodString()+"...";
        }

        if (this.program.isNow()) {
            return "En cours";
        }

        if (this.program.isPast()) {
            return "Terminé";
        }
    },

    updateStatus : function () {
        var statusText = this.getStatusText();
        this.HTMLStatus.setText(statusText);
    },

    updateProgress : function () {
        this.updateProgressStrings();
        this.updateProgressCompletion();
    },

    updateProgressStrings : function () {
        var barController = this.HTMLProgress.controller;
        barController.startString = this.program.start.getHoursMinutesString(" h ");
        barController.stopString = this.program.stop.getHoursMinutesString(" h ");
    },

    updateProgressCompletion : function () {
        var barController = this.HTMLProgress.controller;
        var duration = this.program.stop - this.program.start;
        var elapsed = Date.now() - this.program.start;

        var completion = (elapsed / duration) * 100;
        barController.completion = completion;
    },

    updateSynopsis : function () {
        var synopsis = this.program.description;
        this.HTMLSynopsis.setText(synopsis);
    },

    // - Sync of the image --

    updateImage : function() {
        this.HTMLImage.setAttribute("alt",this.program.title);
        this.HTMLImage.setAttribute("src",this.program.imageURL);
    },

    // -- Auto update --
    startTimeInfosAutoUpdate : function () {
        var updateFunction = getThisCallingFunction(this,"updateTimeInfos");
        this.timeInfosUpdateInterval = setInterval(updateFunction, 20000);
    },

    stopTimeInfosAutoUpdate : function () {
        clearInterval(this.timeInfosUpdateInterval);
        this.timeInfosUpdateInterval = null;
    },

    updateTimeInfos : function () {
        this.updateStatus();
        this.updateProgressCompletion();
    },

    // -- HTML Generation --
    createView : function() {
        this.view = document.createElementWithAttributes("article","class","programDetails");
        
        this.createDescriptionPart();
        this.createImagePart();
        
        this.view.controller = this;
    },

    createDescriptionPart : function () {
        this.HTMLDescription     = this.view.addElement("div","class","programDescription");
        this.HTMLTitle           = this.HTMLDescription.addElement("h1");
        this.HTMLCharacteristics = this.HTMLDescription.addElement("ul","class","programCharacteristics");
        this.HTMLStatus          = this.HTMLDescription.addElement("p","class","status");

        this.createProgressBar();

        this.HTMLSynopsis        = this.HTMLDescription.addElement("p","class","programSynopsis");
    },

    createProgressBar : function () {
        var barController = new ProgressBarController("--","--",0);
        this.HTMLProgress = barController.view;
        this.HTMLDescription.appendChild(this.HTMLProgress);
    },

    createImagePart : function () {
        this.HTMLImage           = this.view.addElement("img","class","programImage");
    }


};

var initializer = function (newProgram) {
    this.createView();
    this.program = newProgram;
    this.startTimeInfosAutoUpdate();
};

var staticMethods = {



};

var staticProperties = {};

Class.create(className,properties,methods,initializer,staticMethods,staticProperties);

})();