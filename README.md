# afSudoku

A Sudoku solver with backtracking algorithm.

## TLDR

````js
let Sudoku = require("afsudoku").Sudoku;
let pos = require("afsudoku").pos;

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

for (let row = 1; row <= 9; ++row) {
    for (let col = 1; col <= 9; ++col) {
        process.stdout.write(String(solved.val(pos(row, col))));
    }
    process.stdout.write("\n");
}

// Output:
//
// 348291576
// 796583124
// 521476839
// 837642951
// 462915783
// 915837462
// 683154297
// 179328645
// 254769318
````

This script solves a 9x9 sudoku:

|   |   |   |   |   |   |   |   |   |
| - | - | - | - | - | - | - | - | - |
|   |   |   |   |   | 1 |   |   |   |
| 7 |   | 6 | 5 | 8 |   |   |   | 4 |
|   | 2 |   |   |   | 6 |   | 3 |   |
|   | 3 |   |   | 4 |   |   | 5 |   |
| 4 |   | 2 |   |   |   | 7 |   | 3 |
|   | 1 |   |   | 3 |   |   |   |   |
|   | 8 |   | 1 |   |   |   | 9 |   |
| 1 |   |   |   | 2 |   | 6 |   | 5 |
|   |   |   | 7 |   |   |   |   |   |

Solution:

| 3 | 4 | 8 | 2 | 9 | 1 | 5 | 7 | 6 |
| 7 | 9 | 6 | 5 | 8 | 3 | 1 | 2 | 4 |
| 5 | 2 | 1 | 4 | 7 | 6 | 8 | 3 | 9 |
| 8 | 3 | 7 | 6 | 4 | 2 | 9 | 5 | 1 |
| 4 | 6 | 2 | 9 | 1 | 5 | 7 | 8 | 3 |
| 9 | 1 | 5 | 8 | 3 | 7 | 4 | 6 | 2 |
| 6 | 8 | 3 | 1 | 5 | 4 | 2 | 9 | 7 |
| 1 | 7 | 9 | 3 | 2 | 8 | 6 | 4 | 5 |
| 2 | 5 | 4 | 7 | 6 | 9 | 3 | 1 | 8 |
