import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { assert } from "chai";
import { Sudoku } from "../src/Sudoku";
import { Position, pos } from "../src/Position";

@suite class SudokuTest {

    @test "creation"() {    
        let sudoku = new Sudoku(1);
        assert.isDefined(sudoku);
    }

    @test "put-and-val n=1"() {
        let sudoku = new Sudoku(1);
        sudoku.put(pos(1, 1), 1);
        assert.equal(1, sudoku.val(pos(1, 1)));
    }

    @test "position"() {
        let position = new Position(1, 2);
        assert.equal(1, position.getRow());
        assert.equal(2, position.getColumn());
    }

    @test "pos"() {
        let position = pos(1, 2);
        assert.equal(1, position.getRow());
        assert.equal(2, position.getColumn());
    }

}
