"use strict";

var src    = "src",        // files to dev on;
    dist   = "build/", // where production ready files are written to;
    server = "localhost",  // URL of the server we're starting;
    port   = 3000;         // URL of the server we're starting;

module.exports = {
    "src":src,
    // delete documentation and the build;
    "clean": {
        "dist": dist
    },
    // open URL (run at after everything is built, and browsersync is running);
    "open": {
        // file to trigger gulp stream;
        // we don't do anything with this file, it's just needed for a gulp stream;
        "src":  "./package.json",
        // URL to open;
        "url": {
            "dist": "http://" + server + ":" + port + "/" + "html/hello-world.html",
        },
        "browser": "google chrome"
    },
    // web server and synchronised browser testing;
    "browsersync": {
        // configure what gets served;
        "server": {
            "baseDir": dist,   // set the root to be the base, this way we can go to docs, and build;
            "directory": true, // enable directory browsing;
            "routes": {
                "/node_modules": "node_modules"
            }
        },
        "debugInfo": false,
        "open": false,
        "hostnameSuffix": ".xip.io",
        // configure the URL to access the server;
        "host": server,
        "port": port
    },
    // configure the watches for each gulp task we want to run;
    "watch": {
        "jade": [
            src + "/**/*.jade",
            src + "/**/_*.json",
            src + "/**/**/*.jade",
            src + "/**/**/_*.json"
        ],
        "scss": [
            src + "/**/*.scss",
            src + "/**/**/*.scss"
        ],
        "js":   [
            src + "/**/*.js"
        ],
        "copy": [
            src + "/**/*{txt,ico,json,md,jade,scss,css,js}",
            src + "/fonts/*",
            src + "/img/*"
        ]
    },
    // generate HTML;
    "jade": {
        "pages": {
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [
                "!" + src + "/pages/**/_*",
                src + "/pages/**/*.jade"
            ],
            // define the root page (usually index or default);
            // this is a generated list of all pages (for easy presentation);
            // make sure this is also set in browersync;
            "root": "index",
            // to this location (files will have a new filename);
            "dest": {
                "dist": dist + "/html"
            }
        },
        "index": {
            "dist": {
                // "template": src + "/pages/_short-documentation/dist/page.jade",
                "dest": dist
            }
        }
    },
    // generate CSS for the documentation and the build;
    "scss": {
        "lintSrc": [
            src + "/**/*.scss",
            "!" + src + "/scss/_bootstrap-variables.scss"
        ],
        "compile": {
            "dist": [
                src + "/**/*.scss",
                "!" + src + "/scss/_*.scss"
            ]
        },
        "dest": {
            "dist": dist + "/css"
        },
        // define the compression settings for each build;
        "compress": {
            "dist": true
        }
    },
    // concatenate JS files for the documentation and the build;
    "js": {
        // which files to process;
        "paths": {
            "input": src + "/pages/",
            "output": {
                "dist": dist + "/js/"
            },
            // where generated JS is placed;
            "dest": {
                "dist": dist + "/js"
            }
        },
        // define the compression settings for each build;
        "compress": {
            "docs": false,
            "dist": true
        },
        // enable file names and size reporting in the console;
        "reportFilesizes": true,
        // name the bundle that will contain common JS (shared across multiple bundles);
        // this file is created by browserify;
        "common": "common.js",
        // define what pages to lint (not the same as the files we build);
        "linstSrc": ["src/**/*.js"]
    },
    // copy none generated files to the documentation and the build;
    "copy": {
        // copy over any remaining file types that aren't handled by the other tasks;
        // these aren't altered in anyway, it's a straight copy;
        "compile": {
            "dist": [
                // include any text, or icon file (in the root);
                src + "*.{txt,ico}",
                // include the fonts;
                src + "/**/*.ttf",
                // and include only the JSON files used for Ajax;
                src + "/**/-*.json",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*"
            ],
            "bower":[
                "bower_components/bootstrap-sass/assets/javascripts/**/*.js",
                "bower_components/jquery/dist/jquery.js"
            ]
        },
        "dest": {
            "dist": dist
        }
    },
};