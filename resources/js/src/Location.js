export default class Location {
    constructor(name) {
        this.name = name;
        this.activities = [];
    }

    addActivity(activity) {
        this.activities.push(activity);
    }

    getActivities() {
        return this.activities;
    }

    tick(player) {
        this.verifyAvailableActivities(player);
    }

    verifyAvailableActivities(player) {
        for (let index in this.activities) {
            let activity = this.activities[index];
            if (activity.isEnabled()) {
                continue;
            }

            if (activity.playerMeetsRequirements(player)) {
                activity.enable();
            }
        }
    }
};
