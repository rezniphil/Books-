const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const bookList = document.getElementById('bookList');
const cartCount = document.getElementById('cart-count');

// Fetch books from API
async function fetchBooks(query = "javascript") {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();

        // Filter out duplicates & "Image not available"
        const seenTitles = new Set();
        const filteredBooks = data.items.filter(book => {
            const title = book.volumeInfo.title.trim();
            const image = book.volumeInfo.imageLinks?.thumbnail || "";
            if (!image || image.includes("image_not_available")) return false;
            if (seenTitles.has(title.toLowerCase())) return false;
            seenTitles.add(title.toLowerCase());
            return true;
        });

        displayBooks(filteredBooks);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Display books in the grid
function displayBooks(books) {
    bookList.innerHTML = "";
    books.forEach(book => {
        const { title, authors, imageLinks, description } = book.volumeInfo;
        const image = imageLinks?.thumbnail || "";

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${authors ? authors.join(", ") : "Unknown Author"}</p>
            <button class="view-details">View Details</button>
        `;

        // View details click
        bookCard.querySelector(".view-details").addEventListener("click", () => {
            localStorage.setItem("selectedBook", JSON.stringify(book.volumeInfo));
            window.location.href = "details.html";
        });

        bookList.appendChild(bookCard);
    });
}

// Cart count update
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}

// Search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
});

// Enter key search
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) fetchBooks(query);
    }
});

// Initial load
fetchBooks();
updateCartCount();
