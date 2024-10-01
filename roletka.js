const spinButton = document.getElementById('spinButton');
const placeBetButton = document.getElementById('placeBet');
const resultText = document.getElementById('result');
const wheel = document.getElementById('rouletteWheel');
const betNumberInput = document.getElementById('betNumber');
const historyList = document.getElementById('history');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');

let lastBet = null; // Przechowujemy ostatnią stawkę

spinButton.addEventListener('click', () => {
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Minimum 720 stopni dla dodatkowego obrotu
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    spinSound.play();

    setTimeout(() => {
        const winningSlotIndex = Math.floor(((randomDegree % 360) / 360) * 20);
        const winningNumber = winningSlotIndex + 1;
        resultText.innerText = `Wynik: ${winningNumber}`;
        historyList.innerHTML += `<li>${winningNumber}</li>`; // Dodajemy wynik do historii

        // Sprawdzamy, czy gracz wygrał
        if (lastBet !== null && lastBet === winningNumber) {
            resultText.innerText += ' - Wygrałeś!';
            winSound.play();
        } else {
            resultText.innerText += ' - Spróbuj ponownie!';
        }
        lastBet = null; // Resetujemy ostatnią stawkę
    }, 4000);
});

placeBetButton.addEventListener('click', () => {
    const betNumber = parseInt(betNumberInput.value);
    if (betNumber >= 1 && betNumber <= 20) {
        lastBet = betNumber;
        resultText.innerText = `Obstawiono numer: ${lastBet}`;
    } else {
        alert('Proszę wpisać numer od 1 do 20.');
    }
});
