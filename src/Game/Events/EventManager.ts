import Game from '../Game';
import Loadable from '../Saves/Loadable';
import Saveable from '../Saves/Saveable';
import { SaveData } from '../Saves/SaveManager';
import Event from './Event';
import EventData from 'src/data/events';

export default class EventManager implements Loadable, Saveable {
    private game: Game;

    private events: Map<string, Event>;

    private completed: string[] = []

    public constructor(game: Game) {
        this.game = game;
        this.events = new Map<string, Event>();

        this.game.getSaves().addSaveable(this);
        this.game.getSaves().addLoadable(this);
    }

    public register(event: Event): void {
        if (this.events.has(event.getKey())) {
            console.error(`Building ${event.getKey()} already registered.`);
            return;
        }

        this.events.set(event.getKey(), event);
    }

    public init(): EventManager {
        return this.setupEvents();
    }

    public setupEvents(): EventManager {
        this.events.forEach((event: Event): void => {
            if (!event.isReady(this.completed)) {
                return;
            }

            event.setup(this.game, this);
        });

        return this;
    }

    public complete(key: string): EventManager {
        this.events.get(key)?.teardown(this.game);
        this.completed.push(key);
        return this.setupEvents();
    }

    public load(data: SaveData): void {
        for (const datum of EventData) {
            this.register(new Event(datum));
        }

        this.completed = data.events.completed;
    }

    public newGame(data: SaveData): SaveData {
        return data;
    }

    public save(data: SaveData): SaveData {
        data.events.completed = this.completed;

        return data;
    }
}