/*
    This is where the trie datastructure logic is
    - insert
    - search
*/

class TrieNode {

    constructor(char){
        this.char = char;
        this.children = {};
        this.isEndOfWord = false;

        // animation properties
        this.state = 'new'; // can also be 'existing'
        this.parent = null;
        this.x = null;
        this.y = null;
    }

}

class Trie {

    constructor(){
        this.root = new TrieNode('');
        this.words = [];
    }

    insert(word){

        let node = this.root;
        const nodePath = [node];

        for (const char of word){
            // if child char doesn't exist yet, we must create a new node
            if (!node.children[char]){
                const newNode = new TrieNode(char);
                node.children[char] = newNode;
                newNode.parent = node;
                newNode.domState = 'new';
            }
            node = node.children[char];
            nodePath.push(node);
        }

        if (!node.isEndOfWord){
            node.isEndOfWord = true;
            this.words.push(word);
        }
        

        return nodePath;

    }

    delete(word){

        let node = this.root;
        const nodePath = [node];

        for (const char of word){

            // if child car doesn't exist, word isn't in the Trie
            if (!node.children[char]){
                return false;
            }

            node = node.children[char];
            nodePath.push(node);

        }

        // check if node is an end of word
        if (!node.isEndOfWord){
            return false;
        }

        // start the deletion process
        node.isEndOfWord = false;

        // remove the word from the list used by the word bank.
        this.words = this.words.filter(existingWord => existingWord !== word);

        // remove nodes that are no longer needed, starting at the end of the word.
        for (let i = nodePath.length - 1; i > 0; i--){
            const currentNode = nodePath[i];
            const parentNode = nodePath[i - 1];

            // keep nodes that support another word or have other descendants.
            if (currentNode.isEndOfWord || Object.keys(currentNode.children).length > 0) {
                break;
            }

            delete parentNode.children[currentNode.char];
        }

        return true;

    }

    search(word){

        let node = this.root;
        const path = new Set();
        const remaining_words = [];

        for (const char of word){

            // if child card doesn't exist, word isn't in the Trie 
            if (!node.children[char]){
                return null;
            }

            node = node.children[char];
            path.add(node);

        }

        this.get_remaining_words(remaining_words, word, node);

        return { path, remaining_words };

    }

    get_remaining_words(remaining_words, word, node){
        if (node.isEndOfWord) remaining_words.push(word);

        for (const child of Object.values(node.children)){
            this.get_remaining_words(remaining_words, word + child.char, child);
        }
    }

    getAllWords() {
        return this.words;
    }

}
