(function () {
    $.fn.GetRotationDegrees = function () {
        var $elem = $(this);

        var matrix = $elem.css("-webkit-transform") ||
        $elem.css("-moz-transform") ||
        $elem.css("-ms-transform") ||
        $elem.css("-o-transform") ||
        $elem.css("transform");

        if (matrix !== "none") {
            var values = matrix.split("(")[1].split(")")[0].split(",");
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    };

    $.fn.SetRotationDegreese = function (angle) {
        var $elem = $(this);

        $elem.css("transform", "rotate(" + angle + ")");
        $elem.css({
            "-webkit-transform": "rotate(" + angle + "deg)",
            "-moz-transform": "rotate(" + angle + "deg)",
            "-ms-transform": "rotate(" + angle + "deg)",
            "-o-transform": "rotate(" + angle + "deg)",
            "transform": "rotate(" + angle + "deg)"
        });
    };

    $.fn.getLeft = function () {
        var $elem = $(this);

        return parseFloat($elem.css("left"));
    };
    $.fn.setLeft = function (value) {
        var $elem = $(this);

        $elem.css("left", value);
    };
    $.fn.getTop = function () {
        var $elem = $(this);

        return parseFloat($elem.css("top"));
    };
    $.fn.setTop = function (value) {
        var $elem = $(this);

        $elem.css("top", value);
    };
})();