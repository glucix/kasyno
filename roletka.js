// Pobieranie elementów DOM
const spinButton = document.getElementById('spinButton');
const placeBetButton = document.getElementById('placeBet');
const resultText = document.getElementById('result');
const wheel = document.getElementById('rouletteWheel');
const betNumberInput = document.getElementById('betNumber');
const historyList = document.getElementById('history');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');

let lastBet = null; // Przechowujemy ostatnią stawkę
let isSpinning = false; // Flaga, aby zablokować wielokrotne klikanie

// Liczba slotów i szerokość pojedynczego slotu
const totalSlots = 20;
const slotWidth = 60; // Szerokość jednego slotu w px
const totalWidth = slotWidth * totalSlots;

// Funkcja do losowania liczby w określonym zakresie
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja do losowania stopni obrotu w poziomie (w pikselach)
function getRandomTranslateX() {
    const fullSpins = getRandomInt(3, 6); // Ilość pełnych obrotów
    const extraSlots = getRandomInt(0, totalSlots - 1); // Dodatkowe sloty
    return fullSpins * totalWidth + extraSlots * slotWidth;
}

// Funkcja do obliczenia wygranego numeru na podstawie przesunięcia
function calculateWinningNumber(translateX) {
    // Całkowity przesunięty poziom
    const totalShift = translateX % totalWidth;
    // Obliczamy, który slot jest wyświetlany na początku kontenera
    const winningSlotIndex = Math.floor(totalShift / slotWidth);
    // Sloty są indeksowane od 0 do 19, a numery od 1 do 20
    // Dodajemy 1, ponieważ indeksowanie zaczyna się od 0
    return winningSlotIndex + 1;
}

// Zakręć kołem
spinButton.addEventListener('click', () => {
    if (isSpinning) return; // Jeśli już trwa kręcenie, nic nie rób
    if (lastBet === null) {
        alert('Najpierw postaw zakład!');
        return;
    }

    isSpinning = true; // Ustaw flagę, aby zablokować wielokrotne kręcenie
    const randomTranslateX = getRandomTranslateX(); // Losowe przesunięcie
    const randomSpeed = getRandomInt(3, 5); // Losowa prędkość obrotu w sekundach

    // Ustawienie czasu trwania animacji
    wheel.style.transition = `transform ${randomSpeed}s ease-out`;
    // Obrót koła w poziomie
    wheel.style.transform = `translateX(-${randomTranslateX}px)`;
    spinSound.play();

    // Po zakończeniu animacji
    setTimeout(() => {
        const winningNumber = calculateWinningNumber(randomTranslateX);

        // Wyświetlenie wyniku
        resultText.innerText = `Wynik: ${winningNumber}`;
        historyList.innerHTML += `<li>${winningNumber}</li>`; // Dodaj wynik do historii

        // Sprawdzenie, czy gracz wygrał
        if (parseInt(winningNumber) === lastBet) {
            resultText.innerText += ' - Wygrałeś!';
            winSound.play();
        } else {
            resultText.innerText += ' - Spróbuj ponownie!';
        }

        // Resetowanie stanu gry
        lastBet = null;
        isSpinning = false;

        // Resetowanie pozycji koła, aby uniknąć bardzo dużych wartości translateX
        wheel.style.transition = 'none';
        wheel.style.transform = `translateX(-${randomTranslateX % totalWidth}px)`;
    }, randomSpeed * 1000); // Czekaj na zakończenie animacji
});

// Postaw zakład
placeBetButton.addEventListener('click', () => {
    const betNumber = parseInt(betNumberInput.value);
    if (betNumber >= 1 && betNumber <= 20) {
        lastBet = betNumber;
        resultText.innerText = `Obstawiono numer: ${lastBet}`;
    } else {
        alert('Proszę wpisać numer od 1 do 20.');
    }
});
