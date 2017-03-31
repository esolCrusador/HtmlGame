var Scene = function (options) {
    var defaults = {
        RootElementSelector: null
    };

    options = $.extend({}, defaults, options);

    this.Root = new SceneObject({
        ObjectSelector: options.RootElementSelector
    });

    var draw = function (elements, gameTime) {
        if (elements.length == 0)
            return;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.Draw.call(element, gameTime);
        }

        var children = Enumerable.from(elements).selectMany(function (el) {
            return Enumerable.from(el.GetChildren());
        })
        .toArray();

        draw(children, gameTime);
    };

    this.Draw = function (gameTime) {
        draw([this.Root], gameTime);
    };
}