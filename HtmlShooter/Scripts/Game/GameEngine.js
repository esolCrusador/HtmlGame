var GameEngine = function (options) {
    var defaults = {
        FrameRate: 1000 / 60
    };

    var options = $.extend({}, defaults, options);
    var ticks = 0;

    var handlers = {
        Tick: [],
        Pause: [],
        Resume: []
    };

    var tick = function (t) {
        if (t !== undefined)
            ticks = t;
        else
            ticks++;

        handlerHelper.CallHandlers(handlers.Tick, ticks * options.FrameRate);
    };
    var pause = function () {
        if (!timer)
            return false;

        clearInterval(timer);
        timer = null;
        return true;
    };
    var resume = function () {
        if (timer)
            return false;

        tick(ticks);

        timer = setInterval(tick, options.FrameRate);

        return true;
    }

    var onTick = function (handler, context) {
        return handlerHelper.AddHandler(handlers.Tick, handler, context);
    };
    var onPause = function (handler, context) {
        return handlerHelper.AddHandler(handlers.Pause, handler, context);
    };
    var onResume = function (handler, context) {
        return handlerHelper.AddHandler(handlers.Resume, handler, context);
    }

    var timer;
    var run = function () {
        if (timer)
            throw "Game is already rinning";

        resume();
    };
    var stop = function () {
        pause();
        ticks = 0;
    };

    return {
        GameEvents: { OnTick: onTick, OnPause: onPause, OnResume: onResume },
        Run: run,
        Resume: resume,
        Stop: stop,
        Pause: pause
    };
};

var handlerHelper = {
    AddHandler: function (handlersArray, handler, context) {
        var h = { Handler: handler, Context: context };
        handlersArray.push(h);

        return {
            Unsubscribe: function () {
                handlersArray.pop(h);
            }
        }
    },
    CallHandlers: function (handlersArray) {
        var parametersArray = new Array(arguments.length - 1);
        for (var i = 0; i < parametersArray.length; i++) {
            parametersArray[i] = arguments[i + 1];
        }

        for (var i = 0; i < handlersArray.length; i++) {
            var d = new Date();
            var handler = handlersArray[i];

            handler.Handler.apply(handler.Handler.Context || this, parametersArray);
        }
    }
};