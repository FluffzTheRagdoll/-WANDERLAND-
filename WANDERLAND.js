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
console.log("\nYou start with " + playerGold + " gold. Good luck with your journey!");

// Weapon info
let weaponDamage = 0;
console.log("Your weapon currently does: " + weaponDamage + " damage.");
console.log("Upon buying a sword, the damage caused by your weapon will increase to 10.");

// Monster stats
let monsterDefense = 5;
console.log("Monsters start with: " + monsterDefense + " health.");
console.log("Monsters can withstand more damage in combat. You'll need to be tactful when fighting them.");

//Healing potion restoration
let healingPotionValue = 30;
console.log("The healing potion restores: " + healingPotionValue + " health.");
