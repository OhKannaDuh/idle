import Activity from "../Activity";

export default class WoodcuttingActivity extends Activity {
    constructor(name, item, level, experience, chance = 28) {
        super(name, 4, function(player, logger) {
            let bonus = player.getToolbelt().getHatchet().getBonus();
            bonus += (player.getSkill("woodcutting").getLevel() - level);

            if (_.random(1, 100) >= 100 - (chance + bonus)) {
                player.addXp("woodcutting", this.experience);
                player.addItem(this.item);
                return;
            }

            logger.red("Nothing gained");
        }, level === 1);

        this.experience = experience;
        this.item = item;
    }

};
