/* 
    TODO for students
        General Setup:
            - This object is framed for you to fill out the values to help customize your game.
            - This will alter the browser to display your game title. The "Quick Notes" modal will also detail your information along with the description (desc) of what your game is about. It is important to highlight key commands that you want the player to use.
            - The startingRoomDescription will display what the player sees upon coming to your project.

        Do NOT alter the name of this object.

        Both exports are required in order for this project to run.

        - index.html should be running in your browser through the build process.
            - use your browsers console throughout testing.
*/

export const gameDetails = {   
    title: 'The World of Colors',
    desc: 'Welcome to the world of colors... here are some quick rules & concepts... Use the two word commands. When you interact with rooms and items, you can type "the [item]," "a [item]," or just "[item]. Good luck!',
    author: 'Scott Lee',
    cohort: 'PTSB-june-2023',
    startingRoomDescription: 'You are trapped in a maze of rooms. Can you escape? You wake up, and what you see before you is a tranquil room painted blue. Ahead of you, you can see a paper box, empty and blue in color, and a silver sword that looks newly smithed, and a shiny shell glinting in the light, cemented to the ground. You can exit this room to the yellow room.',
    playerCommands: [
        // replace these with your games commands as needed
        // 'inspect', 'view', 'look', 'pickup',
        'move to', 'look at', 'pick up', 'put down', 'check inventory',
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}

class Item {
    constructor(name, description, location, fixed) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.fixed = fixed;
    };

    interact() {
        return `You have interacted with ${this.name}`;
    };

    isFixed() {
        return this.fixed === true;
    };
};

class Loc extends Item {
    constructor(name, description, exits, itemsWithin, isLocked, lockedDescription, itemsForEntrance) {
        super(name, description);
        this.exits = exits;
        this[`items within`] = itemsWithin;
        this.isLocked = isLocked;
        this[`locked description`] = lockedDescription;
        this[`items for entrance`] = itemsForEntrance;
    };

    contains(item) {
        // Includes doesn't work because it can't access the Item object's properties and still iterate on that object's parent array.
        // Reference: https://stackoverflow.com/questions/8217419/how-to-determine-if-a-javascript-array-contains-an-object-with-an-attribute-that
        // return this[`items within`].name.includes(item);

        // Look, ma! I made the functionality of a .includes() method with a .find() method!
        // Update: The more I've learned, the less impressive this is. lol.
        // checks if passed item variable matches an item in the object this method is called for
        // if ((this[`items within`].find(seeking => seeking.name === item) == null)) {
        //     return false;
        // } else {
        //     return true;
        // };

        //returns true if any objects within the array have a matching name value
        return this[`items within`].some(seeking => seeking.name === item);
    };

    describeItems() {
        
        let output = ``;
        
        // if array of items in room is empty
        if (this[`items within`].length === 0) {
            output = `This room appears to be empty`;

        // if array of items not empty
        } else {
            
            // for each item
            this[`items within`].forEach(item => {
                
                // if output is empty, add beginning of sentence
                !output ?
                    output += `Ahead of you, you can see ` :
                    // if output is not empty, put "and" before next item
                    output += `, and `;

                //add item to output
                output += item.description;
            });
        };
        return output;
    };

    describeExits() {

        let output = ``;

        // if array of exits in room is empty
        if (this.exits.length === 0) {
            output = `There's nowhere to go from here... You appear to be trapped.`

        // if array of exits not empty
        } else {

            // for each item
            this.exits.forEach(exit => {

                // if output is empty, add beginning of sentence
                !output ?
                    output += `You can exit this room to ` :

                    // if output is not empty, put "or" before next room
                    output += `, or `;

                // add exit to output
                output += exit;
            });
        };
        return output;
    };
};

// item ojects
//   name
//   description
//   location
//   fixed in place boolean
const paperBox = new Item(
    `the paper box`,
    `a paper box, empty and blue in color`,
    `the blue room`,
    false
);
const silverSword = new Item(
    `the silver sword`,
    `a silver sword that looks newly smithed`,
    `the blue room`,
    false
);
const shinyShell = new Item(
    `the shiny shell`,
    `a shiny shell glinting in the light, cemented to the ground`,
    `the shiny shell`,
    true
);
const smallPyramid = new Item(
    `the small pyramid`,
    `a small pyramid made of sand and stone`,
    `the yellow room`,
    true
);
const goldenScarab = new Item(
    `the golden scarab`,
    `a golden scarab, frozen in time`,
    `the yellow room`,
    false
);
const brittleSpear = new Item(
    `the brittle spear`,
    `a brittle spear, fragile and ancient`,
    `the yellow room`,
    false
);
const velvetCloth = new Item(
    `the velvet cloth`,
    `a velvet cloth, a dark red in hue`,
    `the red room`,
    false
);
const obsidianRock = new Item(
    `the obsidian rock`,
    `a heavy obsidian rock, too large to lift`,
    `the red room`,
    true
);
const wovenCloak = new Item(
    `the woven cloak`,
    `a woven cloak, perfect for travel`,
    `the red room`,
    false
);
const stoneCylinder = new Item(
    `the stone cylinder`,
    `a stone cylinder, painted green and oddly smooth`,
    `the green room`,
    true
);
const grayPebble = new Item(
    `the gray pebble`,
    `a smooth gray pebble, made for skipping`,
    `the green room`,
    false
);
const glassCup = new Item(
    `the glass cup`,
    `a glass cup, blown in a furnace`,
    `the green room`,
    false 
);

// location objects
//   name
//   description
//   array of exits
//   item objects in the room
const blueRoom = new Loc(
    `the blue room`,
    `a tranquil room painted blue`,
    [`the yellow room`],
    [paperBox, silverSword, shinyShell],
    false,
    undefined,
    []
);
const yellowRoom = new Loc(
    'the yellow room',
    `a painfully bright yellow room`,
    [`the red room`, `the green room`, `the blue room`],
    [smallPyramid, goldenScarab, brittleSpear],
    false,
    undefined,
    []
);
const redRoom = new Loc(
    `the red room`,
    `an uneasy room painted in red`,
    [`the yellow room`],
    [velvetCloth, obsidianRock, wovenCloak],
    false,
    undefined,
    []
);
const greenRoom = new Loc(
    'the green room',
    `a room of nature, painted green`,
    [`the yellow room`, `the purple room`],
    [stoneCylinder, grayPebble, glassCup],
    false,
    undefined,
    []
);
const purpleRoom = new Loc(
    'the purple room',
    `a small room with a slight purple hue, and a clear and open exit`,
    [`the green room`],
    [],
    true,
    [`a magical lock, for your own safety`, `an adventurer's garb and gear`],
    [`the silver sword`, `the woven cloak`]
);

//dictionaries and inventory
const locationDict = {blueRoom, yellowRoom, redRoom, greenRoom, purpleRoom};
const playerInventory = [];

// dictionary for spelling variations
const spellingDict = {
    // rooms
    'the blue room': [`the blue room`, `a blue room`, `blue room`, `the tranquil room`, `a tranquil room`, `tranquil room`, `the tranquil blue room`, `a tranquil blue room`, `tranquil blue room`, `blue`],
    'the yellow room': [`the yellow room`, `a yellow room`, `yellow room`, `the painfully bright yellow room`, `a painfully bright yellow room`, `painfully bright yellow room`,  `the painfully bright room`, `a painfully bright room`, `painfully bright room`, `the painful yellow room`, `a painful yellow room`, `painful yellow room`, `the bright yellow room`, `a bright yellow room`, `bright yellow room`, `the bright room`, `a bright room`, `bright room`, `yellow`],
    'the red room': [`the red room`, `a red room`, `red room`, `the uneasy room`, `an uneasy room`, `a uneasy room`, `uneasy room`, `red`],
    'the green room': [`the green room`, `a green room`, `green room`, `the nature room`, `a nature room`, `nature room`, `green`],
    'the purple room': [`the purple room`, `a purple room`, `purple room`, `the small room`, `a small room`, `small room`, `the exit room`, `an exit room`, `a exit room`, `exit room`, `the clear room`, `a clear room`, `clear room`, `the open room`, `a open room`, `open room`, `purple`],
    // blue room items
    'the paper box': [`the paper box`, `a paper box`, `paper box`, `the empty box`, `a empty box`, `empty box`, `the blue box`, `a blue box`, `blue box`, `the box`, `a box`, `box`],
    'the silver sword': [`the silver sword`, `a silver sword`, `silver sword`, `the smithed sword`, `a smithed sword`, `smithed sword`, `the sword`, `a sword`, `sword`],
    'the shiny shell': [`the shiny shell`, `a shiny shell`, `shiny shell`, `the glinting shell`, `a glinting shell`, `glinting shell`, `the cemented shell`, `a cemented shell`, `cemented shell`, `the shell`, `a shell`, `shell`],
    // yellow room items
    'the small pyramid': [`the small pyramid`, `a small pyramid`, `small pyramid`, `the sand pyramid`, `a sand pyramid`, `sand pyramid`, `the stone pyramid`, `a stone pyramid`, `stone pyramid`, `the pyramid`, `a pyramid`, `pyramid`],
    'the golden scarab': [`the golden scarab`, `a golden scarab`, `golden scarab`, `the frozen scarab`, `a frozen scarab`, `frozen scarab`, `the scarab`, `a scarab`, `scarab`],
    'the brittle spear': [`the brittle spear`, `a brittle spear`, `brittle spear`, `the fragile spear`, `a fragile spear`, `fragile spear`, `the ancient spear`, `an ancient spear`, `a ancient spear`, `ancient spear`, `the spear`, `a spear`, `spear`],
    // red room items
    'the velvet cloth': [`the velvet cloth`, `a velvet cloth`, `velvet cloth`, `the dark red cloth`, `a dark red cloth`, `dark red cloth`, `the red cloth`, `a red cloth`, `red cloth`, `the cloth`, `a cloth`, `cloth`],
    'the obsidian rock': [`the obsidian rock`, `an obsidian rock`, `a obsidian rock`, `obsidian rock`, `the heavy obsidian rock`, `a heavy obsidian rock`, `heavy obsidian rock`, `the heavy rock`, `a heavy rock`, `heavy rock`, `the large rock`, `a large rock`, `large rock`, `the rock`, `a rock`, `rock`],
    'the woven cloak': [`the woven cloak`, `a woven cloak`, `woven cloak`, `the travel cloak`, `a travel cloak`, `travel cloak`, `the cloak`, `a cloak`, `cloak`],
    // green room items
    'the stone cylinder': [`the stone cylinder`, `a stone cylinder`, `stone cylinder`, `the green cylinder`, `a green cylinder`, `green cylinder`, `the smooth cylinder`, `a smooth cylinder`, `smooth cylinder`, `the oddly smooth cylinder`, `an oddly smooth cylinder`, `a oddly smooth cylinder`, `oddly smooth cylinder`, `the cylinder`, `a cylinder`, `cylinder`],
    'the gray pebble': [`the gray pebble`, `a gray pebble`, `gray pebble`, `the smooth gray pebble`, `a smooth gray pebble`, `smooth gray pebble`, `the smooth pebble`, `a smooth pebble`, `smooth pebble`, `the skipping pebble`, `a skipping pebble`, `skipping pebble`, `the grey pebble`, `a grey pebble`, `grey pebble`, `the smooth grey pebble`, `a smooth grey pebble`, `smooth grey pebble`, `the pebble`, `a pebble`, `pebble`],
    'the glass cup': [`the glass cup`, `a glass cup`, `glass cup`, `the blown cup`, `a blown cup`, `blown cup`, `the cup`, `a cup`, `cup`,]
};

// state maching
const roomState = {
    'the blue room': [`the yellow room`],
    'the yellow room': [`the red room`, `the green room`, `the blue room`],
    'the red room': [`the yellow room`],
    'the green room': [`the yellow room`, `the purple room`],
    'the purple room': [`the green room`]
};

// variables are global so they can be accessed from anywhere
let currentRoom = `the blue room`;

let roomVar;
let itemI;

let room;
let item;


export const domDisplay = (playerInput) => {
    /* 
        TODO: for students
        - This function must return a string. 
        - This will be the information that is displayed within the browsers game interface above the users input field.

        - This function name cannot be altered. 
        - "playerInput" is whatever text the user is typing within the input field in the browser after hitting the ENTER key.
            - test this out with a console log.

        What your player should be able to do (checklist):
            - move between rooms
            - view current room
            - pickup moveable items
                - there should be at least 2 items that cannot be moved.
            - view player inventory
        
        Stretch Goals:
            - drop items in "current room" (if a player picks up an item in one room and moves to another, they should be able to remove it from their inventory)
            - create win/lose conditions.
                - this could be a puzzle that may require an item to be within the players inventory to move forward, etc.

        HINTS:
            - consider the various methods that are available to use.
            - arrays are a great way to hold "lists".
            - You are not limited to just the exported function. Build additional functions and don't forget to hold the return within a variable.
            - Review notes!
                - Have them open as you build.
                - break down each problem into small chunks
                    - What is the process of picking up an item exactly? ex: Look. Pick from a list of items. Put into players list of items... 
    */

    // return variable
    let output;

    // tracks whether the room needs to be described again
    let justDescribedRoom = false;

    // parsed text variables
    let [action, target] = parseInput(playerInput);
    
    // sets variables up to access properties
    roomVarSetup(target);

    switch (action) {
        
        // -----------------
        // - Move to action

        case `move to`:

            // if the room can't be found anywhere, respond accordingly
            if (!Object.keys(roomState).includes(target)) {
                output = `You sound like a crazy person! ${target} does not exist as a location, at least not in this place.`

            // if room can be accessed from this room via roomState
            } else if (roomState[currentRoom].includes(target)) {

                //change current room to target room
                currentRoom = target;

                //set property access variables to new room
                roomVarSetup(target);

                output = `What you see before you is ${room.description}. ${room.describeItems()}. ${room.describeExits()}.`;
                // indicates no need to add description to output
                justDescribedRoom = true;

            // if room exists but can't be accessed via roomState
            } else {
                output = `You can't get to ${target} from ${currentRoom}...`;
            };
            break;

        // -----------------
        // - Look at action

        case `look at`:

            // if target is not a room, an item in a room, or an item in the inventory
            if (!Object.keys(roomState).includes(target) && !itemIsInRoom(target) && !itemIsInInventory(target)) {
                output = `${target}, huh? You can't look at something that isn't there...`;

            // if the target is a room
            } else if (Object.keys(roomState).includes(target)) {

                //if the target IS the current room
                if (target === currentRoom) {
                    output = `What you see before you is ${room.description}. ${room.describeItems()}. ${room.describeExits()}.`;
                    // indicates no need to add description to output
                    justDescribedRoom = true;
                
                //if the target IS another room
                } else {
                    output = `You can't see ${target} from ${currentRoom}...`
                };
                
            // if the target is an item in the inventory
            } else if (itemIsInInventory(target)) {
                output = `You open your bag, momentarily pull out ${target}, and see ${item.description}.`;

            // if the target is an item in any room
            } else if (itemIsInRoom(target)) {

                // if the target is in current room
                if (room.contains(target)) {
                    output = `You see ${item.description}`;
                    // if the item is fixed
                    if(item.fixed = true) {
                        output += `, fixed in place`;
                    };
                    output += `.`;

                // if the target is in another room
                } else {
                    output = `You can't see ${target} from ${currentRoom}.`;
                };
            };
            break;

        // -----------------
        // - Pick up action

        case `pick up`:

            // if item can't be found in any location, respond accordingly.
            if (!itemIsInRoom(target)) {
                output = `You probably shouldn't touch ${target}. It might not even be an item...`;

            // if item exists in a room, but not the current one, respond accordingly.
            } else if (itemIsInRoom(target) && !room.contains(target)) {
                output = `You can't pick up ${target} from ${currentRoom}...`

            // if item is in location and not fixed in place
            } else if (room.contains(target) && !item.isFixed()) {
         
                // change location property within item to inventory
                item.location = `inventory`;
        
                //add item to inventory
                playerInventory.push(item);
        
                //remove item from room
                room[`items within`].splice(itemI, 1);

                output = `${target} has been placed in your inventory.`;

            // if target exists and is not fixed in place
            } else {
                output = `${target} won't budge.`;
            };
            break;

        // -----------------
        // - Put down action

        case `put down`:

            // if item can't be found in any location, respond accordingly
            if (!itemIsInRoom(target) && !itemIsInInventory(target)) {
                output = `How are you supposed to put down ${target} if it doesn't even exist?`
            
            // if item is in the inventory
            } else if (playerInventory.includes(item)) {

                //change item's location property to the current room
                item.location = currentRoom;

                // add item to current room
                room[`items within`].push(item);

                // remove item from inventory
                playerInventory.splice(playerInventory.indexOf(`target`), 1);

                output = `You put down ${target} in ${currentRoom}.`;
            
            // if the item exists and is not in the inventory
            } else {
                output = `You've got to pick up ${target} to be able to put it back down...`
            };
            break;
            
        // -----------------
        // - Check inventory action

        case `check inventory`:

            // if target isn't an empty string, respond that check inventory doesn't have a target
            if (target.length > 0) {
                output = `You can't check your inventory *for* something, you just have to "check inventory."`

            // if target is an empty string
            } else {

                // if inventory is empty, output nothing's inside
                if (playerInventory.length === 0) {
                    output = ` You open your bag, but nothing's inside...`

                // if inventory has items, output all of them
                } else {
                    output = ``;

                    // for each item
                    playerInventory.forEach(thing => {

                        //if output is empty, add beginning of sentence
                        !output ?
                            output += `You open your bag to find ` :

                            // if output is not empty, put "and" before the next item
                            output += `, and `;

                        // add item to output
                        output += thing.name;
                    });

                    output += `.`
                };
            };

            break;

        // -----------------
        // - Default action

        default:
            output = `I don't know how to ${playerInput}.`;
            break;
    };

    //if the room hasn't been described in this output, add the description
    if (!justDescribedRoom) {
        output += `${' ...'.repeat(20)} You look back up and see ${room.description}. ${room.describeItems()}. ${room.describeExits()}.`
    }
    return parseOutput(output);
};

// parses input
function parseInput(input) {
    // TODO accept 'the' 'a' or ''. 
    // sets input to lower case, and removes any extra spaces from between and outside the string
    input = input.toLowerCase().replace(/\s+/g, ` `).trim();
    // splits string into array of words, stores the first two separately, and the rest in a third variable
    const [actionA, actionB, ...target] = input.toLowerCase().split(` `);

    // stores target as a joined as a string
    let targetString = target.join(` `);

    // gets keys of spelling dictionary object
    const stringKeys = Object.keys(spellingDict);

    // checks each item in each of the spellingDict arrays
    for (let string of stringKeys) {

        // sets target string to the preferred spelling if they match an alternate spelling
        if (spellingDict[string].includes(targetString)) {
            targetString = string;
        }
    };

    // returns action variables joined with a space, and target
    return [actionA + ` ` + actionB, targetString];
};

// capitalizes beginning of sentences for output
function parseOutput(output) {

    //variables for for loop
    let prevChar;
    let currentWord = ``;
    let currentSentence = ``;

    // array of output sentences
    const sentences = [];

    // iterating on input string
    for (let char of output) {
    
        // if current character in not a space, add the character to the current word
        if (char !== ` `) {
            currentWord += char;

        // if current character is a space
        } else {

            //if current sentence is empty, add current word to current sentence without a space, otherwise with a space and set the word back to empty
            currentSentence.length > 0 ? currentSentence += ` ` + currentWord : currentSentence += currentWord;
            currentWord = ``;

            // if current char is space (above) && prev char is sentence-ending punctuation, add current sentence to array and set to empty
            if(prevChar === `.` || prevChar === `!` || prevChar === `?` || prevChar === `"`) {
                sentences.push(currentSentence);
                currentSentence = ``;
                
            }
        };
        // set prev char to char for next loop
        prevChar = char;
    };
    // add current word to last sentence
    currentSentence += ` ${currentWord}`;
    // add sentence to last word
    sentences.push(currentSentence);

    // capitalize the first letter of each sentence and add it to lower case of the rest and store it in words array.
    const words = sentences.map(sentence => {
        return sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
    });
    //return sentences joined with spaces
    return words.join(` `);
};

function roomVarSetup(itemString) {

    // -----------------
    // - Room setup

    // keysArray holds room object variable names
    let keysArray = Object.keys(locationDict);

    //GLOBAL: stores object variable name for current room if it has the room name in its name property
    roomVar = keysArray.find(key => locationDict[key].name === currentRoom);

    // GLOBAL: stores room object's location in the location object.
    room = locationDict[roomVar];

    // -----------------
    // - Item setup

    // if item is in room
    if (itemIsInRoom(itemString)) {

        // GLOBAL: when it finds a string in the name property, it stores the object's index
        itemI = room[`items within`].findIndex(itemIndex =>  itemIndex.name === itemString);

        // GLOBAL: stores the location of the item within the location
        item = room[`items within`][itemI];
    };

    // if item is in inventory
    if (itemIsInInventory(itemString)) {

        // GLOBAL: when it finds a string in the name property, it stores an index
        itemI = playerInventory.findIndex(itemIndex => itemIndex.name === itemString);

        // GLOBAL: stores the location of the item within the inventory
        item = playerInventory[itemI];
    };

    // no else because switch statement in main code will tell user if item doesn't exist.

};

// returns true if item name exists in any item, in any location
function itemIsInRoom(itemString) {
    // holds room variable names
    let keysArray = Object.keys(locationDict);

    // this was a nightmare.
    // uses object.key array to look at each object, if true is recieved from function it returns
    return keysArray.some(place => {

        // per each object (above line), looks at each item, if true is recieved from function, it returns
        return locationDict[place][`items within`].some(thing => {
            
            //if the value of the item's name property matches the item name, OR the item is in the inventory, it returns, and the returns cascade upward
            return thing.name === itemString;
        });
    });
};

// returns true if the item can be found in the inventory
function itemIsInInventory(itemString) {

    // checks every item in inventory to see if the item's name value matches the string
    return playerInventory.some(item => item.name === itemString);
};

// * testing logs
//? object keys test
// console.log(`****object keys test`, Object.keys(locationDict));

//? property access test/reference
// console.log(`item within locations access test`, locationDict.blueRoom[`items within`][1].name);

//? roomVariable() test
// console.log(`****roomVariable() test`, locationDict[roomVariable(currentRoom)]);

// can I put more functions as methods
// 