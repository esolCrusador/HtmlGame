var SceneObject = function (options) {
    this.Init(options);
};

$.extend(SceneObject.prototype, {
    _defaults: { ObjectSelector: "Required" },
    _x: 0,
    _y: 0,
    _angle: 0,

    _children: [],

    Parent: null,

    $Element: null,
    Element: null,

    Moving: false,

    Init: function (options) {
        options = $.extend({}, this._defaults, options);

        this.$Element = $(options.ObjectSelector);
        if (this.$Element.length == 0)
            throw "No elemnt find using Jselector \"" + options.ObjectSelector + "\"";
        this.Element = this.$Element[0];

        this._x = this.$Element.getLeft();
        this._y = this.$Element.getTop();

        this.Moving = false;
    },

    getLeft: function () {
        return parseInt(this.$Element.css("left"))
    },

    Draw: function (gameTime) {
        if (!this.Moving)
            return;

        if (Math.abs(this.$Element.getLeft() - this.GetX()) > 1)
            this.$Element.setLeft(this.GetX());
        if (Math.abs(this.$Element.getTop() - this.GetY()) > 1)
            this.$Element.setTop(this.GetY());

        if (Math.abs(this.$Element.GetRotationDegrees() - this.GetAngle()) > 1)
            this.$Element.SetRotationDegreese(this.GetAngle());
    },
    GetX: function () {
        return this._x;
    },
    SetX: function (val) {
        this._x = val;
    },

    GetY: function () {
        return this._y;
    },
    SetY: function (val) {
        this._y = val;
    },

    GetAngle: function (measurement) {
        if (!measurement)
            measurement = "deg";

        if (measurement === "deg")
            return this._angle;
        else if (measurement === "rad")
            return this._angle * Math.PI / 180;
        else
            throw "Unsupportedthis._angle measurement " + measurement;
    },
    SetAngle: function (value, measurement) {
        if (!measurement)
            measurement = "deg";

        if (measurement === "deg")
            this._angle = value;
        else if (measurement === "rad")
            this._angle = value * 180 / Math.PI;
        else
            throw "Unsupportedthis._angle measurement " + measurement;

        this._angle =  this.SimplifyAngle(this._angle);
    },
    SimplifyAngle: function (angle) {
        var negativeAngle;
        var over360;
        while ((negativeAngle = angle < 0) || (over360 = angle > 360)) {
            if (negativeAngle)
                angle += 360;
            else if (over360)
                angle -= 360;
            else
                throw "o_O";
        }

        return angle;
    },
    GetChildren: function () {
        return this._children;
    },
    AddChild: function (sceneObject) {
        sceneObject.Parent = this;
        this._children.push(sceneObject);
    }
});