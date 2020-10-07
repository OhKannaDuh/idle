export default class Activity {
    constructor(text, ticks, action, enabled=false) {
        this.text = text;
        this.ticks = ticks * 0.6 * 60;
        this.action = action;
        this.disabled = !enabled;

        this.requirements = [];
    }

    tick(player, logger) {
        this.action(player, logger, this);
    }

    getTicks() {
        return this.ticks;
    }

    isEnabled() {
        return !this.disabled;
    }

    playerMeetsRequirements(player) {
        for (let index in this.requirements) {
            let requirement = this.requirements[index];
            switch (this.requirement.type) {
                case "skill":
                    let skill = player.getSkill(requirement.identifier);
                    if (skill.getLevel() < requirement.level) {
                        return false;
                    }
            }
        }

        return true;
    }

    enable() {
        this.disabled = false;
    }
};
