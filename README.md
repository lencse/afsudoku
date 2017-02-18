# afsudoku

[![Build Status](https://travis-ci.org/lencse/afsudoku.svg?branch=master)](https://travis-ci.org/lencse/afsudoku)

A Sudoku solver with backtracking algorithm.

## Installation

````shell
npm install afsudoku
````

## Usage

### TLDR

````js
let Sudoku = require("afsudoku").Sudoku;
let pos = require("afsudoku").pos;

let sudoku = Sudoku.create();

sudoku.put(pos(1, 6), 1); // put(pos(row, column), value)

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


let cell1 = solved.cell(pos(9, 4));
let cell2 = solved.cell(pos(9, 5));

// Soft and hard cells
//
// Hard cell: a cell that is part of the puzzle and can't be modified
// Soft cell: a cell that can be modified while solving

console.log(cell1.isSoft(), cell1.val());
console.log(cell2.isSoft(), cell2.val());

// Output:
//
// false 7
// true 6
````