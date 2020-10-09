import Location from "../Location";
import Shop from "../Shop";
import WoodcuttingActivity from "../Activities/WoodcuttingActivity";

let oakbridge = new Location("Oakbridge");

oakbridge.addActivity(new WoodcuttingActivity("Cut Trees", window.items.logs, 1, 25));
oakbridge.addActivity(new WoodcuttingActivity("Cut Oak Trees", window.items.oakLogs, 15, 37.5));

oakbridge.addShop(new Shop("Axe Shop", [
    window.items.ironHatchet,
    window.items.steelHatchet,
    window.items.mythrilHatchet,
    window.items.adamantHatchet,
]));

export default oakbridge;
