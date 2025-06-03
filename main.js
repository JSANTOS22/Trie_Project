// event listener for the search and add input field
const add_input = document.getElementById('add-input-field');
const search_input = document.getElementById('search-input-field');

add_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
});

search_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    console.log(e.target.value);
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