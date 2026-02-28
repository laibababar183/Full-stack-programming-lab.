// Rest Operator
function addToCart(...items) {
    return items;
}

// Add products
let cart = addToCart("Shoes", "Watch", "Bag");

// Spread Operator (clone array)
let updatedCart = [...cart];

// Array Destructuring
let [firstItem, ...remaining] = updatedCart;

// Display in HTML
document.getElementById("cart").innerHTML = `
    Total Items: ${updatedCart.length} <br>
    First Item: ${firstItem} <br>
    Remaining Items: ${remaining.join(", ")}
`;