const EUR_TO_BGN = 1.95580;

function syncFromEUR(eurInputId, bgnInputId) {
    const eur = parseFloat(document.getElementById(eurInputId).value) || 0;
    document.getElementById(bgnInputId).value = (eur * EUR_TO_BGN).toFixed(2);
}

function syncFromBGN(bgnInputId, eurInputId) {
    const bgn = parseFloat(document.getElementById(bgnInputId).value) || 0;
    document.getElementById(eurInputId).value = (bgn / EUR_TO_BGN).toFixed(2);
}

function validateAndCalculate(inputType) {
    // Валидация на стойността
    const input = document.getElementById(inputType);
    let value = input.value;

    // Премахваме невалидни символи
    value = value.replace(/[^0-9.]/g, '');

    // Разделяме по десетичната точка
    const parts = value.split('.');
    const whole = parts[0] || '';
    const fraction = parts[1] || '';

    // Ограничения
    const limitedWhole = whole.slice(0, 9);
    const limitedFraction = fraction.slice(0, 2);

    const newValue = limitedFraction.length > 0
        ? `${limitedWhole}.${limitedFraction}`
        : limitedWhole;

    // Присвояваме стойността обратно
    if (input.value !== newValue) {
        input.value = newValue;
    }

    // Пресмятаме рестото
    const amountDueBGN = parseFloat(document.getElementById("amountDueBGN").value) || 0;
    const paidAmountBGN = parseFloat(document.getElementById("paidAmountBGN").value) || 0;

    let changeBGN = paidAmountBGN - amountDueBGN;
    let changeEUR = changeBGN / EUR_TO_BGN;

    if (changeBGN < 0) {
        changeBGN = 0;
        changeEUR = 0;
    }

    document.getElementById("changeBGN").textContent = changeBGN.toFixed(2);
    document.getElementById("changeEUR").textContent = changeEUR.toFixed(2);
}


document.addEventListener('DOMContentLoaded', function () {
    ['amountDueEUR', 'amountDueBGN', 'paidAmountEUR', 'paidAmountBGN'].forEach(id => {
        document.getElementById(id).addEventListener('input', function () {
            // Подсигуряваме че validateAndCalculate се вика веднага след всяка промяна
            setTimeout(() => validateAndCalculate(id), 0);
        });
    });
});