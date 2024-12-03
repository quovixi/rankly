// Change "Load sample data" button text on click
function changeButtonText() {
    const button = 
        document.querySelector('button');
    button.innerHTML = '&#8635 Reload sample data';
}


// Populate year in footer
document.addEventListener('DOMContentLoaded', function() {
    var year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
});


// Select the button and textarea elements
const loadJsonBtn = document.getElementById('load-json');
const userInput = document.getElementById('user-input');


// Load sample data files in textarea on button click
const sampleFiles = [
    'data/beatles.json',
    'data/coffee.json',
    'data/colours.json',
    'data/friends.json', 
    'data/potatoes.json',
    'data/pokemon.json', 
    'data/princesses.json', 
     'data/seasons.json',
    'data/starwars.json' 
];

loadJsonBtn.addEventListener('click', () => {
    const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];

    fetch(randomFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            userInput.value = data.items.join('\n');
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            alert('The sample file could not be loaded. Try again.');
        });
});


// Initiate ranking process on button click, using values from textarea 
document.getElementById('submit-btn').addEventListener('click', startRanking);

let items = [];
let pairs = [];
let scores = {};
let currentIndex = 0;

function startRanking() {
    const input = document.getElementById('user-input').value.split('\n').map(item => item.trim()).filter(item => item !== '');
    
    if (input.length < 2 || input.length > 10) {
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    document.getElementById('error-msg').style.display = 'none';
    
    items = input.length ? input : ["Chandler", "Joey", "Monica", "Phoebe", "Rachel", "Ross"];
    pairs = generatePairs(items);
    items.forEach(item => scores[item] = 0);

    document.getElementById('input-section').style.display = 'none';
    document.getElementById('ranking-section').style.display = 'block';
    showNextPair();
}


// Generate pairs from list of items
function generatePairs(items) {
    const pairs = [];
    
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            pairs.push([items[i], items[j]]);
        }
    }
    
    // Randomise pairs
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    return pairs;
}

// Show next pair from the randomised list
function showNextPair() {
    if (currentIndex >= pairs.length) {
        displayResults();
        return;
    }

    const [item1, item2] = pairs[currentIndex];
    document.getElementById('item1-btn').textContent = item1;
    document.getElementById('item2-btn').textContent = item2;

    document.getElementById('item1-btn').onclick = () => handleChoice(item1, item2); 
    document.getElementById('item2-btn').onclick = () => handleChoice(item2, item1);
}

function handleChoice(chosenItem, otherItem) {
    scores[chosenItem] += 7 + Math.random(); 
    scores[otherItem] += 3 + Math.random(); 

    currentIndex++;
    showNextPair();
}

// Display ranked results
function displayResults() {
    const sortedItems = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    document.getElementById('ranking-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';

    const list = document.getElementById('rankings-list');
    sortedItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item}`;
        list.appendChild(listItem);
    });
}