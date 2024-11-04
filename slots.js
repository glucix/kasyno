const slots = [];
for (let i = 1; i <= 9; i++) {
    slots.push(document.getElementById(`slot${i}`));
}

const result = document.getElementById("result");
const spinButton = document.getElementById("spinButton");
const allInButton = document.getElementById("allInButton");

const balanceDisplay = document.getElementById("balance");
const betAmountInput = document.getElementById("betAmount");

let balance = 1600;
const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉"];
let spinningInterval;
let winChance = 0.50;

spinButton.addEventListener("click", function () {
    const spinCost = parseInt(betAmountInput.value);

    if (isNaN(spinCost) || spinCost <= 0) {
        result.textContent = "Proszę wpisać poprawną kwotę!";
        return;
    }

    if (balance < spinCost) {
        result.textContent = "Nie masz wystarczająco pieniędzy, aby zakręcić!";
        return;
    }

    spinButton.disabled = true;

    balance -= spinCost;
    updateBalance();

    startSpinning();

    setTimeout(() => {
        let spins = [];

        if (Math.random() < winChance) {
            const winningSymbol = getRandomSymbol();
            for (let i = 0; i < 9; i++) {
                spins.push(winningSymbol);
            }
        } else {
            for (let i = 0; i < 9; i++) {
                spins.push(getRandomSymbol());
            }
        }

        stopSpinning();

        slots.forEach((slot, index) => {
            slot.textContent = spins[index];
        });

        if (spins.every((symbol) => symbol === spins[0])) {
            const winAmount = calculateWin(spinCost);
            balance += winAmount;
            updateBalance();
            result.textContent = `Gratulacje! Wygrałeś ${winAmount} zł!`;
        } else {
            result.textContent = "Spróbuj ponownie!";
        }

        spinButton.disabled = false;
    }, 2000);
});

allInButton.addEventListener("click", function () {
    const allInAmount = balance;

    if (balance <= 0) {
        result.textContent = "Nie masz wystarczająco pieniędzy, aby zakręcić!";
        return;
    }

    spinButton.disabled = true;
    allInButton.disabled = true;

    balance = 0;
    updateBalance();

    startSpinning();

    setTimeout(() => {
        let spins = [];

        if (Math.random() < winChance) {
            const winningSymbol = getRandomSymbol();
            for (let i = 0; i < 9; i++) {
                spins.push(winningSymbol);
            }
        } else {
            for (let i = 0; i < 9; i++) {
                spins.push(getRandomSymbol());
            }
        }

        stopSpinning();

        slots.forEach((slot, index) => {
            slot.textContent = spins[index];
        });

        if (spins.every((symbol) => symbol === spins[0])) {
            const winAmount = calculateWin(allInAmount);
            balance += winAmount;
            updateBalance();
            result.textContent = `Gratulacje! Wygrałeś ${winAmount} zł!`;
        } else {
            result.textContent = "Spróbuj ponownie!";
        }

        spinButton.disabled = false;
        allInButton.disabled = false;
    }, 2000);
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateBalance() {
    balanceDisplay.textContent = balance;
}

function calculateWin(spinCost) {
    return Math.floor(Math.random() * 51) + spinCost * 6;
}

function startSpinning() {
    spinningInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.textContent = getRandomSymbol();
        });
    }, 100);
}

function stopSpinning() {
    clearInterval(spinningInterval);
}
