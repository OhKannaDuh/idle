import BuildingManager from './Buildings/BuildingManager';
import EventManager from './Events/EventManager';
import JobManager from './Jobs/JobManager';
import Log from './Log';
import Loop from './Loop';
import Resource from './Resource';
import ResourceManager from './ResourceManager';
import SaveManager from './Saves/SaveManager';

export default class Game {
    private saves: SaveManager;

    private resources: ResourceManager;

    private buildings: BuildingManager;

    private jobs: JobManager;

    private events: EventManager;


    private loop: Loop = new Loop();

    private interval = 0;

    public logs: Log[] = [];

    public constructor() {
        this.saves = new SaveManager(this);
        this.resources = new ResourceManager(this);
        this.buildings = new BuildingManager(this);
        this.jobs = new JobManager(this);
        this.events = new EventManager(this);
    }

    public init(): void {
        this.saves.load();
        this.saves.start(); // Start save loop

        this.events.init();
        this.buildings.init();
        this.jobs.init();
        this.resources.init();
    }

    public start(): void {
        this.loop.init();
        this.interval = window.setInterval(() => this.tick(), 1000 / 20);
    }

    public stop(): void {
        window.clearInterval(this.interval);
    }

    public tick(): void {
        const delta: number = this.loop.tick();

        this.resources.all().forEach((resource: Resource) => {
            resource.tick(delta);
        });
    }

    public getSaves(): SaveManager {
        return this.saves;
    }

    public getResources(): ResourceManager {
        return this.resources;
    }

    public getBuildings(): BuildingManager {
        return this.buildings;
    }

    public getJobs(): JobManager {
        return this.jobs;
    }

    public getEvents(): EventManager {
        return this.events;
    }

    public log(log: string): void {
        this.logs.push(new Log(log));
    }

    public logUnlock(log: string): void {
        this.logs.push(new Log(log).unlock());
    }

    public getLogs(): Log[] {
        return this.logs;
    }

    public reset(): void {
        this.saves.delete();
    }
};
