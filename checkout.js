const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
renderCart();

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  cart.forEach((book, index) => {
    total += 15.99; // Flat price for simplicity
    
    const itemDiv = document.createElement("div");
    itemDiv.className = "bg-white p-4 rounded shadow flex items-center space-x-4";
    
    itemDiv.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}" class="w-16 h-20 object-contain">
      <div class="flex-1">
        <h2 class="font-semibold">${book.title}</h2>
        <p class="text-sm text-gray-600">${book.authors?.join(", ") || "Unknown Author"}</p>
      </div>
      <button class="text-red-600">Remove</button>
    `;

    itemDiv.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceEl.textContent = total.toFixed(2);
}
