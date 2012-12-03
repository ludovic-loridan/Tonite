/*
    ===============================
    = ProgramDetailsController.js =
    ===============================

    Construct the program details HTML of a program, given a Program instance.

    Author : Ludovic Loridan

*/

(function () {

    var className = "ProgramDetailsController";

    var properties = ["program", "view", "title",
                      "HTMLDescription", "HTMLHeader", "HTMLTitle", "HTMLCharacteristics", "HTMLStatus", "HTMLProgress",
                      "HTMLSynopsis", "HTMLImage", "HTMLSubtitle", "HTMLDescription",
                      "timeInfosUpdateInterval"];

    var methods = {

        // -- Sync with Model --
        setProgram : function (newProgram) {
            if (!(newProgram instanceof Program)) {
                throw "Error : Given object is not a program.";
            }

            program = newProgram;
            this.updateView();
        },

        updateView : function () {
            this.updateDescription();
            this.updateImage();
        },

        // -- Sync of the description part --
        updateDescription : function () {
            this.updateTitle();
            this.updateCharacteristics();
            this.updateStatus();
            this.updateProgress();
            this.updateSynopsis();
            this.updateSubtitle();
        },

        updateTitle : function () {
            this.HTMLTitle.setText(this.program.title);
        },

        updateCharacteristics : function () {
            this.HTMLCharacteristics.removeAllChildren();
            
            if (hasAValue(this.program.genre)) {
                this.HTMLCharacteristics.addListItem(this.program.genre);
            }

            this.HTMLCharacteristics.addListItem(Channel.channelNameFromId(this.program.channel_id));

            if (hasAValue(this.program.duration)) {
                this.HTMLCharacteristics.addListItem(this.program.duration);
            }

            if (hasAValue(this.program.year)) {
                this.HTMLCharacteristics.addListItem(this.program.year);
            }
        },

        getStatusText : function () {
            if (this.program.isToCome()) {
                var remainingMs = this.program.start.getTime() - Date.now();
                var remainingTime = new Date(remainingMs);
                return "Débute dans " + remainingTime.getPeriodString() + "...";
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
            this.HTMLDescription.setText(synopsis);
        },

        updateSubtitle : function () {
            var subtitle = hasAValueOr(this.program.subtitle, "");
            this.HTMLSubtitle.setText(subtitle);
        },

        // - Sync of the image --

        updateImage : function () {
            if (this.program.imageURL !== null) {
                this.HTMLImage.classList.remove("notDisplayed");
                this.HTMLImage.setAttribute("alt", this.program.title);
                this.HTMLImage.setAttribute("src", this.program.imageURL);
            } else {
                this.HTMLImage.classList.add("notDisplayed");
            }
        },

        // -- Auto update --
        startTimeInfosAutoUpdate : function () {
            var updateFunction = getThisCallingFunction(this, "updateTimeInfos");
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
        createView : function () {
            this.view = document.createElementWithAttributes("article", "class", "programDetails");
            
            this.createDescriptionPart();
            this.createImagePart();
            
            this.view.controller = this;
        },

        createDescriptionPart : function () {
            this.HTMLDescription     = this.view.addElement("div", "class", "programDescription");

            this.HTMLHeader          = this.HTMLDescription.addElement("header");

            this.HTMLTitle           = this.HTMLHeader.addElement("h1");
            this.HTMLCharacteristics = this.HTMLHeader.addElement("ul", "class", "programCharacteristics");
            this.HTMLStatus          = this.HTMLHeader.addElement("p", "class", "status");

            this.createProgressBar();

            this.HTMLSynopsis        = this.HTMLDescription.addElement("p", "class", "programSynopsis");
            this.HTMLSubtitle        = this.HTMLSynopsis.addElement("span", "class", "subtitle");
            this.HTMLDescription     = this.HTMLSynopsis.addElement("span", "class", "description");
        },

        createProgressBar : function () {
            var barController = new ProgressBarController("--", "--", 0);
            this.HTMLProgress = barController.view;
            this.HTMLHeader.appendChild(this.HTMLProgress);
        },

        createImagePart : function () {
            this.HTMLImage           = this.view.addElement("img", "class", "programImage");
        }


    };

    var initializer = function (newProgram) {
        this.createView();
        this.program = newProgram;
        this.startTimeInfosAutoUpdate();
        this.title = "Détails";
    };

    var staticMethods = {

        openDetailsForProgramById : function (program_id) {
            var program = Program.programFromId(program_id);
            ProgramDetailsController.openDetailsForProgram(program);
        },

        openDetailsForProgram : function (program) {
            this.openModalPanelWithChannelDetails(program);
        },

        // private
        openModalPanelWithChannelDetails : function (program) {
            var mpc = ModalPanelController.getController();
            mpc.CSSClass = "channel" + program.channel_id;

            var pdc = new ProgramDetailsController(program);
            mpc.primaryController = pdc;

            var ctc = new ChatThreadController(); // TODO : Link with a model
            mpc.secondaryController = ctc;
            
            mpc.openPrimary();
        }

    };

    var staticProperties = {};

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();