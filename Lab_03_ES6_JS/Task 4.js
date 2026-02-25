function addToCart(...items) {
    return items;
}

let cart = addToCart("Shoes", "Watch", "Bag");

let updatedCart = [...cart];

let [firstItem, ...remaining] = updatedCart;

document.getElementById("cart").innerHTML = `
    Total Items: ${updatedCart.length} <br>
    First Item: ${firstItem} <br>
    Remaining Items: ${remaining.join(", ")}
`;