import '../js/gameState.js'
import '../js/cards.js'
import '../js/gameButtons.js'
import bet from '../js/bet.js'
import '../js/moneyManagement.js'
import '../js/showOnScreen.js'

//definition of objetcs
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
// definition of card array to grab the images
let allCards = [
    [{value: 1, img: '/img/cards/A.png'}, {value: 11, img: '/img/cards/11.png'}], //pos 0
    {value: 2, img: '/img/cards/2.png'},
    {value: 3, img: '/img/cards/3.png'},
    {value: 4, img: '/img/cards/4.png'},
    {value: 5, img: '/img/cards/5.png'},
    {value: 6, img: '/img/cards/6.png'},
    {value: 7, img: '/img/cards/7.png'},
    {value: 8, img: '/img/cards/8.png'},
    {value: 9, img: '/img/cards/9.png'},
    {value: 10, img: '/img/cards/10.png'} //pos 9
];

let gameStatus;
let players = [];
let gBet = 0;

//--------------
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

    showBetBetScreen(players);
}

initialize();