var rollDice = document.querySelector(".btn-roll");
var holdDice = document.querySelector(".btn-hold");
var newGame = document.querySelector(".btn-new");
var image = document.querySelector(".dice");

var diceNum, scores, currentScore, activePlayer, gamePlaying, previousDice = 0;

init();

// roll dice Event
rollDice.addEventListener("click", function() {
    if (gamePlaying) {
        // 1. Generate a random number and save it in a variable called "diceNum".
        generateRandomNum();

        console.log(diceNum, previousDice);
        // 2. If diceNum is not 1 then add the diceNum to currentScore otherwise go to next player.
        if (diceNum !== 1 && diceNum !== previousDice) {
            // Display the image
            image.style.display = "block";

            // Display the image corresponding to diceNum
            image.src = "dice-" + diceNum + ".png";

            //add diceNum to currentScore.
            currentScore += diceNum;

            // Display the currentScore.
            document.querySelector("#current-" + activePlayer).textContent = currentScore;
        } else {
            if (diceNum === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            }
            nextPlayer();
        }

        // 3. if a player rolls two 6 in a row then call the nextPlayer() function..
        // Store the diceNum in another variable if it is 6.
        diceNum === 6 ? previousDice = diceNum : previousDice = 0;
        console.log(diceNum, previousDice);
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
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
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
    diceNum = Math.floor(Math.random() * 6 + 1);
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

    image.style.display = "none";

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

    // hide the image
    // image.style.display = "none";
}