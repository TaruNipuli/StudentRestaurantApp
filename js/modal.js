// modal.js handles the modal functionalities

// Get elements for the menu modal
const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const menuCloseBtn = menuModal.querySelector(".close");

// Function to open the menu modal and display the menu
function showMenuInModal(title, menu) {
    modalTitle.textContent = title;
    // Ensure that menu is an array; if not, default to an empty array.
    const menuArray = Array.isArray(menu) ? menu : [];
    modalContent.innerHTML = menuArray.length
        ? menuArray.map((item) => `<p>${item.name} - ${item.price}€</p>`).join("")
        : "<p>Ruokalista ei ole saatavilla.</p>";
    menuModal.style.display = "block";
}

// Close menu modal when clicking the close button
menuCloseBtn.addEventListener("click", () => {
    menuModal.style.display = "none";
});

// Close menu modal when clicking outside of the modal content
window.addEventListener("click", (e) => {
    if (e.target === menuModal) {
        menuModal.style.display = "none";
    }
});

// Exported function to show the menu modal (menu fetching should happen outside modal.js)
export function showMenuModal(title, menu) {
    showMenuInModal(title, menu);
}

// Get login modal elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.loginBtn');
const loginCloseBtn = loginModal.querySelector('.close');
const loginForm = loginModal.querySelector('form');

// Open the login modal when the login button is clicked
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

// Close the login modal when the close button is clicked
loginCloseBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close the login modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Redirect user after login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'loggedin.html';
});

// Get sign-up modal elements
const signUpModal = document.getElementById('signUpModal');
const signUpBtn = document.querySelector('.signUpBtn');
const signUpCloseBtn = signUpModal.querySelector('.close');
const signUpForm = signUpModal.querySelector('form');

// Open the sign-up modal when the sign-up button is clicked
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpModal.style.display = 'block';
});

// Close the sign-up modal when the close button is clicked
signUpCloseBtn.addEventListener('click', () => {
    signUpModal.style.display = 'none';
});

// Close the sign-up modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === signUpModal) {
        signUpModal.style.display = 'none';
    }
});

// Redirect user after sign-up form submission
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'loggedin.html';
});
