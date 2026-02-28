let products = new Map();

products.set(1, {name: "Laptop"});
products.set(2, {name: "Mobile"});
products.set(3, {name: "Tablet"});
products.set(4, {name: "Keyboard"});
products.set(5, {name: "Mouse"});

let result = "";

products.forEach((value, key) => {
    result += `ID: ${key} - ${value.name} <br>`;
});

result += "Total Products: " + products.size;

document.getElementById("products").innerHTML = result;// ============================================
// TASK 5 — PRODUCT CATALOG USING MAP
// Map · .get() · .set() · .delete() · .size
// ============================================

// Map: Key = Product ID, Value = Product Object
const productMap = new Map();

// Add 5 default products
const defaultProducts = [
  ['P001', { name:'Laptop Pro 15"',         price:1299.99, category:'Electronics' }],
  ['P002', { name:'Noise-Cancel Headphones', price:299.99,  category:'Audio'       }],
  ['P003', { name:'Ergonomic Chair',         price:499.99,  category:'Furniture'   }],
  ['P004', { name:'Standing Desk',           price:799.99,  category:'Furniture'   }],
  ['P005', { name:'Webcam 4K Ultra',         price:129.99,  category:'Electronics' }],
];

defaultProducts.forEach(([key, val]) => productMap.set(key, val));

// Add product
function addProduct() {
  const id  = document.getElementById('p-id').value.trim().toUpperCase();
  const name = document.getElementById('p-name').value.trim();
  const price = parseFloat(document.getElementById('p-price').value);
  const cat  = document.getElementById('p-category').value.trim();

  if (!id||!name||isNaN(price)||!cat) { alert('Please fill all fields!'); return; }
  if (productMap.has(id)) { alert(`Product ID "${id}" already exists!`); return; }

  productMap.set(id, { name, price, category: cat }); // .set()

  document.getElementById('p-id').value='';
  document.getElementById('p-name').value='';
  document.getElementById('p-price').value='';
  document.getElementById('p-category').value='';

  renderTable();
}

// Search by ID using .get()
function searchProduct() {
  const id  = document.getElementById('search-id').value.trim().toUpperCase();
  const res = document.getElementById('search-result');

  if (!id) { res.textContent='Enter a product ID.'; res.className=''; return; }

  if (productMap.has(id)) {
    const p = productMap.get(id); // .get()
    res.textContent = `✓ Found: "${p.name}" — $${p.price.toFixed(2)} — ${p.category}`;
    res.className = 'found';
  } else {
    res.textContent = `✕ Product ID "${id}" not found in Map.`;
    res.className = 'notfound';
  }
}

// Delete product
function deleteProduct(id) {
  productMap.delete(id); // .delete()
  renderTable();
  document.getElementById('search-result').textContent = '';
}

// Render using .forEach()
function renderTable() {
  document.getElementById('map-size').textContent = productMap.size; // .size
  const tbody = document.getElementById('product-tbody');

  if (productMap.size === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No products in Map.</td></tr>';
    return;
  }

  let rows = '';
  productMap.forEach((product, key) => { // .forEach()
    rows += `
      <tr>
        <td><span class="pid-badge">${key}</span></td>
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td><span class="cat-badge">${product.category}</span></td>
        <td><button class="btn-del" onclick="deleteProduct('${key}')">Delete</button></td>
      </tr>`;
  });
  tbody.innerHTML = rows;
}

renderTable();