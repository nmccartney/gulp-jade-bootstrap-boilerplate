var gulp        = require("gulp"),
    config      = require("../config").scss,
    sass            = require("gulp-sass"),                // SCSS to CSS conversion;
    scssLint        = require("gulp-scss-lint"),           // verify the SCSS is written properly; 
    scssLintStylish = require("gulp-scss-lint-stylish"),   // reporter for scssLint;
    run             = require("run-sequence"),             // run gulp tasks in sequence;
    browserSync = require("browser-sync"), // synchronised browser testing;
    concat        = require('gulp-concat'),
    compileConfig   = {}; 
    
    
var sassTask = function () {
    return gulp.src(config.compile.dist)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(compileConfig.destination));
};
var sassTaskDev = function () {
    return sassTask()
    // .pipe(livereload());
};
gulp.task('sass', sassTask);
gulp.task('sass-watch', sassTaskDev);

// build the CSS files for the distribution build;
gulp.task("scss:dist", function (callback) {
    // configure the files scss:compile will compile;
    compileConfig.input       = config.compile.dist;
    compileConfig.destination = config.dest.dist;
    compileConfig.outputStyle = config.compress.dist ? "compressed" : "nested";
    run(
        //"scss:lint",
        "sass",
        callback
    );
});