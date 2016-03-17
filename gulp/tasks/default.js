
var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;

gulp.task("default", function (callback) {
    run(
        "build",       // build and copy all files;
        "browsersync", // start up a web server;
        "watch",       // start watching files for changes - so we can push updates to browsersync;
        "open",        // open our starting URL in a browser;
        callback
    );
});

gulp.task("dist", function (callback) {
    run(
        "build:dist",  // build and copy all files;
        "browsersync", // start up a web server;
        "watch:dist",  // start watching files for changes - so we can push updates to browsersync;
        "open:dist",   // open our starting URL in a browser;
        callback
    );
});
