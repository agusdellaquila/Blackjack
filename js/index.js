//definition
class Player {
    constructor(name, hand, total, money, bet) {
        this.name = name;
        this.hand = hand;
        this.total = total;
        this.money = money;
        this.bet = bet;
    }
    stakes = (betValue) => {
        if (betValue <= this.money) {
            this.bet += betValue;
        } else {
            console.log('no enough money for that bet')
        }
    }

    handTotal = () => {
        this.total = this.hand.reduce((total, currentValue) => total + currentValue.value, 0);
    }

    bankrupt = () => {
        if (this.money == 0) {
            console.log('game over')
        }
    }
}
class House {
    constructor(hand, total, money, bet) {
        this.hand = hand;
        this.total = total;
        this.money = money;
        this.bet = bet;
    }
    stakes = () => {
        let min, max;
        min = 1;
        max = (this.money + 1);
        betValue = Math.floor(Math.random() * (max - min) + min)
        if (betValue > 0) this.bet += betValue;
        //else house bankrupt
    }

    handTotal = () => {
        this.total = this.hand.reduce((total, currentValue) => total + currentValue.value, 0);
    }

    bankrupt = () => {
        if (this.money == 0) {
            console.log('house over')
        }
    }
}
let allCards = [
    {value: 1, img: '/img/cards/A.png'}, //pos0
    {value: 2, img: '/img/cards/2.png'},
    {value: 3, img: '/img/cards/3.png'},
    {value: 4, img: '/img/cards/4.png'},
    {value: 5, img: '/img/cards/5.png'},
    {value: 6, img: '/img/cards/6.png'},
    {value: 7, img: '/img/cards/7.png'},
    {value: 8, img: '/img/cards/8.png'},
    {value: 9, img: '/img/cards/9.png'},
    {value: 10, img: '/img/cards/10.png'},
    {value: 11, img: '/img/cards/11.png'}, //pos 10
];
let gameStatus;
let players = [];
let gBet = 0;

//functions
const initialize = () => {
    //inicializacion
    let name; //dom
    let playerHand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
    let houseHand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
    let total = 0;
    let money = importMoney();
    
    //---------------------
    let player = new Player('name', playerHand, total, money, gBet);
    let house = new House(houseHand, total, money, gBet);
    
    players = [player, house]

    showBetDB(players);
}
const newCards = (arrayPlayers) => {
    arrayPlayers[0].hand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
    arrayPlayers[1].hand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
    console.log(arrayPlayers[0])
}
const start = (arrayPlayers) => {
    changeDisplayToPlay();
    gameStatus = true;
    newCards(arrayPlayers);
    totals(arrayPlayers)
    hideHouse(arrayPlayers); //lama a showall MAL
    showBetDP(arrayPlayers);
}
const showBetDB = (arrayPlayers) => {
    document.getElementById('pBetDB').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDB').innerHTML = "Money:  " + arrayPlayers[0].money 
}
const showBetDP = (arrayPlayers) => {
    document.getElementById('pBetDP').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDP').innerHTML = "Money:  " + arrayPlayers[0].money 
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
const bet = (arrayPlayers, betValue) => {
    gBet += betValue;
    arrayPlayers[0].stakes(betValue);
    let newMoneyTotal = moneyTotal(arrayPlayers, betValue);
    setMoney(newMoneyTotal);
    showBetDB(arrayPlayers);
}
const moneyTotal = (arrayPlayers, betValue) => {
    arrayPlayers[0].money -= betValue;
    return arrayPlayers[0].money
}
const importMoney = () => {
    let money = JSON.parse(localStorage.getItem('money')) || setMoney(10000);
    return money
}
const setMoney = (newMoneyTotal) => {
    let money = newMoneyTotal;
    money = JSON.stringify(money)
    localStorage.setItem('money', money);
}



const randomizer = (allCards) => {
    let randomNumber;
    const min = 0; //inclusive
    const max = 11; //exclusive
    randomNumber = Math.floor(Math.random() * (max - min) + min) 
    return allCards[randomNumber]
};
const clearTable = () => {
    document.getElementById('playerTable').innerHTML = '';
    document.getElementById('houseTable').innerHTML = '';
}
const clearText = () => {
    document.getElementById('playerTexts').innerText = '';
}
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
const hideHouse = (arrayPlayers) => {
    showAllCards(arrayPlayers);

    let arrayHouseCards = document.getElementsByClassName('h');
    arrayHouseCards[0].src = "/img/cards/cardBack.png";
}
const changeDisplayToPlay = () => {
    document.getElementById('hideChips').style.display = 'none';
    document.getElementById('hidePlayingTable').style.display = 'block';
}
const changeDisplayToBet = () => {
    document.getElementById('hideChips').style.display = 'flex';
    document.getElementById('hidePlayingTable').style.display = 'none';
}
const showAllCards = (arrayPlayers) => {
    clearTable();
    showCards(arrayPlayers[0], 'p');
    showCards(arrayPlayers[1], 'h');
    document.getElementById('pTotal').innerHTML = "Total: " + arrayPlayers[0].total //mod?
    document.getElementById('pBetDP').innerHTML = "Bet: " + arrayPlayers[0].bet
    document.getElementById('pMoneyDP').innerHTML = "Money:  " + arrayPlayers[0].money 
};


// BTNS
const addCard = (arrayPlayers) => {
    if (gameStatus) {
        arrayPlayers[0].hand.push(randomizer(allCards))
        
        checkCardsTotal(arrayPlayers) ? keepPlaying(arrayPlayers) : gameover(arrayPlayers);        
    }
};
const stay = (arrayPlayers) => { 
    if (gameStatus) {
        gameover(arrayPlayers);       
    }
};
const double = (arrayPlayers) => { 
    if (gameStatus) {
        
    }
};

//double te tenes q plantar si o si desp


//
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

initialize();