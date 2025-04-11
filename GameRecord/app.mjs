import Game from './models/game.js';

let games = []; 

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
        const container = document.createElement('div');
        container.className = 'game-card';
       
        container.innerHTML = `
            <>h3${game.title}</h3>
            <p><strong>Designer:</strong> ${game.designer}</p>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Time:</strong> ${game.time}</p>
            <p><strong>Difficulty:</strong> ${game.difficulty}</p>
            <p><strong>Play Count:</strong> ${game.playCount}</p>
            <p><a href ="${game.url}" target="_blank">BoardGameGeek Page </a></p>

            <label>
                Rating: <span>${game.personalRating}</span>
                <input type="range" min="0" max="10" value="${game.personalRating}" disabled />
            <label>

            <button disable>Edit</button>
        `;
        
        gameList.appendChild(container);
    });
}

document.getElementById('importSource').addEventListener('change', event => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const jsonData = e.target.result;
            importGamesFromJSON(jsonData);
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid JSON file.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    games = loadAllGames();
    renderGameList();
});