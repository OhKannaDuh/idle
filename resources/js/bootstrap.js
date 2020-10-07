// Lodash
window._ = require("lodash");

// jQuery
window.$ = window.jQuery = require("jquery");

// Axios
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Logs
window.logs = [];

// Items
window.items = require("./src/items").default;
