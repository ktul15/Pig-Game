var rollDice = document.querySelector(".btn-roll");
var holdDice = document.querySelector(".btn-hold");
var newGame = document.querySelector(".btn-new");
var dice_1 = document.querySelector(".dice-1");
var dice_2 = document.querySelector(".dice-2");
var winScore = document.querySelector("#winScore");
var diceNum1, diceNum2, scores, currentScore, activePlayer, gamePlaying, previousDice1 = 0,
    previousDice2 = 0;

init();

// roll dice Event
rollDice.addEventListener("click", function() {
    if (gamePlaying) {
        // 1. Generate a random number and save it in a variable called "diceNum".
        generateRandomNum();

        console.log(diceNum1, diceNum2, previousDice1, previousDice2);
        // 2. If diceNum is not 1 then add the diceNum to currentScore otherwise go to next player.
        if ((diceNum1 > 1 && diceNum2 > 1) && (diceNum1 !== previousDice1 && diceNum2 !== previousDice2)) {
            // Display the dice-1
            dice_1.style.display = "block";
            dice_2.style.display = "block";

            // Display the dice-1 corresponding to diceNum
            dice_1.src = "dice-" + diceNum1 + ".png";
            dice_2.src = "dice-" + diceNum2 + ".png";

            //add diceNum to currentScore.
            currentScore += diceNum1;
            currentScore += diceNum2;

            // Display the currentScore.
            document.querySelector("#current-" + activePlayer).textContent = currentScore;
        } else {
            if (diceNum1 === 6 && diceNum2 === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            }
            nextPlayer();
        }

        // 3. if a player rolls two 6 in a row then call the nextPlayer() function..
        // Store the diceNum in another variable if it is 6.
        diceNum1 === 6 ? previousDice1 = diceNum1 : previousDice1 = 0;
        diceNum2 === 6 ? previousDice2 = diceNum2 : previousDice2 = 0;

        console.log(diceNum1, diceNum2, previousDice1, previousDice2);

    }
});

// hold the score Event
holdDice.addEventListener("click", function() {
    if (gamePlaying) {
        // add currentScore to Global Score
        scores[activePlayer] += currentScore;

        // update UI.
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // Chack if player won the game.
        if (scores[activePlayer] >= winScore.value) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice-1").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


// newGame Event
newGame.addEventListener("click", init)

//generate a random number and save it into a "diceNum" variable;
function generateRandomNum() {
    diceNum1 = Math.floor(Math.random() * 6 + 1);
    diceNum2 = Math.floor(Math.random() * 6 + 1);
}

// game initializer function
function init() {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    gamePlaying = true;

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    dice_1.style.display = "none";
    dice_2.style.display = "none";

    document.querySelector("#name-0").textContent = "Player-1";
    document.querySelector("#name-1").textContent = "Player-2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}

// function to change the player
function nextPlayer() {
    //next player's turn
    // change the activePlayer variable
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //Next player's score starts with zero
    currentScore = 0;

    // Make currentScore of both the player's zero.
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // toggle active to the corresponding active player's container.
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // hide the dice-1
    // dice-1.style.display = "none";
}