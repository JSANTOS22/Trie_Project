// event listener for the search and add input field
const add_input = document.getElementById('add-input-field');
const add_button = document.getElementById('add-button');
const search_input = document.getElementById('search-input-field');
const title = document.getElementById('title');
const wrapper = canvas.parentElement; 
const trie = new Trie();
var nodePath = [];
var searchPath = new Set();

add_button.addEventListener('click', (e) => {
    add_input.value = add_input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();

    if (!add_input.value) return;

    nodePath = trie.insert(add_input.value);
    assignPositions(trie.root, canvas.clientWidth);
    drawTrie(trie, nodePath);

    add_input.value = '';

    updateWordBank(trie.getAllWords());
});

search_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    drawTrie(trie, []);
    
    if (!e.target.value) {
        animateSearch(new Set(), trie.root);
        updateWordBank(trie.getAllWords());
        updateBorderColors(2);
        return;
    }

    const res = trie.search(e.target.value);

    if (res) {
        const { path, remaining_words} = trie.search(e.target.value);
        animateSearch(path, trie.root);
        updateWordBank(remaining_words);
        if (remaining_words[0] == e.target.value){
            updateBorderColors(1);
        } else {
            updateBorderColors(2);
        }
    } else {
        updateWordBank(['No search results...']);
        updateBorderColors(0);
    }
    
})

function updateWordBank(words){
    const bank = document.getElementById('bank');
    bank.innerHTML = "";

    if (!words) return;

    words.forEach(word => {
        const div = document.createElement('div');
        div.classList.add('word');
        div.innerText = word;
        bank.appendChild(div);
    }); 
}

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
        title.innerHTML = 'Add a word to the Trie';
        drawTrie(trie, nodePath);
        search_input.value = '';
        updateBorderColors(2);
        updateWordBank(trie.getAllWords());
    } else {
        $('.add-field').addClass('hidden');
        $('.search-field').removeClass('hidden');
        title.innerHTML = 'Search for a word in the Trie';
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
    animateSearch(searchPath, trie.root);
}

window.addEventListener('resize', resizeCanvas);

// updating border colors by adding/removing a class
function updateBorderColors(action){
    $('.canvas-wrapper').removeClass('fail-search');
    $('.canvas-wrapper').removeClass('success-search');
    $('.search').removeClass('fail-search');
    $('.search').removeClass('success-search');

    if (action == 0){
        $('.canvas-wrapper').addClass('fail-search');
        $('.search').addClass('fail-search');
    } else if (action == 1){
        $('.canvas-wrapper').addClass('success-search');
        $('.search').addClass('success-search');
    }
}