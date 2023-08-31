import Building from 'src/Game/Buildings/Building';
import BuildingEvent from 'src/Game/Buildings/BuildingEvent';
import EventManager from 'src/Game/Events/EventManager';
import Game from 'src/Game/Game';
import Resource from 'src/Game/Resource';
import ResourceEvent from 'src/Game/ResourceEvent';

export type Setup = (game: Game, events: EventManager) => void;
export type Teardown = (game: Game) => void;

export type EventData = {
    key: string;
    requires: string[];
    setup: Setup;
    teardown: Teardown;

};

const events: EventData[] = [
    {
        key: 'gather-wood-1',
        requires: [],
        setup(game: Game, events: EventManager): void {
            game.getResources().get('wood')?.getSubscriptions().subscribe(ResourceEvent.Add, this.key, (resource: Resource): void => {
                if (resource.getAmount().getValue() < 10) {
                    return;
                }

                game.getResources().get('food')?.unlock();
                game.log('Collecting all this wood is making you hungry, maybe you should find some food');
                game.logUnlock('Food unlocked');
                events.complete(this.key);
            });
        },
        teardown(game: Game): void {
            game.getResources().get('wood')?.getSubscriptions().unsubscribe(ResourceEvent.Add, this.key);
        }
    },
    {
        key: 'gather-food-1',
        requires: ['gather-wood-1'],
        setup(game: Game, events: EventManager): void {
            game.getResources().get('food')?.getSubscriptions().subscribe(ResourceEvent.Add, this.key, (resource: Resource): void => {
                if (resource.getAmount().getValue() < 10) {
                    return;
                }

                game.getBuildings().get('house')?.unlock();
                game.log('That should be enough food for now, maybe it\'t time to build some shelter.');
                game.logUnlock('House unlocked');
                events.complete(this.key);
            });
        },
        teardown(game: Game): void {
            game.getResources().get('food')?.getSubscriptions().unsubscribe(ResourceEvent.Add, this.key);
        }
    },
    {
        key: 'build-house-1',
        requires: ['gather-food-1'],
        setup(game: Game, events: EventManager): void {
            game.getBuildings().get('house')?.getSubscriptions().subscribe(BuildingEvent.Build, this.key, (building: Building): void => {
                if (building.getAmount().getValue() < 1) {
                    return;
                }

                game.getResources().get('population')?.unlock().getAmount().add(1);
                game.getJobs().get('lumberjack')?.unlock();
                game.log('That\'s much better, a place to rest. Maybe if we build more houses we can find other survivors.');
                game.logUnlock('Population unlocked');
                events.complete(this.key);

                game.getBuildings().get('warehouse')?.unlock();
                game.getBuildings().get('lumber_yard')?.unlock();
                game.getBuildings().get('farm')?.unlock();
            });
        },
        teardown(game: Game): void {
            game.getBuildings().get('house')?.getSubscriptions().unsubscribe(BuildingEvent.Build, this.key);

        }
    }
]

export default events;
