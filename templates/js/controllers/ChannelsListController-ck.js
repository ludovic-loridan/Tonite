/*
    =============================
    = ChannelsListController.js =
    =============================

    Represents the horizontal list of channels

    Author : Ludovic Loridan

*/(function(){var e="ChannelsListController",t=["channelsList","view"],n={setChannelsList:function(e){if(!(e instanceof Array))throw"Error : Given object is not an array.";channelsList=e;this.updateView()},updateView:function(){this.clearView();this.addChannelsFromModel()},clearView:function(){this.view.removeAllChildren()},addChannelsFromModel:function(){for(var e=0;e<this.channelsList.length;e++){var t=this.channelsList[e];this.addChannelNamed(t)}},addChannelNamed:function(e){var t=Channel.channelFromName(e),n=new ChannelController(t);this.view.appendChild(n.view)},createView:function(){this.view=document.createElementWithAttributes("div","id","channels");this.addAutoCentering();this.view.controller=this},addAutoCentering:function(){var e=getThisCallingFunction(this,"centerView");window.addEventListener("resize",e)},centerView:function(){var e=this.view.offsetHeight,t=-e/2;this.view.style.setProperty("margin-top",t+"px","important")}},r=function(e,t){this.createView();this.channelsList=e},i={},s={};Class.create(e,t,n,r,i,s)})();