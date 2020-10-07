import WoodcuttingActivity from "../Activities/WoodcuttingActivity";
import Location from "../Location";

let oakbridge = new Location("Oakbridge");

oakbridge.addActivity(new WoodcuttingActivity("Cut Trees", window.items.log, 1, 25));
oakbridge.addActivity(new WoodcuttingActivity("Cut Oak Trees", window.items.oakLog, 15, 37.5));

export default oakbridge;
