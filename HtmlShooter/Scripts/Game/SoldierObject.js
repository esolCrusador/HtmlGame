var SoldierObject = function (options) {
    this.Init(options);
};

$.extend(SoldierObject.prototype,
    {
        _aimX: 0,
        _aimY: 0,
        _aimAngle: 0,

        Init: function (options) {
            var soldier = this;
            this.CallDynamicObjectMethod("Init", options);

            var $window = $(window);

            $window.keydown(function (data, arg2) {
                switch (data.key) {
                    case "ArrowUp":
                        soldier.SetSpeedY(-100);
                        break;
                    case "ArrowDown":
                        soldier.SetSpeedY(100);
                        break;
                    case "ArrowLeft":
                        soldier.SetSpeedX(-100);
                        break;
                    case "ArrowRight":
                        soldier.SetSpeedX(100);
                        break;
                    default:
                        break;
                }
            });
            $window.keyup(function (data) {
                switch (data.key) {
                    case "ArrowUp":
                        soldier.SetSpeedY(0);
                        break;
                    case "ArrowDown":
                        soldier.SetSpeedY(0);
                        break;
                    case "ArrowLeft":
                        soldier.SetSpeedX(0);
                        break;
                    case "ArrowRight":
                        soldier.SetSpeedX(0);
                        break;
                    default:
                        break;
                }
            });

            $(window).mousemove(function (mouse) {
                var parentOffset = soldier.Parent.$Element.offset();

                soldier._aimX = mouse.pageX - parentOffset.left;
                soldier._aimY = mouse.pageY - parentOffset.top;

                soldier.AdjustAim();
            });
        },
        SetX: function(value){
            this.CallSceneObjectMethod("SetX", value);

            this.AdjustAim();
        },
        SetY: function (value) {
            this.CallSceneObjectMethod("SetY", value);

            this.AdjustAim();
        },
        CalculateAimAngle: function () {
            var dy = this._aimY - this.GetY() - this.$Element.height() / 2;
            var dx = this._aimX - this.GetX() - this.$Element.width() / 2;

            var angle = 180 * Math.atan2(dy, dx) / Math.PI;

            this._aimAngle = this.SimplifyAngle(angle);
        },
        AdjustAim: function () {
            this.CalculateAimAngle();

            if (!this.IsAimTargeted())
                this.SetSpeedRadial(Math.sign(this._aimAngle - this.GetAngle()) * 150);
        },
        IsAimTargeted: function () {
            if (Math.abs(this.GetAngle() - this._aimAngle) > 2)
                return false;
            else
                return true;
        },
        Draw: function (gameTime) {
            if (this.IsAimTargeted())
                this.SetSpeedRadial(0);

            this.CallDynamicObjectMethod("Draw", gameTime);
        }
    });

Inherit(SoldierObject, DynamicObject);