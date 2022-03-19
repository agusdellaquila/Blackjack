//objects
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

    handTotal = (playerCards) => {
        this.total = playerCards.reduce((total, currentValue) => total + currentValue, 0);
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

    handTotal = (houseCards) => {
        this.total = houseCards.reduce((total, currentValue) => total + currentValue, 0);
    }

    bankrupt = () => {
        if (this.money == 0) {
            console.log('house over')
        }
    }
}
let allCards = [
    {value: 1, img: '/img/cards/A.png'},
    {value: 2, img: '/img/cards/2.png'},
    {value: 3, img: '/img/cards/3.png'},
    {value: 4, img: '/img/cards/4.png'},
    {value: 5, img: '/img/cards/5.png'},
    {value: 6, img: '/img/cards/6.png'},
    {value: 7, img: '/img/cards/7.png'},
    {value: 8, img: '/img/cards/8.png'},
    {value: 9, img: '/img/cards/9.png'},
    {value: 10, img: '/img/cards/10.png'},
    {value: 11, img: '/img/cards/11.png'},
];
//functions
const randomizer = (allCards) => {
    let randomNumber;
    const min = 1; //inclusive
    const max = 12; //exclusive
    randomNumber = Math.floor(Math.random() * (max - min) + min) 
    return allCards[randomNumber]
}
const showCards = (obj) => {
    let playerTable = document.getElementById('playerCards');
    
    let contenedor = document.createElement("div");

    console.log(obj.hand)

    obj.hand.forEach(card => {
        console.log(card)
        contenedor.innerHTML += `<img src="${card.img}" alt="card" class="ps2 pe2"></img>`
    });
    playerTable.appendChild(contenedor);
}
//--------------------------------------------
//inicializacion
let name; //dom
let playerHand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
let houseHand = [randomizer(allCards), randomizer(allCards)]; //inic en 2
let total = 0;
let money = 10000; //maybe dom
let bet = 0; 
//---------------------
let player = new Player('name', playerHand, total, money, bet);
let house = new House(houseHand, total, money, bet);

// previos al game, checkear bets y demas

const game = () => {
    showCards(player, house);
}

game();


