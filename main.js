var app = angular.module('WS', []);

angular.module('WS').controller('mainController', function($scope, Trie) {
  var wordTrie;
  $scope.isLoading = true;

  var arr = window.words.split('\n');
  wordTrie = Trie.makeTrie(arr);
  $scope.isLoading = false;

  $scope.go = function() {
    $scope.wordsFound = [];
    var grid = parseGrid($scope.wordSearchStr);
    console.log(grid);
    $scope.wordsFound = search(grid, wordTrie);
  }

  function parseGrid(ws) {
    var grid = ws.split('\n');
    grid.forEach(function(row, i) {
      grid[i] = new Array(row.length);
      for (var j=0; j < row.length; j++) {
        grid[i][j] = row[j];
      }
    });
    return grid;
  }

  function search(ws, wl) {
    var results = [];
    for (var y=0; y < ws.length; y++) {
      for (var x=0; x < ws[y].length; x++) {
        var found = findWordsAt(ws, wl, x, y);
        results = results.concat(found);
      }
    }
    return results;
  }

  function findWordsAt(ws, wl, x, y) {
    var n = find(ws, wl, x, y, 0, -1);
    var ne = find(ws, wl, x, y, 1, -1);
    var e = find(ws, wl, x, y, 1, 0);
    var se = find(ws, wl, x, y, 1, 1);
    var s = find(ws, wl, x, y, 0, 1);
    var sw = find(ws, wl, x, y, -1, 1);
    var w = find(ws, wl, x, y, -1, 0);
    var nw = find(ws, wl, x, y, -1, -1);
    return n.concat(ne).concat(e).concat(se).concat(s).concat(sw).concat(w).concat(nw);
  }

  function find(ws, wl, x, y, xi, yi) {
    var found = [];
    var prefix = '';
    while (y >= 0 && y < ws.length && x >= 0 && x < ws[y].length) {
      prefix += ws[y][x];
      if (!Trie.isPrefix(prefix, wl)) {
        break;
      }
      if (Trie.isWord(prefix, wl)) {
        found.push(prefix);
      }
      x += xi;
      y += yi;
    }
    return found;
  }

});
