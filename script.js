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
    title: 'The World of Placeholder',
    desc: 'Welcome to the world of Placeholder... here are some quick rules & concepts... More to come...',
    author: 'Scott Lee',
    cohort: 'PTSB-june-2023',
    startingRoomDescription: 'What you see before you is a blue room.',
    playerCommands: [
        // replace these with your games commands as needed
        // 'inspect', 'view', 'look', 'pickup',
        'move to', 'look at', 'pick up',
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
    constructor(name, description, exits, itemsWithin) {
        super(name, description);
        this.exits = exits;
        this[`items within`] = itemsWithin;
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
};

// item ojects
const blueBox = new Item(
    `the blue box`
    ,
    `a blue box made of paper`
    ,
    `the blue room`
    ,
    false
    );
const yellowPyramid = new Item(
    `the yellow pyramid`
    ,
    `a yellow pyramid made of stone`
    ,
    `the yellow room`
    ,
    true
    );
const redCloth = new Item(
    `the red cloth`
    ,
    `a red cloth made of velvet`
    ,
    `the red room`
    ,
    false
    );
const greenCylinder = new Item(
    `the green cylinder`
    ,
    `a green cylinder made of glass`
    ,
    `the green room`
    ,
    true
    );

// location objects
const blueRoom = new Loc(
    `the blue room`
    ,
    `a tranquil room painted blue`
    ,
    [`the yellow room`]
    ,
    // ! testing - yellowPyramid for testing fixed objects before player can move rooms needs to be removed
    [blueBox, yellowPyramid]
    );
const yellowRoom = new Loc(
    'the yellow room'
    ,
    `a painfully bright yellow room`
    ,
    [`the blue room`, `the red room`]
    ,
    [yellowPyramid]
    );
const redRoom = new Loc(
    `the red room`
    ,
    `an uneasy room painted in red`
    ,
    [`the yellow room`, `the green room`]
    ,
    [redCloth]
    );
const greenRoom = new Loc(
    'the green room'
    ,
    `a room of nature, painted green`
    ,
    [`the red room`]
    ,
    [greenCylinder]
    );

// * testing
// console.log(blueRoom.contains(`the blue box`));

//dictionaries and inentory
const locationDict = {blueRoom, yellowRoom, redRoom, greenRoom};
const itemDict = {blueBox, yellowPyramid, redCloth, greenCylinder};
const playerInventory = [];

// * testing
// console.log(greenRoom.contains(`the blue box`));
// console.log(greenRoom.contains(`the blue box`));
// console.log(locationDict);
// console.log(locationDict.yellowRoom[`items within`]);
// console.log(blueBox);

// state maching
const roomState = {
    'the blue room': [`the yellow room`],
    'the yellow room': [`the red room`, `the blue room`],
    'the red room': [`the green room`, `the yellow room`],
    'the green room': [`the red room`]
};

// variables are global so they can be accessed by functions and functions within other functions
let currentRoom = `the blue room`;

let roomVar;
let itemI;

let room;
let item;

// * testing
// console.log(roomState[currentRoom])

/* pseudo code for state change
'the yellow room'
if roomState[currentRoom].includes(target)
*/

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

    //return variable
    let output;

    // parsed text variables
    let [action, target] = parseInput(playerInput);

    // *testing
    // console.log(action, target);
    
    // stores the variable string for the current room, and it's location in the object.
    roomVar = roomVariable(currentRoom);
    room = locationDict[roomVar];

    // stores the index string for the target item within the current room, and it's location in the object
    itemI = itemIndex(target);
    item = room[`items within`][itemI];

    switch (action) {
        
        // TODO move to action
        case `move to`:
            break;

        // TODO look at action
        case `look at`:
            break;

        // TODO pick up action
        case `pick up`:

            // if item can't be found in any location, respond accordingly.
            if (!exists(target)) {
                output = `You probably shouldn't touch ${target}. It might not even be an item...`;
                break;

            // if item is in location and not fixed in place
            } else if (room.contains(target) && !item.isFixed()) {
         
                // change location variable within item to inventory
                item.location = `inventory`;
        
                //add item to inventory
                playerInventory.push(item);
        
                //remove item from room
                room[`items within`].splice(itemI, 1);

                output = `${target} has been placed in your inventory.`;
                break;

            } else {
                output = `${target} won't budge.`;
                break;
            };


        default:
            output = `I don't know how to ${playerInput}`;
            break;
    };

    return output;
};

// parses input
function parseInput(input) {
    // sets input to lower case, and removes any extra spaces from between and outside the string
    input = input.toLowerCase().replace(/\s+/g, ` `).trim();
    // splits string into array of words, stores the first two separately, and the rest in a third variable
    const [actionA, actionB, ...target] = input.toLowerCase().split(` `);
    // returns action variables joined with a space, and the target array joined as a string
    return [actionA + ` ` + actionB , target.join(` `)];
};

// *testing
// console.log(parseInput('move to the red room'));


// returns room object variable name
function roomVariable(roomString) {
    // keysArray holds room object variable names
    let keysArray = Object.keys(locationDict);

    //returns object variable name if it has the room name in its name property
    return keysArray.find(key => locationDict[key].name === roomString)
};

// returns item object index given child property
function itemIndex(itemString) {

    // * I finally !@$#ing #@$% made it work. It's so pretty now.
    // when it finds a string in the name property, it returns the object's index
    return room[`items within`].findIndex(itemIndex =>  itemIndex.name === itemString);

    // * for loop - works, but ^ is better
    // When it finds a matching string it returns the index number
    // for (let itemIndex in locationDict[roomVariable(roomString)][`items within`]) {
    //     if (locationDict[roomVariable(roomString)][`items within`][itemIndex].name === itemString) {
    //         return itemIndex;
    //     };
    // };

};

// returns true if item name exists in any item, in any location
function exists(itemString) {
    // holds room variable names
    let keysArray = Object.keys(locationDict);

    // this was a nightmare.
    // uses objust key array to look at each object, if true is recieved from function it returns
    return keysArray.some(place => {
        // per each object (above line), looks at each item, if true is recieved from function, it returns
        return locationDict[place][`items within`].some(thing => {
            
            // * testing
            // console.log('place:', place, 'thing:', thing, 'thing.name:', thing.name, 'itemString:', itemString, 'truth:', thing.name === itemString);
            
            //if the value of the items name property returns true, it returns, and the returns cascade upward
            return thing.name === itemString
        });
    });
};

// * testing logs
//? object keys test
// console.log(`****object ke ys test`, Object.keys(locationDict));

//? property access test/reference
// console.log(`item within locations access test`, locationDict.blueRoom[`items within`][1].name);

//? roomVariable() test
// console.log(`****roomVariable() test`, locationDict[roomVariable(currentRoom)]);

// can I put more functions as methods
// 