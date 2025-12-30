let orders = [];
let editIndex = null;

function addOrder() {
  const p = person.value;
  const pr = Number(price.value);

  if (editIndex !== null) {
    orders[editIndex] = { person:p, price:pr };
    editIndex = null;
  } else {
    orders.push({ person:p, price:pr });
  }

  price.value = "";
  renderOrders();
}

function renderOrders() {
  orderList.innerHTML = orders.map((o,i)=>`
    <div class="order">
      <div>${o.person} — ${o.price}</div>
      <div class="actions">
        <button onclick="editOrder(${i})">Edit</button>
        <button class="delete" onclick="deleteOrder(${i})">Del</button>
      </div>
    </div>
  `).join('');
}

function editOrder(i) {
  person.value = orders[i].person;
  price.value = orders[i].price;
  editIndex = i;
}

function deleteOrder(i) {
  orders.splice(i,1);
  renderOrders();
}

function calculate() {
  let spent = {A:0,B:0,C:0,D:0};
  orders.forEach(o=>spent[o.person]+=o.price);

  let payerName = payer.value;
  let res = `<strong>Total Spend</strong><br>`;
  Object.keys(spent).forEach(p=>{
    res+=`${p}: ${spent[p]}<br>`;
  });

  res+=`<hr>`;
  Object.keys(spent).forEach(p=>{
    if(p!==payerName && spent[p]>0){
      res+=`${p} owes ${payerName}: ${spent[p]}<br>`;
    }
  });

  result.innerHTML = res;
}

/* EXPORT */
function exportPDF(){
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text(result.innerText,10,10);
  pdf.save("split-bill.pdf");
}

function exportWhatsApp(){
  window.open(`https://wa.me/?text=${encodeURIComponent(result.innerText)}`);
}
