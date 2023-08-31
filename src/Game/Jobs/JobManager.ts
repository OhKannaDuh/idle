import Game from '../Game';
import Loadable from '../Saves/Loadable';
import Saveable from '../Saves/Saveable';
import { SaveData } from '../Saves/SaveManager';
import JobData from 'src/data/jobs'
import Job from './Job';
import StringHelper from '../StringHelper';

export default class JobManager implements Loadable, Saveable {
    private game: Game;

    private jobs: Map<string, Job>;

    public constructor(game: Game) {
        this.game = game;
        this.jobs = new Map<string, Job>();

        this.game.getSaves().addSaveable(this);
        this.game.getSaves().addLoadable(this);
    }

    public register(job: Job): void {
        if (this.has(job.getKey())) {
            console.error(`Job ${job.getKey()} already registered.`);
            return;
        }

        this.jobs.set(job.getKey(), job);
    }

    public init(): void {
        for (const datum of JobData) {
            const key = StringHelper.key(datum.name);
            const job = this.jobs.get(key);
            if (job === undefined) {
                continue;
            }

            datum.init(job, this.game);
        }
    }

    public all(): Map<string, Job> {
        return this.jobs;
    }

    public unlocked(): Job[] {
        const unlocked: Job[] = [];

        this.all().forEach((job: Job) => {
            if (job.isUnlocked()) {
                unlocked.push(job);
            }
        });

        return unlocked;
    }

    public has(key: string): boolean {
        return this.jobs.has(key);
    }

    public get(key: string): Job | undefined {
        return this.jobs.get(key);
    }

    public load(data: SaveData): void {
        for (const datum of JobData) {
            const job = new Job(datum.name);
            this.register(job);

            datum.setup(job, this.game);

            job.load(data.jobs[job.getKey()]);
        }

    }

    public newGame(data: SaveData): SaveData {
        for (const datum of JobData) {
            const key = StringHelper.key(datum.name);
            data.jobs[key] = {
                name: datum.name,
                amount: 0,
                unlocked: false,
            };
        }

        return data;
    }

    public save(data: SaveData): SaveData {
        this.jobs.forEach((job: Job) => {
            data = job.save(data);
        });

        return data;
    }
}