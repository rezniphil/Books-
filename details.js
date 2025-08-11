const bookDetails = document.getElementById("book-details");

const book = JSON.parse(localStorage.getItem("selectedBook"));
if (!book) {
    bookDetails.innerHTML = "<p>No book details found.</p>";
} else {
    const { title, authors, description, imageLinks } = book;
    const image = imageLinks?.thumbnail || "";

    bookDetails.innerHTML = `
        <div class="book-detail-card">
            <img src="${image}" alt="${title}">
            <h2>${title}</h2>
            <p><strong>Author(s):</strong> ${authors ? authors.join(", ") : "Unknown"}</p>
            <p><strong>Description:</strong> ${description || "No description available."}</p>
            <button id="addToCart">Add to Cart</button>
        </div>
    `;

    document.getElementById("addToCart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(book);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Book added to cart!");
    });
}
