import { Position, pos } from "./Position";

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

    public isValid(): boolean {
        for (let row = 1; row <= Math.pow(this.n, 2); ++row) {
            let vals = [];
            for (let col = 1; col <= Math.pow(this.n, 2); ++col) {
                const val = this.val(pos(row, col)) 
                if (val == 0) {
                    continue;
                }
                if (vals.indexOf(val) != -1) {
                    return false;
                }
                vals.push(val);
            }
        }
        return true;
    }

}
