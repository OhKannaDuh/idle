const mix = require("laravel-mix");

mix
    .webpackConfig({
        resolve: {
            alias: {
                ziggy: path.resolve("vendor/tightenco/ziggy/src/js/route.js"),
            },
        },
    })
    .js("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css");
