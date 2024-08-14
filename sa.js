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
    // { name: "cartoon", Image: "./images/cartoon-1.jpg" },
    // { name: "cat", Image: "./images/cat.jpg" },
    // { name: "cycle", Image: "./images/cycle.jpg" },
    // { name: "dog", Image: "./images/dog.jpg" },
    // { name: "cow", Image: "./images/cow.jpg" },
    // { name: "spiderman", Image: "./images/spiderman.jpg" }
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

const cardChecking = () => {
    let flippedCards = [];
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Flip the clicked card
            card.classList.add("flip");

            flippedCards.push(card);

            // Check if two cards are flipped
            if (flippedCards.length === 2) {
                const [firstCard, secondCard] = flippedCards;
                // Check if the two flipped cards match
                if (firstCard.dataset.name === secondCard.dataset.name) {
                    // Matched cards remain flipped
                    count += 1;
                    flippedCards = [];
                } else {
                    // Unmatched cards flip back after a short delay
                    setTimeout(() => {
                        firstCard.classList.remove("flip");
                        secondCard.classList.remove("flip");
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
};

const setTimer = () => {
    let seconds = 0;
    let minute = 0;
    let counter = setInterval(() => {
        seconds += 1;

        if (seconds === 60) {
            minute += 1;
            seconds = 0;
        }

        let formattedSec = seconds < 10 ? '0' + seconds : seconds;
        let formattedMin = minute < 10 ? '0' + minute : minute;
        time.innerHTML = `<span>Time : ${formattedMin}:${formattedSec}</span>`; // i should add span tag here to show time

        if (count === 8) { 
            clearInterval(counter);
            return;
        }
    }, 1000);
};

// Game Over Function 
// const gameOver = () => {
//     // Determine the winner based on scores
//     console.log("p1moves",p1moves);
    
//     console.log("p2moves",p2moves);
    
//     if (p1moves < p2moves) {
//         displayWon.classList.add("p2");
//     } else if (p1moves > p2moves) {
//         displayWon.classList.add("p1");
//     } else {
//         displayWon.classList.add("draw"); // In case of a tie (optional)
//     }
    
//     // Display final scores
//     p1DOMScore.innerText = `${p1score}`;
//     p2DOMScore.innerText = `${p2score}`;

//     // Optionally, you might want to disable further interactions when the game is over
//     const cards = document.querySelectorAll(".card");
//     cards.forEach(card => {
//         card.style.pointerEvents = "none"; // Disable clicking on cards
//     });
    
//     // Show the game over screen or a message
//     gameOverCard.classList.remove("none");

//     resetGame(); // Reset the game when it's over
// };

const playingTogether = () => {
    console.log("Playing together");

    // Hide unnecessary elements
    time.classList.add("none");
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
// Track time taken by each player
let p1TotalTime = 0;
let p2TotalTime = 0;

const playOneByOne = () => {
    let p1TimeCounter, p2TimeCounter; // Separate counters for each player
    let p1Finished = false;
    let p2Finished = false;

    const startTimer = (player) => {
        let seconds = 0;
        let minutes = 0;

        return setInterval(() => {
            seconds += 1;
            if (seconds === 60) {
                minutes += 1;
                seconds = 0;
            }

            let formattedSec = seconds < 10 ? '0' + seconds : seconds;
            let formattedMin = minutes < 10 ? '0' + minutes : minutes;

            if (player === 'p1') {
                p1Time.innerHTML = `<span>Time : ${formattedMin}:${formattedSec}</span>`;
            } else {
                p2Time.innerHTML = `<span>Time : ${formattedMin}:${formattedSec}</span>`;
            }
        }, 1000);
    };

    const playTurn = (player) => {
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
                        playerMoveElem.innerText = `${playerMoves}`;
                        if (firstCard.dataset.name === secondCard.dataset.name) {
                            count += 1;
                            playerScore += 1;
                            playerScoreElem.innerText = `${playerScore}`;
                            flippedCards = [];

                            if (count === 2) {
                                if (player === 'p1') {
                                    p1Finished = true;
                                    clearInterval(p1TimeCounter);
                                    p1TotalTime = player1Time; // Save P1's total time
                                    currentPlayer = 'p2';
                                    if (!p2Finished) {
                                        playTurn('p2'); // Start player 2's turn
                                    }
                                } else {
                                    p2Finished = true;
                                    clearInterval(p2TimeCounter);
                                    p2TotalTime = player2Time; // Save P2's total time
                                    if (p1Finished) gameOver(); // End the game if both players are finished
                                }
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

        if (player === "p1") {
            p1TimeCounter = startTimer('p1');
        } else {
            p2TimeCounter = startTimer('p2');
        }
    };

    playTurn(currentPlayer); // Start with player 1
};

// Modify the gameOver function to determine the winner based on moves and time
const gameOver = () => {
    let p1TotalScore = p1score;
    let p2TotalScore = p2score;

    // Determine the winner based on score, moves, and time
    if (p1TotalScore > p2TotalScore) {
        displayWon.classList.add("p1");
    } else if (p2TotalScore > p1TotalScore) {
        displayWon.classList.add("p2");
    } else {
        // If scores are tied, compare moves and time
        if (p1moves < p2moves || (p1moves === p2moves && p1TotalTime < p2TotalTime)) {
            displayWon.classList.add("p1");
        } else if (p2moves < p1moves || (p2moves === p1moves && p2TotalTime < p1TotalTime)) {
            displayWon.classList.add("p2");
        } else {
            displayWon.classList.add("draw"); // In case of a tie
        }
    }

    // Display final scores
    p1DOMScore.innerText = `${p1score}`;
    p2DOMScore.innerText = `${p2score}`;

    // Disable further interactions and show the game over screen
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.pointerEvents = "none";
    });
    
    gameOverCard.classList.remove("none");
    resetGame();
};









const startGame = () => {
    gameInProgress = true; // Set the flag to true when the game starts
    playingMode.forEach(radio => {
        radio.disabled = true; // Disable the mode selection inputs
    });

    if (gameType === "PlayTogether") {
        playingTogether();
    } else {
        playOneByOne();
    }
};

const resetGame = () => {
    gameInProgress = false; // Reset the flag when the game ends
    playingMode.forEach(radio => {
        radio.disabled = false; // Re-enable the mode selection inputs
    });

    // Reset other game-related variables and UI as needed
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
    renderCards();  // Re-render the cards for a new game
};

// =================================================================
//              All Event Listeners
// =================================================================

playingMode.forEach(radio => {
    radio.addEventListener("change", e => {
        if (!gameInProgress) { // Allow mode change only if no game is in progress
            gameType = e.target.value;
        } else {
            alert("You cannot change the mode while the game is in progress!");
        }
    });
});

closeBtn.addEventListener("click", e => {
    e.preventDefault();
    gameOverCard.classList.add("none");
    resetGame(); // Reset the game when the game over screen is closed
});

playBtn.addEventListener("click", e => {
    if (gameType == null) {
        alert("Please select the Playing Mode");
    } else if (!gameInProgress) {
        startGame(); // Start the game if it's not already in progress
    } else {
        alert("A game is already in progress!");
    }
});

// =================================================================
//              init
// =================================================================

renderCards();
// cardChecking();
