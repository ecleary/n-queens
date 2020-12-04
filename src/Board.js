// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var flag = false;
      var row = this.attributes[rowIndex];
      if (Array.isArray(row)) {
        var piecefound = false;
        _.each(row, function(square) {
          if (square === 1 && piecefound === true) {
            flag = true;
          } else if (square === 1) {
            piecefound = true;
          }
        });
      }
      return flag; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //no input
      //returns a boolean
      //true if there is a conflict, false if there isn't
      //we need to confirm how we are accessing the "rows"

      //we will look through each row to find conflicts
      //return true once we see a conflict

      //create flag that stores boolean, returns it at the end of the function
      var flag = false;
      _.each(this.attributes, function(value, key) {
        if (Array.isArray(value)) {
          var piecefound = false;
          _.each(value, function(square) {
            if (square === 1 && piecefound === true) {
              flag = true;
            } else if (square === 1) {
              piecefound = true;
            }
          });
        }
      });
      //iterate over the outer array of board
      //  are any 2 values in the current array 1.
      //  create a variable to keep track of repeats of 1. default equals false
      //  iterate over the inner array
      //  if (current value === 1 && repeats === true)
      //    flag = true;
      //  otherwise if (currentvalue === 1)
      //  repeatflag = true;

      return flag; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var flag = false;
      var col = [];
      for (var i = 0; i < this.attributes.n; i++) {
        var row = this.attributes[i];
        col.push(row[colIndex]);
      }
      if (Array.isArray(col)) {
        var piecefound = false;
        _.each(col, function(square) {
          if (square === 1 && piecefound === true) {
            flag = true;
          } else if (square === 1) {
            piecefound = true;
          }
        });
      }
      return flag;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // High level
      // turn rows into columns using for loop
      /*
      // Pseudocode
      // Define flag and set to false
      // Define empty array and store as storageArray
      //
      // var i = 0; i < this.attributes.n; i++
        // define storageArray at i equals an empty array
        // var j = 0; j < this.attributes.n; j++
          // storageArray at i at j will equal this.attributes at i at j
      // Iterate over storageArray
        // Create pieceFound flag set to false
        // Iterate over values of each single array
          // If square is 1 and if pieceFound is true
            // Set flag to true
          // Otherwise if square is 1
            // Set pieceFound to true
      // Return flag
      */

      var flag = false;
      var storageArray = [];
      for (var i = 0; i < this.attributes.n; i++) {
        storageArray[i] = [];
        for (var j = 0; j < this.attributes.n; j++) {
          storageArray[i][j] = this.attributes[j][i];
        }
      }
      _.each(storageArray, function(value, key) {
        if (Array.isArray(value)) {
          var piecefound = false;
          _.each(value, function(square) {
            if (square === 1 && piecefound === true) {
              flag = true;
            } else if (square === 1) {
              piecefound = true;
            }
          });
        }
      });
      return flag; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      /*
      // Define flag equal to false
      // Define diagonals variable equal to empty array
      // Iterate over first row in chessboard for(var i=0; i < this.attributes.n; i++)
        // Add empty array to diagonals name currentDiagonal
        // Start a loop with a number of iterations equal to n minus current square index (n - i) (j)
          // <Grab each square in the current diagonal> this.attributes[j][i+j];
          // Push square value into currentDiagonal
      // Iterate over first column in chessboard for(var i=0; i < this.attributes.n; i++)
        // Add empty array to diagonals name currentDiagonal
        // Start a loop with a number of iterations equal to n minus current square index (n - i) (j)
          // <Grab each square in the current diagonal> this.attributes[i+j][j];
      // Reuse code from previous methods to check arrays in diagonals array for conflicts
        // ...
      // Return flag
      */
      var flag = false;
      var diagonals = [];
      for (var i = 0; i < this.attributes.n; i++) {
        var currentDiagonal = [];
        for (var j = 0; j < this.attributes.n - i; j++) {
          currentDiagonal.push(this.attributes[j][i + j]);
        }
        diagonals.push(currentDiagonal);
      }
      for (var i = 0; i < this.attributes.n; i++) {
        var currentDiagonal = [];
        for (var j = 0; j < this.attributes.n - i; j++) {
          currentDiagonal.push(this.attributes[i + j][j]);
        }
        diagonals.push(currentDiagonal);
      }
      _.each(diagonals, function(value, key) {
        if (Array.isArray(value)) {
          var piecefound = false;
          _.each(value, function(square) {
            if (square === 1 && piecefound === true) {
              flag = true;
            } else if (square === 1) {
              piecefound = true;
            }
          });
        }
      });
      return flag;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var flag = false;
      var diagonals = [];
      for (var i = this.attributes.n - 1; i >= 0; i--) {
        var currentDiagonal = [];
        for (var j = 0; j <= i; j++) {
          currentDiagonal.push(this.attributes[j][i - j]);
        }
        diagonals.push(currentDiagonal);
      }
      for (var i = 0; i < this.attributes.n; i++) {
        var currentDiagonal = [];
        var count = 0;
        for (var j = this.attributes.n - 1; j >= i; j--) {
          currentDiagonal.push(this.attributes[i + count][j]);
          count++;
        }
        diagonals.push(currentDiagonal);
      }
      _.each(diagonals, function(value, key) {
        if (Array.isArray(value)) {
          var piecefound = false;
          _.each(value, function(square) {
            if (square === 1 && piecefound === true) {
              flag = true;
            } else if (square === 1) {
              piecefound = true;
            }
          });
        }
      });
      return flag;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
