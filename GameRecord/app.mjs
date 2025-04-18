import Game from './models/game.js';

let games = []; 
let currentSort = 'default';

function saveGame(game) {
    const key = `game_${game.title}`;
    localStorage.setItem(key, JSON.stringify(game));
    games.push(game);
}

function loadAllGames() {
    const gamesFromStorage = []; 
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("game_")) {
            const data = JSON.parse(localStorage.getItem(key));
            gamesFromStorage.push(new Game(data));
        }
    }
    return gamesFromStorage;
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
        renderGameList();
    }   catch (err) {
        console.error("Invalid JSON input", err);
    }
}


function renderGameList() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = '';

    let sortedGames = [...games];
    switch (currentSort) {
        case 'players':
            sortedGames.sort((a, b) => a.players - b.players);
            break;
        case 'personalRating':
            sortedGames.sort((a, b) => b.personalRating - a.personalRating);
            break;
        case 'difficulty':
            sortedGames.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
            break;
        case 'playCount':
            sortedGames.sort((a, b) => b.playCount - a.playCount);
            break;
        default:
            break;
    }

    sortedGames.forEach(game => {
        const container = document.createElement('div');
        container.className = 'game-card';
       
        container.innerHTML = `
            <h3>${game.title}</h3>
            <p><strong>Designer:</strong> ${game.designer}</p>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Time:</strong> ${game.time}</p>
            <p><strong>Difficulty:</strong> ${game.difficulty}</p>
            <p><strong>Play Count:</strong> <span class="play-count">${game.playCount}</span></p>
            <p><a href ="${game.url}" target="_blank">BoardGameGeek Page </a></p>

            <button class="play-button">+1 Play</button>

            <label>
                Rating: <span class="rating-value">${game.personalRating}</span>
                <input type="range" min="0" max="10" value="${game.personalRating}" class="rating-slider"/>
            <label>

            <button class="delete-button">Delete</button>
        `;
        
        const playButton = container.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            game.playCount += 1;
            container.querySelector('.play-count').textContent = game.playCount;
            saveGame(game); 
        });

        const ratingSlider = container.querySelector('.rating-slider');
        ratingSlider.addEventListener('input', (e) => {
            game.personalRating = parseInt(e.target.value);
            container.querySelector('.rating-value').textContent = game.personalRating;
            saveGame(game);
        });

        const deleteButton = container.querySelector('.delete-button');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
             if (confirm(`Are you sure you want to delete "${game.title}"?`)) {
                deleteGame(game.title);
                renderGameList(); 
        }
    });
}
        
        gameList.appendChild(container);
    });
}

document.getElementById('add-game-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const designer = document.getElementById('designer').value;
    const players = parseInt(document.getElementById('players').value);
    const time = parseInt(document.getElementById('time').value);
    const difficulty = document.getElementById('difficulty').value;
    const url = document.getElementById('url').value;
    const personalRating = parseInt(document.getElementById('rating').value);
    const playCount = parseInt(document.getElementById('playCount').value);

    const newGame = new Game({
        title,
        designer,
        players,
        time,
        difficulty,
        url,
        personalRating,
        playCount
    });

    saveGame(newGame);
    renderGameList();
    
    document.getElementById('add-game-form').reset();
});

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

document.getElementById('sortSelect').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderGameList();
});

function deleteGame(title) {
    const key = `game_${title}`;
    localStorage.removeItem(key);
    games = games.filter(game => game.title !== title);
}