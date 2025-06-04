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
        this.state = 'new'; // can also be 'existing
        this.parent = null;
        this.x = null;
        this.y = null;
    }

}

class Trie {

    constructor(){
        this.root = TrieNode('');
    }

    insert(word){

        let node = this.root;
        const newNodes = [];

        for (const char of word){
            if (!node.children[char]){
                const newNode = new TrieNode(char);
                node.children[char] = newNode;
                newNode.parent = node;
                newNodes.push(newNode);
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;

        return newNodes;

    }

}