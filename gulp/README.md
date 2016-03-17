#Gulp Documentation


##config.js

The property names in config map to the tasks they are used for.

```JavaScript
{
    "src": "",         // mapping to the "src" for the helper functions; (in case the folder name is changed);
    "clean": {},       // settings for the clean task;
    "open": {},        // settings for the open task;
    "browsersync": {}, // settings for the browsersync task; // starting to see the pattern yet?;
    "watch": {},       // settings for the watch task;
    "jade": {},        // settings for the jade task;
    "scss": {},        // settings for the scss task;
    "js": {},          // settings for the js task;
    "copy": {}         // settings for the copy task;
};
```