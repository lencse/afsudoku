import { Sudoku } from "./Sudoku";
import { Position, pos } from "./Position";

export class ValidationState {

    private position: Position;
    private seenValues: Array<number>;

    constructor (position: Position, seenValues: Array<number>) {
        this.position = position;
        this.seenValues = seenValues;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getSeenValues(): Array<number> {
        return this.seenValues;
    }

}

export abstract class ValidatorIterator {

    protected n: number;
    protected sudoku: Sudoku;

    constructor (sudoku: Sudoku) {
        this.n = sudoku.getN();
        this.sudoku = sudoku;
    }

    public abstract iterate(state: ValidationState): ValidationState;

}

export class RowValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new ValidationState(pos(0, 0), []);
        }
        if (p.getColumn() == Math.pow(this.n, 2)) {
            return new ValidationState(pos(p.getRow()+1, 1), []);
        }
        let newValues = state.getSeenValues();
        const val = this.sudoku.val(p);
        if (val != 0) {
            newValues.push(val);
        }
        return new ValidationState(pos(p.getRow(), p.getColumn()+1), newValues);
    }

}

export class ColumnValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new ValidationState(pos(0, 0), []);
        }
        if (p.getRow() == Math.pow(this.n, 2)) {
            return new ValidationState(pos(1, p.getColumn()+1), []);
        }
        let newValues = state.getSeenValues();
        const val = this.sudoku.val(p);
        if (val != 0) {
            newValues.push(val);
        }
        return new ValidationState(pos(p.getRow()+1, p.getColumn()), newValues);
    }

}

export class SubgridValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new ValidationState(pos(0, 0), []);
        }
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() % this.n == 0) {
            return new ValidationState(pos(p.getRow()+1, 1), []);
        }
        if (p.getColumn() % this.n == 0 && p.getRow() % this.n == 0) {
            return new ValidationState(pos(p.getRow()-this.n+1, p.getColumn()+1), []);
        }
        let newValues = state.getSeenValues();
        const val = this.sudoku.val(p);
        if (val != 0) {
            newValues.push(val);
        }
        if (p.getColumn() % this.n == 0) {
            return new ValidationState(pos(p.getRow()+1, p.getColumn()-this.n+1), newValues);
        }
        return new ValidationState(pos(p.getRow(), p.getColumn()+1), newValues);
    }

}
