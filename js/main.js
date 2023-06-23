//Ik had alles gemaakt in OneDrive in het begin dus er zijn niet veel commit messages

const cells = document.querySelectorAll(".cell");
const statText = document.querySelector(".statText");
const restartBtn = document.querySelector(".restartBtn");
const myMusic = document.querySelector(".myMusic");
const invisBtn = document.querySelector(".invisBtn");
myMusic.volume = 0.2;       //als background muziek niet werkt verander dit naar 0.3 of terug naar 0.2 totdat het werkt



const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; // elke mogelijke manier om te winnen

let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
   cells.forEach(cell => cell.addEventListener("click", cellClicked))
   restartBtn.addEventListener("click", restartGame)
   statText.textContent = `${currentPlayer}'s turn`;
   running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    } //on click sound
    const audio = new Audio(`/audio/click.mp3`);
    audio.play();

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statText.textContent = `${currentPlayer}'s turn`;
 //veranderd text onder bij een andere turn
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == cellB == "" || cellC == ""){
            continue;
        }  
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        statText.textContent = `${currentPlayer} wins!`;
        running = false
    
    //win sound

    const audio = new Audio(`/audio/win.mp3`);
    audio.play();

    }
    else if(!options.includes("")){
        statText.textContent = `Draw :/`;
        running = false;
    
    //draw sound

    const audio = new Audio(`/audio/rizz.mp3`);
    audio.play();
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "",];
    statText.textContent = `${currentPlayer} 's turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true

    const audio = new Audio(`/audio/pop.mp3`);
    audio.play();

}


