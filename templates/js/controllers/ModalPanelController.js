/*
    ===========================
    = ModalPanelController.js =
    ===========================

    Manage the modal panel.
    Allow to open/close the modal panel.
    Give life/behaviour to the buttons inside it.

    ModalPanelController is a Controller of Controllers : it takes two controllers in order to
    display their views side by side.

    Author : Ludovic Loridan

*/

(function () {

    var className = "ModalPanelController";

    var properties = ["primaryController", "secondaryController", "view",
                      "isOpened", "secondaryIsOpened",
                      "view",
                      "HTMLOverlay", "HTMLPrimary", "HTMLSecondary",
                      "HTMLPrimaryContent", "HTMLSecondaryContent",
                      "HTMLFoldButton", "HTMLCloseButton",
                      "HTMLTabs", "HTMLPrimaryTab", "HTMLSecondaryTab"];

    var methods = {


        // --                       --
        // -- ModalPanel open/close --
        // --                       --

        setIsOpened : function (newValue) {
            isOpened = newValue;
            this.updatePrimaryModalState();
        },

        updatePrimaryModalState: function () {
            if (this.isOpened) {
                console.log("will open");
                this.displayModal();
            } else {
                console.log("will close");
                this.unshowModal();
            }
        },

        // State of the modal
        displayModal : function () {
            document.body.classList.add("modalDisplayed");
            var showingFunction = getThisCallingFunction(this, "showModal");
            setTimeout(showingFunction, 20);
        },

        showModal : function () {
            document.body.classList.add("modalVisible");
        },

        unshowModal : function () {
            document.body.classList.remove("modalVisible");
        },

        undisplayModal : function () {
            document.body.classList.remove("modalDisplayed");
        },

        modalHasTransited : function (evt) {
            if (evt.propertyName === "right") {
                this.modalRightHasTransited(evt);
            }
        },

        modalRightHasTransited : function (evt) {
            if (this.isOpened === null) {
                console.log("Null met");
                console.log(this === ModalPanelController.getController());
                console.log(this.isOpened);
            }

            if (!(this.isOpened)) {
                // console.log(this.isOpened);
                this.undisplayModal();
            }
        },


        // -- Sync with Two Controllers --
        setPrimaryController : function () {
            // TODO
        },

        setSecondaryController : function () {
            // TODO
        },

        updateView : function () {
            // TODO
        },

        // --                 --
        // -- Event Listeners --
        // --                 --
        installEventListeners: function () {
            this.installTransitionEventListener();
        },

        installTransitionEventListener : function () {
            var transitionOnModalFunc = getThisCallingFunction(this, "modalHasTransited");
            this.HTMLPrimary.addTransitionCallback(transitionOnModalFunc);
        },


        // --                                  --
        // -- Matching of properties with HTML --
        // --                                  --

        matchWithView : function () {
            this.view = document.getElementById("modalPanel");

            this.HTMLOverlay = document.getElementById("overlay");
            this.HTMLPrimary = document.getElementById("primaryModal");
            this.HTMLSecondary = document.getElementById("secondaryModal");

            this.HTMLPrimaryContent = this.HTMLPrimary.querySelector(".content");
            this.HTMLSecondaryContent = this.HTMLSecondary.querySelector(".content");

            this.HTMLFoldButton = this.HTMLPrimary.querySelector(".foldButton");
            this.HTMLCloseButton = this.HTMLPrimary.querySelector(".topModal > .closeButton");
           
            this.HTMLTabs = document.getElementById("tabs");
            this.HTMLPrimaryTab = this.HTMLTabs.querySelector(".tabButton:nth-child(1)");
            this.HTMLSecondaryTab = this.HTMLTabs.querySelector(".tabButton:nth-child(2)");
           
            this.view.controller = this;

            return this.view;
        },

        // Throw an exception if an unexpected value has been found in HTML Matching
        assertThatMachingIsGood : function () {
            if (!this.matchingIsGood()) {
                throw "Error in matching modal panels";
            }
        },

        matchingIsGood : function () {
            return ((this.HTMLOverlay instanceof Node) &&
            (this.HTMLOverlay instanceof Node) &&
            (this.HTMLPrimary instanceof Node) &&
            (this.HTMLSecondary instanceof Node) &&
            (this.HTMLPrimaryContent instanceof Node) &&
            (this.HTMLSecondaryContent instanceof Node) &&
            (this.HTMLFoldButton instanceof Node) &&
            (this.HTMLCloseButton instanceof Node) &&
            (this.HTMLTabs instanceof Node) &&
            (this.HTMLPrimaryTab instanceof Node) &&
            (this.HTMLSecondaryTab instanceof Node));
        },

        // --               --
        // -- Initial State --
        // --               --
        initialState : function () {
            this.isOpened = false;
        }
    };

    var initializer = function () {
        if (ModalPanelController.hasBeenInstanced()) {
            throw "An instance of ModalPanel has ever been instanced";
        } else {
            this.matchWithView();
            this.installEventListeners();
            this.initialState();
            ModalPanelController.singleton = this;
        }
    };

    var staticMethods = {

        getView : function () {
            return ModalPanelController.getController().view;
        },

        getController : function () {
            if (!(ModalPanelController.hasBeenInstanced())) {
                return new ModalPanelController();
            }
            return ModalPanelController.singleton;
        },

        hasBeenInstanced : function () {
            return (ModalPanelController.singleton !== null);
        }

    };

    var staticProperties = {

        singleton : null

    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();