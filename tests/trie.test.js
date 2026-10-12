const test = require('node:test');
const assert = require('node:assert/strict');
const { Trie } = require('../js/trie');

test('adds words and finds matching words', () => {
    const trie = new Trie();

    trie.insert('CAR');
    trie.insert('CARD');

    assert.deepEqual(trie.getAllWords(), ['CAR', 'CARD']);
    assert.deepEqual(trie.search('CAR').remaining_words, ['CAR', 'CARD']);
});

test('deletes a word without deleting a shared prefix', () => {
    const trie = new Trie();

    trie.insert('CAR');
    trie.insert('CARD');

    assert.equal(trie.delete('CAR'), true);
    assert.deepEqual(trie.getAllWords(), ['CARD']);
    assert.deepEqual(trie.search('CAR').remaining_words, ['CARD']);
});

test('returns false when deleting a word that does not exist', () => {
    const trie = new Trie();

    assert.equal(trie.delete('MISSING'), false);
});
