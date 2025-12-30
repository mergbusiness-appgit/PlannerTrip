/* TAB */
function showTab(tab){
  document.querySelectorAll('.tab').forEach(t=>t.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
}

/* ================= ITINERARY ================= */
let temp = [];
let itinerary = [];

function addTemp(){
  temp.push({
    day:day.value,
    time:time.value,
    place:place.value,
    map:map.value
  });
  renderTemp();
}

function renderTemp(){
  tempList.innerHTML = temp.map((i,idx)=>`
    <div class="item">
      ${i.time} - ${i.place}
      <a href="${i.map}" target="_blank">📍</a>
      <button onclick="removeTemp(${idx})">Remove</button>
    </div>
  `).join('');
}

function removeTemp(i){
  temp.splice(i,1);
  renderTemp();
}

function saveDay(){
  itinerary.push(...temp);
  temp=[];
  renderTemp();
  renderItinerary();
}

function renderItinerary(){
  itineraryList.innerHTML = itinerary.map(i=>`
    <div class="item">
      <strong>${i.day}</strong><br>
      ${i.time} - ${i.place}
      <a href="${i.map}" target="_blank">Maps</a>
    </div>
  `).join('');
}

/* ================= SPLIT BILL ================= */
let orders=[];
let editIndex=null;
let rate=0.15;

function addOrder(){
  const obj={person:person.value,price:Number(price.value)};
  if(editIndex!==null){
    orders[editIndex]=obj;
    editIndex=null;
  }else orders.push(obj);
  price.value='';
  renderOrders();
}

function renderOrders(){
  orderList.innerHTML=orders.map((o,i)=>`
    <div class="item order">
      ${o.person} - ${o.price}
      <div class="actions">
        <button onclick="editOrder(${i})">Edit</button>
        <button class="delete" onclick="deleteOrder(${i})">Del</button>
      </div>
    </div>
  `).join('');
}

function editOrder(i){
  person.value=orders[i].person;
  price.value=orders[i].price;
  editIndex=i;
}

function deleteOrder(i){
  orders.splice(i,1);
  renderOrders();
}

function calculate(){
  let spent={A:0,B:0,C:0,D:0};
  orders.forEach(o=>spent[o.person]+=o.price);

  let payerName=payer.value;
  let html='<strong>Total Spend</strong><br>';
  Object.keys(spent).forEach(p=>html+=`${p}: ${spent[p]}<br>`);

  html+='<hr>';
  Object.keys(spent).forEach(p=>{
    if(p!==payerName && spent[p]>0){
      html+=`${p} owes ${payerName}: ${spent[p]}<br>`;
    }
  });
  result.innerHTML=html;
}

function convertCurrency(){
  if(currency.value==='TRY') paid.value=(paid.value/rate).toFixed(2);
  else paid.value=(paid.value*rate).toFixed(2);
}

/* EXPORT */
function exportPDF(){
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF();
  pdf.text(result.innerText,10,10);
  pdf.save("trip-summary.pdf");
}

function exportWhatsApp(){
  window.open(`https://wa.me/?text=${encodeURIComponent(result.innerText)}`);
}
