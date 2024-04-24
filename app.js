// determine elements
const tttBoxElems = document.querySelectorAll('.box')
const boardElem = document.querySelector('.board')
const messageElem = document.querySelector('.message')
const playAgainBtn = document.querySelector('.playagain-btn')
const oPlayerScoreElem = document.querySelector('.o-score-value')
const xPlayerScoreElem = document.querySelector('.x-score-value')
const tieScoreElem = document.querySelector('.tie-score-value')

let currentPlayer = 'X';
let board = ['', '', '' , '', '', '', '', '', '' ]

// events
tttBoxElems.forEach(box => {
    box.addEventListener('click', handleClick)
})

playAgainBtn.addEventListener('click', resetGame)

// functions
function handleClick(event) {
    const box = event.target
    const index = Array.from(box.parentNode.children).indexOf(box);

    // add symbol of current player
    if (board[index] === '') {
        board[index] = currentPlayer;
        box.querySelector('img').src = currentPlayer === 'X' ? 'images/wolverine-removebg-preview.png' : 'images/deadpool-removebg-preview.png';

    // check if there is a winner
        if (checkWins(currentPlayer)) {
            // show play again button
            playAgainBtn.classList.remove('hidden')
            // show message
            messageElem.textContent = "You won!"
            messageElem.style.color = "green"
            // update score
            if (currentPlayer === 'O') {
                oPlayerScoreElem.textContent = Number(oPlayerScoreElem.textContent) + 1;
            } else {
                xPlayerScoreElem.textContent = Number(xPlayerScoreElem.textContent) + 1;
            }
            // turn winning row green
            
        } else if (isTie()){
            // show play again button
            playAgainBtn.classList.remove('hidden')
            // show message
            messageElem.textContent = "It's a tie!"
            // update score
            tieScoreElem.textContent = Number(tieScoreElem.textContent) + 1
        } else {
            // if there is no winner, go to next player
            switchPlayer()
        }
    }
}



// determine wins
function checkWins(boardElem) {
    const winRows = [
        // rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // diagonals
        [0, 4, 8], [2, 4, 6]
    ]

    for (let row of winRows) {
        const [a, b, c] = row
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }   
    }
        return null;
}

function isTie() {
    return board.every(square => square !== '');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// reset game
function resetGame() {
    // clear the board
    tttBoxElems.forEach(box => {
        box.textContent = ''
    })
    // hide the play again button
    playAgainBtn.classList.add('hidden')
    // reset the message
    messageElem.textContent = ''
    // reset the current player
    currentPlayer = 'X'
    // reset the board array
    board = ['', '', '', '', '', '', '', '', '']
}