import { Sudoku } from "./Sudoku";
import { Position, pos } from "./Position";

export interface ValidationState {

    isFinished(): boolean;
    getPosition(): Position;
    getSeenValues(): Array<number>;

}

export class InProgressValidationState implements ValidationState {

    private position: Position;
    private seenValues: Array<number>;

    constructor (position: Position, seenValues: Array<number>) {
        this.position = position;
        this.seenValues = seenValues;
    }

    public isFinished(): boolean {
        return this.position.getRow() == 0;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getSeenValues(): Array<number> {
        return this.seenValues;
    }

}

export function startValidationState(): ValidationState {
    return new InProgressValidationState(pos(1, 1), []);
}

export abstract class ValidatorIterator {

    protected n: number;

    constructor (n: number) {
        this.n = n;
    }

    public abstract iterate(state: ValidationState, val: number): ValidationState;

}

export class RowValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new InProgressValidationState(pos(0, 0), []);
        }
        if (p.getColumn() == Math.pow(this.n, 2)) {
            return new InProgressValidationState(pos(p.getRow()+1, 1), []);
        }
        let newValues = state.getSeenValues();
        if (val != 0) {
            newValues.push(val);
        }
        return new InProgressValidationState(pos(p.getRow(), p.getColumn()+1), newValues);
    }

}

export class ColumnValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new InProgressValidationState(pos(0, 0), []);
        }
        if (p.getRow() == Math.pow(this.n, 2)) {
            return new InProgressValidationState(pos(1, p.getColumn()+1), []);
        }
        let newValues = state.getSeenValues();
        if (val != 0) {
            newValues.push(val);
        }
        return new InProgressValidationState(pos(p.getRow()+1, p.getColumn()), newValues);
    }

}

export class SubgridValidatorIterator extends ValidatorIterator{

    public iterate(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() == Math.pow(this.n, 2)) {
            return new InProgressValidationState(pos(0, 0), []);
        }
        if (p.getColumn() == Math.pow(this.n, 2) && p.getRow() % this.n == 0) {
            return new InProgressValidationState(pos(p.getRow()+1, 1), []);
        }
        if (p.getColumn() % this.n == 0 && p.getRow() % this.n == 0) {
            return new InProgressValidationState(pos(p.getRow()-this.n+1, p.getColumn()+1), []);
        }
        let newValues = state.getSeenValues();
        if (val != 0) {
            newValues.push(val);
        }
        if (p.getColumn() % this.n == 0) {
            return new InProgressValidationState(pos(p.getRow()+1, p.getColumn()-this.n+1), newValues);
        }
        return new InProgressValidationState(pos(p.getRow(), p.getColumn()+1), newValues);
    }

}
