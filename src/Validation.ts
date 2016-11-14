import { Sudoku } from "./Sudoku";
import { Position, pos } from "./Position";

export interface ValidationState {

    isFinished(): boolean;
    getPosition(): Position;
    getSeenValues(): Array<number>;
    isValid(): boolean;

}

export class InProgressValidationState implements ValidationState {

    private position: Position;
    private seenValues: Array<number>;

    constructor (position: Position, seenValues: Array<number>) {
        this.position = position;
        this.seenValues = seenValues;
    }

    public isFinished(): boolean {
        return false;
    }

    public isValid(): boolean {
        return true;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getSeenValues(): Array<number> {
        return this.seenValues;
    }

}

class FinishedValidationState implements ValidationState {

    public isFinished(): boolean {
        return true;
    }

    public isValid(): boolean {
        return true;
    }

    public getPosition(): Position {
        throw "Shouldn't be called";
    }

    public getSeenValues(): Array<number> {
        throw "Shouldn't be called";
    }

}

class InvalidValidationState implements ValidationState {

    public isFinished(): boolean {
        return false;
    }

    public getPosition(): Position {
        throw "Shouldn't be called";
    }

    public getSeenValues(): Array<number> {
        throw "Shouldn't be called";
    }

    public isValid(): boolean {
        return false;
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

    public iterate(state: ValidationState, val: number): ValidationState {
        if (state.getSeenValues().indexOf(val) != -1) {
            return new InvalidValidationState();
        }
        if (state.getPosition().getColumn() == Math.pow(this.n, 2) && state.getPosition().getRow() == Math.pow(this.n, 2)) {
            return new FinishedValidationState();
        }
        return this.stepForward(state, val);
    }

    protected abstract stepForward(state: ValidationState, val: number): ValidationState;

}

export class RowValidatorIterator extends ValidatorIterator{

    protected stepForward(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
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

    protected stepForward(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
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

    protected stepForward(state: ValidationState, val: number): ValidationState {
        const p = state.getPosition();
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
