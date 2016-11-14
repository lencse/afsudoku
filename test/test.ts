import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { assert } from "chai";
import { Sudoku } from "../src/Sudoku";

@suite class SudokuTest {

    @test "creation"() {
        let sudoku = new Sudoku();
        assert.isDefined(sudoku);
    }

}
