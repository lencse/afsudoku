import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { assert } from "chai";
import { Sudoku } from "../src/Sudoku";
import { Position } from "../src/Position";

@suite class SudokuTest {

    @test "creation"() {
        let sudoku = new Sudoku();
        assert.isDefined(sudoku);
    }

    @test "position"() {
        let position = new Position(1, 2);
        assert.equal(1, position.getRow());
        assert.equal(2, position.getColumn());
    }

}
