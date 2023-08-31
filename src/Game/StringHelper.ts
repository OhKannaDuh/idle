export default class StringHelper {
    public static key(name: string): string {
        return name.replace("'", '').replace(' ', '_').toLowerCase();
    }
}