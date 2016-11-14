import { Position, pos } from "./Position";
import { ValidationState, RowValidatorIterator } from "./Validation";

export class Sudoku {

    private n: number;
    private cells: Array<number> = [];

    constructor (n: number) {
        this.n = n;
        for (let i = 0; i < Math.pow(n, 4); ++i) {
            this.cells.push(0);
        }
    }

    public getN(): number {
        return this.n;
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
        let state = new ValidationState(pos(1, 1), []);
        let iterator = new RowValidatorIterator(this);
        while (state.getPosition().getColumn() != 0) {
            if (state.getSeenValues().indexOf(this.val(state.getPosition())) != -1) {
                return false;
            }
            state = iterator.iterate(state);
        }
        for (let col = 1; col <= Math.pow(this.n, 2); ++col) {
            let vals = [];
            for (let row = 1; row <= Math.pow(this.n, 2); ++row) {
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
