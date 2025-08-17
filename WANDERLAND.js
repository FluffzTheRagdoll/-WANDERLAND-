const readline = require('readline-sync');

/*
~ WANDERLAND ~
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story and ending will change
based on their decisions.
*/

// Display the game title
console.log("~ Welcome to WANDERLAND ~");

// Add a welcome message
console.log("Step into a world where you are tasked with deciding what happens next, as well as navigating your way through different trails and doing whatever you must until you reach your one and only goal.. Ready to get started?"); //Insert emoji: scroll


// Player stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let inventory = [];

//Player info
playerName = readline.question("\nWhat's your name? Every trekker needs something to be known by...");
console.log("\nWelcome, " + playerName + "!");
console.log("\nYou start with " + playerGold + " gold. Good luck with your journey!");
console.log("");

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

//Game state variables
let gameRunning = true;
let currentLocation = true;
let firstVisit = true;
let hasWeapon = false;
let hasArmor = false;
let hasHealingPotion = false;

// ---------------------------


//Main game loop
while(gameRunning) {
    // Location checking and displaying the relevant information
    if(currentLocation = "Cherry Blossom Gardens") {
        console.log("\n:..✿ ∞CHERRY BLOSSOM GARDENS∞ ✿..:");
        console.log("You're in a quiet, serene garden with cherry blossom trees on either side of the sandy gravel path you're standing on. The path forks ahead into two.");

        console.log("\nWhere will you start your journey?");
        console.log("1: Follow the first path to the blacksmith");
        console.log("2: Follow the second path to the village centre");
        console.log("3: Turn back and head to your house behind you");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Quit game");
    
        if(firstVisit) {
            console.log("\nAn owl swoops down and lands on one of the branches of a cherry blossom tree. It stares at you with deep black eyes. 'Welcome, traveller.' It hoots in a deep, low voice. 'Legend has it that monsters, dangerous beings that threaten our livelihood, roam the territory outside these boundaries...' The owl then tilts its head, and flies away.");
            firstVisit = false;
        }
    } else if(currentLocation === "Blacksmith") {
        console.log("\n»»——⍟BLACKSMITH⍟——««");
        console.log("The smell of hot metal fills the air. Clanking sounds rise from somewhere within the small building. Weapons and armour line the walls.");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    } else if(currentLocation === "Village Centre") {
        console.log("_-+°ₒ❀VILLAGE❀ₒ°+-_");
        console.log("You follow the second path to the village centre. There are small houses spread out onto a patch of sandy gravel. Grass surrounds the area, and all is quiet. There are wooden stalls set up in the corners, but one in particular catches your eye.");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    } else if(currentLocation === "Your house") {
        console.log("・‥…━━━YOUR HOUSE━━━…‥・");
        console.log("You turn around and enter your house. It's rather small inside, and wooden windows let in sunlight from outside. There is a table and a chair in the centre of the room. Being in here brings back a lot of memories for you...");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    //Get the player's input
    choice = readline.question("\nEnter choice (number): ");
    let choiceNum = parseInt(choice);
    
    //Handling choices
    if(currentLocation === "Cherry Blossom Gardens") {
        if(choiceNum === 1) {
            currentLocation = "Blacksmith";
            console.log("\nYou follow the first path and enter the blacksmith's shop.");
        } else if(choiceNum === 2) {
            currentLocation = "Village Centre";
            console.log("\nYou follow the second path and enter the village centre.");
        } else if(choiceNum === 3) {
            currentLocation = "Your house";
            console.log("\nYou turn around and enter your house.");
        } else if(choiceNum === 4) {
            //Show status
            console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
            console.log("Health: " + playerHealth); //insert emoji (start): pink heart
            console.log("Gold: " + playerGold); //insert emoji (start): coin
            console.log("Location: " + currentLocation); //insert emoji (start): round pushpin
        } else if(choiceNum === 5) {
            // Inventory check
            for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if(slot === 1 && hasWeapon) {
                    console.log("Item found: Sword");
                } else if(slot === 2 && hasArmor) {
                    console.log("Item found: Shield");
                } else if(slot === 3 && hasHealingPotion) {
                    console.log("Item found: Healing potion");
                } else {
                    console.log("Empty slot");
                }
            }
        } else if(choiceNum === 6) {
            gameRunning = false;
            console.log("Farewell, traveller.")
        } else {
            console.log("\nInvalid choice. Please select a number between 1 - 5.");
        }
    } else if(currentLocation === "Blacksmith") {
        if (choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
        } else if(choiceNum === 2) {
            //Show status
            console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
            console.log("Health: " + playerHealth); //insert emoji (start): pink heart
            console.log("Gold: " + playerGold); //insert emoji (start): coin
            console.log("Location: " + currentLocation); //insert emoji (start): round pushpin
        } else if(choiceNum === 3) {
            // Inventory check
            for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if(slot === 1 && hasWeapon) {
                    console.log("Item found: Sword");
                } else if(slot === 2 && hasArmor) {
                    console.log("Item found: Shield");
                } else if(slot === 3 && hasHealingPotion) {
                    console.log("Item found: Healing potion");
                } else {
                    console.log("Empty slot");
                }
            } 
        } else if(choiceNum === 4) {
            gameRunning = false;
            console.log("Farewell, traveller.");
        } else {
            console.log("\nInvalid choice. Please select a number between 1 - 5.");
        }
    } else if(currentLocation === "Village Centre") {
        if (choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
        } else if(choiceNum === 2) {
            //Show status
            console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
            console.log("Health: " + playerHealth); //insert emoji (start): pink heart
            console.log("Gold: " + playerGold); //insert emoji (start): coin
            console.log("Location: " + currentLocation); //insert emoji (start): round pushpin
        } else if(choiceNum === 3) {
            // Inventory check
            for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if(slot === 1 && hasWeapon) {
                    console.log("Item found: Sword");
                } else if(slot === 2 && hasArmor) {
                    console.log("Item found: Shield");
                } else if(slot === 3 && hasHealingPotion) {
                    console.log("Item found: Healing potion");
                } else {
                    console.log("Empty slot");
                }
            } 
        } else if(choiceNum === 4) {
            gameRunning = false;
            console.log("Farewell, traveller.");
        } else {
            console.log("\nInvalid choice. Please select a number between 1 - 5.");
        }
    }
}
