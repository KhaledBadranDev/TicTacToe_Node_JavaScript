/**
 * Make sure you have Node, The "prompt-sync" Node module and NPM installed to be able to run this script.
 * @author Khaled Badran (Programming Gym) <gym4programming@gmail.com>
 */


// numbers of the tiles of playing grid.
const playingFieldTileNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] 

const clearConsole = () => process.stdout.write('\033c'); // to clear the screen/terminal
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); // causes the current thread to suspend execution for a specified period (ms)

// to get input from the console
// to be able to use The "prompt-sync" Node module  :-
// open the shell/console/terminal  
// navigate to the directory where ticTacToe is
// then run the following command
// npm install prompt-sync
const prompt = require('prompt-sync')({sigint: true});


/**
 * clear the console and greet the player only one time in the beginning of the game
 */
function printGreeting(){
    clearConsole();
    console.log("\t<<WELCOME TO TIC-TAC-TOE GAME>>\n\t  ");

}

/**
 * build the game grid as a string and return it
 * @param {number} cellNumber the number of the cell. Defaults to 0.
 * @param {string} symbol the symbol of the players either X or O. Defaults to "".
 * @returns {string} the game grid including the inputs
 */
function buildPlayingField(tileNumber = 0, symbol = ""){

    if (tileNumber){ // to avoid printing the following when we start the game for the first time.
        clearConsole();
        console.log("\t<<TIC-TAC-TOE>>"); // just to make the game look realistic
        console.log("\t  -----------");
    }

    let tileIndex;
    if (symbol  && tileNumber) { // if we are not printing the playing_field/ grid for the first time. If the game has already started.   
        tileIndex = tileNumber - 1;
        playingFieldTileNumbers[tileIndex] = symbol.toUpperCase();
    }

    // Build the game grid
    tileIndex = 0;
    let playingFieldStructure = "\t  _____________\n";
    for(let i = 0; i < 3; i++){ // the game grid consists of 3 rows.
        playingFieldStructure += "\t  ";
        for(let j = 0; j < 3; j++){ // every row consists of 3 tiles/cells/squares
            playingFieldStructure += "| " + playingFieldTileNumbers[tileIndex] + " ";
            tileIndex += 1
        }
        playingFieldStructure += "|\n";
        playingFieldStructure += "\t  |___|___|___|\n";
    }
    return playingFieldStructure;
}

/**
 * get the symbols of the player and of the computer (X or O)
 * @returns {object} the player symbol and the computer symbol
 */
function getSymbols() {
    let playerSymbolChoice = prompt("Do you want to be X or O? ");
    while (playerSymbolChoice.toUpperCase() !== "X" && playerSymbolChoice.toUpperCase() !== "O") { // make sure that the player chooses either X or O
        console.log("Please enter a valid symbol.\nPlease enter either x or o.")
        playerSymbolChoice = prompt("")
    }

    let computerSymbol;
    if ( String(playerSymbolChoice).toUpperCase() == "X") // if the player chose X then the computer would be O and vise versa. 
        computerSymbol = "O";
    else 
        computerSymbol = "X";

    return {playerSymbolChoice, computerSymbol}
}


/**
 * get the number of the tile/cell that the player wants to choose.
 * @returns {number} number of the tile/cell that the computer randomly chose
 */
function getPlayerTileNumber() {

    let tileNumber = 0
    let tileNumberStr = "GARBAGE"
    let validNumbersStr = "123456789"

    while (!validNumbersStr.includes(tileNumberStr) || tileNumberStr.length !== 1) { // if the input is not valid/ correct
        tileNumberStr = prompt("please enter a number of a cell/square from 1 to 9: "); 
        
        if (validNumbersStr.includes(tileNumberStr) && tileNumberStr.length === 1) {
            tileNumber = Number(tileNumberStr) // typecasting 
            if (! isTileEmpty(tileNumber)){ // if the cell is not empty then the player can't choose it.
                console.log(`The cell number (${tileNumber}) is not empty.`);
                tileNumberStr = "GARBAGE"
            }
        }
    }

    return tileNumber;
}


/**
 * determine whether the cell at the given number empty or not 
 * @param {number} tileNumber number of the cell that the player/computer chose
 * @returns {boolean} True if the cell is empty. Otherwise False.
 */
function isTileEmpty(tileNumber) {
    const allEmptyTilesStr = "123456789"; 
    let tileIndex = tileNumber - 1; 
    // if the cell has any number then it is empty and can be used
    // if the cell has x or o in it then it is not empty and can't be used.
    return allEmptyTilesStr.includes(playingFieldTileNumbers[tileIndex]);
}


/**
 * get the tile/cell/square number from the computer
 * @returns {number} number of the tile/cell that the computer randomly chose
 */
function getComputerTileNumber() {

    let tileNumber = 0;
    while (tileNumber < 1 || tileNumber > 9 || !isTileEmpty(tileNumber)) // choose a random empty cell
        tileNumber = Math.floor(Math.random() * 9) + 1; // random tile number [1 : 9]

    return tileNumber
}

/**
 * check whether the game is over or not.
 * @returns {boolean} True if the game is over. Else False
 */
function gameOver() {
    for(let i = 0; i < 3; i++) { // if one column is completely filled with X or with O. 
        if (playingFieldTileNumbers[i] === playingFieldTileNumbers[i+3] &&  playingFieldTileNumbers[i] === playingFieldTileNumbers[i+6]) {
            printWinner(playingFieldTileNumbers[i])
            return true
        }
    }

    for(let i = 0; i < 9; i += 3) {// if one row is completely filled with X or with O.    
        if (playingFieldTileNumbers[i] === playingFieldTileNumbers[i+1] &&  playingFieldTileNumbers[i] === playingFieldTileNumbers[i+2]) {
            printWinner(playingFieldTileNumbers[i])
            return true
        }
    }

    // if one diagonal is completely filled with X or with O.    
    if (playingFieldTileNumbers[0] === playingFieldTileNumbers[4] &&  playingFieldTileNumbers[0] === playingFieldTileNumbers[8]) {
        printWinner(playingFieldTileNumbers[0])
        return true
    }
    if (playingFieldTileNumbers[2] === playingFieldTileNumbers[4] &&  playingFieldTileNumbers[2] === playingFieldTileNumbers[6]) {
        printWinner(playingFieldTileNumbers[2])
        return true
    }

    for (let i = 1; i < 10; i++) // if no one won and there is still one empty cell, then the game is not over yet. 
        if (isTileEmpty(i)) 
            return false

    // if there is no empty cells anymore and no one won. 
    console.log("Game Over")        
    console.log("Draw")        
    return true
}


/**
 * print who won the game either X or O
 * @param {string} winner the winner of the game either X or O
 */
function printWinner(winner) {
    // time.sleep(0.50)
    console.log("Game Over.")
    console.log("The winner is " + winner.toUpperCase()) 
}


/**
 * The main function of the game. run the game and end it, if the game is over.  
 */
async function runGame() {
    printGreeting();

    process.stdout.write("\t ");
    for(let i = 0; i < 6; i++){ // to make the game look a little bit realistic
        await sleep(500); 
        process.stdout.write("-----"); // print to the console without printing a newline
    }
    console.log("");

    console.log(buildPlayingField());

    let symbols = getSymbols()
    let playerSymbol =  symbols.playerSymbolChoice;
    let computerSymbol = symbols.computerSymbol;

    let tileNumber;
    while (!gameOver()) {
        tileNumber = getPlayerTileNumber()
        console.log(buildPlayingField(tileNumber, playerSymbol))
        if (gameOver())
            break
        tileNumber = getComputerTileNumber()
        console.log("please, wait. It is "+ computerSymbol + "'s Turn ....")
        await sleep(2000); // causes the current thread to suspend execution for 2 seconds
        console.log(buildPlayingField(tileNumber, computerSymbol))
        await sleep(500); // causes the current thread to suspend execution for 0.5 second
        if (gameOver())
            break
    }
}

runGame()

