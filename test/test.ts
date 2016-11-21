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
        let step3 = step2.step();
        assert.equal(2, step3.val(pos(1, 3)));
        let step4 = step3.step();
        assert.equal(3, step4.val(pos(1, 3)));
    }

    @test "solving-step-back"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 2), 3);
        sudoku.put(pos(2, 2), 4);
        sudoku.put(pos(1, 4), 4);
        sudoku.put(pos(2, 3), 2);
        sudoku.put(pos(2, 4), 3);
        let solving = sudoku.startSolving();
        for (let i = 0; i < 6; ++i) {
            solving = solving.step();
        }
        assert.equal(0, solving.val(pos(1, 3)));
        solving = solving.step();
        assert.equal(2, solving.val(pos(1, 1)));
    }

    @test "solve n=1"() {
        let sudoku = Sudoku.create(1);
        let solved = sudoku.solve();
        assert.equal(1, solved.val(pos(1, 1)));
    }

    @test "solve n=2"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(1, 2), 3);
        sudoku.put(pos(1, 3), 2);
        sudoku.put(pos(1, 4), 4);

        // sudoku.put(pos(2, 1), 2);
        // sudoku.put(pos(2, 2), 4);
        sudoku.put(pos(2, 3), 1);
        sudoku.put(pos(2, 4), 3);

        sudoku.put(pos(3, 1), 3);
        sudoku.put(pos(3, 2), 1);
        // sudoku.put(pos(3, 3), 4);
        sudoku.put(pos(3, 4), 2);

        sudoku.put(pos(4, 1), 4);
        sudoku.put(pos(4, 2), 2);
        // sudoku.put(pos(4, 3), 3);
        // sudoku.put(pos(4, 4), 1);

        let solved = sudoku.solve();

        assert.equal(2, solved.val(pos(2, 1)));
        assert.equal(4, solved.val(pos(2, 2)));
        assert.equal(4, solved.val(pos(3, 3)));
        assert.equal(3, solved.val(pos(4, 3)));
        assert.equal(1, solved.val(pos(4, 4)));
    }

    @test "solve n=3"() {
        let sudoku = Sudoku.create();
        
        sudoku.put(pos(1, 6), 1);

        sudoku.put(pos(2, 1), 7);
        sudoku.put(pos(2, 3), 6);
        sudoku.put(pos(2, 4), 5);
        sudoku.put(pos(2, 5), 8);
        sudoku.put(pos(2, 9), 4);

        sudoku.put(pos(3, 2), 2);
        sudoku.put(pos(3, 6), 6);
        sudoku.put(pos(3, 8), 3);
        
        sudoku.put(pos(4, 2), 3);
        sudoku.put(pos(4, 5), 4);
        sudoku.put(pos(4, 8), 5);
        
        sudoku.put(pos(5, 1), 4);
        sudoku.put(pos(5, 3), 2);
        sudoku.put(pos(5, 7), 7);
        sudoku.put(pos(5, 9), 3);

        sudoku.put(pos(6, 2), 1);
        sudoku.put(pos(6, 5), 3);

        sudoku.put(pos(7, 2), 8);
        sudoku.put(pos(7, 4), 1);
        sudoku.put(pos(7, 8), 9);

        sudoku.put(pos(8, 1), 1);
        sudoku.put(pos(8, 5), 2);
        sudoku.put(pos(8, 7), 6);
        sudoku.put(pos(8, 9), 5);

        sudoku.put(pos(9, 4), 7);

        let solved = sudoku.solve();

        const solution = [ ,
            [ , 3, 4, 8, 2, 9, 1, 5, 7, 6 ],
            [ , 7, 9, 6, 5, 8, 3, 1, 2, 4 ],
            [ , 5, 2, 1, 4, 7, 6, 8, 3, 9 ],
            [ , 8, 3, 7, 6, 4, 2, 9, 5, 1 ],
            [ , 4, 6, 2, 9, 1, 5, 7, 8, 3 ],
            [ , 9, 1, 5, 8, 3, 7, 4, 6, 2 ],
            [ , 6, 8, 3, 1, 5, 4, 2, 9, 7 ],
            [ , 1, 7, 9, 3, 2, 8, 6, 4, 5 ],
            [ , 2, 5, 4, 7, 6, 9, 3, 1, 8 ] ];
        for (let row = 1; row <= 9; ++row) {
            for (let col = 1; col <= 9; ++col) {
                assert.equal(solution[row][col], solved.val(pos(row, col)));
            }
        }
    }

    @test "no-solution"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(2, 1), 1);
        let result = sudoku.solve();
        assert.isTrue(result.isFailed());
    }

    @test "is-solvable"() {
        let sudoku = Sudoku.create(2);
        sudoku.put(pos(1, 1), 1);
        sudoku.put(pos(2, 1), 1);
        assert.isFalse(sudoku.isSolvable());
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
