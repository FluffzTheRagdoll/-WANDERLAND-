const readline = require("readline-sync");

/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("~ Welcome to WANDERLAND ~");

// Add a welcome message
console.log("Step into a world where you are tasked with deciding what happens next, as well as navigating your way through different trails and doing whatever you must until you reach your one and only goal.. Ready to get started?"); //Insert emoji: scroll


// Starting stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let currentLocation = "Cherry Blossom Gardens";
let gameRunning = true;
let inventory = [];

//Player info
playerName = readline.question("\nWhat's your name? Every trekker needs something to be known by...");
console.log("\nWelcome, " + playerName + "!");
console.log("\nYou start with " + playerGold + " gold. Good luck with your journey!")
