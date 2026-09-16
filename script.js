// API Configuration
const APIs = {
    jokeapi: {
        name: 'JokeAPI',
        url: 'https://v2.jokeapi.dev/joke/',
        getSafeUrl: () => 'https://v2.jokeapi.dev/joke/Any?safe-mode'
    },
    official: {
        name: 'Official Joke API',
        url: 'https://official-joke-api.appspot.com/'
    },
    uselessfacts: {
        name: 'Useless Facts API',
        url: 'https://uselessfacts.jsoup.com/api/v5/facts'
    }
};

let currentJoke = null;
let favorites = [];
let history = [];
let isLoading = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFavoritesAndHistory();
    setupEventListeners();
    displayFavorites();
    displayHistory();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('generateBtn').addEventListener('click', generateJoke);
    document.getElementById('shareBtn').addEventListener('click', shareJoke);
    document.getElementById('copyBtn').addEventListener('click', copyJoke);
    document.getElementById('clearFavBtn').addEventListener('click', clearAllFavorites);
    document.getElementById('clearHistBtn').addEventListener('click', clearAllHistory);
}

// Generate joke based on selected API
async function generateJoke() {
    if (isLoading) return;
    isLoading = true;
    
    const apiSelect = document.getElementById('apiSelect').value;
    const categorySelect = document.getElementById('categorySelect').value;
    const safeMode = document.getElementById('safeMode').checked;
    
    showLoading(true);
    
    try {
        let joke;
        
        if (apiSelect === 'mixed') {
            joke = await getRandomJoke(safeMode, categorySelect);
        } else if (apiSelect === 'jokeapi') {
            joke = await getJokeAPIJoke(categorySelect, safeMode);
        } else if (apiSelect === 'official') {
            joke = await getOfficialJoke();
        } else if (apiSelect === 'uselessfacts') {
            joke = await getUselessFact();
        }
        
        if (joke) {
            currentJoke = joke;
            displayJoke(joke);
            addToHistory(joke);
        } else {
            showError('No joke found. Please try again!');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        showError('Failed to fetch joke. Please check your internet connection.');
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

// Get joke from JokeAPI
async function getJokeAPIJoke(category, safeMode) {
    try {
        let url = 'https://v2.jokeapi.dev/joke/';
        
        if (category === 'programming') {
            url += 'Programming';
        } else if (category === 'general') {
            url += 'General';
        } else {
            url += 'Any';
        }
        
        if (safeMode) {
            url += '?safe-mode';
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) return null;
        
        return {
            source: 'JokeAPI',
            category: data.category || 'Unknown',
            setup: data.setup || '',
            joke: data.joke || data.delivery || data.setup,
            punchline: data.delivery || '',
            type: data.type || 'general',
            id: data.ID || Math.random()
        };
    } catch (error) {
        console.error('JokeAPI Error:', error);
        return null;
    }
}

// Get joke from Official Joke API
async function getOfficialJoke() {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        
        return {
            source: 'Official Joke API',
            category: data.type || 'Unknown',
            setup: data.setup || '',
            joke: data.setup || '',
            punchline: data.punchline || '',
            type: data.type || 'general',
            id: data.id || Math.random()
        };
    } catch (error) {
        console.error('Official Joke API Error:', error);
        return null;
    }
}

// Get useless fact
async function getUselessFact() {
    try {
        const response = await fetch('https://uselessfacts.jsoup.com/api/v5/random');
        const data = await response.json();
        
        return {
            source: 'Useless Facts API',
            category: 'Fact',
            setup: '',
            joke: data.text || 'No fact available',
            punchline: '',
            type: 'fact',
            id: Math.random()
        };
    } catch (error) {
        console.error('Useless Facts Error:', error);
        return null;
    }
}

// Get random joke from available APIs
async function getRandomJoke(safeMode, category) {
    const apis = ['jokeapi', 'official', 'uselessfacts'];
    const randomApi = apis[Math.floor(Math.random() * apis.length)];
    
    if (randomApi === 'jokeapi') {
        return getJokeAPIJoke(category, safeMode);
    } else if (randomApi === 'official') {
        return getOfficialJoke();
    } else {
        return getUselessFact();
    }
}

// Display joke on screen
function displayJoke(joke) {
    const jokeCard = document.getElementById('jokeCard');
    const welcomeState = document.getElementById('welcomeState');
    
    // Hide welcome state
    welcomeState.style.display = 'none';
    jokeCard.classList.remove('hidden');
    
    // Update joke source
    document.getElementById('jokeSource').textContent = joke.source;
    
    // Update joke text
    if (joke.setup) {
        document.getElementById('jokeText').textContent = joke.setup;
        document.getElementById('jokePunchline').textContent = joke.punchline;
        document.getElementById('jokePunchline').classList.remove('hidden');
    } else {
        document.getElementById('jokeText').textContent = joke.joke;
        document.getElementById('jokePunchline').classList.add('hidden');
    }
    
    // Update meta info
    const metaInfo = [];
    if (joke.category) metaInfo.push(`Category: ${joke.category}`);
    if (joke.type) metaInfo.push(`Type: ${joke.type}`);
    document.getElementById('jokeMeta').textContent = metaInfo.join(' • ') || 'No meta info';
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) return;
    
    const jokeText = currentJoke.setup 
        ? `${currentJoke.setup}\n${currentJoke.punchline}`
        : currentJoke.joke;
    
    navigator.clipboard.writeText(jokeText).then(() => {
        showToast('Joke copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;
    
    const jokeText = currentJoke.setup 
        ? `${currentJoke.setup}\n${currentJoke.punchline}`
        : currentJoke.joke;
    
    const shareText = `Check out this joke: ${jokeText} - Generated by Random Joke Generator 😂`;
    
    if (navigator.share) {
        navigator.share({
            title: '😂 Random Joke',
            text: shareText
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyJoke();
        showToast('Copied to clipboard! Ready to share.');
    }
}

// Add joke to favorites
function addToFavorites(joke) {
    if (!favorites.find(fav => fav.id === joke.id)) {
        favorites.push(joke);
        saveFavoritesAndHistory();
        displayFavorites();
        showToast('Added to favorites!');
    } else {
        showToast('Already in favorites');
    }
}

// Remove from favorites
function removeFromFavorites(jokeId) {
    favorites = favorites.filter(fav => fav.id !== jokeId);
    saveFavoritesAndHistory();
    displayFavorites();
    showToast('Removed from favorites');
}

// Add to history
function addToHistory(joke) {
    // Remove if already exists
    history = history.filter(h => h.id !== joke.id);
    // Add to beginning
    history.unshift(joke);
    // Keep only last 10
    if (history.length > 10) {
        history.pop();
    }
    saveFavoritesAndHistory();
    displayHistory();
}

// Display favorites
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="no-favorites">No favorite jokes yet. Click the heart icon to add one!</p>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map(joke => `
        <div class="favorite-item ${joke.type || 'general'}">
            <div class="favorite-text">
                ${joke.setup ? joke.setup + ' ' + joke.punchline : joke.joke}
            </div>
            <div class="favorite-actions">
                <button class="action-btn delete" onclick="removeFromFavorites(${joke.id})" title="Delete">🗑️</button>
                <button class="action-btn" onclick="copyFavoriteJoke('${escapeQuotes(joke.setup ? joke.setup + ' ' + joke.punchline : joke.joke)}')" title="Copy">📋</button>
            </div>
        </div>
    `).join('');
}

// Display history
function displayHistory() {
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">No jokes viewed yet</p>';
        return;
    }
    
    historyList.innerHTML = history.map(joke => `
        <div class="history-item ${joke.type || 'general'}">
            <div class="history-text">
                ${joke.setup ? joke.setup + ' ' + joke.punchline : joke.joke}
            </div>
            <div class="history-actions">
                <button class="action-btn" onclick="addToFavorites({id: ${joke.id}, setup: '${escapeQuotes(joke.setup)}', punchline: '${escapeQuotes(joke.punchline)}', joke: '${escapeQuotes(joke.joke)}', type: '${joke.type}', source: '${joke.source}'})" title="Add to favorites">❤️</button>
                <button class="action-btn" onclick="copyFavoriteJoke('${escapeQuotes(joke.setup ? joke.setup + ' ' + joke.punchline : joke.joke)}')" title="Copy">📋</button>
            </div>
        </div>
    `).join('');
}

// Copy favorite joke
function copyFavoriteJoke(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Joke copied!');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

// Clear all favorites
function clearAllFavorites() {
    if (confirm('Clear all favorite jokes?')) {
        favorites = [];
        saveFavoritesAndHistory();
        displayFavorites();
        showToast('Favorites cleared');
    }
}

// Clear all history
function clearAllHistory() {
    if (confirm('Clear all history?')) {
        history = [];
        saveFavoritesAndHistory();
        displayHistory();
        showToast('History cleared');
    }
}

// Save to localStorage
function saveFavoritesAndHistory() {
    localStorage.setItem('jokesFavorites', JSON.stringify(favorites));
    localStorage.setItem('jokesHistory', JSON.stringify(history));
}

// Load from localStorage
function loadFavoritesAndHistory() {
    const savedFavorites = localStorage.getItem('jokesFavorites');
    const savedHistory = localStorage.getItem('jokesHistory');
    
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
    
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
}

// Utility functions
function showLoading(show) {
    const loading = document.getElementById('loadingState');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function showError(message) {
    showToast(message);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function escapeQuotes(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'")
              .replace(/"/g, '\\"')
              .replace(/\n/g, ' ');
}