// =================================================================
//              All DOM Elements
// =================================================================
const cardWrapper = document.querySelector(".card-wrapper");
const time = document.getElementById("time");
const moves = document.getElementById("move");
const cards = document.querySelectorAll(".card");
const p1Card = document.getElementById("player-1-card");
const p2Card = document.getElementById("player-2-card");
const p1Time = document.getElementById("p1-time");
const p2Time = document.getElementById("p2-time");
const p1move = document.getElementById("p1-move");
const p2move = document.getElementById("p2-move");
const playingMode = document.querySelectorAll('input[type="radio"]');
const closeBtn = document.getElementById("close-btn");
const gameOverCard = document.getElementById("game-over");
const displayWon = document.getElementById("won");
const p1DOMScore = document.getElementById("p1-score");
const p2DOMScore = document.getElementById("p2-score");
const p1CurrentScore = document.getElementById("p1-current-score");
const p2CurrentScore = document.getElementById("p2-current-score");
const playBtn = document.getElementById("PlayBtn");

// =================================================================
//              All Required Variables
// =================================================================
let cardsData = [
    { name: "man", Image: "./images/3d-man.jpg" },
    { name: "bike", Image: "./images/bike.jpg" },
    { name: "cartoon", Image: "./images/cartoon-1.jpg" },
    { name: "cat", Image: "./images/cat.jpg" },
    { name: "cycle", Image: "./images/cycle.jpg" },
    { name: "dog", Image: "./images/dog.jpg" },
    { name: "cow", Image: "./images/cow.jpg" },
    { name: "spiderman", Image: "./images/spiderman.jpg" }
];
let count = 0;
let moveCount = 0;
let player1Time = 0;
let player2Time = 0;
let p1moves = 0;
let p2moves = 0;
let p1score = 0;
let p2score = 0;
let gameType = null;
let gameInProgress = false; // Add this flag to track game status
let currentPlayer = 'p1';
let flippedCards = [];

// Duplicate the cardsData to create pairs of each card
cardsData = [...cardsData, ...cardsData];

// =================================================================
//              All Functions
// =================================================================
const randomShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const renderCards = () => {
    cardWrapper.innerHTML = '';  // Clear any existing cards
    const shuffledCards = randomShuffle(cardsData);
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-container');
        cardElement.innerHTML = `
            <div class="card" data-name="${card.name}">
                <div class="front">?</div>
                <div class="back"><img src="${card.Image}"></div>
            </div>
        `;
        cardWrapper.appendChild(cardElement);
    });
};


// Game Over Function 
const gameOverOneByOne = () => {
    if (p1moves > p2moves) {
        displayWon.classList.add("p2");
        displayWon.innerHTML = `<span class="won">Player 2</span> won`
    } else if (p1moves < p2moves) {
        displayWon.classList.add("p1");
        displayWon.innerHTML = `<span class="won">Player 1</span> won`
    } else {
        displayWon.classList.add("draw"); // In case of a tie (optional)
        displayWon.innerHTML = `<span class="won">Match Drawn</span> `
    }
    p1DOMScore.innerText = `${p1moves}`;
    p2DOMScore.innerText = `${p2moves}`;
    // Optionally, you might want to disable further interactions when the game is over
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.pointerEvents = "none"; // Disable clicking on cards
    });
    gameOverCard.classList.remove("none");
    resetGame(); 
};



const gameOver = () => {
    if (p1score > p2score) {
        displayWon.classList.add("p2");
        displayWon.innerHTML = `<span class="won">Player 2</span> won`
    } else if (p1score < p2score) {
        displayWon.classList.add("p1");
        displayWon.innerHTML = `<span class="won">Player 1</span> won`
    } else {
        displayWon.classList.add("draw"); // In case of a tie (optional)
        displayWon.innerHTML = `<span class="won">Match Drawn</span> `
    }
    p1DOMScore.innerHTML = `Score : <span class="p2-score" >${p1score}</span>`;
    p2DOMScore.innerHTML = `Score : <span class="p2-score" >${p2score}</span>`;
    // Optionally, you might want to disable further interactions when the game is over
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.pointerEvents = "none"; // Disable clicking on cards
    });
    gameOverCard.classList.remove("none");
    resetGame(); 
};



const playingTogether = () => {
    console.log("Playing together");

    // Hide unnecessary elements
    
    p1Time.classList.add("none");
    p2Time.classList.add("none");

    const togglePlayer = () => {
        setTimeout(() => {
            if (currentPlayer === 'p1') {
                currentPlayer = 'p2';
                p1Card.classList.remove("enable");
                p2Card.classList.add("enable");
            } else {
                currentPlayer = 'p1';
                p2Card.classList.remove("enable");
                p1Card.classList.add("enable");
            }
        }, 1000); // Delay of 1 second (1000 milliseconds)
    };

    const cards = document.querySelectorAll(".card");
    let flippedCards = [];

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (flippedCards.length < 2 && !card.classList.contains("flip")) {
                card.classList.add("flip"); // Flip the clicked card
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [firstCard, secondCard] = flippedCards;

                    // Increment the move counter only after two cards are flipped
                    if (currentPlayer === 'p1') {
                        p1moves += 1;
                        p1move.innerHTML = `<span>${p1moves}</span>`;
                    } else {
                        p2moves += 1;
                        p2move.innerHTML = `<span>${p2moves}</span>`;
                    }

                    if (firstCard.dataset.name === secondCard.dataset.name) {
                        // Matched cards remain flipped
                        count += 1;
                        flippedCards = [];
                        console.log("Count", count);

                        if (currentPlayer === 'p1') {
                            p1score += 1;
                            p1CurrentScore.innerText =  `${p1score}`;
                        } else {
                            p2score += 1;
                            p2CurrentScore.innerText =  `${p2score}`;
                        }

                        // Check if all pairs are found
                        if (count === 8) {
                            setTimeout(gameOver(), 500); // End the game if all pairs are found
                        }
                    } else {
                        // Unmatched cards flip back after a short delay
                        setTimeout(() => {
                            firstCard.classList.remove("flip");
                            secondCard.classList.remove("flip");
                            flippedCards = [];
                        }, 1000);
                    }

                    // Switch the player after handling the current pair of cards
                    togglePlayer();
                }
            }
        });
    });

    // Initial player setup
    if (currentPlayer === 'p1') {
        p1Card.classList.add("enable");
    } else {
        p2Card.classList.add("enable");
    }
};

// Function to play one by one
const playOneByOne = () => {
    let p1TimeCounter, p2TimeCounter; // Separate counters for each player
    let p1Finished = false;
    let p2Finished = false;

    const startTimer = (player) => {
        let seconds = 0;
        let minute = 0;
        return setInterval(() => {
            seconds += 1;
            if (seconds === 60) {
                minute += 1;
                seconds = 0;
            }
            let formattedSec = seconds < 10 ? '0' + seconds : seconds;
            let formattedMin = minute < 10 ? '0' + minute : minute;
            if (player === 'p1') {
                p1Time.innerHTML = `<span>Time : ${formattedMin}:${formattedSec}</span>`;
            } else {
                p2Time.innerHTML = `<span>Time : ${formattedMin}:${formattedSec}</span>`;
            }
        }, 1000);
    };

    const endTurn = (player) => {
        if (player === 'p1') {
            p1Finished = true;
            clearInterval(p1TimeCounter);
            currentPlayer = 'p2';
            if (!p2Finished) {
                playTurn('p2'); // Start player 2's turn
            } else {
                gameOverOneByOne(); // Both players have finished
            }
        } else {
            p2Finished = true;
            clearInterval(p2TimeCounter);
            if (p1Finished) gameOverOneByOne(); // End the game if both players are finished
        }
    };

    const playTurn = (player) => {
        count = 0; // Reset count for the new player's turn
        if (player === "p1") {
            p1Card.classList.add("enable");
            p2Card.classList.remove("enable");
            p1TimeCounter = startTimer('p1');
        } else {
            p2Card.classList.add("enable");
            p1Card.classList.remove("enable");
            p2TimeCounter = startTimer('p2');
        }

        renderCards(); // Render new cards for the current player

        let playerMoves = player === 'p1' ? p1moves : p2moves;
        let playerScore = player === 'p1' ? p1score : p2score;
        let playerMoveElem = player === 'p1' ? p1move : p2move;
        let playerScoreElem = player === 'p1' ? p1CurrentScore : p2CurrentScore;

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                if (currentPlayer === player && !card.classList.contains("flip")) {
                    card.classList.add("flip");
                    flippedCards.push(card);
                    if (flippedCards.length === 2) {
                        const [firstCard, secondCard] = flippedCards;
                        playerMoves += 1;
                        if (currentPlayer == 'p1') {
                            p1moves += 1
                        }
                        else{
                            p2moves += 1
                        }
                        playerMoveElem.innerText = `${playerMoves}`;
                        if (firstCard.dataset.name === secondCard.dataset.name) {
                            count += 1;
                            playerScore += 1;
                            playerScoreElem.innerText = `${playerScore}`;
                            flippedCards = [];

                            if (count === 8) { // Check if all pairs are matched for the player
                                endTurn(player);
                            }
                        } else {
                            setTimeout(() => {
                                firstCard.classList.remove("flip");
                                secondCard.classList.remove("flip");
                                flippedCards = [];
                            }, 1000);
                        }
                    }
                }
            });
        });
    };

    playTurn(currentPlayer);
};


// Function to start game
const startGame = () => {
    gameInProgress = true; 
    count = 0;
    moveCount = 0;
    player1Time = 0;
    player2Time = 0;
    p1moves = 0;
    p2moves = 0;
    p1score = 0;
    p2score = 0;
    currentPlayer = 'p1';
    flippedCards = [];
    playingMode.forEach(radio => {
        radio.disabled = true; 
    });
console.log("pla",gameType);

    if (gameType === "PlayTogether") {
        playingTogether();
    } else {
        playOneByOne();
    }
};


// Function to end game
const resetGame = () => {
    gameInProgress = false; 
    playingMode.forEach(radio => {
        radio.disabled = false; 
    });


    count = 0;
    moveCount = 0;
    player1Time = 0;
    player2Time = 0;
    p1moves = 0;
    p2moves = 0;
    p1score = 0;
    p2score = 0;
    currentPlayer = 'p1';
    flippedCards = [];
    renderCards();  
};

// =================================================================
//              All Event Listeners
// =================================================================

// Event Listener to get the playing mode
playingMode.forEach(radio => {
    radio.addEventListener("change", e => {
        if (!gameInProgress) {
            gameType = e.target.value;
        } else {
            alert("You cannot change the mode while the game is in progress!");
        }
    });
});

// Event Listener to close game card
closeBtn.addEventListener("click", e => {
    e.preventDefault();
    resetGame(); // Reset the game when the game over screen is closed
    gameOverCard.classList.add("none");
});


// Event Listener to start game
playBtn.addEventListener("click", e => {
    if (gameType == null) {
        alert("Please select the Playing Mode");
    } else if (!gameInProgress) {
        startGame(); 
    } else {
        alert("A game is already in progress!");
    }
});

// =================================================================
//              init
// =================================================================

renderCards();
// cardChecking();
