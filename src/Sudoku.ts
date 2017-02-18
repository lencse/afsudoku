import { Position, pos } from "./Position";
import { ValidationState, startValidationState, ValidatorIterator, RowValidatorIterator, ColumnValidatorIterator, SubgridValidatorIterator } from "./Validation";
import { Cell, SoftCell, HardCell } from "./Cell";

export abstract class Sudoku {

    protected n: number;
    protected cells: Array<number> = [];

    public static create(n?: number): SudokuUnderSetup {
        n = n || 3;
        return new SudokuUnderSetup(n);
    }

    protected constructor (n: number, cells?: Array<number>) {
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

    public abstract cell(position: Position): Cell;

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

}

export class SudokuUnderSetup extends Sudoku {

    public cell(position: Position): Cell {
        if (this.val(position) == 0) {
            return new SoftCell(0);
        }
        return new HardCell(this.val(position));
    }

    public put(position: Position, value: number) {
        this.cells[this.transformPositionToIndex(position)] = value;
    }

    public startSolving(): SudokuUnderSolving {
        return new SudokuUnderSolving(this.n, this.cells);
    }
    
    public solve(): SudokuUnderSolving {
        let solving = this.startSolving();
        while (!solving.isSolved() && !solving.isFailed()) {
            solving = solving.step();
        }
        return solving;
    }

    protected setUp() {
    }

    public isSolvable(): boolean {
        return this.solve().isSolved();
    }

}

export class SudokuUnderSolving extends Sudoku {

    private modifyableCells: Array<number>;
    private current: number;

    public cell(position: Position): Cell {
        if (this.modifyableCells.indexOf(this.transformPositionToIndex(position)) != -1) {
            return new SoftCell(this.val(position));
        }
        return new HardCell(this.val(position));
    }

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

        next.setCurrentVal(next.getCurrentVal() + 1);

        if (next.getCurrentVal() > Math.pow(this.n, 2)) {
            next.setCurrentVal(0);
            --next.current;
            return next;
        }

        if (next.isValid()) {
            ++next.current;
        }

        return next;
    }

    public isSolved(): boolean {
        return (this.current == this.modifyableCells.length)
            && this.isValid();
    }

    public isFailed(): boolean {
        return this.current == -1;
    }

    private getCurrentVal(): number {
        return this.cells[this.getCurrentIndex()];
    }

    private setCurrentVal(val: number) {
        this.cells[this.getCurrentIndex()] = val;
    }

    private getCurrentIndex(): number {
        return this.modifyableCells[this.current];
    }

}
