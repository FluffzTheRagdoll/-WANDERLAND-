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
let currentLocationForPlayer = "Cherry Blossom Gardens";
let firstVisit = true;

// Extra game state variables
let canExitVillageCentre = false;
let firstHouseVisit = true;

// Monster stats
let soulWrencherHealth = 40;
let soulWrencherDamage = 14;

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

const blossomScroll = {
	name: "Cherry Blossom Scroll",
	type: "collectable",
	description: "Found at the base of a tree within the woodlands; Something is close..."
};

let blossomScrollString = "Cherry Blossom Scroll"; // For checking if item is present in inventory

const cherryBlossomToken = {
    name: "Cherry Blossom Token",
    type: "token",
    description: "Soul Wrencher defeated. But at what cost?"
};

/*-----DISPLAYING INFORMATION TO THE PLAYER-----
*/

// Function for showing player stats
function showStatus() {
    //Show status
    console.log("\n•┈┈ ┈" + playerName + "'s status" + "┈ ┈┈•");
    console.log("Health: " + playerHealth); //insert emoji (start): pink heart
    console.log("Gold: " + playerGold); //insert emoji (start): coin
    console.log("Location: " + currentLocationForPlayer); //insert emoji (start): round pushpin
}

// Function for displaying location description and available choices
function showLocation(location) {
    if(currentLocation === "Cherry Blossom Gardens") {
		// Part one
        console.log("\n:..✿ ∞CHERRY BLOSSOM GARDENS∞ ✿..:");
        console.log("You're in a quiet, serene garden with cherry blossom trees on either side of the sandy gravel path you're standing on. The path forks ahead into two.");

        console.log("\nWhere will you start your journey?");
        console.log("\n1: Follow the first path to the blacksmith");
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
        
        console.log("\n1: Return to the cherry blossom gardens");
        console.log("2: Buy weapons and armour");
        console.log("3: Check status");
        console.log("4: Check inventory");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
    } else if(currentLocation === "Village Centre") {
        console.log("\n_-+°ₒ❀VILLAGE❀ₒ°+-_");
        console.log("You follow the second path to the village centre. There are small houses spread out onto a patch of sandy gravel. Grass surrounds the area, and all is quiet. There are wooden stalls set up in the corners, but one in particular catches your eye.");
        
        if(canExitVillageCentre === true) {
            console.log("\n1: Return to the cherry blossom gardens");
            console.log("2: Go over to a stall and buy a healing potion (costs 8 gold)");
            console.log("3: Check status");
            console.log("4: Check inventory");
            console.log("5: Walk out of the village centre and into the grass surrounding the area.");
            console.log("6: Use item");
            console.log("7: Get help")
            console.log("8: Quit game");
        } else {
            console.log("\n1: Return to the cherry blossom gardens");
            console.log("2: Go over to a stall and buy a healing potion (costs 8 gold)");
            console.log("3: Check status");
            console.log("4: Check inventory");
            console.log("5: Use item");
            console.log("6: Get help")
            console.log("7: Quit game");
        }
    } else if(currentLocation === "Your house") {
        console.log("\n・‥…━━━YOUR HOUSE━━━…‥・");
        console.log("You turn around and enter your house. It's rather small inside, and wooden windows let in sunlight from outside. There is a table and a chair in the centre of the room. Being in here brings back a lot of memories for you...");
        
        console.log("\n1: Return to the cherry blossom gardens");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Look around");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
    } else if(currentLocation === "Woodlands") {
		// Part two
        console.log("\n⸙͎۪۫°｡✿⋆WOODLANDS⋆༄｡°⸙͎۪۫");
        console.log("As you continue, the grass gets slightly denser. Delicate flowers stick out of the green blades. A sandy path, hardly noticeable among the grass, leads off into the unknown.");
    
        console.log("\n1: Return to the village centre");
        console.log("2: Walk on");
        console.log("3: Follow the small sandy path");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Use item");
        console.log("7: Get help");
        console.log("8: Quit game");
    } else if(currentLocation === "Woodlands - Part 2") {
		console.log("\n1: Cross the bridge");
		console.log("2: Check status");
		console.log("3: Check inventory");
		console.log("4: Use item");
		console.log("5: Get help");
		console.log("6: Quit game");
	} else if(currentLocation === "Woodlands - Part 3 (Finale)") {
        console.log("You walk on. Dappled sunlight comes down through the canopy of trees above. A soft breeze passes by. Eventually, you see something glinting at the base of a tree.");

		console.log("\n1: Check out the glinting object");
		console.log("2: Keep going");
		console.log("3: Check status");
		console.log("4: Check inventory");
		console.log("5: Use item");
		console.log("6: Get help");
		console.log("7: Quit game");
	} else if(currentLocation === "Woodlands - Part 3 (Mini-finale)") {
        console.log("\n1: Continue walking");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Use item");
        console.log("5: Get help");
        console.log("6: Quit game");
    } else if(currentLocation === "The Dark Forest") {
		console.log("\n.•✥⍋+THE DARK FOREST+⍋✥•.");
		console.log("The forest is dark. You can't see very deep into the mass of trees. Who knows what could be in there...");

		console.log("\n1: Head inside the forest");
		console.log("2: Turn around and leave");
		console.log("3: Check status");
		console.log("4: Check inventory");
		console.log("5: Use item");
		console.log("6: Get help");
		console.log("7: Quit game");
	} else if(currentLocation === "Woodlands - Clearing") {
		console.log("\nYou walk forward. All is silent. Then, there's a swoosh of wings and an owl lands on the branch of a tree. You recognise it from earlier. The owl tilts its head and looks at you.");
        console.log("\nIn the distance, you hear a thudding sound. The owl doesn't move. The noise gets closer, and the ground begins to shake a little. Soon, a large creature stalks into sight. It has long limbs that end with inch-long claws. Its tail is long and spiny. Lethal-looking spikes cover its back and it has long, deadly teeth. Its burning white eyes bore into you.");
        console.log("\nYour eyes dart over at the owl, who stays completely still. The monster then roars defeaningly, and you glimpse its sharp teeth. As it stalks closer to you, the patterns along its body shimmer a slight shade of cerise. The colour reminds you of venom.");

        console.log("\n1: Run");
        console.log("2: Fight the monster");
        console.log("3: Check status");
        console.log("4: Check inventory");
        console.log("5: Use item");
        console.log("6: Get help");
        console.log("7: Quit game");
	}
}

// Function for updating current location for player display
function updateCurrentLocationForPlayer() {
    switch(currentLocation) {
        case "Cherry Blossom Gardens":
            currentLocationForPlayer = "Cherry Blossom Gardens";
            break;
        case "Blacksmith":
            currentLocationForPlayer = "Blacksmith";
            break;
        case "Village Centre":
            currentLocationForPlayer = "Village Centre";
            break;
        case "Your house":
            currentLocationForPlayer = "Your house";
            break;
        case "Woodlands":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Part 2":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Part 3 (Finale)":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Part 3 (Mini-finale)":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Clearing":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Chase Scene":
            currentLocationForPlayer = "Woodlands";
            break;
        case "Woodlands - Relief" :
            currentLocationForPlayer = "Woodlands";
            break;
        case "The Dark Forest":
            currentLocationForPlayer = "The Dark Forest";
            break;
        default:
            currentLocationForPlayer = currentLocation;
    }
}

// Function to help users understand what's going on
function showHelp() {
    console.log("\n┈┈┈┈﹤｡ AVAILABLE COMMANDS ｡﹥┈┈┈┈");

    console.log("\nMovement Commands:");
    console.log("- When in the cherry blossom gardens, choose 1-3 to move between locations.");
    console.log("- In the blacksmith, village centre and house, choose 1 to return to the cherry blossom gardens.");
	console.log("- In the woodlands, choose 1 to return to the village centre.");
	console.log("- In other locations, there will be various options that lead you to new areas.");

    console.log("\nBattle Commands:");
    console.log("- In order to win a battle, you need a sword.");
    console.log("- You must fight monsters tactfully, as every choice impacts the fate of the battle.");
    console.log("- You will lose the battle if you have no weapon.");

    console.log("\nItem Usage:");
    console.log("- You can buy weapons and armour at the blacksmith.");
    console.log("- You can buy a healing potion at one of the stalls in the the village centre.");
    console.log("- Other items can be collected in various locations across the map.");
    console.log("- The healing potion can be used to restore 30 health if you suffer damage.");

    console.log("\nOther Commands:");
    console.log("- Choose the status option to view your health, location and gold.");
    console.log("- Choose the inventory option to view items you have collected.");
	console.log("- Choose the use item option to use items from your inventory, or to view scrolls and notes.");
    console.log("- Choose the help option to see these messages again.");
    console.log("- Choose the quit option to end the game.");

    console.log("\nTips");
    console.log("- Save healing potions for dangerous situations.");
    console.log("- Defeating monsters earns you a token and gold. The tokens you collect affect the ending you get and help you throughout the game.");
    console.log("- Each monster has specific weaknesses, which affects the outcome of battles. Find scrolls to learn more about various monsters.");
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
            updateCurrentLocationForPlayer();
            validMove = true;
        } else if(choiceNum === 2) {
            currentLocation = "Village Centre";
            console.log("\nYou follow the second path and enter the village centre.");
            updateCurrentLocationForPlayer();
            validMove = true;
        } else if(choiceNum === 3) {
            currentLocation = "Your house";
            console.log("\nYou turn around and enter your house.");
            updateCurrentLocationForPlayer();
            validMove = true;
        }
    } else if(currentLocation === "Blacksmith"){
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            updateCurrentLocationForPlayer();
            validMove = true;
        }
    } else if(currentLocation === "Village Centre") {
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            updateCurrentLocationForPlayer();
            validMove = true;
        } else if(canExitVillageCentre === true && choiceNum === 5) {
			currentLocation = "Woodlands";
			console.log("You walk into the grass surrounding the village.");
            updateCurrentLocationForPlayer();
            validMove = true;
		}
    } else if(currentLocation === "Your house") {
        if(choiceNum === 1) {
            currentLocation = "Cherry Blossom Gardens";
            console.log("You return to the cherry blossom gardens.");
            updateCurrentLocationForPlayer();
            validMove = true;
            if(firstHouseVisit === true) {
                console.log("Outside your house, you spot a strange glow from somewhere in the grass. Upon walking over, you see a familiar sign indented in the soil. Wings, with rings and the outline of a glow around them. Strange...");
                firstHouseVisit = false;
                canExitVillageCentre = true;
            }
        }
    } else if(currentLocation === "Woodlands") {
		if(choiceNum === 1) {
			currentLocation = "Village Centre";
			console.log("You return to the village centre.");
            updateCurrentLocationForPlayer();
            validMove = true;
		} else if(choiceNum === 2) {
			console.log("You walk on, further and further. Nothing of significance seems to be in sight. Then, you finally reach somewhere.");
			console.log("A gushing river streams through the grass. A wooden bridge arches above it. Trees, with leaves of golden and pink, surround the area.");
			currentLocation = "Woodlands - Part 2";
            updateCurrentLocationForPlayer();
            validMove = true;
		} else if(choiceNum === 3) {
			console.log("You follow the sandy path further and further. The path keeps on going, so you do too. Eventually, though, after what seems like eternity, the path fades away.");
			console.log("Upon looking up, you see a tree, its trunk is dark and withered. The leaves on its crooked branches are dark and pointed. But what stands out the most is the symbol etched into the tree's bark. Wings. With rings and the outline of a glow around them. But... the wings are broken.");
			console.log("Behind the tree is a forest of more trees, dark and foreboding. A breeze sifts through, causing the branches to creak awfully.");
			currentLocation = "The Dark Forest";
            updateCurrentLocationForPlayer();
            validMove = true;
		}
	} else if(currentLocation === "Woodlands - Part 2") {
		if(choiceNum === 1) {
			console.log("You start to cross the bridge, but stop briefly in once you're in the middle to glance down at the river. The sounds of the water rushing and the leaves rustling makes you feel calm. You continue and make it to the other side.");
			currentLocation = "Woodlands - Part 3 (Finale)";
            updateCurrentLocationForPlayer();
            validMove = true;
		}
	} else if(currentLocation === "Woodlands - Part 3 (Finale)") {
        if(choiceNum === 1) {
            console.log("You go over to the tree and see a scroll at its base, tied with a satin ribbon that a little pink blossom charm dangles from.");
			console.log("NEW ITEM COLLECTED.");
			// Add scroll object to inventory instead of just the name
			inventory.push({...blossomScroll});
            currentLocation = "Woodlands - Part 3 (Mini-finale)";
            updateCurrentLocationForPlayer();
            validMove = true;
        } else if(choiceNum === 2) {
			console.log("You ignore the glinting object and keep walking. Soon enough, you reach a clearing.");
			currentLocation = "Woodlands - Clearing";
            updateCurrentLocationForPlayer();
            validMove = true;
		}
	} else if(currentLocation === "Woodlands - Part 3 (Mini-finale)") {
        if(choiceNum === 1) {
            console.log("You continue onwards. Soon, you reach a clearing.");
            currentLocation = "Woodlands - Clearing";
        }
    } else if(currentLocation === "Woodlands - Clearing") {
        if(choiceNum === 1) {
            console.log("You dash past the monster and swerve into the forest. The monster doesn't waste a moment. The ground shakes as it runs after you. You halt abruptly, because in front of you, are two paths.");
            currentLocation = "Woodlands - Chase Scene";
        }
    } else if(currentLocation === "The Dark Forest") {
		if(choiceNum === 1) {
			console.log("You walk into the forest. Every shadow seems to hide something... All is quiet as you go on.");
		} else if(choiceNum === 2) {
			console.log("You turn around and walk away from the forest. The strange sounds fade away. But suddenly, a dark creature slides up to you and rises like a cobra. Its face morphs terrifyingly as its many eyes bore into your soul. Before you can do anything, it leaps forward and sinks its razor-sharp teeth into you.");
			updateHealth(-100);
            return false;
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

		if(item.name === "Cherry Blossom Scroll") {
			console.log("\n'ɪᴛ ʜᴀs ᴡɪɴɢs, ʙᴜᴛ ᴄᴀɴɴᴏᴛ ғʟʏ");
			console.log("ɪᴛ ʜᴀs ᴇʏᴇs, ʙᴜᴛ ᴄᴀɴɴᴏᴛ ᴄʀʏ");
			console.log("ɪᴛ ʜᴀs ɴᴏ ʜᴇᴀʀᴛ, ᴀɴᴅ ᴀɴᴅ ɴᴏ sᴏᴜʟ");
			console.log("ᴛʜᴇʀᴇ ᴀʀᴇ ɴᴏ sᴛᴏʀɪᴇs ᴛᴏ ʙᴇ ᴛᴏʟᴅ");
			console.log("\nɪғ ʏᴏᴜ ᴡɪsʜ ᴛᴏ ᴅᴀʀᴇ,");
			console.log("ᴇɴᴛᴇʀ ɪᴛ's ᴇʏᴇʟɪɴᴇ");
			console.log("ᴀɴᴅ ʜᴏʟᴅ ɪᴛs sᴛᴀʀᴇ,");
			console.log("ʏᴏᴜ'ʟʟ ʙᴇ ɢᴏᴏᴅ ᴀs ɢᴏɴᴇ");
			console.log("\nʙᴜᴛ ɪғ ɪᴛ's ᴡʜᴀᴛ ʏᴏᴜ ᴍᴜsᴛ ᴅᴏ,");
			console.log("ɪғ ɪᴛ ʀᴇᴀʟʟʏ ᴍᴀᴛᴛᴇʀs ᴛᴏ ʏᴏᴜ,");
			console.log("ᴛʀʏ ᴛᴏ ғɪɴᴅ ᴛʜᴇ ᴘᴇᴛᴀʟs ᴏғ ᴀ ʙʟᴏssᴏᴍ,");
			console.log("ᴏɴᴇ ᴛʜᴀᴛ ɢʀᴏᴡs ᴡɪᴛʜᴏᴜᴛ ᴛʜᴇ sᴜɴ");
			console.log("ᴀ sʟɪɢʜᴛ ᴛᴏᴜᴄʜ ᴏғ sᴘᴀʀᴋʟᴇ,");
			console.log("ɪɴ ɪᴛs ᴍɪsᴇʀᴀʙʟᴇ ᴄʜᴀʀᴍ'");
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

function getBestArmour() {
    const items = getItemsByType("armour");
    if(!items || items.length === 0) {
        return null;
    }

    let bestArmour = items[0];
    for(let i = 0; i < items.length; i++) {
        if(items[i].effect > bestArmour.effect) {
            bestArmour = items[i];
        }
    }

    return bestArmour;
}

function hasGoodArmour() {
    if(inventory.some("Silver Shield")) {
        return true;
    } else {
        return false;
    }
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
    playerHealth = Math.max(0, Math.min(100, playerHealth + amount));

    if(playerHealth >= 100) {
        playerHealth = 100;
        console.log("You're at full health again.");
    }

    if(playerHealth <= 0) {
        playerHealth = 0;
        console.log("\nLooks like that's the end of things.");
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
            playerGold -= blade.cost;
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
}
// Function for buying items at the stalls in the village centre
function buyFromVillageStalls() {
    if(hasItemType("potion")) {
        console.log("You already have a healing potion. You feel it unneeded to buy another one right now. Might as well use up your current potion first...");
    }

    if(playerGold >= 8 && !hasItemType("potion")) {
        console.log("You wait, but no one seems to be there at the stall. Finally, you decide to buy the potion anyway. You leave the gold at the stall, and take the healing potion.");
        playerGold -= healingPotion.cost;
        
        // Add healing potion object to inventory instead of just the name
        inventory.push({...healingPotion});

        console.log("\nYou buy the " + healingPotion.name + " for " + healingPotion.cost + " gold.");
        console.log("Gold remaining: " + playerGold);
    } else if(playerGold <= 8 && !hasItemType("potion")) {
        console.log("You don't have enough gold to buy the potion. You feel it would be wrong to take it without paying, so you leave the magic mixture alone. You think, 'Perhaps I can come back later when the seller is here. Then I could haggle a bit...'");
    }
}

/*-----COMBAT FUNCTIONS-----
*/

// Function for handling combat
function handleCombat(battleWith) {
    let inBattle = true;
    let chosenWeapon = null;
    let displayWeapons = true;

    // Set monster stats
    let monsterHealth;
    let monsterDamage;

    while(inBattle) {
        // Check which monster the player is battling
        if(battleWith === "The Soul Wrencher") {
            monsterHealth = soulWrencherHealth;
            monsterDamage = soulWrencherDamage;

            // Check if the player has a weapon
            if(hasItemType("weapon")) {
                const weapons = getItemsByType("weapon");

                // Display all weapons in inventory
                let weaponChoice;
                if(true) {
                    console.log("·•– ٠⚜ WEAPONS ⚜٠ —•·");
                    weapons.forEach((weapon, index) => {
                        console.log("\n   " + (index + 1) + ". " + weapon.name + " - " + weapon.description);
                    });

                    weaponChoice = readline.question("\nWhich weapon will you use? (Enter a number): ");

                    if(weaponChoice.trim() === "" || isNaN(weaponChoice)) {
                        console.log("Invalid choice. The Soul Wrencher takes advantage of your hesitation and dives forward. You move aside just in time, but not before its teeth scrape your shoulder.");
                        updateHealth(-monsterDamage);
                    }

                    weaponChoice = parseInt(weaponChoice);
                    if(weaponChoice > weapons.length || weaponChoice < weapons.length) {
                        console.log("Invalid choice. The Soul Wrencher takes advantage of your hesitation and dives forward. You move aside just in time, but not before its teeth scrape your shoulder.");
                        updateHealth(-monsterDamage);
                    }
                }

                if(weaponChoice === 1) {
                    chosenWeapon = "Sword";
                    console.log("You pull your sword out of its sheath and leap at the monster. It reaches out to grab you with its long claws.");
                    if(hasItemType("armour")) {
                        console.log("The Soul Wrencher's claws slam against your shield. It growls and narrows its eyes.");
                        console.log("The monster slams you with its tail. You manage to block some of the damage with your shield, but still feel a sharp pain.");
                        updateHealth(-(monsterDamage - sword.effect));

                        console.log("The Soul Wrencher advances towards you, eyes narrowed. You brace yourself.");
                        console.log("1: Try to dodge");
                        console.log("2: Attack");
                        console.log("3: Use your shield to protect yourself");
                        let battleChoice = readline.question("What will you do now?");
                        
                        if(battleChoice.trim() === "" || isNaN(battleChoice)) {
                            console.log("Invalid choice. The Soul Wrencher screeches and knocks you backwards, before sinking its teeth into your leg.");
                            updateHealth(-monsterDamage);
                        }

                        battleChoice = parseInt(battleChoice);
                        if(battleChoice < 0 || battleChoice > 3) {
                            console.log("Invalid choice. The Soul Wrencher screeches and knocks you backwards, before sinking its teeth into your leg.");
                            updateHealth(-monsterDamage);
                        }

                        if(battleChoice === 1) {
                            console.log("You dodge as fast as you can, but the Soul Wrencher swivles its head around and sinks its teeth into you. Blood pools on the ground.");
                            inBattle = false;
                            updateHealth(-100);
                        } else if(battleChoice === 2) {
                            console.log("You swing your sword at the monster and slash its face. It lets out a horrible screech and staggers back.");
                            monsterHealth -= sword.effect;
                            console.log("The Soul Wrencher opens its eyes and glares at you. It's blinded by the blood streaming into its eyes, but you can see how furious it is.");
                            console.log("The monster lunges at you. You swiftly dodge it.");
                            console.log("1: Leave the monster be");
                            console.log("2: Finish off the monster");
                            let secondaryBattleChoice = readline.question("What will you do now?");

                            if(secondaryBattleChoice.trim() === "" || isNaN(secondaryBattleChoice)) {
                                console.log("Invalid choice. The monster tilts its head a little bit, trying to figure out where you are. It senses you, jumps forward and rips your arm out clean before you can move.");
                                updateHealth(monsterDamage * 2);
                            }

                            secondaryBattleChoice = parseInt(secondaryBattleChoice);
                            if(secondaryBattleChoice < 0 || secondaryBattleChoice > 2) {
                                console.log("Invalid choice. The monster tilts its head a little bit, trying to figure out where you are. It senses you, jumps forward and rips your arm out clean before you can move.");
                                updateHealth(monsterDamage * 2);
                            }

                            if(secondaryBattleChoice === 1) {
                                console.log("You walk past the creature carefully, as not to alert it of your location. The owl, who has been perched on that branch the entire time, watches you intently.");
                                console.log("The Soul Wrencher stays still for a second. It then gives a low growl and slinks away.");
                                inBattle = false;
                                currentLocation = "Woodlands - End Battle Scene";
                            } else if(secondaryBattleChoice === 2) {
                                console.log("\nYou leap onto the monster, careful not to get scratched by the spikes on its back. The monster bucks and snarls. You manage to not fall off and, with all your might, slam your sword into the mosnter's head. It collapses to the ground. The patterns on its side ripple bright pink for a second, then it falls completely still.");
                                console.log("\nYou jump off the creature and step back. The Soul Wrencher is dead.");
                                inBattle = false;
                                console.log("\nThe owl watches from behind you, not having moved an inch the entire time. Then, a swirling light appears in front of you. It forms into a pair of wings, with rings and the outline of a glow aroun them.");
                                console.log("\nYou reach out tentatively and touch the symbol. It glows a shade of rose, then disappears.");
                                console.log("TOKEN COLLECTED.");
                                inventory.push({...cherryBlossomToken});
                                playerGold += 14;
                                console.log("You have gained 14 gold.");
                                currentLocation = "Woodlands - End Battle Scene";
                            }
                        } else if(battleChoice === 3) {
                            console.log("You raise your shield just in time as the monster lunges at you. The force of the impact sends you stumbling back, and you realise that your shield is cracked.");
                            inventory.splice(inventory.indexOf("shield"), 1);
                            console.log("The Soul Wrencher leaps at you and swipes at you with its claws. You stumble aside, but realise that the monster has managed to leave deep scratches across your body.");
                            updateHealth(-monsterDamage * 2);
                            console.log("You manage to steady yourself. The monster is looking at you with pure rage.");
                            console.log("1: Try to dodge");
                            console.log("2: Attack");
                            let secondaryBattleChoice = readline.question("What will you do now?");

                            if(secondaryBattleChoice.trim() === "" || isNaN(secondaryBattleChoice)) {
                                console.log("Invalid choice. The monster slams you with its tail, causing you to fall. It then sinks its claws deep into your arm, crushing it.");
                                updateHealth(-monsterDamage);
                            }

                            secondaryBattleChoice = parseInt(secondaryBattleChoice);
                            if(secondaryBattleChoice < 0 || secondaryBattleChoice > 2) {
                                console.log("Invalid choice. The monster slams you with its tail, causing you to fall. It then sinks its claws deep into your arm, crushing it.");
                                updateHealth(-monsterDamage);
                            }

                            if(secondaryBattleChoice === 1) {
                                console.log("You try to dodge the Soul Wrencher's claws, and only just manage to do so. Your scratches are burning and slowing you down.");
                                console.log("1: Run away");
                                console.log("2: Stay and fight");
                                let tertiaryBattleChoice = readline.question("What will you do now?");

                                if(tertiaryBattleChoice.trim() === "" || isNaN(tertiaryBattleChoice)) {
                                    console.log("Invalid choice. You freeze and the monster takes full advantage of the situation. It swiftly closes its jaws around your neck and lifts you up. The world goes black.");
                                    updateHealth(-100);
                                    inBattle = false;
                                }

                                tertiaryBattleChoice = parseInt(tertiaryBattleChoice);
                                if(tertiaryBattleChoice < 0 || tertiaryBattleChoice > 2) {
                                    console.log("Invalid choice. You freeze and the monster takes full advantage of the situation. It swiftly closes its jaws around your neck and lifts you up. The world goes black.");
                                    updateHealth(-100);
                                    inBattle = false;
                                }

                                if(tertiaryBattleChoice === 1) {
                                    console.log("You realise that this is futile. You get up and race away into the thick of the woodlands. The Soul Wrencher merely turns its head to watch you go. A sort of terrifying smile flickers across its face. The monster turns around and stalks away.");
                                    inBattle = false;
                                    currentLocation = "Woodlands - Relief";
                                } else if(tertiaryBattleChoice === 2) {
                                    console.log("You stand your ground, despite the pain coursing through your body. The monster senses that you're weakened, and before you can do anything, it bounds forward and bites your head clean off. Your vision fades to black.");
                                    updateHealth(-100);
                                    inBattle = false;
                                }
                            } else if(secondaryBattleChoice === 2) {
                                console.log("You leap at the Soul Wrencher again and manage to leave a scratch above its shoulder with your sword.");
                                console.log("You stumble to the floor. The monster remains still for a second, looking at the damage you caused. Its eyes then slowly turn to you. The look it's giving you sends chills down your spine. The Soul Wrencher takes a step forward, then opens its mouth in a earsplitting screech. Its patterns pulse bright magenta. The trees shake slightly. You feel your head ringing, then, you pass out.");
                                console.log("You never wake up. The Soul Wrencher has claimed another soul.");
                                updateHealth(-100);
                                inBattle = false;
                            }
                        }
                    } else {
                        console.log("Before you can move, the monster's claws swipe at you and blood spray onto the ground.");
                        updateHealth(-monsterDamage);
                        console.log("The monster slams you with its tail. You fall against a tree, feeling a sharp pain.");
                        updateHealth(-monsterDamage);
                    }
                }
            }
        }
    }
    if(playerHealth <= 0) {
        inBattle = false;
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
				// Part one
                if(choiceNum < 1 || choiceNum > 8) {
                    throw "Please enter a number between 1 and 8.";
                }

                validChoice = true; // Valid choice made

                if(choiceNum <= 3) {
                    move(choiceNum);
                } else if(choiceNum === 4) {
                    showStatus();
                } else if(choiceNum === 5) {
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
                    }

                    validChoice = true; // Valid choice made

                } else {
                    if(choiceNum < 1 || choiceNum > 7){
                        throw "Please enter a number between 1 and 7.";
                    }

                    validChoice = true; // Valid choice made
                }

                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    buyFromVillageStalls();
                } else if(choiceNum === 3) {
                    showStatus();
                } else if(choiceNum === 4) {
                    showInventory();
                } else if(choiceNum === 5) {
                    if(canExitVillageCentre === true) {
                        move(choiceNum);
                    } else {
                        useItem();
                    }
                } else if(choiceNum === 6) {
                    if(canExitVillageCentre === true) {
                        useItem();
                    } else {
                        showHelp();
                    }
                } else if(choiceNum === 7) {
                    if(canExitVillageCentre === true) {
                        showHelp();
                    } else {
                        gameRunning = false;
                        console.log("Farewell, traveller.");
                    }
                } else if(choiceNum === 8) {
                    if(canExitVillageCentre === true) {
                        gameRunning = false;
                        console.log("Farewell, traveller.");
                    } else {
                        console.log("\nInvalid choice. Please select a number between 1 - 7.");
                    }
                } else {
                    if(canExitVillageCentre === true) {
                        console.log("\nInvalid choice. Please select a number between 1 - 8.");
                    } else {
                        console.log("\nInvalid choice. Please select a number between 1 - 7.");
                    }
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
                    if(inventory.some(item => item.name === noteString)) {
                        console.log("You look around the house. Nothing to be found, really.");
                    }
                    
                    if(!inventory.some(item => item.name === noteString)) {
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
            } else if(currentLocation === "Woodlands") {
				// Part two
				if(choiceNum < 1 || choiceNum > 8) {
                    throw "Please enter a number between 1 and 8";
				}
				validChoice = true; // Valid choice made
				if(choiceNum <= 3) {
					move(choiceNum);
				} else if(choiceNum === 4) {
					showStatus();
				} else if(choiceNum === 5) {
					showInventory();
				} else if(choiceNum === 6) {
					useItem();
				} else if(choiceNum === 7){
					showHelp();
				} else if(choiceNum === 8) {
					gameRunning = false;
					console.log("Farewell, traveller.");
				} else {
					console.log("\nInvalid choice. Please select a number between 1 - 8.");
				}
				
			} else if(currentLocation === "Woodlands - Part 2") {
				if(choiceNum < 1 || choiceNum > 6) {
                    throw "Please enter a number between 1 and 6";
				}
				validChoice = true; // Valid choice made
				if(choiceNum === 1) {
					move(choiceNum);
				} else if(choiceNum === 2) {
					showStatus();
				} else if(choiceNum === 3) {
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
			} else if(currentLocation === "Woodlands - Part 3 (Finale)") {
				if(choiceNum < 1 || choiceNum > 7) {
	                throw "Please enter a number between 1 and 7";
				}
				validChoice = true; // Valid choice made

				if(choiceNum<= 2) {
					move(choiceNum);
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
			} else if(currentLocation === "Woodlands - Part 3 (Mini-finale)") {
                if(choiceNum < 1 || choiceNum > 6) {
	                throw "Please enter a number between 1 and 6";
				}
                validChoice = true; // Valid choice made

                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    showStatus();
                } else if(choiceNum === 3) {
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
            } else if(currentLocation === "The Dark Forest") {
				if(choiceNum < 1 || choiceNum > 7) {
					throw "Please enter a number between 1 and 7";
				}
				validChoice = true; // Valid choice made
				if(choiceNum <= 2) {
					move(choiceNum);
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
			} else if(currentLocation === "Woodlands - Clearing") {
                if(choiceNum < 1 || choiceNum > 7) {
					throw "Please enter a number between 1 and 7";
				}
                validChoice = true; // Valid choice made
                if(choiceNum === 1) {
                    move(choiceNum);
                } else if(choiceNum === 2) {
                    handleCombat("The Soul Wrencher");
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
            }

        }  catch(error) {
            console.log("\nError: " + error);
            console.log("\nPlease try that again!");
        }

        // Check if the player died
        if(playerHealth <= 0) {
            console.log("\nYou... died. Farewell traveller, until another time.") //Insert emoji: wings
            gameRunning = false;
        }
    }
}
