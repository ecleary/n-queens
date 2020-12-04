/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var placePieces = function(board) {
    var pieceInserted = false;
    for (var i = 0; i < board.attributes.n; i++) {
      for (var j = 0; j < board.attributes.n; j++) {
        var square = board.attributes[i][j];
        if (square === 0) {
          board.attributes[i][j] = 1;
          if (!board.hasAnyRooksConflicts()) {
            pieceInserted = true;
            board.attributes.piecesPlaced = (board.attributes.piecesPlaced || 0) + 1;
            break;
          } else {
            board.attributes[i][j] = 0;
          }
        }
      }
      if (pieceInserted === true) {
        break;
      }
    }
    if (board.attributes.n === board.attributes.piecesPlaced) {
      for (var i = 0; i < board.attributes.n; i++) {
        solution.push(board.attributes[i]);
      }
      return;
    } else {
      return placePieces(board);
    }
  };
  placePieces(board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
