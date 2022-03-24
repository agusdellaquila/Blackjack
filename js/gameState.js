import '../js/showOnScreen.js'
import '../js/cards.js'
import '../js/gameState.js'
import '../js/moneyManagement.js'

//
const start = (arrayPlayers) => {
    changeDisplayToPlay();
    gameStatus = true;
    newCards(arrayPlayers);
    totals(arrayPlayers)
    hideHouse(arrayPlayers); //lama a showall MAL
    showBetPlayingScreen(arrayPlayers);
}
const keepPlaying = (arrayPlayers) => {
    gameStatus = true;
    hideHouse(arrayPlayers);
}
const playAgain = () => { //WHEN PLAY AGAIN, MONEY RESTARTS TO 10000, SAVE ON LS?
    clearTable();
    clearText();
    changeDisplayToBet();
    window.location.reload();
}
//
const gameover = (arrayPlayers) => {
    gBet = 0;
    gameStatus = false;
    totals(arrayPlayers);
    if ((arrayPlayers[0].total > arrayPlayers[1].total) && (arrayPlayers[0].total <= 21)) { //EMPATE????
        playerwins(arrayPlayers);
    } else {
        playerlose(arrayPlayers);
    }
    showAllCards(arrayPlayers); //revela la de house
}
const playerwins = (arrayPlayers) => {
    let winText = document.getElementById('playerTexts');
    winText.innerHTML = "YOU WON!";
    winText.style.color = "#cae500"
    winText.style.fontWeight = "bold"
    winText.style.fontSize = "36px"

    arrayPlayers[0].money += Math.floor((arrayPlayers[0].bet * 1.25));
    setMoney(arrayPlayers[0].money);
}
const playerlose = () => {
    let loseText = document.getElementById('playerTexts');
    loseText.innerHTML = "YOU LOST :(";
    loseText.style.color = "#dc3545"
    loseText.style.fontWeight = "bold"
    loseText.style.fontSize = "36px"

    arrayPlayers[0].money -= arrayPlayers[0].bet;
    setMoney(arrayPlayers[0].money);
}

export {start, keepPlaying, playAgain, gameover, playerwins, playerlose}