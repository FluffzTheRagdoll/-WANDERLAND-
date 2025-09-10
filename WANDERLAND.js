const readline = require('readline-sync');

/*
-~ WANDERLAND ~-
A text-based choose-your-own path game
With a touch of whimsy
*/

// Player stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;

// Display the game title
console.log("~ Welcome to WANDERLAND ~");

// Add a welcome message
console.log("Step into a world where you are tasked with deciding what happens next, as well as navigating your way through different trails and doing whatever you must until you reach your one and only goal.. Ready to get started?"); //Insert emoji: scroll

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

//Game state variables
let gameRunning = true;
let currentLocation = "Cherry Blossom Gardens";
let firstVisit = true;

//Using an array as an inventory
let inventory = [];

/*-----DISPLAYING INFORMATION TO THE PLAYER-----
*/

//Function for showing player stats
function showStatus() {
    //Show status
    console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
    console.log("Health: " + playerHealth); //insert emoji (start): pink heart
    console.log("Gold: " + playerGold); //insert emoji (start): coin
    console.log("Location: " + currentLocation); //insert emoji (start): round pushpin
}

//Function for displaying location description and available choices
function showLocation() {
    if(currentLocation === "Cherry Blossom Gardens") {
        console.log("\n:..✿ ∞CHERRY BLOSSOM GARDENS∞ ✿..:");
        console.log("You're in a quiet, serene garden with cherry blossom trees on either side of the sandy gravel path you're standing on. The path forks ahead into two.");

        console.log("\nWhere will you start your journey?");
        console.log("1: Follow the first path to the blacksmith");
        console.log("2: Follow the second path to the village centre");
        console.log("3: Turn back and head to your house behind you");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Use item");
        console.log("7: Get help")
        console.log("8: Quit game");
    
        if(firstVisit) {
            console.log("\nAn owl swoops down and lands on one of the branches of a cherry blossom tree. It stares at you with deep black eyes. 'Welcome, traveller.' It hoots in a deep, low voice. 'Legend has it that monsters, dangerous beings that threaten our livelihood, roam the territory outside these boundaries...' The owl then tilts its head, and flies away.");
            firstVisit = false;
        }
    } else if(currentLocation === "Blacksmith") {
        console.log("\n»»——⍟BLACKSMITH⍟——««");
        console.log("The smell of hot metal fills the air. Clanking sounds rise from somewhere within the small building. Weapons and armour line the walls.");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Buy sword (costs 10 gold)");
        console.log("3: Check status");
        console.log("4: Check inventory");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
    } else if(currentLocation === "Village Centre") {
        console.log("_-+°ₒ❀VILLAGE❀ₒ°+-_");
        console.log("You follow the second path to the village centre. There are small houses spread out onto a patch of sandy gravel. Grass surrounds the area, and all is quiet. There are wooden stalls set up in the corners, but one in particular catches your eye.");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Go over to a stall and buy a healing potion (costs 8 gold)");
        console.log("3: Check status");
        console.log("4: Check inventory");
        console.log("5: Use item");
        console.log("6: Get help")
        console.log("7: Quit game");
    } else if(currentLocation === "Your house") {
        console.log("・‥…━━━YOUR HOUSE━━━…‥・");
        console.log("You turn around and enter your house. It's rather small inside, and wooden windows let in sunlight from outside. There is a table and a chair in the centre of the room. Being in here brings back a lot of memories for you...");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Use item");
        console.log("5: Get help");
        console.log("6: Quit game");
    }
}

// Function to help users understand what's going on
function showHelp() {
    console.log("\n┈┈┈┈﹤｡ AVAILABLE COMMANDS ｡﹥┈┈┈┈");

    console.log("\nMovement Commands:");
    console.log("When in the cherry blossom gardens, choose 1-3 to move between locations.");
    console.log("In any other location, choose 1 to return to the cherry blossom gardens.");

    console.log("\nBattle Commands:");
    console.log("In order to win a battle, you need a sword.");
    console.log("You must fight monsters tactfully, as every choice impacts the fate of the battle.");
    console.log("You will lose the battle if you have no weapon.");

    console.log("\nItem Usage:");
    console.log("You can buy a sword at the blacksmith.");
    console.log("You can buy a healing potion at one of the stalls in the the village centre.");
    console.log("Other items can be collected in various locations across the map.");
    console.log("The healing potion can be used to restore 30 health if you suffer damage.");

    console.log("\nOther Commands:");
    console.log("Choose the status option to view your health, location and gold.");
    console.log("Choose the inventory option to view items you have collected.");
    console.log("Choose the help option to see these messages again.");
    console.log("Choose the quit option to end the game.");

    console.log("\nTips");
    console.log("Save healing potions for dangerous situations.");
    console.log("Defeating monsters earns you [insert]");
    console.log("Each monster has specific weaknesses, which affects the outcome of battles. Find scrolls to learn more about various monsters.");
}

/*-----MOVING AROUND THE MAP-----
*/

//Function for movement between locations
function move(choiceNum) {
    let validMove = false;
    if(currentLocation === "Cherry Blossom Gardens") {
        if(choiceNum === 1) {
            currentLocation = "Blacksmith";
            console.log("\nYou follow the first path and enter the blacksmith's shop.");
            validMove = true;
        } else if(choiceNum === 2) {
            currentLocation = "Village Centre";
            console.log("\nYou follow the second path and enter the village centre.");
            validMove = true;
        } else if(choiceNum === 3) {
            currentLocation = "Your house";
            console.log("\nYou turn around and enter your house.");
            validMove = true;
        }
    } else if(currentLocation === "Blacksmith" || currentLocation === "Village Centre" || currentLocation === "Your house") {
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            validMove = true;
        }
    }

return validMove;    
}

/*-----ITEM HANDLING-----
*/

// Function for using items
function useItem() {
    if(inventory.includes("Healing potion")) {
        console.log("You inspect the healing potion for a second before drinking it. Suddenly, you feel better.");
        updateHealth(30);
        
        //Removing healing potion from inventory after use with splice instead of setting hasHealingPotion to false
        let potionIndex = inventory.indexOf("Healing potion");
        inventory.splice(potionIndex, 1);

        return true;
    }
    console.log("You don't have any usable items. It would be a good idea to try and find something...");
    return false;
}


/*-----HANDLING CORE GAMEPLAY FUNCTIONS-----
*/

//Displaying inventory
function showInventory() {
    console.log("·•– ٠⚘ INVENTORY  ⚘٠ —•·");
    if(inventory.length === 0) {
        console.log("Your inventory is empty. It seems as if you're rather unprepared for this journey...");
    } else {
        inventory.forEach((item, index) => {
            console.log("   " + (index + 1) + ". " + item);
        });
    }
}

//Function for updating player health
function updateHealth(amount) {
    playerHealth += amount;

    if(amount <= 100) {
        playerHealth = 100;
        console.log("You're at full health again.");
    }

    if(amount <= 0) {
        playerHealth = 0;
        console.log("Your health reached zero...")
        console.log("\nLooks like that's the end of things.")
    }

    console.log("Your health is now: " + playerHealth);
    return playerHealth;
}

/*-----BUYING ITEMS-----
*/

//Function for buying items at the blacksmith
function buyFromBlacksmith() {
    if(inventory.includes("Sword")) {
        console.log("You already have a sword.");
    }

    if(playerGold >= 10 && !inventory.includes("Sword")) {
        console.log("A faint whispering floats around in the air, grabbing your attention. 'This way.' It tells you. You turn around to see a long sword with a decorated grip. A strange glow surrounds the sword. 'Take it. You'll need it...' The voice says. Then, out of the darkness, a rather frail man, around forty in age, walks over to you. 'Want the sword?' He asks, then notices your rather shocked expression. 'Oh. Don't mind the spirits. They like to hang around here.' the man hands you the sword.");
        playerGold -= 10;
        
        //Add weapon to inventory using push instead of setting hasWeapon to true
        inventory.push("Sword")

        console.log("\nYou buy the sword for 10 gold.");
        console.log("Gold remaining: " + playerGold);
    } else if(playerGold <= 10 && !inventory.includes("Sword")) {
        console.log("The blacksmith walks out of the darkness and over to you. 'You don't have enough gold, it seems.' He says. 'Come back when you have enough. Can't throw this beauty away for nothing, you know.'");
    }
}

//Function for buying items at the stalls in the village centre
function buyFromVillageStalls() {
    if(playerGold >= 8) {
        console.log("You wait, but no one seems to be there at the stall. Finally, you decide to buy the potion anyway. You leave the gold at the stall, and take the healing potion.");
        playerGold -= 8;
        
        //Add healing potion to inventory using push instead of setting hasHealingPotion to true
        inventory.push("Healing potion");

        console.log("\nYou buy the healing potion for 8 gold.");
        console.log("Gold remaining: " + playerGold);
    } else {
        console.log("You don't have enough gold to buy the potion. You feel it would be wrong to take it without paying, so you leave the magic mixture alone. You think, 'Perhaps I can come back later when the seller is here. Then I could haggle a bit...'");
    }
}

// ---------------------------


//Main game loop
while(gameRunning) {
    // Location checking and displaying the relevant information
    showLocation();
    
    //Get and validate the player's choice
    let validChoice = false;
    while(!validChoice) {
        try {
            let choice = readline.question("\nWhat will you choose to do? ");

            //Check if input is empty
            if(choice.trim() === "") {
                throw "Please enter a number.";
            }

            //Convert the input to a number
            let choiceNum = parseInt(choice);
            if(isNaN(choiceNum)) {
                throw "The input you entered is not a number, it seems! Please enter a number instead.";
            }

            //Handling choices based on location
            if(currentLocation === "Cherry Blossom Gardens") {
                if(choiceNum < 1 || choiceNum > 8) {
                    throw "Please enter a number between 1 and 8.";
                }

                validChoice = true; //Valid choice made

                if(choiceNum <= 3) {
                    move(choiceNum);
                } else if(choiceNum === 4) {
                    showStatus();
                } else if(choiceNum === 5) {
                    // Inventory check
                    showInventory();
                } else if(choiceNum === 6) {
                    useItem();
                } else if(choiceNum === 7) {
                    showHelp();
                } else if(choiceNum === 8) {
                    gameRunning = false;
                    console.log("Farewell, traveller.")
                } else {
                    console.log("\nInvalid choice. Please select a number between 1 - 8.");
                }
            } else if(currentLocation === "Blacksmith") {
                if(choiceNum < 1 || choiceNum > 7) {
                    throw "Please enter a number between 1 and 7.";
                }

                validChoice = true; //Valid choice made

                if (choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    buyFromBlacksmith();
                } else if(choiceNum === 3) {
                    showStatus();
                } else if(choiceNum === 4) {
                    showInventory();
                } else if(choiceNum === 5) {
                    useItem();
                } else if(choiceNum === 6) {
                    showHelp();
                } else if(choiceNum === 7) {
                    gameRunning = false;
                    console.log("Farewell, traveller.")
                } else {
                    console.log("\nInvalid choice. Please select a number between 1 - 7.");
                }
            } else if(currentLocation === "Village Centre") {
                if(choiceNum < 1 || choiceNum > 7){
                    throw "Please enter a number between 1 and 7.";
                }

                validChoice = true; //Valid choice made
                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    buyFromVillageStalls();
                } else if(choiceNum === 3) {
                    showStatus();
                } else if(choiceNum === 4) {
                    showInventory();
                } else if(choiceNum === 5) {
                    useItem();
                } else if(choiceNum === 6) {
                    showHelp();
                } else if(choiceNum === 7) {
                    gameRunning = false;
                    console.log("Farewell, traveller.");
                } else {
                    console.log("\nInvalid choice. Please select a number between 1 - 4.");
                }
            } else if(currentLocation === "Your house") {
                if(choiceNum < 1 || choiceNum > 6) {
                    throw "Please enter a number between 1 and 6";
                }

                validChoice = true; //Valid choice made

                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    showStatus();
                } else if(choiceNum === 3) {
                    // Inventory check
                    showInventory();
                } else if(choiceNum === 4) {
                    useItem();
                } else if(choiceNum === 5) {
                    showHelp();
                } else if(choiceNum === 6) {
                    gameRunning = false;
                    console.log("Farewell, traveller.");
                } else {
                    console.log("\nInvalid choice. Please select a number between 1 - 6.");
                }
            }

        }  catch(error) {
            console.log("\nError: " + error);
            console.log("\nPlease try that again!");
        }

        //Check if the player died
        if(playerHealth <= 0) {
            console.log("\nYou... died. Farewell traveller, until another time.") //Insert emoji: wings
        }
    }
}
