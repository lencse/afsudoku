import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { assert } from "chai";
import { Sudoku } from "../src/Sudoku";
import { Position, pos } from "../src/Position";

@suite class SudokuTest {

    @test "creation"() {    
        let sudoku = Sudoku.create(1);
        assert.isDefined(sudoku);
    }

    @test "solving"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 2), 2);
        sudoku.put(pos(2, 1), 3);
        let solving = sudoku.startSolving();
        assert.equal(2, solving.val(pos(1, 2)));
        let step1 = solving.step();
        assert.equal(1, step1.val(pos(1, 1)));
        let step2 = step1.step();
        assert.equal(1, step2.val(pos(1, 3)));
    }

    @test "put-and-val n=1"() {
        let sudoku = Sudoku.create(1);
        sudoku.put(pos(1, 1), 1);
        assert.equal(1, sudoku.val(pos(1, 1)));
    }

    @test "put-and-val n=2"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(2, 1), 2);
        assert.equal(1, sudoku.val(pos(1, 1)));
        assert.equal(2, sudoku.val(pos(2, 1)));
    }

    @test "valid-after-creation"() {
        let sudoku = Sudoku.create(1);
        assert.isTrue(sudoku.isValid());
    }

    @test "check-invalid-row"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(1, 3), 1);
        assert.isFalse(sudoku.isValid());
    }

    @test "check-invalid-column"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(3, 1), 1);
        assert.isFalse(sudoku.isValid());
    }
    
    @test "check-invalid-subgrid"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(3, 3), 1);
        sudoku.put(pos(4, 4), 1);
        assert.isFalse(sudoku.isValid());
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
