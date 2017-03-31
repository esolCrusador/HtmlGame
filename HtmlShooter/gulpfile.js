/// <binding BeforeBuild='build' Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var enumerable = require("linq");
var rimraf = require("rimraf");
var gulpRimraf = require('gulp-rimraf');
var merge = require("gulp-merge");
var debug = require("gulp-debug");

gulp.task("build", ["copy-libs"]);
gulp.task("clean", ["clean-libs"]);

var LibsHelper = function (libraries) {
    var librarySettings = enumerable.from(libraries).select(function (s) {
        return {
            Sources: enumerable.from(s.Files).select(function (f) {
                return "./" + "node_modules" + "/" + s.Library + "/" + f;
            }).toArray(),
            Destanations: enumerable.from(s.Files).select(function (f) {
                return "./" + "Scripts" + "/" + "Libraries" + "/" + s.Library + "/" + f;
            }).toArray(),
            Destanation: "./" + "Scripts" + "/" + "Libraries" + "/" + s.Library + "/"
        };
    }).toArray();

    return {
        GetSettings: function(){
            return librarySettings;
        },
        GetCopyTasks: function () {
            return enumerable.from(librarySettings)
                .select(function (l) {
                    return gulp.src(l.Sources).pipe(gulp.dest(l.Destanation));
                })
            .toArray();
        },
        GetCleanTasks: function () {
            return enumerable.from(librarySettings)
            .select(function (d) {
                return gulp.src(d.Destanations, { read: false }).pipe(gulpRimraf());
            })
            .toArray();
        }
    }
};

var libs = new LibsHelper(
    [
        {
            Library: "jQuery",
            Files: ["dist/jquery.js", "dist/jquery.min.js", "dist/jquery.min.map"]
        },
        {
            Library: "Linq",
            Files: ["linq.js", "linq.min.js"]
        }
    ]
    );

gulp.task("copy-libs", function (cb) {
    return merge(libs.GetCopyTasks());
});
gulp.task("clean-libs", function (cb) {
    return merge(libs.GetCleanTasks());
})