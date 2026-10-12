
const display = document.getElementById("display");

let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

// Screen update karna
function updateDisplay() {
    display.textContent = currentInput;
}

// Number button
function handleNumber(number) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

// Operator button
function handleOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

// Calculation karna
function calculate() {
    if (operator === "" || shouldResetDisplay) {
        return;
    }

    const previous = Number(previousInput);
    const current = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentInput = "Cannot divide by zero";
                operator = "";
                previousInput = "";
                shouldResetDisplay = true;
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        default:
            return;
    }

    currentInput = String(Number(result.toFixed(8)));
    previousInput = "";
    operator = "";
    shouldResetDisplay = true;

    updateDisplay();
}

// Sab clear karna
function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay();
}

// Aakhri digit delete karna
function deleteLast() {
    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }

    updateDisplay();
}

// Decimal point
function addDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Buttons ko JavaScript se connect karna
document.querySelectorAll("button").forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.dataset.number !== undefined) {
            handleNumber(button.dataset.number);

        } else if (button.dataset.operator !== undefined) {
            handleOperator(button.dataset.operator);

        } else {
            const action = button.dataset.action;

            if (action === "equals") {
                calculate();

            } else if (action === "clear") {
                clearAll();

            } else if (action === "backspace") {
                deleteLast();

            } else if (action === "decimal") {
                addDecimal();
            }
        }

    });

});