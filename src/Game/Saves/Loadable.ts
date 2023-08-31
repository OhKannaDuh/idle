import { SaveData } from './SaveManager';

export default interface Loadable {
    load(data: SaveData): void;

    newGame(data: SaveData): SaveData;
}