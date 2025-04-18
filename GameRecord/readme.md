README

(I forgot to explain on the readme what i've done so far, so from this point i will update it for each commit onwards)

Step 1:
I started by making the folder as the task said, and created app.mjs, index.html, style.css and readme.md. I struggled with setting up the git repo with VS, as there was an issue with my path. in the index file i added the basic scaffold, where i referenced app.mjs and style.css

Step 2:
Made the models folder within gameRecord, and added game.js within the models folder. I then looked at the example.json file, and added a game class to match that structure, where it included title, artist, designer, year, publisher etc. I saved the file, and imported the class into app.mjs

Step 3:
I started by making a function fo saveGame, where it takes an object from Game and saves it into the browsers storage. I uses the games title as the key, and stores all the games' info as text, through a JSON command. Then, through the getAllGames function, i loop through each key in the localstorage, turn it into an object through JSON.parse, and then push the object into an array. Through the export function , i turned the array of objects into a json string. Afterwards, i looped through the arrays, created new Game objects, and then saved them through saveGame.

Step 4:
In step 4, i had to add a file reader to my browser. To do this, i first added a file input in the html file, named importSource. In app.mjs, i created a const that adds a reader that reads files as string. reader.onload waits for the file to finish loading, and the json const ensures that it is passed onwards to the import function. If the user puts in anything else, it should give an alert that its the wrong filetype. The last command then keeps the in memory record of the games added.

Step 5:
In this step, I made a function called renderGameList() to show all the saved games on the page. It grabs the game-list element, clears it, and then loops through the games array. For each game, it creates a card with the title, designer, player count, difficulty, and a link to the game's page. It also includes a disabled rating slider and a button (not working yet). I had an issue with the html, as it only showed one board game from the example json file. I realized that the issue was with line one of the pieces of code, where i had written results instead of result, which resulted in an undefined error. After i changed it, the list works as intended.
At the end, I made sure this function runs when the page loads, by using DOMContentLoaded. That way, the games show up as soon as the app starts.

Step 6:
For the next step i want to integrate a interactive slider, as well as a play count. To do this, i made some changes to the renderGameList function, and added a button class in my innerHTML container. I then made an event listener to the play button. When clicked, it increments the playCount property of  the game object and updates the displayed play count in the html, i then saveGame in order to store the updated values. For the rating slider, i added another event listener to update the personalRating of the game object. I used the current value of the slider, and convert it to an integer with parseInt. After saving, i added an error message, which helped me with error solving.

Step 7 and 8:
Realized that i had to revert some of the code i wrote in step 5, as the game array was populated globally, but it wasn't updated dynamically in some parts. Therefore i had to go back, and change a lot of the code. I started by creating a new <form> element in index.html, including input fields for all the properties needed to create a game object: title, designer, players, time, difficulty, URL, personal rating, and play count. In app.mjs, I added an event listener to handle the form submission. When the user submits the form, it collects all input values using querySelector, and creates a new Game object using the constructor. This object is then pushed to the global games array, saved to localStorage using saveGame(), and displayed using renderGameList(). Finally, I used form.reset() to clear the inputs after each submission. This makes sure the form is ready for the next game input without reloading the page. 

Step 9:
Adding a delete button to the list should be simple enough. First, I updated the HTML layout by including a "Delete" button inside each game card in renderGameList(). Then in app.mjs, I created a new deleteGame() function that uses localStorage.removeItem() to remove the game based on its title key. Afterwards, I used querySelector to find the delete button for each game, and added an addEventListener that triggers deleteGame() when clicked. After deleting the game, I called loadAllGames() again to refresh the global games array, and ran renderGameList() to update the interface.

Step 10:
In this step, I added sorting functionality to the game list. I started by creating a <select> dropdown in index.html below the game list title, as i thought it made most sense to put it there, with all the required sort options like player count, personal rating, difficulty, and play count. In app.mjs, i added a line of code beneath let games = []; to keep track of the current sorting option selected by the user. It's set to default, which means that no sorting is applied when the page loads initially. Inside the renderGameList function, i used a switch statement to copy the games array based on the selected value. Meaning, if the user picks players, it should sort the number of players in ascending order. Difficulty is sorted alphabetically, and ratings and play counts are put as descending order.
I also added an event listener to the dropdown so that when the user changes the sort option, currentSort is updated and renderGameList() is re-run to display the newly sorted list.

At the end, i wanted to make it look more stylish, but im still not that good at css, so i looked up on google to get tips and inspiration. I added some colors that i thought could look nice, made the text boxes rounded and make the webpage easier to read. In the corner of the webpage i added a cool picture with one of the greatest boardgames of all time :)