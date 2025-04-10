import Game from './models/game.js';

function saveGame(game) {
    const key = `game_${game.title}`;
    localStorage.setItem(key, JSON.stringify(game));
}

function loadAllGames() {
    const games = []; 
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("game_")) {
            const data = JSON.parse(localStorage.getItem(key));
            games.push(new Game(data));
        }
    }
    return games;
}

function exportGamesToJSON() {
    const allGames = loadAllGames();
    return JSON.stringify(allGames, null, 2);
}

function importGamesFromJSON(jsonString) {
    try {
        const gamesArray = JSON.parse(jsonString);
        gamesArray.forEach(gameData => {
            const game = new Game(gameData);
            saveGame(game);
        });
    }   catch (err) {
        console.error("Invalid JSON input", err);
    }
}


function renderGameList() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = '';
    games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = `${game.title} - Rating: ${game.personalRating}`;
        gameList.appendChild(listItem);
    });
}

document.getElementById('importSource').addEventListener('change', event => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const jsonData = e.target.results;
            importGamesFromJSON(jsonData);
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid JSON file.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    games = getAllGames();
    renderGameList();
});