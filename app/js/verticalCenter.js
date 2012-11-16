function centerElementsVertically() {
    var elements = document.getElementsByClassName('vcenter');
    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];

        var height = element.offsetHeight;
        var margintop = window.innerHeight / 2 - height / 2;
        element.style.setProperty("margin-top", margintop + "px", "important");
    };
}

window.addEventListener("resize", centerElementsVertically);