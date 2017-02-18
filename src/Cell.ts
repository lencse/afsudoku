export abstract class Cell {

    private value: number;

    constructor (value: number) {
        this.value = value;
    }

    public abstract isSoft(): boolean;

    public val(): number {
        return this.value;
    }
}

export class SoftCell extends Cell {

    public isSoft(): boolean {
        return true;
    }

}

export class HardCell extends Cell {

    public isSoft(): boolean {
        return false;
    }

}