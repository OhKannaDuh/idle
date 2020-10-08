import Activity from "../Activity";

export default class WoodcuttingActivity extends Activity {
    constructor(name, item, level, experience, chance = 28) {
        super(name, 1, function(player, logger, app) {
            let bonus = player.getToolbelt().getHatchet().getBonus();
            bonus += (player.getSkill("woodcutting").getLevel() - level);

            if (_.random(1, 100) >= 100 - (chance + bonus)) {
                player.addXp("woodcutting", this.experience);
                player.addItem(this.item);
                player.addItem(window.items.coin, 26);
            }

            logger.red(`Nothing gained (chance ${chance + bonus}%)`);
        }, level === 1);

        this.experience = experience;
        this.item = item;
        this.requirements.push({
            type: "skill",
            identifier: "woodcutting",
            level: level,
        });
    }

};
