import { openMenuOnMain } from './menu.js';

const favoritesList = document.getElementById('favoriteItems');
const restaurantList = document.getElementById('restaurantItems');

// Check if the user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

// Display favorite restaurants in the list
function displayFavorites(favorites) {
    if (!favoritesList) return;
    favoritesList.innerHTML = '';

    favorites.forEach((restaurant) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${restaurant.name}:</strong> ${restaurant.address || ''}, ${restaurant.city || ''}`;

        // Add broken heart (💔) remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-favorite-button');
        removeButton.textContent = '💔';
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the parent list item click
            removeFavorite(restaurant); // Remove the restaurant from favorites
        });

        listItem.appendChild(removeButton);
        favoritesList.appendChild(listItem);

        // Add click event to highlight the item and open the menu
        listItem.addEventListener('click', () => {
            document.querySelectorAll('#favoriteItems li').forEach((item) => item.classList.remove('highlight'));
            listItem.classList.add('highlight');
            openMenuOnMain(restaurant);
        });
    });
}

// Add a restaurant to the favorites list
function addFavorite(restaurant) {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.name === restaurant.name)) {
        favorites.push(restaurant);
        saveFavorites(favorites);
        displayFavorites(favorites);
    }
}

// Get favorites from localStorage
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Remove a restaurant from the favorites list
function removeFavorite(restaurant) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.name !== restaurant.name);
    saveFavorites(favorites);
    displayFavorites(favorites);
}

// Add heart buttons to the restaurant list
function addHeartButtons() {
    if (!restaurantList) return;

    Array.from(restaurantList.children).forEach((listItem) => {
        const restaurantData = listItem.dataset.restaurant;
        if (!restaurantData) return;

        const restaurant = JSON.parse(restaurantData);

        const heartButton = document.createElement('button');
        heartButton.classList.add('heart-button');
        heartButton.textContent = '❤️';

        heartButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the parent list item click
            addFavorite(restaurant); // Add the restaurant to favorites
        });

        listItem.appendChild(heartButton);
    });
}

// Initialize favorites functionality
function initializeFavorites() {
    const favorites = getFavorites();
    displayFavorites(favorites); // Display favorite restaurants
    addHeartButtons(); // Add heart buttons to the restaurant list
}

// Fetch and list restaurants (for demonstration purposes)
async function fetchAndListRestaurants() {
    try {
        const response = await fetch('https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants');
        const restaurants = await response.json();

        // Add restaurants to the list
        const restaurantList = document.getElementById('restaurantItems');
        restaurantList.innerHTML = ''; // Clear any existing content

        // Sort and add each restaurant to the list
        restaurants.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
        restaurants.forEach((restaurant) => {
            const listItem = document.createElement('li');
            listItem.dataset.restaurant = JSON.stringify(restaurant); // Store restaurant data in data-attribute
            listItem.innerHTML = `<strong>${restaurant.name}:</strong> ${restaurant.address}, ${restaurant.city}`;
            restaurantList.appendChild(listItem);
        });

        // Add heart buttons after the restaurant list is populated
        addHeartButtons();
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

// Wait for the restaurant list to be populated before adding heart buttons
if (isUserLoggedIn()) {
    const observer = new MutationObserver(() => {
        if (restaurantList && restaurantList.children.length > 0) {
            observer.disconnect(); // Stop observing once the list is populated
            initializeFavorites(); // Initialize heart buttons and favorites
        }
    });

    observer.observe(restaurantList, { childList: true });
}

fetchAndListRestaurants(); // Call to fetch and list restaurants
