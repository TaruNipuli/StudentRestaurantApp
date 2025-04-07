import { fetchData } from '../lib/fetchData.js';
import { openMenuOnMain } from './menu.js'; // Import the menu functionality

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Fetch restaurants and display them as a list
async function fetchAndListRestaurants() {
    try {
        const restaurants = await fetchData(`${apiUrl}/restaurants`);
        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

// Display restaurants in the list
function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurantItems');
    if (!restaurantList) {
        console.error('Element not found');
        return;
    }

    restaurantList.innerHTML = ''; // Clear existing content

    restaurants.forEach((restaurant) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${restaurant.name}:</strong> ${restaurant.address}, ${restaurant.city}`;
        restaurantList.appendChild(listItem);

        // Add click event to show the menu
        listItem.addEventListener('click', () => {
            openMenuOnMain(restaurant); // Call the function from menu.js
        });
    });
}

// Call the function to fetch and display restaurants
fetchAndListRestaurants();