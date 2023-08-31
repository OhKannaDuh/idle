import store from 'store2'
import Saveable from './Saveable';
import Loadable from './Loadable';
import Game from '../Game';


export type ResourceSaveData = {
    name: string;
    amount: number;
    unlocked: boolean;
};

export type BuildingSaveData = {
    name: string;
    amount: number;
    unlocked: boolean;
};

export type JobSaveData = {
    name: string;
    amount: number;
    unlocked: boolean;
};

export type SaveData = {
    version: number;
    resources: {
        [key: string]: ResourceSaveData,
    },
    buildings: {
        [key: string]: BuildingSaveData,
    },
    jobs: {
        [key: string]: JobSaveData;
    },
    events: {
        completed: string[];
    }
};

export default class SaveManager {
    private readonly SAVE_KEY = 'save-data';

    private game: Game;

    private data: SaveData = {
        version: 0,
        resources: {},
        buildings: {},
        jobs: {},
        events: {
            completed: [],
        },
    };

    private interval = 0;

    private saveables: Saveable[] = [];

    private loadables: Loadable[] = [];

    public constructor(game: Game) {
        this.game = game;
    }

    public start(): void {
        this.interval = window.setInterval(() => this.save(), 5000);
    }

    public stop(): void {
        window.clearInterval(this.interval);
    }

    public addSaveable(saveable: Saveable) {
        this.saveables.push(saveable);
    }

    public addLoadable(loadable: Loadable) {
        this.loadables.push(loadable);
    }

    public delete(): void {
        // store.remove(this.SAVE_KEY);
        localStorage.removeItem(this.SAVE_KEY);
    }

    public save(): void {
        for (const saveable of this.saveables) {
            this.data = saveable.save(this.data);
        }

        console.log('saving...');
        // console.log(store.set(this.SAVE_KEY, this.data));
        localStorage.setItem(this.SAVE_KEY, JSON.stringify(this.data));
    }

    public load(): void {
        const data = localStorage.getItem(this.SAVE_KEY);
        if (data === null) {
            this.newGame();
        }

        this.data = JSON.parse(localStorage.getItem(this.SAVE_KEY));

        for (const loadable of this.loadables) {
            loadable.load(this.data);
        }
    }

    private newGame(): void {
        this.game.log('You find yourself alone on a desolate world...');
        this.data.version = 1;

        for (const loadable of this.loadables) {
            this.data = loadable.newGame(this.data);
        }

        this.loadables.forEach((loadable: Loadable) => {
            loadable.newGame(this.data);
        });

        this.save();
    }
};
