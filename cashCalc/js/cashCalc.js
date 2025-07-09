const EUR_TO_BGN = 1.95580;

const EUR_DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
const BGN_DENOMINATIONS = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

function syncFromEUR(eurInputId, bgnInputId) {
  const eur = parseFloat(document.getElementById(eurInputId).value) || 0;
  document.getElementById(bgnInputId).value = (eur * EUR_TO_BGN).toFixed(2);
}

function syncFromBGN(bgnInputId, eurInputId) {
  const bgn = parseFloat(document.getElementById(bgnInputId).value) || 0;
  document.getElementById(eurInputId).value = (bgn / EUR_TO_BGN).toFixed(2);
}

function validateAndCalculate(inputId) {
  const input = document.getElementById(inputId);
  let value = input.value.replace(/[^0-9.]/g, '');
  const parts = value.split('.');
  const whole = parts[0] || '';
  const fraction = parts[1] || '';
  const limitedValue = fraction.length > 0 ? `${whole.slice(0, 9)}.${fraction.slice(0, 2)}` : whole.slice(0, 9);
  if (input.value !== limitedValue) input.value = limitedValue;

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

  renderDenomination(changeEUR, EUR_DENOMINATIONS, "denominationEUR", "€", "eur");
  renderDenomination(changeBGN, BGN_DENOMINATIONS, "denominationBGN", "лв", "bgn");
}

function renderDenomination(amount, denominations, containerId, symbol, currencyPrefix) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  let remaining = Math.round(amount * 100); // work in cents/stotinki

  for (let denom of denominations) {
    let denomCents = Math.round(denom * 100);
    let count = Math.floor(remaining / denomCents);

    if (count > 0) {
      const cleanValue = denom % 1 === 0 ? denom.toFixed(0) : denom.toFixed(2).replace(/\.?0+$/, '');
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${count} × ${denom.toFixed(2)} ${symbol}</span>
        <img src="../img/${currencyPrefix}-${cleanValue}.png" alt="${denom} ${symbol}" class="denomination-icon">
      `;
      container.appendChild(li);
      remaining -= count * denomCents;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ['amountDueEUR', 'amountDueBGN', 'paidAmountEUR', 'paidAmountBGN'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      setTimeout(() => validateAndCalculate(id), 0);
    });
  });
});
