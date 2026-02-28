// ============================================
// TASK 2 — ONLINE SHOPPING CART
// Rest · Spread · Destructuring
// ============================================

// Rest Operator — collects all arguments into array
function addToCart(...items) {
  return items;
}

let products = [
  { id:1, name:'Wireless Headphones', price:79.99  },
  { id:2, name:'Mechanical Keyboard',  price:149.99 },
  { id:3, name:'USB-C Hub',            price:49.99  },
  { id:4, name:'Gaming Mouse',         price:59.99  },
];
let cart = [], nextId = 5;

function clog(msg, t='') {
  const el = document.getElementById('con');
  const d  = document.createElement('div');
  d.className   = t==='i'?'clog-i':t==='w'?'clog-w':'clog';
  d.textContent = '> '+msg;
  el.appendChild(d); el.scrollTop = el.scrollHeight;
}

function createProduct() {
  const name  = document.getElementById('p-name').value.trim();
  const price = parseFloat(document.getElementById('p-price').value);
  if (!name || isNaN(price)||price<=0) { clog('ERROR: Enter valid name & price.','w'); return; }
  products.push({ id:nextId++, name, price });
  document.getElementById('p-name').value='';
  document.getElementById('p-price').value='';
  clog(`Created: "${name}" @ $${price.toFixed(2)}`,'i');
  renderProducts();
}

function addOneToCart(id) {
  const p=products.find(x=>x.id===id);
  const ex=cart.find(x=>x.id===id);
  if (ex) { ex.qty++; clog(`Updated qty: "${p.name}" (x${ex.qty})`); }
  else    { cart.push({...p, qty:1}); clog(`Added: "${p.name}"`,'i'); }
  updateStats(); renderCart();
}

// Uses rest operator
function addAllOp() {
  if (!products.length) { clog('No products!','w'); return; }
  const items = addToCart(...products);       // rest collects all
  cart = items.map(p => ({...p, qty:1}));     // spread to clone each
  clog(`addToCart(...rest) — ${cart.length} items added`,'i');
  updateStats(); renderCart();
}

// Spread + Destructuring
function spreadOp() {
  if (!cart.length) { clog('Cart is empty!','w'); return; }
  const cloned = [...cart];                   // Spread operator
  const [first, ...rest] = cloned;            // Array Destructuring
  document.getElementById('firstItem').textContent = first.name;
  document.getElementById('remaining').textContent = rest.length;
  clog(`Spread: cloned cart (${cloned.length} items)`,'i');
  clog(`Destructured → first: "${first.name}", remaining: ${rest.length}`);
}

function clearCart() {
  cart=[];
  document.getElementById('firstItem').textContent='—';
  document.getElementById('remaining').textContent='—';
  clog('Cart cleared.','w'); updateStats(); renderCart();
}

function updateStats() {
  document.getElementById('totalItems').textContent = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('totalPrice').textContent = '$'+cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);
}

function renderProducts() {
  const el = document.getElementById('product-list');
  if (!products.length) { el.innerHTML='<p class="empty">No products.</p>'; return; }
  el.innerHTML = products.map(p=>`
    <div class="product-item">
      <span class="iname">${p.name}</span>
      <span class="iprice">$${p.price.toFixed(2)}</span>
      <button class="btn-add" onclick="addOneToCart(${p.id})">+Add</button>
    </div>`).join('');
}

function renderCart() {
  const el = document.getElementById('cart-list');
  if (!cart.length) { el.innerHTML='<p class="empty">Cart is empty</p>'; return; }
  el.innerHTML = cart.map(i=>`
    <div class="cart-item">
      <span class="iname">${i.name}</span>
      <span class="iprice">$${(i.price*i.qty).toFixed(2)}</span>
      <span class="cqty">x${i.qty}</span>
    </div>`).join('');
}

renderProducts(); renderCart();