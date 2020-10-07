require("./bootstrap");

import Vue from "vue";
import vuetify from "./plugins/vuetify";
import { InertiaApp } from "@inertiajs/inertia-vue";
import route from "../../vendor/tightenco/ziggy/src/js/route.js";
import { Ziggy } from "./ziggy";

Vue.use(InertiaApp);

// Load all vue componenets and assign a key based on the filename
const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
    Vue.component(
        key
            .split("/")
            .pop()
            .split(".")[0],
        files(key).default
    )
);

const app = document.getElementById("app");

Vue.mixin({
  mixins: [{
    methods: {
      route: (name, params, absolute) => route(name, params, absolute, Ziggy),
    }
  }],
});

const application = new Vue({
    vuetify,
    render: h =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: name => require(`./Pages/${name}`).default
            }
        }),
}).$mount("#app");
