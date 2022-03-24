import '../js/cards.js'
import '../js/gameState.js'


// BTNS
const addCard = (arrayPlayers, gameStatus) => {
    if (gameStatus) {
        arrayPlayers[0].hand.push(randomizer(allCards))
        
        checkCardsTotal(arrayPlayers) ? keepPlaying(arrayPlayers) : gameover(arrayPlayers);        
    }
};
const stay = (arrayPlayers, gameStatus) => { 
    if (gameStatus) {
        gameover(arrayPlayers);       
    }
};
const double = (arrayPlayers, gameStatus) => { 
    if (gameStatus) {
        
    }
};

export {addCard, stay, double}