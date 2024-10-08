const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const result = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

const balanceDisplay = document.getElementById("balance");
const betAmountInput = document.getElementById("betAmount"); // Pole tekstowe do wprowadzania stawki

let balance = 500; // Początkowy stan konta gracza
const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉"];
let spinningInterval;  // Zmienna do przechowywania ID interwału
let winChance = 0.45; // Ustalmy, że gracz ma 45% szans na wygraną

spinButton.addEventListener("click", function() {
    const spinCost = parseInt(betAmountInput.value); // Pobierz wpisaną stawkę

    // Sprawdzenie, czy wpisano poprawną kwotę
    if (isNaN(spinCost) || spinCost <= 0) {
        result.textContent = "Proszę wpisać poprawną kwotę!";
        return;
    }

    if (balance < spinCost) {
        result.textContent = "Nie masz wystarczająco pieniędzy, aby zakręcić!";
        return;
    }

    // Wyłącz przycisk Zakręć, aby zapobiec spamowi
    spinButton.disabled = true;

    // Odejmujemy koszt zakręcenia
    balance -= spinCost;
    updateBalance();

    // Rozpoczynamy animację kręcenia
    startSpinning();

    // Symulujemy opóźnienie w zatrzymaniu slotów
    setTimeout(() => {
        let spin1, spin2, spin3;

        // Zwiększamy szanse na wygraną (45% szans na trzy identyczne symbole)
        if (Math.random() < winChance) {
            // Jeśli gracz ma wygrać, ustawiamy trzy takie same symbole
            const winningSymbol = getRandomSymbol();
            spin1 = winningSymbol;
            spin2 = winningSymbol;
            spin3 = winningSymbol;
        } else {
            // Inaczej losujemy standardowo
            spin1 = getRandomSymbol();
            spin2 = getRandomSymbol();
            spin3 = getRandomSymbol();
        }

        // Zatrzymujemy animację
        stopSpinning();

        // Ustawiamy finalne symbole
        slot1.textContent = spin1;
        slot2.textContent = spin2;
        slot3.textContent = spin3;

        // Sprawdzamy, czy wygrano (dla pewności)
        if (spin1 === spin2 && spin2 === spin3) {
            const winAmount = calculateWin(spinCost); // Obliczamy wygraną na podstawie stawki
            balance += winAmount;
            updateBalance();
            result.textContent = `Gratulacje! Wygrałeś ${winAmount} zł!`;
        } else {
            result.textContent = "Spróbuj ponownie!";
        }

        // Po zakończeniu kręcenia, ponownie aktywuj przycisk
        spinButton.disabled = false;
    }, 2000); // 2 sekundy "kręcenia"
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateBalance() {
    balanceDisplay.textContent = balance;
}

function calculateWin(spinCost) {
    return Math.floor(Math.random() * 51) + spinCost * 5; // Nagroda zależna od stawki (np. 5x stawka)
}

// Funkcje do uruchamiania i zatrzymywania "animacji"
function startSpinning() {
    spinningInterval = setInterval(() => {
        slot1.textContent = getRandomSymbol();
        slot2.textContent = getRandomSymbol();
        slot3.textContent = getRandomSymbol();
    }, 100); // Zmieniamy symbole co 100 ms
}

function stopSpinning() {
    clearInterval(spinningInterval); // Zatrzymujemy zmianę symboli
}