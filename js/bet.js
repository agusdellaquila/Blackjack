import '../js/moneyManagement.js'
import '../js/showOnScreen.js'

// ### BET FUNCTIONS ###

// -- Function: changes global bet state
const bet = (arrayPlayers, betValue) => {
    gBet += betValue;
    arrayPlayers[0].stakes(betValue);
    let newMoneyTotal = moneyTotal(arrayPlayers, betValue);
    setMoney(newMoneyTotal);
    showBetBetScreen(arrayPlayers);
}

export {bet}