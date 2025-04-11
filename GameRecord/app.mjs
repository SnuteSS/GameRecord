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

            <button disabled>Edit</button>
        `;
        
        console.log(container.innerHTML);

        const playButton = container.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                const playCountElement = container.querySelector('.play-count');
                if (playCountElement) {
                    game.playCount += 1;
                    playCountElement.textContent = game.playCount;
                    saveGame(game);
                } else {
                    console.error("Play count element not found!");
                }
            });
        } else {
            console.error("Play button not found!");
        }

        const ratingSlider = container.querySelector('.rating-slider');
        if (ratingSlider) {
            ratingSlider.addEventListener('input', (e) => {
                game.personalRating = parseInt(e.target.value);
                container.querySelector('.rating-value').textContent = game.personalRating; 
                saveGame(game);
            });
        } else {
            console.error("Rating slider not found!");
        }
        
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