import { Position, pos } from "./Position";
import { ValidationState, startValidationState, ValidatorIterator, RowValidatorIterator, ColumnValidatorIterator, SubgridValidatorIterator } from "./Validation";

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
        return this.validate(new RowValidatorIterator(this.n))
            && this.validate(new ColumnValidatorIterator(this.n))
            && this.validate(new SubgridValidatorIterator(this.n));
    }

    private validate(iterator: ValidatorIterator): boolean {
        let state = startValidationState();
        while (!state.isFinished()) {
            if (!state.isValid()) {
                return false;
            }
            state = iterator.iterate(state, this.val(state.getPosition()));
        }
        return true;
    }

}
