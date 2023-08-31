import Building from './Building';
import Game from '../Game';
import Loadable from '../Saves/Loadable';
import Saveable from '../Saves/Saveable';
import { SaveData } from '../Saves/SaveManager';
import BuildingData from 'src/data/buildings';
import StringHelper from '../StringHelper';

export default class BuildingManager implements Loadable, Saveable {
    private game: Game;

    private buildings: Map<string, Building>;

    public constructor(game: Game) {
        this.game = game;
        this.buildings = new Map<string, Building>();

        this.game.getSaves().addSaveable(this);
        this.game.getSaves().addLoadable(this);
    }

    public register(building: Building): void {
        if (this.has(building.getKey())) {
            console.error(`Building ${building.getKey()} already registered.`);
            return;
        }

        this.buildings.set(building.getKey(), building);
    }

    public init(): void {
        for (const datum of BuildingData) {
            const key = StringHelper.key(datum.name);
            const building = this.buildings.get(key);
            if (building === undefined) {
                continue;
            }

            datum.init(building, this.game);
        }

    }

    public all(): Map<string, Building> {
        return this.buildings;
    }

    public unlocked(): Building[] {
        const unlocked: Building[] = [];

        this.all().forEach((building: Building) => {
            if (building.isUnlocked()) {
                unlocked.push(building);
            }
        });

        return unlocked;
    }

    public has(key: string): boolean {
        return this.buildings.has(key);
    }

    public get(key: string): Building | undefined {
        return this.buildings.get(key);
    }

    public load(data: SaveData): void {
        const resources = this.game.getResources();
        for (const datum of BuildingData) {
            const building = new Building(datum.name, datum.cost, resources);
            this.register(building);

            datum.setup(building, this.game);

            console.log(building.getKey(), { ...data.buildings[building.getKey()] });

            building.load(data.buildings[building.getKey()]);
        }
    }

    public newGame(data: SaveData): SaveData {
        for (const datum of BuildingData) {
            const key = StringHelper.key(datum.name);
            data.buildings[key] = {
                name: datum.name,
                amount: 0,
                unlocked: false,
            };
        }

        return data;
    }

    public save(data: SaveData): SaveData {
        this.buildings.forEach((building: Building) => {
            data = building.save(data);
        });

        return data;
    }
}