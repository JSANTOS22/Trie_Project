// event listener for the search and add input field
const add_input = document.getElementById('add-input-field');
const add_button = document.getElementById('add-button');
const search_input = document.getElementById('search-input-field');
const wrapper = canvas.parentElement; 
const trie = new Trie();
var nodePath = [];

add_button.addEventListener('click', (e) => {
    add_input.value = add_input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();

    if (!add_input.value) return;

    nodePath = trie.insert(add_input.value);
    assignPositions(trie.root, canvas.clientWidth);
    drawTrie(trie, nodePath);

    add_input.value = '';
});

search_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    drawTrie(trie, []);
    
    if (!e.target.value) {
        animateSearch(new Set(), trie.root);
        return;
    }

    const path = trie.search(e.target.value);
    if (path) {
        animateSearch(path, trie.root);
    } else {
        alert("word not found.");
    }
})

// adds word to Trie
function add_to_Trie(){
    add_input.value = '';
}

// function that switches the action
function switch_action(type){
    nodePath = [];
    if (type === "add") {
        $('.search-field').addClass('hidden');
        $('.add-field').removeClass('hidden');
        drawTrie(trie, nodePath);
        search_input.value = '';
    } else {
        $('.add-field').addClass('hidden');
        $('.search-field').removeClass('hidden');
        drawTrie(trie, nodePath);
        add_input.value = '';
    }
}

function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    // set actual pixel size of canvas to wrapper
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    // set CSS size 
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // reset transform and scale for crisp drawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(scale, scale);

    assignPositions(trie.root, canvas.clientWidth);
    drawTrie(trie, nodePath);
}

window.addEventListener('resize', resizeCanvas);