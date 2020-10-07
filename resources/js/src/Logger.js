export default class Logger {
    log(text, color = "white") {
        window.logs.push({
            color: `log-${color}`,
            text: text,
        });

        $("#log-pane").animate({ scrollTop: $('#log-pane').prop("scrollHeight")}, 250);
    }

    red(text) {
        this.log(text, "red");
    }

    gold(text) {
        this.log(text, "gold");
    }

    blue(text) {
        this.log(text, "blue");
    }
};
