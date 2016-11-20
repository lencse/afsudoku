import { Position, pos } from "./Position";
import { ValidationState, startValidationState, ValidatorIterator, RowValidatorIterator, ColumnValidatorIterator, SubgridValidatorIterator } from "./Validation";

export abstract class Sudoku {

    protected n: number;
    protected cells: Array<number> = [];

    public static create(n: number): SudokuUnderSetup {
        return new SudokuUnderSetup(n);
    }

    protected constructor (n: number, cells: Array<number> = null) {
        this.n = n;
        for (let i = 0; i < Math.pow(n, 4); ++i) {
            this.cells.push(cells ? cells[i] : 0);
        }
        this.setUp();
    }

    protected abstract setUp();

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

    public startSolving(): SudokuUnderSolving {
        return new SudokuUnderSolving(this.n, this.cells);
    }

}

export class SudokuUnderSetup extends Sudoku {

    public put(position: Position, value: number) {
        this.cells[this.transformPositionToIndex(position)] = value;
    }

    protected setUp() {
    }

}

export class SudokuUnderSolving extends Sudoku {

    private modifyableCells: Array<number>;
    private current: number;

    protected setUp() {
        this.modifyableCells = [];
        this.current = 0;
        this.cells.map((cell: number, idx: number) => {
            if (cell == 0) {
                this.modifyableCells.push(idx);
            }
        });
    }

    public step(): SudokuUnderSolving {
        let next = new SudokuUnderSolving(this.n, this.cells);
        next.modifyableCells = this.modifyableCells;
        next.current = this.current;

        ++next.cells[next.modifyableCells[next.current]];

        if (next.isValid()) {
            ++next.current;
        }
        
        return next;
    }

}
