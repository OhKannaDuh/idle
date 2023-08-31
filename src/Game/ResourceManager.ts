import Resource from './Resource';
import Loadable from './Saves/Loadable';
import { SaveData } from './Saves/SaveManager';
import ResourceData from 'src/data/resources';
import Saveable from './Saves/Saveable';
import StringHelper from './StringHelper';
import Game from './Game';

export default class ResourceManager implements Loadable, Saveable {
    private game: Game;

    private resources: Map<string, Resource> = new Map<string, Resource>();

    public constructor(game: Game) {
        this.game = game;

        this.game.getSaves().addSaveable(this);
        this.game.getSaves().addLoadable(this);
    }

    public register(resource: Resource): void {
        if (this.has(resource.getKey())) {
            console.error(`Resource ${resource.getKey()} already registered.`);
            return;
        }

        this.resources.set(resource.getKey(), resource);
    }

    public init(): void {
        this.all().forEach((resource: Resource) => {
            resource.calculateIncomePerSecond();
        });
    }

    public all(): Map<string, Resource> {
        return this.resources;
    }

    public unlocked(): Resource[] {
        const unlocked: Resource[] = [];

        this.all().forEach((resource: Resource) => {
            if (resource.isUnlocked() && resource.isShown()) {
                unlocked.push(resource);
            }
        });

        return unlocked;
    }

    public has(key: string): boolean {
        return this.resources.has(key);
    }

    public get(key: string): Resource | undefined {
        return this.resources.get(key);
    }


    public load(data: SaveData): void {
        for (const datum of ResourceData) {
            const resource = new Resource(datum.name);
            resource.setRarity(datum.rarity);
            resource.getAmount().setMax(datum.max);
            resource.getAmount().setFormat(datum.format);
            if (!datum.show) {
                resource.hide();
            }

            this.register(resource);

            resource.load(data.resources[resource.getKey()]);
        }
    }

    public newGame(data: SaveData): SaveData {
        for (const datum of ResourceData) {
            const key = StringHelper.key(datum.name);
            data.resources[key] = {
                name: datum.name,
                amount: 0,
                unlocked: (datum.unlocked === undefined) ? false : datum.unlocked,
            }
        }

        return data;
    }

    public save(data: SaveData): SaveData {
        this.resources.forEach((resource: Resource) => {
            data = resource.save(data);
        });

        return data;
    }
};
