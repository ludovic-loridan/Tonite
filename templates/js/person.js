var properties = ["firstName","lastName","age"];

var methods = {
    growUp : function() {
        this.age += 1;
    },

    getAge : function() {
        console.log("Hello ! :)");
        return age;
    }
}

var initializer = function(firstName,lastName,age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}

var statics = {
    personWithDescription : function(description) {
        args = description.split(" ");
        return new Person(args[0],args[1],args[2]);
    }
}

Class.create("Person",properties,methods,initializer,statics);