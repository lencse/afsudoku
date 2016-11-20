import { Position, pos } from "./Position";
import { ValidationState, startValidationState, ValidatorIterator, RowValidatorIterator, ColumnValidatorIterator, SubgridValidatorIterator } from "./Validation";

export abstract class Sudoku {

    protected n: number;
    protected cells: Array<number> = [];

    public static create(n: number): SudokuUnderSetup {
        return new SudokuUnderSetup(n);
    }

    protected constructor (n: number) {
        this.n = n;
        for (let i = 0; i < Math.pow(n, 4); ++i) {
            this.cells.push(0);
        }
    }

    public val(position: Position): number {
        return this.cells[this.transformPositionToIndex(position)];
    }

    protected transformPositionToIndex(position: Position): number {
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

    public startSolving(): Sudoku {
        return this;
    }

}

export class SudokuUnderSetup extends Sudoku {

    public put(position: Position, value: number) {
        this.cells[this.transformPositionToIndex(position)] = value;
    }

}
