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

// add player function
function handleClick(event) {
    const box = event.target
    console.log(box);
    const index = Array.from(box.parentNode.children).indexOf(box);

    // add image of current player
    if (board[index] === '') {
        box.classList.add(currentPlayer === 'X' ? 'wolverine' : 'deadpool');
        const currentImage = currentPlayer === 'X' ? box.querySelector('.wolverine') : box.querySelector('.deadpool');
        currentImage.classList.remove('hidden');
        board[index] = currentPlayer;
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



// determine wins function
function checkWins() {
    const winRows = [
        // rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // diagonals
        [0, 4, 8], [2, 4, 6]
    ];
    for (let row of winRows) {
        const [a, b, c] = row;
        const boxA = tttBoxElems[a];
        const boxB = tttBoxElems[b];
        const boxC = tttBoxElems[c];
        
        if (boxA.classList.contains(currentPlayer === 'X' ? 'wolverine' : 'deadpool') &&
        boxB.classList.contains(currentPlayer === 'X' ? 'wolverine' : 'deadpool') &&
        boxC.classList.contains(currentPlayer === 'X' ? 'wolverine' : 'deadpool')) {
            // turn winning row green. needs fixing
            // boxA.style.backgroundColor = 'green'
            // boxB.style.backgroundColor = 'green'
            // boxC.style.backgroundColor = 'green'
            return true; 
        }
    }

    return false;
}

// tie function
function isTie() {
    return board.every(square => square !== '');
}

// switch between players function
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    console.log(currentPlayer);
}

// reset game
function resetGame() {
    // clear the board
    tttBoxElems.forEach(box => {
        box.classList.remove('wolverine', 'deadpool');
        const images = box.querySelectorAll('img');
        images.forEach(image => {
            image.classList.add('hidden');
            if (image.src.includes('images/wolverine-removebg-preview.png')) {
                image.classList.add('wolverine') 
            } else {
                image.classList.add('deadpool')
            }
        })
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