# Trie Project

An interactive visualization of a **trie** (prefix tree). Add, search, and delete words while seeing how shared prefixes are stored.

## What is a trie?

A trie is a tree-shaped data structure that stores words one character per node. Words with the same prefix share the same path, making prefix searches efficient. Tries are used for autocomplete, spell-checking, dictionaries, search suggestions, and routing.

## Run the demo

Open `index.html` in a browser. For the most reliable results, serve the project locally:

```bash
python3 -m http.server
```

Then visit <http://localhost:8000>.

## Run tests

Requires Node.js 18 or newer. No npm packages are required.

```bash
node --test tests/trie.test.js
```

The browser UI uses Bootstrap, jQuery, Popper, and Font Awesome from CDNs, so they do not need to be installed locally.
