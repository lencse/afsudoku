import { Position } from "./Position";

export class Sudoku {

    private n: number;
    private cells: Array<number> = [];

    constructor (n: number) {
        this.n = n;
        for (let i = 0; i < Math.pow(n, 4); ++i) {
            this.cells.push(0);
        }
    }

    public put(position: Position, value: number) {
        this.cells[this.transformPositionToIndex(position)] = value;
    }

    public val(position: Position): number {
        return this.cells[this.transformPositionToIndex(position)];
    }

    private transformPositionToIndex(position: Position): number {
        return (position.getRow()-1) * Math.pow(this.n, 2) + position.getColumn()-1;
    }

}
