import * as Yml from 'yml';

export class YmlParse {

    public static read(path: string) {
        return Yml.load(path);
    }

}
