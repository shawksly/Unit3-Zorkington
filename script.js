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
        if ((this[`items within`].find(seeking => seeking.name === item) == null)) {
            return false;
        } else {
            return true;
        };
    };
};

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
const blueRoom = new Loc(
    `the blue room`
    ,
    `a tranquil room painted blue`
    ,
    [`the yellow room`]
    ,
    [blueBox]
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
console.log(blueRoom.contains(`the blue box`));

const locationDict = {blueRoom, yellowRoom, redRoom, greenRoom};
const playerInventory = [];

console.log(greenRoom.contains(`the blue box`));
console.log(greenRoom.contains(`the blue box`));
console.log(locationDict);
console.log(locationDict.yellowRoom[`items within`]);
console.log(blueBox);

// function test(dict, value) {
//     console.log(locationDict[dict][value]);
// };
// test('yellowRoom', 'items within');

const roomState = {
    'the blue room': [`the yellow room`],
    'the yellow room': [`the red room`, `the blue room`],
    'the red room': [`the green room`, `the yellow room`],
    'the green room': [`the red room`]
};

let currentRoom = `the blue room`;
console.log(roomState[currentRoom])
/* 
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

    let output;
    let inputResponse;
    
    let [action, target] = parseInput(playerInput);
    console.log(action, target);

    switch (action) {
        case `move to`:
            break;
        case `look at`:
            break;
        case `pick up`:
            break;
        default:
            inputResponse = `I don't know how to ${playerInput}`;
    };

    output = inputResponse;

    return output;
};

function parseInput(input) {
    input = input.toLowerCase().replace(/\s+/g, ` `).trim();
    const [actionA, actionB, ...target] = input.toLowerCase().split(` `);
    return [actionA + ` ` + actionB , target.join(` `)];
};
console.log(parseInput('move to the red room'));

// console.log(isInRoom(blueRoom, 'the blue box'))

function pickUp() {
    if ()
    
    /* 
    if item ffffffffff
    */
};

console.log(pickUp('the blue box'));
// console.logObject.keys(locationDict.blueRoom["items within"])
console.log(locationDict.blueRoom[`items within`][0].name);
blueRoom[`items within`]//possible use includes instead, or look at site >>>>