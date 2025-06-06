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

        node.isEndOfWord = true;

        return nodePath;

    }

    search(word){

        let node = this.root;
        const path = [];

        for (const char of word){

            // if child card doesn't exist, word isn't in the Trie 
            if (!node.children[char]){
                return null;
            }

            node = node.children[char];
            path.push(node);

        }

        //return node.isEndOfWord;
        return path;

    }

}