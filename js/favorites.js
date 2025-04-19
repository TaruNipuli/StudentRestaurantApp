import { openMenuOnMain } from './menu.js';
import { fetchData } from '../lib/fetchData.js';

// Set up constants
const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
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

// Sort restaurants by name
function sortRestaurants(restaurants) {
    restaurants.sort(function (a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    });
}

// Display restaurants in the list
function displayRestaurants(restaurants) {
    if (!restaurantList) {
        console.error('Restaurant list element not found.');
        return;
    }

    restaurantList.innerHTML = ''; // Clear existing content

    restaurants.forEach((restaurant) => {
        const listItem = document.createElement('li');
        listItem.dataset.restaurant = JSON.stringify(restaurant); // Store restaurant data in data-attribute
        listItem.innerHTML = `<strong>${restaurant.name}:</strong> ${restaurant.address}, ${restaurant.city}`;
        restaurantList.appendChild(listItem);

        // Add click event to show the menu and highlight the clicked item
        listItem.addEventListener('click', () => {
            document.querySelectorAll('#restaurantItems li').forEach((item) => {
                item.classList.remove('highlight');
            });
            listItem.classList.add('highlight');
            openMenuOnMain(restaurant); // Call the function from menu.js
        });
    });

    // Add heart buttons after rendering the restaurants
    addHeartButtons();
}

// Fetch restaurants and display them in the list
export async function fetchAndListRestaurants() {
    try {
        const restaurants = await fetchData(`${apiUrl}/restaurants`);
        sortRestaurants(restaurants);
        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

fetchAndListRestaurants(); 

