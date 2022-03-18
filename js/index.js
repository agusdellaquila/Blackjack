//functions
const randomizer = () => {
    let randomNumber;
    const min = 1; //inclusive
    const max = 12; //exclusive
    return randomNumber = Math.floor(Math.random() * (max - min) + min) 
}

const stakes = () => {
    let stakeMsj = document.getElementById('playerTexts');
    stakeMsj.innerHTML = 'How much do you wish to stake?'
} 

const cardsTotal = (playerArray) => {
    let total = 0;
    // total = cardArray.reduce((previousValue, currentValue) => {previousValue + currentValue});
    playerArray.forEach(item => {
        total += item
    });
    return total
}

const showCardsTotal = (total) => {
    let cardsTotal = document.getElementById('playerTexts');
    cardsTotal.innerHTML = 'Your cards total is ' + total;
}

const blackjack = () => {
    let winner = document.getElementById('playerTexts');
    winner.innerHTML = 'BLACKJACK! you win: '//bet;
}

const playerWin = () => {
    let winner = document.getElementById('playerTexts');
    winner.innerHTML = 'you win: '//bet;
}

const playerLoose = () => {
    let looser = document.getElementById('playerTexts');
    looser.innerHTML = 'you lost :( '//bet;
}

const checkBlackjack = (total) => {
    if (total == 21) {
        blackjack();
    }
}

const addCard = (playerArray) => {
    playerArray.push(randomizer())
}

const checkWinner = (playerArray, houseArray) => {
    let playerTotal;
    let houseTotal;

    playerTotal = cardsTotal(playerArray);
    houseTotal = cardsTotal(houseArray);

    if (playerTotal >= houseTotal) {
        playerWin();
    } else {
        playerLoose();
    }
}

const game = () => {
    //starts with 10.000 coins to stake
    
    //stakes(); //async; asks for bet needs to check if there is enough money for the bet.
    //manage total $
    //after it resolves it calls clear()

    //creates each array with 2 starting cards, at random
    let playerCards = [randomizer(),randomizer()];
    let houseCards = [randomizer(),randomizer()];

    let total = 0;
    total = cardsTotal(playerCards);
    checkBlackjack(total);
    showCardsTotal(total); //repeated l84

    //separete func?
    // while (total <= 21) {
        showCardsTotal(total);
        //if blackjack, then end

        //else
        //waits for btn event od +1card or stay
        //if +1card
        addCard(playerCards);
        addCard(houseCards);
    
        //if stay
        checkWinner(playerCards, houseCards);
    
        console.log(playerCards)
    // }



}

game();


