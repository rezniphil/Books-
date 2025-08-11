const orderSummary = document.getElementById("orderSummary");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
cart.forEach(book => {
  total += 15.99;
  const div = document.createElement("div");
  div.className = "flex justify-between border-b py-2";
  div.innerHTML = `<span>${book.title}</span><span>$15.99</span>`;
  orderSummary.appendChild(div);
});

const totalDiv = document.createElement("div");
totalDiv.className = "flex justify-between font-bold py-2";
totalDiv.innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
orderSummary.appendChild(totalDiv);

document.getElementById("paymentForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Payment Successful! Thank you for your order.");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});
