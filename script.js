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
        'locate', 'view', 'pick up',
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}

class Item {
    constructor(name, description, location) {
        this.name = name;
        this.description = description;
        this.location = location;
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
};

const blueBox = new Item(
    `a blue box`
    ,
    `a blue box made of paper`
    ,
    `the blue room`
    );
const yellowPyramid = new Item(
    `a yellow pyramid`
    ,
    `a yellow pyramid made of stone`
    ,
    `the yellow room`
    );
const redBag = new Item(
    `a red bag`
    ,
    `a red bag made of cloth`
    ,
    `the red room`
    );
const greenCylinder = new Item(
    `a green cylinder`
    ,
    `a green cylinder made of glass`
    ,
    `the green room`
    );
const blueRoom = new Loc(
    `a blue room`
    ,
    `a tranquil room painted blue`
    ,
    [`a yellow room`]
    ,
    [blueBox]
    );
const yellowRoom = new Loc(
    'a yellow room'
    ,
    `a painfully bright yellow room`
    ,
    [`a blue room`, `a red room`]
    ,
    [yellowPyramid]
    );
const redRoom = new Loc(
    `a red room`
    ,
    `an uneasy room painted in red`
    ,
    [`a yellow room`, `a green room`]
    ,
    [redBag]
    );
const greenRoom = new Loc(
    'a green room'
    ,
    `a room of nature, painted green`
    ,
    [`a red room`]
    ,
    [greenCylinder]
    );
// console.log(blueBox);

const locationDict = {blueRoom, yellowRoom, redRoom, greenRoom};

// console.log(locationDict.yellowRoom['items within']);

// function test(dict, value) {
//     console.log(locationDict[dict][value]);
// };
// test('yellowRoom', 'items within');

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

    // Your code here
} 
