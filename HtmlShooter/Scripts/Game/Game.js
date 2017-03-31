var Game = function (options) {
    var gameEngine = new GameEngine();

    var scene = new Scene({ RootElementSelector: options.SceneElementSelector });
    options.InitializeScene(scene);

    gameEngine.GameEvents.OnTick(function (d) {
        scene.Draw(d);
    });

    return {
        Start: gameEngine.Run,
        Stop: gameEngine.Stop,
        Resume: gameEngine.Resume,
        Pause: gameEngine.Pause,
        OnTick: gameEngine.GameEvents.OnTick,
        Scene: scene
    };
};