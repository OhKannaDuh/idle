import { SaveData } from './SaveManager';

export default interface Saveable {
    save(data: SaveData): SaveData;
}