var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;

// run both dist and docs builds;
gulp.task("build", function (callback) {
    run(
        "build:dist",
        callback
    );
});

// run all tasks needed for a build (in order);
gulp.task("build:dist", function (callback) {
    run(
        "clean:dist",
        "jade:dist",
        "js:dist",
        "scss:dist",
        "copy:dist",
        "copy:bower",
        callback
    );
});
