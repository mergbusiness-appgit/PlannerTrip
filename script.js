/* ================= TAB ================= */
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(s => s.classList.add('hidden'));

  document.getElementById(tab).classList.remove('hidden');
  event.target.classList.add('active');
}

/* ================= ITINERARY ================= */
let itinerary = [];

function addActivity() {
  const activity = {
    day: day.value,
    time: time.value,
    place: place.value,
    map: map.value
  };

  itinerary.push(activity);
  renderItinerary();
}

function renderItinerary() {
  itineraryList.innerHTML = itinerary.map((i, idx) => `
    <div class="item">
      <strong>${i.day}</strong><br>
      ${i.time} – ${i.place}<br>
      <a href="${i.map}" target="_blank">📍 Google Maps</a>
    </div>
  `).join('');
}

/* ================= SPLIT BILL ================= */
let orders = [];

function addOrder() {
  orders.push({
    person: person.value,
    price: Number(price.value)
  });
  price.value = '';
  renderOrders();
}

function renderOrders() {
  orderList.innerHTML = orders.map(o => `
    <div class="item">
      ${o.person} ordered: ${o.price}
    </div>
  `).join('');
}

function calculateBill() {
  const spent = { A:0, B:0, C:0, D:0 };
  orders.forEach(o => spent[o.person] += o.price);

  const payerName = payer.value;

  let html = `<strong>Total Spent</strong><br>`;
  Object.keys(spent).forEach(p => {
    html += `${p}: ${spent[p]}<br>`;
  });

  html += `<hr>`;
  Object.keys(spent).forEach(p => {
    if (p !== payerName && spent[p] > 0) {
      html += `${p} owes ${payerName}: ${spent[p]}<br>`;
    }
  });

  result.innerHTML = html;
}
