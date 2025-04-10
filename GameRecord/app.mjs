import Game from ".game.js";

const sampleGame = new Game ({
    title: "Test Game",
    designer: "Designer Name",
    artist: "Artist Name",
    publisher: "Publisher",
    year: 2025,
    players: "2-4",
    time: "60 mins",
    difficulty: "Medium",
    url: "https://example.com",
    playCount: 0,
    personalRating: 5
});

console.log("Sample Game Loaded:", sampleGame);