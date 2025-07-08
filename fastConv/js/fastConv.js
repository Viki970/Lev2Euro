// Algorithm for currency conversion between EUR and BGN
const exchangeRate = 1.95580;

// Начални валути
let fromCurrency = "EUR";
let toCurrency = "BGN";

function updateCurrencyLabels() {
    document.getElementById("fromCurrencyDisplay").textContent = fromCurrency;
    document.getElementById("toCurrencyDisplay").textContent = toCurrency;
}


function convertFromInput(source) {
    let inputField = document.getElementById("inputAmount");
    let resultField = document.getElementById("resultAmount");

    // Helper: validate number format (max 9 digits before ".", max 2 after)
    function validate(input) {
        let value = input.value;

        // Get current cursor position
        const selectionStart = input.selectionStart;

        // Remove invalid characters
        value = value.replace(/[^0-9.]/g, '');

        // Split value at dot
        const parts = value.split('.');
        const whole = parts[0] || '';
        const fraction = parts[1] || '';

        // Limit to 9 digits before dot and 2 after
        const limitedWhole = whole.slice(0, 9);
        const limitedFraction = fraction.slice(0, 2);

        const newValue = limitedFraction.length > 0
            ? `${limitedWhole}.${limitedFraction}`
            : limitedWhole;

        // Update value only if changed
        if (input.value !== newValue) {
            input.value = newValue;
        }
    }


    // Validate the current field
    if (source === 'input') {
        validate(inputField);
    } else if (source === 'result') {
        validate(resultField);
    }

    // Convert after validation
    const inputValue = parseFloat(inputField.value) || 0;
    const resultValue = parseFloat(resultField.value) || 0;
    let calculated = 0;

    if (source === 'input') {
        if (fromCurrency === toCurrency) {
            calculated = inputValue;
        } else if (fromCurrency === "EUR" && toCurrency === "BGN") {
            calculated = inputValue * exchangeRate;
        } else if (fromCurrency === "BGN" && toCurrency === "EUR") {
            calculated = inputValue / exchangeRate;
        }
        resultField.value = calculated.toFixed(2);
    }

    if (source === 'result') {
        if (fromCurrency === toCurrency) {
            calculated = resultValue;
        } else if (fromCurrency === "EUR" && toCurrency === "BGN") {
            calculated = resultValue / exchangeRate;
        } else if (fromCurrency === "BGN" && toCurrency === "EUR") {
            calculated = resultValue * exchangeRate;
        }
        inputField.value = calculated.toFixed(2);
    }
}



function swapCurrencies() {
    // Разменя стойностите
    [fromCurrency, toCurrency] = [toCurrency, fromCurrency];

    // Обновява етикетите
    updateCurrencyLabels();

    // Пресмята наново
    convertFromInput('input');
}

// Инициализация
updateCurrencyLabels();
convertFromInput('input');
// Algorithm for currency conversion between EUR and BGN

