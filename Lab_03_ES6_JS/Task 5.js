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

document.getElementById("products").innerHTML = result;