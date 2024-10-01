const playerCardsDiv = document.getElementById('playerCards');
const dealerCardsDiv = document.getElementById('dealerCards');
const playerValueSpan = document.getElementById('playerValue');
const dealerValueSpan = document.getElementById('dealerValue');
const gameResult = document.getElementById('gameResult');
const startGameButton = document.getElementById('startGame');
const hitButton = document.getElementById('hit');
const standButton = document.getElementById('stand');

let deck = [];
let playerHand = [];
let dealerHand = [];

function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11; // As może być 1 lub 11, ale na razie traktujemy jako 11
    } else {
        return parseInt(card.value);
    }
}

function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        value += getCardValue(card);
        if (card.value === 'A') {
            aceCount++;
        }
    }
    // Jeśli wartość przekracza 21, zmieniamy wartość asa z 11 na 1
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function renderHand(hand, container) {
    container.innerHTML = '';
    for (let card of hand) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
            <span class="suit">${card.suit}</span>
            ${card.value}
            <span class="suit bottom">${card.suit}</span>
        `;
        container.appendChild(cardDiv);
    }
}

function updateValues() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    playerValueSpan.textContent = playerValue;
    dealerValueSpan.textContent = dealerValue;
}

function dealCardToPlayer() {
    const card = deck.pop();
    playerHand.push(card);
    renderHand(playerHand, playerCardsDiv);
    updateValues();
    checkForBust();
}

function dealCardToDealer() {
    const card = deck.pop();
    dealerHand.push(card);
    renderHand(dealerHand, dealerCardsDiv);
    updateValues();
}

function checkForBust() {
    const playerValue = calculateHandValue(playerHand);
    if (playerValue > 21) {
        gameResult.textContent = 'Przegrałeś! Masz powyżej 21.';
        hitButton.disabled = true;
        standButton.disabled = true;
    }
}

function startNewGame() {
    deck = createDeck().sort(() => Math.random() - 0.5); // Tasowanie talii
    playerHand = [];
    dealerHand = [];
    gameResult.textContent = '';
    hitButton.disabled = false;
    standButton.disabled = false;
    
    // Gracz i krupier dostają po dwie karty
    dealCardToPlayer();
    dealCardToPlayer();
    dealCardToDealer();
    dealCardToDealer();
}

function endGame() {
    hitButton.disabled = true;
    standButton.disabled = true;
    const playerValue = calculateHandValue(playerHand);
    let dealerValue = calculateHandValue(dealerHand);
    
    // Krupier dobiera karty do wartości minimum 17
    while (dealerValue < 17) {
        dealCardToDealer();
        dealerValue = calculateHandValue(dealerHand);
    }
    
    if (dealerValue > 21 || playerValue > dealerValue) {
        gameResult.textContent = 'Wygrałeś!';
    } else if (dealerValue === playerValue) {
        gameResult.textContent = 'Remis!';
    } else {
        gameResult.textContent = 'Krupier wygrał!';
    }
}

startGameButton.addEventListener('click', startNewGame);
hitButton.addEventListener('click', dealCardToPlayer);
standButton.addEventListener('click', endGame);
