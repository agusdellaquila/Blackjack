// ### MONEY MANAGEMENT FUNCTIONS ###

// -- Function: calculate money total
const moneyTotal = (arrayPlayers, betValue) => {
    arrayPlayers[0].money -= betValue;
    return arrayPlayers[0].money
}
// -- Function: import money from localStorage
const importMoney = () => {
    let money = JSON.parse(localStorage.getItem('money')) || setMoney(10000);
    return money
}
// -- Function: sets money to the localStorage
const setMoney = (newMoneyTotal) => {
    let money = newMoneyTotal;
    money = JSON.stringify(money)
    localStorage.setItem('money', money);
}

export { moneyTotal, importMoney, setMoney }