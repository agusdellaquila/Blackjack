// changing display
const changeDisplayToPlay = () => {
    document.getElementById('hideChips').style.display = 'none';
    document.getElementById('hidePlayingTable').style.display = 'block';
}
const changeDisplayToBet = () => {
    document.getElementById('hideChips').style.display = 'flex';
    document.getElementById('hidePlayingTable').style.display = 'none';
}
// show cards
const showCards = (obj, side) => {
    let sideTable;
    if (side == 'h') {
        sideTable = document.getElementById('houseTable');
    } else {
        sideTable = document.getElementById('playerTable');
    }

    let contenedor = document.createElement("div");

    obj.hand.forEach(card => {
        contenedor.innerHTML += `<img class="${side}" src="${card.img}" alt="card" class="p2">`
    });

    sideTable.appendChild(contenedor);
};
const showAllCards = (arrayPlayers) => {
    clearTable();
    showCards(arrayPlayers[0], 'p');
    showCards(arrayPlayers[1], 'h');
    document.getElementById('pTotal').innerHTML = "Total: " + arrayPlayers[0].total //mod?
    document.getElementById('pBetDP').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDP').innerHTML = "Money:  " + arrayPlayers[0].money 
};
// show bets 
const showBetBetScreen = (arrayPlayers) => {
    document.getElementById('pBetDB').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDB').innerHTML = "Money:  " + arrayPlayers[0].money 
}
const showBetPlayingScreen = (arrayPlayers) => {
    document.getElementById('pBetDP').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDP').innerHTML = "Money:  " + arrayPlayers[0].money 
}
// clears
const clearTable = () => {
    document.getElementById('playerTable').innerHTML = '';
    document.getElementById('houseTable').innerHTML = '';
}
const clearText = () => {
    document.getElementById('playerTexts').innerText = '';
}

export {changeDisplayToPlay, changeDisplayToBet, showCards, showAllCards, showBetBetScreen, showBetPlayingScreen, clearTable, clearText}