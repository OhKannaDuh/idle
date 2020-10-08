export default class Loop {
    constructor(ticksPerSecond = 24) {
        this.ticksPerSecond = ticksPerSecond;
        this.interval = null;
        this.reset();
    }

    start(app) {
        this.interval = window.setInterval(() => {app.tick()}, 1000 / this.ticksPerSecond);
    }

    reset() {
        this.currentTick = 0;
    }

    getTick() {
        return this.currentTick;
    }

    tick(activity, location, player, logger, app) {
        if (activity === null) {
            return;
        }

        this.currentTick++;
        if (this.currentTick >= activity.ticks) {
            activity.tick(player, logger, app);
            location.tick(player);
            this.reset();
        }
    }
};
