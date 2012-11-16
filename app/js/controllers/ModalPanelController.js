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

    var properties = ["primaryController", "secondaryController", "view", "CSSClass",
                      "primaryIsAnimated","secondaryIsAnimated",
                      "isOpened", "secondaryIsOpened", "userWantsSecondaryOpened",
                      "view",
                      "HTMLOverlay", "HTMLPrimary", "HTMLSecondary",
                      "HTMLPrimaryContent", "HTMLSecondaryContent",
                      "HTMLFoldButton", "HTMLCloseButton", "HTMLCloseButtonTop",
                      "HTMLTabs", "HTMLPrimaryTab", "HTMLSecondaryTab",
                      "isSplit"];

    var methods = {


        // --                       --
        // -- ModalPanel open/close --
        // --                       --

        openPrimary : function () {
            this.isOpened = true;
            if (ModalPanelController.isTabbed()) {
                this.secondaryIsOpened = false;
            }
        },

        closePrimary : function () {
            this.isOpened = false;
        },

        closePrimaryAndLogInHistory : function () {
            this.closePrimary();
            console.log("pushed mainpage");
            history.pushState("mainPage","mainPage",location.origin+location.pathname);
        },

        setIsOpened : function (newValue) {
            isOpened = newValue;
            this.updatePrimaryModalState();
        },

        updatePrimaryModalState: function () {
            if (this.isOpened) {
                this.displayModal();
            } else {
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
                this.undisplayModal();
            }
        },


        // --                       --
        // -- Secondary open/close  --
        // --                       --

        openSecondary : function () {
            this.secondaryIsOpened = true;
            this.userWantsSecondaryOpened = true;
        },

        closeSecondary : function () {
            this.secondaryIsOpened = false;
            this.userWantsSecondaryOpened = false;
        },

        switchToSecondaryTab : function() {
            if (ModalPanelController.isTabbed()) {
                this.secondaryIsOpened = true;
                this.userWantsSecondaryOpened = true;
            }
        },

        switchToPrimaryTab : function () {
            if (ModalPanelController.isTabbed()) {
                this.secondaryIsOpened = false;
            }
        },

        toggleSecondary : function () {
            if (this.secondaryIsOpened) {
                this.closeSecondary();
            } else {
                this.openSecondary();
            }
        },

        setSecondaryIsOpened : function (newValue) {
            secondaryIsOpened = newValue;
            this.updateSecondaryModalState();
        },

        updateSecondaryModalState: function () {
            if (this.secondaryIsOpened) {
                this.HTMLSecondary.classList.remove("closed");
            } else {
                this.HTMLSecondary.classList.add("closed");
            }
        },

        // --                      --
        // -- Animation management --
        // --                      --

        setPrimaryIsAnimated : function (newAnimationParameter) {
            primaryIsAnimated = newAnimationParameter;
            this.updatePrimaryAnimation();
        },

        setSecondaryIsAnimated : function (newAnimationParameter) {
            secondaryIsAnimated = newAnimationParameter;
            this.updateSecondaryAnimation();
        },

        updatePrimaryAnimation: function () {
            if (this.primaryIsAnimated) {
                this.HTMLPrimary.enableTransition();
                this.HTMLOverlay.enableTransition();
            } else {
                this.HTMLPrimary.disableTransition();
                this.HTMLOverlay.disableTransition();
            }

            this.updateSecondaryAnimation();
        },

        updateSecondaryAnimation : function () {
            if (this.primaryIsAnimated && this.secondaryIsAnimated) {
                this.HTMLSecondary.enableTransition();
                this.HTMLPrimaryContent.enableTransition();
                this.HTMLFoldButton.enableTransition();
            } else {
                this.HTMLSecondary.disableTransition();
                this.HTMLPrimaryContent.disableTransition();
                this.HTMLFoldButton.disableTransition();
            }
        },

        disableAnimations : function() {
            this.primaryIsAnimated = false;
            this.secondaryIsAnimated = false;
        },

        enableAnimations : function () {
            this.primaryIsAnimated = true;
            this.secondaryIsAnimated = true;
        },

        temporarlyDisableAnimations : function () {
            var enablerFunction = getThisCallingFunction(this,"enableAnimations");

            this.disableAnimations();
            clearTimeout(ModalPanelController.animationDisabler);
            ModalPanelController.animationDisabler = setTimeout(enablerFunction,300);
        },

        // --                           --
        // -- Setting of  Controllers   --
        // --                           --

        setPrimaryController : function (newPrimaryController) {
            if (this.primaryController !== newPrimaryController) {
                primaryController = newPrimaryController;
                this.updatePrimaryView();
            }
        },

        setSecondaryController : function (newSecondaryController) {
            if (this.secondaryController !== newSecondaryController) {
                secondaryController = newSecondaryController;
                this.updateSecondaryView();
            }
        },

        updatePrimaryView : function () {
            this.emptyPrimaryContent();
            this.HTMLPrimaryContent.appendChild(this.primaryController.view);
            this.updatePrimaryTab();
        },

        updateSecondaryView : function () {
            this.emptySecondaryContent();
            this.HTMLSecondaryContent.appendChild(this.secondaryController.view);
            this.updateSecondaryTab();
        },

        emptyPrimaryContent: function () {
            this.HTMLPrimaryContent.removeAllChildren();
        },

        emptySecondaryContent: function () {
            this.HTMLSecondaryContent.removeAllChildren();
        },

        updatePrimaryTab : function () {
            var tabTitle = hasAValueOr(this.primaryController.title, "Primary");
            this.HTMLPrimaryTab.setText(tabTitle);
        },

        updateSecondaryTab : function () {
            var tabTitle = hasAValueOr(this.secondaryController.title, "Secondary");
            this.HTMLSecondaryTab.setText(tabTitle);
        },

        // --                --
        // -- Class changing --
        // --                --
        setCSSClass: function (newClass) {
            this.HTMLPrimary.classList.remove(this.CSSClass);
            this.HTMLPrimary.classList.add(newClass);
            CSSClass = newClass;
        },


        // --            --
        // -- Total Sync --
        // --            --

        updateView : function () {
            this.updatePrimaryView();
            this.updateSecondaryView();
            this.updatePrimaryModalState();
            this.updateSecondaryModalState();
            this.updatePrimaryAnimation();
            this.updateSecondaryAnimation();
        },



        // --                 --
        // -- Event Listeners --
        // --                 --
        installEventListeners: function () {
            this.installTransitionEventListener();
            this.installButtonsListeners();
            this.installResizeListeners();
        },

        installTransitionEventListener : function () {
            var transitionOnModalFunc = getThisCallingFunction(this, "modalHasTransited");
            this.HTMLPrimary.addTransitionCallback(transitionOnModalFunc);
        },

        installButtonsListeners : function () {
            this.HTMLFoldButton.addEventListener("click", getThisCallingFunction(this, "toggleSecondary"));

            var closePrimaryFunction = getThisCallingFunction(this, "closePrimaryAndLogInHistory");
            this.HTMLCloseButton.addEventListener("click", closePrimaryFunction);
            this.HTMLCloseButtonTop.addEventListener("click", closePrimaryFunction);
            this.HTMLOverlay.addEventListener("click", closePrimaryFunction);

            var switchPrimaryFunction = getThisCallingFunction(this, "switchToPrimaryTab");
            var switchSecondaryFunction = getThisCallingFunction(this, "switchToSecondaryTab");
            this.HTMLPrimaryTab.addEventListener("click", switchPrimaryFunction);
            this.HTMLSecondaryTab.addEventListener("click", switchSecondaryFunction);
        },

        installResizeListeners : function () {
            var checkSplitStatusChangeFunction = getThisCallingFunction(this, "checkSplitStatusChange");
            window.addEventListener("resize", checkSplitStatusChangeFunction);

            var animationDisablingFunction = getThisCallingFunction(this, "temporarlyDisableAnimations");
            window.addEventListener("resize", animationDisablingFunction);

            window.addEventListener("resize", KeyBindingsController.temporarlyDisableKeyBindings);
        },


        // --              --
        // -- Split events --
        // --              --
        updateSplitStatus: function() {
            this.isSplit = ModalPanelController.isSplit();
        },

        checkSplitStatusChange : function () {
            var oldSplitStatus = this.isSplit;
            this.updateSplitStatus();
            var newSplitStatus = this.isSplit;

            if (oldSplitStatus !== newSplitStatus) {
                this.splitStatusHasChanged();
            }
        },

        splitStatusHasChanged : function() {

            if (this.isSplit) {
                this.secondaryIsOpened = this.userWantsSecondaryOpened;
            } else {
                this.secondaryIsOpened = false;
            }
            
        },
        

        // --                                  --
        // -- Matching of properties with HTML --
        // --                                  --

        matchWithView : function () {
            this.view = document.getElementById("modalPanel");

            this.HTMLOverlay = document.getElementById("overlay");
            this.HTMLPrimary = document.getElementById("primaryModal");
            this.HTMLSecondary = document.getElementById("secondaryModal");

            this.HTMLPrimaryContent = this.view.querySelector("#primaryModal > .content");
            this.HTMLSecondaryContent = this.HTMLSecondary.querySelector(".content");

            this.HTMLFoldButton = this.HTMLPrimary.querySelector(".foldButton");
            this.HTMLCloseButton = this.view.querySelector("#primaryModal > .closeButton");
            this.HTMLCloseButtonTop = this.HTMLPrimary.querySelector(".topModal > .closeButton");
           
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
            this.userWantsSecondaryOpened = true;
            this.secondaryIsOpened = true;
            this.primaryIsAnimated = true;
            this.secondaryIsAnimated = true;
        }
    };

    var initializer = function () {
        if (ModalPanelController.hasBeenInstanced()) {
            throw "An instance of ModalPanel has ever been instanced";
        } else {
            this.matchWithView();
            this.installEventListeners();
            this.initialState();
            this.checkSplitStatusChange();
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
            return (hasAValue(ModalPanelController.singleton));
        },

        isTabbed : function () {
            return (window.innerWidth <= 660);
        },

        isSplit : function () {
            return !(ModalPanelController.isTabbed());
        },

        close : function () {
            return ModalPanelController.getController().closePrimary();
        },

        open : function () {
            return ModalPanelController.getController().openPrimary();
        },

        closeAndLogInHistory : function () {
            return ModalPanelController.getController().closePrimaryAndLogInHistory();
        }

    };

    var staticProperties = {

        singleton : null

    };

    Class.create(className, properties, methods, initializer, staticMethods, staticProperties);

})();