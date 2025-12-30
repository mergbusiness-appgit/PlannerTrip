let tempItems = [];
let itinerary = [];
let orders = [];
let rate = 0.15; // TRY → MYR approx

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
}

/* ITINERARY */
function addTempItem() {
  tempItems.push({
    day: day.value,
    time: time.value,
    place: place.value,
    map: map.value
  });
  renderTemp();
}

function renderTemp() {
  tempList.innerHTML = tempItems.map(i =>
    `<div class="item">${i.time} - ${i.place}
     <a href="${i.map}" target="_blank">📍</a></div>`
  ).join('');
}

function saveDay() {
  itinerary.push(...tempItems);
  tempItems = [];
  renderTemp();
  itineraryList.innerHTML = itinerary.map(i =>
    `<div class="item">${i.day} | ${i.time} - ${i.place}
     <a href="${i.map}" target="_blank">Maps</a></div>`
  ).join('');
}

/* SPLIT BILL */
function addOrder() {
  orders.push({ person: person.value, price: Number(price.value) });
  renderOrders();
}

function renderOrders() {
  orderList.innerHTML = orders.map(o =>
    `<div class="item">${o.person} : ${o.price}</div>`
  ).join('');
}

function calculate() {
  let spent = { A:0, B:0, C:0, D:0 };
  orders.forEach(o => spent[o.person] += o.price);

  let payerName = payer.value;
  let paidAmount = Number(paid.value);

  let resultHTML = `<strong>Total Spent:</strong><br>`;
  Object.keys(spent).forEach(p => {
    resultHTML += `${p}: ${spent[p]}<br>`;
  });

  resultHTML += `<hr>`;
  Object.keys(spent).forEach(p => {
    if (p !== payerName) {
      resultHTML += `${p} owes ${payerName}: ${spent[p]}<br>`;
    }
  });

  result.innerHTML = resultHTML;
}

/* CURRENCY */
function convertCurrency() {
  if (currency.value === 'TRY') paid.value = (paid.value / rate).toFixed(2);
  else paid.value = (paid.value * rate).toFixed(2);
}

/* EXPORT */
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text(result.innerText, 10, 10);
  pdf.save("split-bill.pdf");
}

function exportWhatsApp() {
  let text = encodeURIComponent(result.innerText);
  window.open(`https://wa.me/?text=${text}`);
}
