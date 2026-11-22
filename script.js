
// Select HTML elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const foodCards = document.querySelectorAll(".food-card");
const categories = document.querySelectorAll(".category");
const restaurantGrid = document.getElementById("restaurantGrid");
const cartCount = document.getElementById("cartCount");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const toast = document.getElementById("toast");

let cart = 0;
let selectedCategory = "All";

// Display notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// Filter food items
function filterFood() {
    const searchText = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    foodCards.forEach(card => {
        const foodName = card.dataset.name.toLowerCase();
        const foodCategory = card.dataset.category;

        const matchesSearch = foodName.includes(searchText);
        const matchesCategory =
            selectedCategory === "All" ||
            foodCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    resultCount.textContent = `${visibleCount} items found`;

    noResults.hidden = visibleCount !== 0;
}

// Search button
searchBtn.addEventListener("click", filterFood);

// Search while typing
searchInput.addEventListener("input", filterFood);

// Category filtering
categories.forEach(category => {
    category.addEventListener("click", () => {

        // Remove active class from all categories
        categories.forEach(item => {
            item.classList.remove("active");
        });

        // Activate selected category
        category.classList.add("active");

        // Get selected category
        selectedCategory = category.dataset.category;

        // Apply filter
        filterFood();
    });
});

// Add to cart functionality
const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {
    button.addEventListener("click", () => {

        cart++;

        // Update cart number
        cartCount.textContent = cart;

        // Get food name
        const foodName = button.dataset.name;

        // Show notification
        showToast(`${foodName} added to cart!`);

    });
});

// Cart button
document.querySelector(".cart-btn").addEventListener("click", () => {
    showToast(`You have ${cart} item(s) in your cart.`);
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// Initial item count
filterFood();

console.log("Foodie website is ready!");
