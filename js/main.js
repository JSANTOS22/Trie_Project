// event listener for the search and add input field
const add_input = document.getElementById('add-input-field');
const search_input = document.getElementById('search-input-field');
const trie = new Trie();

add_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();

    if (!e.target.value) return;

    const newNodes = trie.insert(e.target.value);
    console.log(newNodes);
    assignPositions(trie.root, canvas.clientWidth);
    animateInsert(newNodes);
});

search_input.addEventListener('input', (e) => {
    const prev_val = e.target.value; 
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    
    if (prev_val == e.target.value || !e.target.value) return;

    const path = trie.search(e.target.value);
    if (path) {
        animateSearch(path);
    } else {
        alert("word not found.");
    }
})

// adds word to Trie
function add_to_Trie(){
    console.log(add_input.value);
    add_input.value = '';
}

// function that switches the action
function switch_action(type){
    if (type === "add") {
        $('.word-bank').addClass('hidden');
        $('.search-field').addClass('hidden');
        $('.add-field').removeClass('hidden');
        search_input.value = '';
    } else {
        $('.add-field').addClass('hidden');
        $('.search-field').removeClass('hidden');
        $('.word-bank').removeClass('hidden');
        add_input.value = '';
    }
}