var DynamicObject = function (options) { this.Init(options); };

$.extend(DynamicObject.prototype,
    {
        _velocityX: 0,
        _velocityY: 0,
        _velocityRadial: 0,

        _movementStartTime: 0,

        _initialX: 0,
        _initialY: 0,
        _initialAngle: 0,

        _currentGameTime: 0,

        Init: function (options) {
            this.CallSceneObjectMethod("Init", options);

            this._velocityX = 0;
            this._velocityY = 0;
            this._velocityRadial = 0;

            this.Moving = false;

            this._movementStartTime = 0;
            this._initialX = this.GetX();
            this._initialY = this.GetY();
            this._initialAngle = this.GetAngle();
        },

        SetSpeed: function (velicityX, velocityY, velocityRadial) {
            if (velicityX == 0 && velocityY == 0 && velocityRadial == 0) {
                this.Moving = false;
            }
            else {
                this.Moving = true;
            }

            this.UpdateMovement(velicityX, velocityY, velocityRadial);
        },

        SetSpeedX: function (velocityX) {
            this.SetSpeed(velocityX, this._velocityY, this._velocityRadial);
        },
        SetSpeedY: function (velocityY) {
            this.SetSpeed(this._velocityX, velocityY, this._velocityRadial);
        },
        SetSpeedRadial: function (velocityRadial) {
            this.SetSpeed(this._velocityX, this._velocityY, velocityRadial);
        },

        UpdateMovement: function (velocityX, velocityY, velocityRadial) {
            this._movementStartTime = this._currentGameTime;
            this._initialX = this.GetX();
            this._initialY = this.GetY();
            this._initialAngle = this.GetAngle();

            this._velocityX = velocityX;
            this._velocityY = velocityY;
            this._velocityRadial = velocityRadial;
        },

        calculateState: function (timeDelta) {
            this.SetX(this._initialX + this._velocityX * timeDelta);
            this.SetY(this._initialY + this._velocityY * timeDelta);
            this.SetAngle(this._initialAngle + this._velocityRadial * timeDelta);
        },

        Draw: function (gameTime) {
            this.calculateState.call(this, (gameTime - this._movementStartTime) / 1000);

            this._currentGameTime = gameTime;
            this.CallSceneObjectMethod("Draw", gameTime);
        }
    });

Inherit(DynamicObject, SceneObject);