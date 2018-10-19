angular.module('WS').service('Trie', function() {
  function makeTrie(words) {
    var root = {};

    words.forEach(function(word) {
      word = word.replace(/^\s+/, '').replace(/\s+$/, '');
      add(word, root);
    });

    function add(word, node) {
      if (!node.c) {
        node.c = {};
      }

      var ch = word[0];
      var remainder = word.substring(1);

      if (!node.c[ch]) {
        node.c[ch] = {}
      }
      if (remainder) {
        add(remainder, node.c[ch]);
      }
      else {
        node.c[ch].w = true;
      }
    }

    return root;
  }

  function isPrefix(prefix, node) {
    if (!prefix) {
      return true;
    }

    var ch = prefix[0];

    if (!node.c || !node.c[ch]) {
      return false;
    }
    return isPrefix(prefix.substring(1), node.c[ch]);
  }

  function isWord(word, node) {
    if (!word) {
      return node.w ? true : false;
    }

    var ch = word[0];

    if (!node.c || !node.c[ch]) {
      return false;
    }
    return isWord(word.substring(1), node.c[ch]);
  }

  return {
    makeTrie: makeTrie,
    isPrefix: isPrefix,
    isWord: isWord
  }
});
