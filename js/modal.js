
import { fetchData } from '../lib/fetchData.js';


// Get elements for the menu modal
const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const menuCloseBtn = menuModal.querySelector(".close");

// Function to open the menu modal
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

// Close menu modal when clicking outside the modal content
window.addEventListener("click", (e) => {
    if (e.target === menuModal) {
        menuModal.style.display = "none";
    }
});

// Exported function to show a menu modal based on restaurantId and menu type
export async function showMenuModal(restaurantId, menuType) {
    const menuContainer = document.querySelector('#modal-content');
    const title = document.querySelector('#modal-title');
    
    title.textContent = `Ruokalista - ${menuType === 'daily' ? 'Päivä' : 'Viikko'}: ${restaurantId}`;
    
    try {
        let menu;
        // Call the appropriate function to fetch menu data.
        if (menuType === 'daily') {
            menu = await loadDailyMenu(restaurantId);
        } else {
            menu = await loadWeeklyMenu(restaurantId);
        }
        // Here, showMenuModal expects menu to be an array.
        if (menu && Array.isArray(menu)) {
            // Instead of calling showMenu (from menus.js), we call our helper to display
            showMenuInModal(title.textContent, menu);
        } else {
            menuContainer.innerHTML = '<p>Ei ruokalistaa saatavilla.</p>';
            menuModal.style.display = 'block';
        }
    } catch (error) {
        console.error(`Error loading ${menuType} menu:`, error);
        menuContainer.innerHTML = `<p>Virhe ladattaessa ruokalistaa: ${error.message}</p>`;
        menuModal.style.display = 'block';
    }
}

// Helper functions to fetch menus using fetchData
export async function loadWeeklyMenu(restaurantId) {
    try {
        const menu = await fetchData(
            `https://media2.edu/metropolia.fi/restaurant/api/v1/restaurants/weekly/${restaurantId}`
        );
        // We expect the weekly menu to be in menu.days
        return menu.days || [];
    } catch (error) {
        console.error("Error loading weekly menu:", error);
        return [];
    }
}

export async function loadDailyMenu(restaurantId) {
    try {
        const menu = await fetchData(
            `https://media2.edu/metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurantId}`
        );
        // We expect the daily menu to be in menu.courses
        return menu.courses || [];
    } catch (error) {
        console.error("Error loading daily menu:", error);
        return [];
    }
}


// Get login modal elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.loginBtn');
const loginCloseBtn = loginModal.querySelector('.close');
const loginForm = loginModal.querySelector('form');

console.log('Login Modal Elements:', { loginModal, loginBtn, loginCloseBtn, loginForm });

// Open the login modal when the login button is clicked
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    loginModal.style.display = 'block';
});

// Close the login modal when the close button is clicked
loginCloseBtn.addEventListener('click', () => {
    console.log('Login close button clicked');
    loginModal.style.display = 'none';
});

// Close the login modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        console.log('Clicked outside login modal');
        loginModal.style.display = 'none';
    }
});

// Redirect user after login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Login form submitted');
    window.location.href = 'loggedin.html';
});


// Get sign-up modal elements
const signUpModal = document.getElementById('signUpModal');
const signUpBtn = document.querySelector('.signUpBtn');
const signUpCloseBtn = signUpModal.querySelector('.close');
const signUpForm = signUpModal.querySelector('form');

console.log('Sign-Up Modal Elements:', { signUpModal, signUpBtn, signUpCloseBtn, signUpForm });

// Open the sign-up modal when the sign-up button is clicked
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Sign up button clicked');
    signUpModal.style.display = 'block';
});

// Close the sign-up modal when the close button is clicked
signUpCloseBtn.addEventListener('click', () => {
    console.log('Sign up close button clicked');
    signUpModal.style.display = 'none';
});

// Close the sign-up modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === signUpModal) {
        console.log('Clicked outside sign-up modal');
        signUpModal.style.display = 'none';
    }
});

// Redirect user after sign-up form submission
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Sign up form submitted');
    window.location.href = 'loggedin.html';
});
