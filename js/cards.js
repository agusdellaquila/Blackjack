// randomizes the picking cards
const randomizer = (allCards) => {
    let randomNumber;
    const min = 0; //inclusive
    const max = 9; //exclusive
    randomNumber = Math.floor(Math.random() * (max - min) + min) 
    if (randomNumber == 0) {
        let chooseA = prompt("Choose your 'A' card value:")
        let ret = allCards[0]
        if (chooseA == '1') {
            return ret[0]
        }
        else {
            return ret[1]
        }
    }
    return allCards[randomNumber]
};
// sets the initial new cards of both players
const newCards = (arrayPlayers) => {
    arrayPlayers[0].hand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
    arrayPlayers[1].hand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
}
// checking the value of the sum of the cards
const checkCardsTotal = (arrayPlayers) => {
    totals(arrayPlayers);

    let ret = true;

    if ((arrayPlayers[0].total >= 21) || (arrayPlayers[1].total >= 21)) {
        ret = false;
    }

    return ret
}
const totals = (arrayPlayers) => {
    arrayPlayers[0].handTotal();
    arrayPlayers[1].handTotal();
}
// hiding the house card
const hideHouse = (arrayPlayers) => {
    showAllCards(arrayPlayers);

    let arrayHouseCards = document.getElementsByClassName('h');
    arrayHouseCards[1].src = "/img/cards/cardBack.png";
}

export {randomizer, newCards, checkCardsTotal, totals, hideHouse}
