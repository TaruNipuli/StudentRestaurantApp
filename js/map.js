import { fetchData } from '../lib/fetchData.js';
import { getDailyMenu, showMenu } from './menus.js'; // Import menu functions

const map = L.map('map').setView([60.1699, 24.9384], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
let restaurants = [];

// Fetch all restaurants
async function getRestaurants() {
    try {
        restaurants = await fetchData(apiUrl + '/restaurants');
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

// Add markers for restaurants
function addRestaurantMarkers() {
    for (const restaurant of restaurants) {
        const { id, name, address, city, location } = restaurant;
        const [lon, lat] = location.coordinates;
        if (lat && lon) {
            const marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(createPopupContent(id, name, address, city));
        }
    }
}

// Popup content with restaurant details and buttons
function createPopupContent(restaurantId, restaurantName, restaurantAddress, restaurantCity) {
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
        <h3>${restaurantName}</h3>
        <p>${restaurantAddress}, ${restaurantCity}</p>
        <button id="popup-weekly-menu-${restaurantId}" class="popup-button">Viikon ruokalista</button>
        <button id="popup-daily-menu-${restaurantId}" class="popup-button">Päivän ruokalista</button>
    `;

    // Add event listeners for the buttons
    popupContent.querySelector(`#popup-weekly-menu-${restaurantId}`).addEventListener('click', () => {
        loadWeeklyMenu(restaurantId);
    });

    popupContent.querySelector(`#popup-daily-menu-${restaurantId}`).addEventListener('click', () => {
        loadDailyMenu(restaurantId);
    });

    return popupContent;
}

// Load weekly menu
function loadWeeklyMenu(restaurantId) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = `<p>Weekly menu for restaurant ID: ${restaurantId} (not implemented yet).</p>`;
}

// Load daily menu
async function loadDailyMenu(restaurantId) {
    try {
        const menu = await getDailyMenu(restaurantId);
        const menuContainer = document.querySelector('.menu-container');
        if (menu) {
            menuContainer.innerHTML = '';
            showMenu(menu, menuContainer);
        } else {
            menuContainer.innerHTML = '<p>No daily menu available for this restaurant.</p>';
        }
    } catch (error) {
        console.error('Error loading daily menu:', error);
    }
}

// Main function to fetch data and add markers
async function main() {
    try {
        await getRestaurants();
        addRestaurantMarkers();
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Call the main function
main();