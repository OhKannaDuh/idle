import Amount from '../Amount';
import { JobSaveData, SaveData } from '../Saves/SaveManager';
import StringHelper from '../StringHelper';

export default class Job {

    private name: string;

    private key: string;

    private amount: Amount;

    private unlocked = false;

    public constructor(name: string) {
        this.name = name;
        this.key = StringHelper.key(name);
        this.amount = new Amount();
    }

    public getName(): string {
        return this.name;
    }

    public getKey(): string {
        return this.key;
    }

    public getAmount(): Amount {
        return this.amount;
    }

    public isUnlocked(): boolean {
        return this.unlocked;
    }

    public unlock(): Job {
        this.unlocked = true;
        return this;
    }

    public save(data: SaveData): SaveData {
        data.jobs[this.key] = {
            name: this.name,
            amount: this.amount.getValue(),
            unlocked: this.unlocked,
        };

        return data;
    }

    public load(data: JobSaveData): void {
        this.amount.setValue(data.amount);
        if (data.unlocked) {
            this.unlock();
        }
    }
}