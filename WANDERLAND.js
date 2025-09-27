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

// Player info
playerName = readline.question("\nWhat's your name? Every trekker needs something to be known by...");
console.log("\nWelcome, " + playerName + "!");
console.log("\nYou start with " + playerGold + " gold. Good luck with your journey!");

// Game state variables
let gameRunning = true;
let currentLocation = "Cherry Blossom Gardens";
let firstVisit = true;

// Extra game state variables
let canExitVillageCentre = false;
let firstHouseVisit = true;

// Using an array as an inventory
let inventory = [];

// Defining items as objects

const healingPotion = {
    name: "Healing potion",
    type: "potion",
    cost: 8,
    effect: 30,    // Healing amount
    description: "Restores 30 health"
};

let healingPotionString = "Healing potion"; // For checking if the item is present in inventory

const sword = {
    name: "Sword",
    type: "weapon",
    cost: 10,
    effect: 10,    // Damage amount
    description: "Needed for battles, but not necessary..."
};

let swordString = "Sword"; // For checking if the item is present in inventory

const dagger = {
    name: "Dagger",
    type: "weapon",
    cost: 5,
    effect: 7,    // Damage amount
    description: "An alternative weapon when your sword isn't necessary"
};

let daggerString = "Dagger"; // For checking if the item is present in inventory

const blade = {
    name: "Rounded Blades",
    type: "weapon",
    cost: 3,
    effect: 5,    // Damage amount
    description: "A smaller, more precise weapon"
};

let bladeString = "Rounded Blades"; // For checking if the item is present in inventory

const shield = {
    name: "Shield",
    type: "armour",
    cost: 6,
    effect: 5,    // Protection amount
    description: "Provides protection in battles, and a better chance of survival"
};

let shieldString = "Shield"; // For checking if item is present in inventory

const silverShield = {
    name: "Silver Shield",
    type: "armour",
    cost: 8,
    effect: 7,    // Protection amount
    description: "A stronger shield; Helpful in more difficult battles"
};

let silverShieldString = "Silver Shield"; // For checking if item is present in inventory

const note = {
    name: "Note",
    type: "collectable",
    description: "Found inside your house"
};

let noteString = "Note"; // For checking if item is present in inventory

/*-----DISPLAYING INFORMATION TO THE PLAYER-----
*/

// Function for showing player stats
function showStatus() {
    //Show status
    console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
    console.log("Health: " + playerHealth); //insert emoji (start): pink heart
    console.log("Gold: " + playerGold); //insert emoji (start): coin
    console.log("Location: " + currentLocation); //insert emoji (start): round pushpin
}

// Function for displaying location description and available choices
function showLocation(location) {
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
        console.log("2: Buy weapons and armour");
        console.log("3: Check status");
        console.log("4: Check inventory");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
    } else if(currentLocation === "Village Centre") {
        console.log("_-+°ₒ❀VILLAGE❀ₒ°+-_");
        console.log("You follow the second path to the village centre. There are small houses spread out onto a patch of sandy gravel. Grass surrounds the area, and all is quiet. There are wooden stalls set up in the corners, but one in particular catches your eye.");
        
        if(canExitVillageCentre === true) {
            console.log("1: Return to the cherry blossom gardens");
            console.log("2: Go over to a stall and buy a healing potion (costs 8 gold)");
            console.log("3: Check status");
            console.log("4: Check inventory");
            console.log("5: Walk out of the village centre and into the grass surrounding the area.");
            console.log("6: Use item");
            console.log("7: Get help")
            console.log("8: Quit game");
        } else {
            console.log("1: Return to the cherry blossom gardens");
            console.log("2: Go over to a stall and buy a healing potion (costs 8 gold)");
            console.log("3: Check status");
            console.log("4: Check inventory");
            console.log("5: Use item");
            console.log("6: Get help")
            console.log("7: Quit game");
        }
    } else if(currentLocation === "Your house") {
        console.log("・‥…━━━YOUR HOUSE━━━…‥・");
        console.log("You turn around and enter your house. It's rather small inside, and wooden windows let in sunlight from outside. There is a table and a chair in the centre of the room. Being in here brings back a lot of memories for you...");
        
        console.log("1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Look around");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
    }
} else if(currentLocation === "Woodlands") {
    
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
    console.log("You can buy weapons and armour at the blacksmith.");
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

// Function for movement between locations
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
    } else if(currentLocation === "Blacksmith"){
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            validMove = true;
        }
    } else if(currenLocation === "Village Centre") {
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
        }
    } else if(currentLocation === "Your house") {
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            if(firstHouseVisit === true) {
                console.log("Outside your house, you spot a strange glow from somewhere in the grass. Upon walking over, you see a familiar sign indented in the soil. Wings, with rings and the outline of a glow around them. Strange...");
                firstHouseVisit = false;
                canExitVillageCentre = true;
            }
        }
    }

return validMove;    
}

/*-----ITEM HANDLING-----
*/

function getItemsByType(type) {
    return inventory.filter(item => item.type === type);
}

// Function for using items
function useItem() {
    if(inventory.length === 0) {
        console.log("You don't have any usable items. It would be a good idea to try and find something...");
        return true;
    }

    console.log("\n·•– ٠⚘ INVENTORY  ⚘٠ —•·");
    inventory.forEach((item, index) => {
        console.log("   " + (index + 1) + ". " + item.name);
    });

    let choice = readline.question("Which item do you wish to use? (Enter a number or 'cancel' if you change your mind.): ");
    if(choice === 'cancel') return false;

    let index = parseInt(choice) - 1;
    if(index >= 0 && index < inventory.length) {
        let item = inventory[index];

        if(item.type === "potion") {
            console.log("\nYou inspect the " + item.name + " for a second before drinking it. Suddenly, you feel better.");
            updateHealth(item.effect);
            inventory.splice(index, 1);
            return true;
        }

        if(item.type === "weapon") {
            console.log("\nYou can use your " + item.name + " in battle.");
            return true;
        }

        if(item.type === "armour") {
            console.log("\nYour " + item.name + " will help you in battle.");
            return true;
        }

        if(item.name === "Note") {
            console.log("\n'The monsters you will battle are not as simple as they seem.");
            console.log("Don't be fooled by any tricks they may play.");
            console.log("Don't tear them to pieces just because of your pains.");
            console.log("The world isn't as black and white as you want it to be.'");
            return true;
        }
        
    } else {
        console.log("Invalid item number.");
    }

    return false;
}

function hasItemType(type) {
    return inventory.some(item => item.type === type);
}


/*-----HANDLING CORE GAMEPLAY FUNCTIONS-----
*/

// Displaying inventory
function showInventory() {
    console.log("·•– ٠⚘ INVENTORY  ⚘٠ —•·");
    if(inventory.length === 0) {
        console.log("Your inventory is empty. It seems as if you're rather unprepared for this journey...");
    } else {
        inventory.forEach((item, index) => {
            console.log("   " + (index + 1) + ". " + item.name + " - " + item.description);
        });
    }
}

// Function for updating player health
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

// Function for buying items at the blacksmith
function buyFromBlacksmith() {
    console.log("A faint whispering floats around in the air, grabbing your attention. 'This way.' It says. You turn around to see a collection of weapons and armour, some in glass cases and the rest hung on the walls. 'Take something. You'll need to be prepared...' The voice tells you. Then, out of the darkness, a rather frail man, around forty in age, walks over to you. 'Here to buy something?' He asks, then notices your rather shocked expression. 'Oh. Don't mind the spirits. They like to hang around here.'");
    
    // Ask the player what they want to purchase
    console.log("\n1. Sword - 10 gold");
    console.log("2. Dagger - 5 gold");
    console.log("3. Rounded Blades - 3 gold");
    console.log("4. Shield - 6 gold");
    console.log("5. Silver Shield - 8 gold");
    let choice = readline.question("\nWhat do you want to buy? (Enter a number or 'cancel'): ");
    
    if(choice === 'cancel') return false;

    // Displaying the correct information depending on what the player wants to buy

    let choiceNumber = parseInt(choice);
    if(choiceNumber === 1) {
        if(inventory.some(item => item.name === swordString)) {
            console.log("You already have a sword.");
        }
        else if(!inventory.some(item => item.name === swordString) && playerGold >= 10) {
            playerGold -= sword.cost;
            console.log("\nYou buy the " + sword.name + " for " + sword.cost + " gold.");
            console.log("Gold remaining: " + playerGold);
            inventory.push({...sword});
        } else if(!inventory.some(item => item.name === swordString) && playerGold <= 10) {
            console.log("'You don't have enough gold, it seems.' The blacksmith says to you. 'Come back when you have enough. Can't start throwing away this stuff for nothing, you know.'");
    }
    else if(choiceNumber === 2) {
        if(inventory.some(item => item.name === daggerString)) {
            console.log("You already have a dagger.");
        }
        else if(!inventory.some(item => item.name === daggerString) && playerGold >= 5) {
            playerGold -= dagger.cost;
            console.log("\nYou buy the " + dagger.name + " for " + dagger.cost + " gold.");
            console.log("Gold remaining: " + playerGold);
            inventory.push({...dagger});
        } else if(!inventory.some(item => item.name === daggerString) && playerGold <= 5) {
            console.log("'You don't have enough gold, it seems.' The blacksmith says to you. 'Come back when you have enough. Can't start throwing away this stuff for nothing, you know.'");
        }
    }
    else if(choiceNumber === 3) {
        if(inventory.some(item => item.name === bladeString)) {
            console.log("You already have blades.");
        }
        else if(!inventory.some(item => item.name === bladeString) && playerGold >= 3) {
            playerGold -= blades.cost;
            console.log("\nYou buy the " + blade.name + " for " + blade.cost + " gold.");
            console.log("Gold remaining: " + playerGold);
            inventory.push({...blade})
        } else if(!inventory.some(item => item.name === bladeString) && playerGold <= 3) {
            console.log("'You don't have enough gold, it seems.' The blacksmith says to you. 'Come back when you have enough. Can't start throwing away this stuff for nothing, you know.'");
        }
    }
    else if(choiceNumber === 4) {
        if(inventory.some(item => item.name === shieldString)) {
            console.log("You already have a shield.");
        }
        else if(!inventory.some(item => item.name === shieldString) && playerGold >= 6) {
            playerGold -= shield.cost;
            console.log("\nYou buy the " + shield.name + " for " + shield.cost + " gold.");
            console.log("Gold remaining: " + playerGold);
            inventory.push({...shield});
        } else if(!inventory.some(item => item.name === shieldString) && playerGold <= 6) {
            console.log("'You don't have enough gold, it seems.' The blacksmith says to you. 'Come back when you have enough. Can't start throwing away this stuff for nothing, you know.'");
        }
    }
    else if(choiceNumber === 5) {
        if(inventory.some(item => item.name === silverShieldString)) {
            console.log("You already have a silver shield.");
        }
        else if(!inventory.some(item => item.name === silverShieldString) && playerGold >= 8) {
            playerGold -= silverShield.cost;
            console.log("\nYou buy the " + silverShield.name + " for " + silverShield.cost + " gold.");
            console.log("Gold remaining: " + playerGold);
            inventory.push({...silverShield});
        } else if(!inventory.some(item => item.name === silverShieldString) && playerGold <= 8) {
            console.log("'You don't have enough gold, it seems.' The blacksmith says to you. 'Come back when you have enough. Can't start throwing away this stuff for nothing, you know.'");
        }
    } else {
        console.log("Invalid choice number.");
    }

// Function for buying items at the stalls in the village centre
function buyFromVillageStalls() {
    if(inventory.some(item => item.name === healingPotionString)) {
        console.log("You already have a healing potion. You feel it unneeded to buy another one right now. Might as well use up your current potion first...");
    }

    if(playerGold >= 8 && !inventory.some(item => item.name === healingPotionString)) {
        console.log("You wait, but no one seems to be there at the stall. Finally, you decide to buy the potion anyway. You leave the gold at the stall, and take the healing potion.");
        playerGold -= healingPotion.cost;
        
        // Add healing potion object to inventory instead of just the name
        inventory.push({...healingPotion});

        console.log("\nYou buy the " + healingPotion.name + " for " + healingPotion.cost + " gold.");
        console.log("Gold remaining: " + playerGold);
    } else if( playerGold <= 8 && !inventory.some(item => item.name === healingPotionString)) {
        console.log("You don't have enough gold to buy the potion. You feel it would be wrong to take it without paying, so you leave the magic mixture alone. You think, 'Perhaps I can come back later when the seller is here. Then I could haggle a bit...'");
    }
}

// ---------------------------


// Main game loop
while(gameRunning) {
    // Location checking and displaying the relevant information
    showLocation();
    
    // Get and validate the player's choice
    let validChoice = false;
    while(!validChoice) {
        try {
            let choice = readline.question("\nWhat will you choose to do? ");

            // Check if input is empty
            if(choice.trim() === "") {
                throw "Please enter a number.";
            }

            // Convert the input to a number
            let choiceNum = parseInt(choice);
            if(isNaN(choiceNum)) {
                throw "The input you entered is not a number, it seems! Please enter a number instead.";
            }

            // Handling choices based on location
            if(currentLocation === "Cherry Blossom Gardens") {
                if(choiceNum < 1 || choiceNum > 8) {
                    throw "Please enter a number between 1 and 8.";
                }

                validChoice = true; // Valid choice made

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

                validChoice = true; // Valid choice made

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
                if(canExitVillageCentre === true) {
                    if(choiceNum < 1 || choiceNum > 8){
                        throw "Please enter a number between 1 and 8.";
                        validChoice = true; // Valid choice made
                    if(choiceNum === 1) {
                        move(choiceNum);
                    } else if(choiceNum === 2) {
                        buyFromVillageStalls();
                    } else if(choiceNum === 3) {
                        showStatus();
                    } else if(choiceNum === 4) {
                        showInventory();
                    } else if(choiceNum === 5) {
                        move(choiceNum);
                    } else if(choiceNum === 6) {
                        useItem();
                    } else if(choiceNum === 7) {
                        showHelp();
                    } else if(choiceNum === 8) {
                        gameRunning = false;
                        console.log("Farewell, traveller.");
                    } else {
                        console.log("\nInvalid choice. Please select a number between 1 - 8.");
                    }
                } else {
                    if(choiceNum < 1 || choiceNum > 7){
                    throw "Please enter a number between 1 and 7.";
                }

                validChoice = true; // Valid choice made
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
                    console.log("\nInvalid choice. Please select a number between 1 - 7.");
                }
            } else if(currentLocation === "Your house") {
                if(choiceNum < 1 || choiceNum > 7) {
                    throw "Please enter a number between 1 and 7";
                }

                validChoice = true; // Valid choice made

                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    showStatus();
                } else if(choiceNum === 3) {
                    showInventory();
                } else if(choiceNum === 4) {
                    if(inventory.some(item => item.name === noteString) {
                        console.log("You look around the house. Nothing to be found, really.");
                    }
                    
                    if(!inventory.some(item => item.name === noteString) {
                        console.log("You look around the house. Soft sunlight seeps in through the windows. On the table lies a note.");
                        console.log("NEW ITEM COLLECTED.");
                        // Add note object to inventory instead of just the name
                        inventory.push({...note});
                    }
                } else if(choiceNum === 5) {
                    useItem();
                } else if(choiceNum === 6) {
                    showHelp();
                } else if(choiceNum === 7) {
                    gameRunning = false;
                    console.log("Farewell, traveller.");
                } else {
                    console.log("\nInvalid choice. Please select a number between 1 - 7.");
                }
            }

        }  catch(error) {
            console.log("\nError: " + error);
            console.log("\nPlease try that again!");
        }

        // Check if the player died
        if(playerHealth <= 0) {
            console.log("\nYou... died. Farewell traveller, until another time.") //Insert emoji: wings
        }
    }
}
