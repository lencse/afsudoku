import { Position } from "./Position";

export class Sudoku {

    private n: number;
    private value: number;

    constructor (n: number) {
        this.n = n
    }

    public put(position: Position, value: number) {
        this.value = value;
    }

    public val(position: Position): number {
        return this.value;
    }

}
