export default class Location {
    constructor(name) {
        this.name = name;
        this.activities = [];
        this.shops = [];
    }

    addActivity(activity) {
        this.activities.push(activity);
    }

    getActivities() {
        return this.activities;
    }

    addShop(shop) {
        this.shops.push(shop);
    }

    getShops() {
        return this.shops;
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
