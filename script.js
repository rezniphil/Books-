const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.getElementById("bookList");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Search books
searchBtn.addEventListener("click", () => searchBooks(searchInput.value));
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBooks(searchInput.value);
});

// Initial load
searchBooks("bestsellers");

function searchBooks(query) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`)
    .then(res => res.json())
    .then(data => {
      const seenTitles = new Set();
      const uniqueBooks = data.items.filter(book => {
        const title = book.volumeInfo.title?.trim().toLowerCase();
        if (!title || seenTitles.has(title)) return false;
        seenTitles.add(title);
        return book.volumeInfo.imageLinks?.thumbnail;
      });
      displayBooks(uniqueBooks);
    });
}

function displayBooks(books) {
  bookList.innerHTML = "";
  books.forEach(book => {
    const { title, authors, imageLinks } = book.volumeInfo;
    const thumbnail = imageLinks?.thumbnail;

    const bookCard = document.createElement("div");
    bookCard.className = "bg-white rounded shadow p-2 flex flex-col items-center";

    bookCard.innerHTML = `
      <img src="${thumbnail}" alt="${title}" class="w-full h-48 object-contain mb-2">
      <h2 class="font-semibold text-center text-sm mb-1">${title}</h2>
      <p class="text-xs text-gray-600 mb-2">${authors ? authors.join(", ") : "Unknown Author"}</p>
      <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add to Cart</button>
    `;

    bookCard.querySelector("button").addEventListener("click", () => addToCart({ title, authors, thumbnail }));
    bookList.appendChild(bookCard);
  });
}

function addToCart(book) {
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}
