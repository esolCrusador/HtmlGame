Inherit = function (child, parent) {
    var inheritanceExtension = new Object();
    inheritanceExtension["Call"+parent.name+"Method"] = function (methodName) {
        var parameters = new Array(arguments.length - 1);
        for (var i = 0; i < parameters.length; i++) {
            parameters[i] = arguments[i + 1];
        }

        parent.prototype[methodName].apply(this, parameters);
    };

    child.prototype = $.extend(true, {}, parent.prototype, child.prototype, inheritanceExtension);
};