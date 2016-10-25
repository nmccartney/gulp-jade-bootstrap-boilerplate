var gulp             = require("gulp"),
    config           = require("../config").jade,
    run              = require("run-sequence"); // run gulp tasks in sequence;
    plumber          = require("gulp-plumber"),       // error trapping so an error doesn't kill Gulp;
    notify           = require("gulp-notify"),
    browserSync   = require("browser-sync"),             // inform the browser what's going on;
    jade             = require("gulp-jade"),                   // translate jade into HTML;
    rename           = require("gulp-rename"),        // allows us to rename files;
    content        = require("../helpers/data-content.js"),
    compileConfig    = {};  

gulp.task("jade", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:dist",
        callback
    );
});

gulp.task("jade:dist", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:dist",
        // "jade:pages:index:dist",
        callback
    );
});



// build both dist and docs index files;
gulp.task("jade:pages:index", function (callback) {
    run(
        "jade:pages:index:dist",
        callback
    );
});

// build the distribution index file;
gulp.task("jade:pages:index:dist", function () {
    gulp.src(config.dist.template)
        .pipe(plumber({
            errorHandler: function () {
                var args = Array.prototype.slice.call(arguments);
                
                // send error to notification center with gulp-notify;
                notify.onError({
                    title: "Compile Error",
                    message: "<%= error.message %>"
                }).apply(this, args);
                
                // stop gulp from hanging on this task;
                this.emit("end");
            }
        }))
        .pipe(jade(configJade))
        .pipe(rename(renameFile))
        .pipe(gulp.dest(config.dist.dest));
});

// run both documentation and distribution builds;
gulp.task("jade:pages", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:dist",
        callback
    );
});

// build the HTML pages for the distribution build;
gulp.task("jade:pages:dist", function (callback) {
    // define where we want the Jade files to be built;
    compileConfig.dest = config.pages.dest.dist;
    run(
        "jade:pages:compile",
        callback
    );
});

// build the documentation pages for each module;
gulp.task("jade:modules", function () {
    // we'll use this config for two jade functions;
    var jadeConfig = {
        "pretty": "    ",
        "compileDebug": true,
        "locals": {
            "json": content() // bring in JSON files as a "locals.json" variable in Jade;
        }
    };

    return gulp.src(config.modules.module)
    // add plumber for error catching;
        .pipe(plumber({
            // errorHandler: handleErrors
        }))
        // compile the jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade(jadeConfig));
});


// compile HTML;
// default state will compile to the dist folder, but the above tasks can change the config;
gulp.task("jade:pages:compile", function () {
    return gulp.src(config.pages.compile)
        .pipe(plumber({
            "errorHandler": function () {
                var args = Array.prototype.slice.call(arguments);
                
                // send error to notification center with gulp-notify;
                notify.onError({
                    title: "Compile Error",
                    message: "<%= error.message %>"
                }).apply(this, args);
                
                // stop gulp from hanging on this task;
                this.emit("end");
            }
        }))
        // create some HTML from Jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade({
            "pretty": "    ",
            "compileDebug": true,
            "locals": {
                "json": content() // bring in JSON files as a "locals.json" variable in Jade;
            }
        }))
        // rename the HTML file;
        .pipe(rename(function (path) {
            // root the file
            path.dirname  = "/";
        }))
        // finally put the compiled HTML file in the appropriate folder;
        .pipe(gulp.dest(config.pages.dest.dist))
        // refresh browser
        .pipe(browserSync.reload({
            "stream": true
        }));
});