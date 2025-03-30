import { fetchData } from '../lib/fetchData.js';
import { showMenuModal } from './modal.js';

const map = L.map('map').setView([60.1699, 24.9384], 13); // Center map on Helsinki

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
let restaurants = [];

// Fetch all restaurants and add markers to the map
async function getRestaurants() {
    try {
        restaurants = await fetchData(apiUrl + '/restaurants');
        addRestaurantMarkers(); // Once restaurants are fetched, add markers
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

// Add markers for restaurants to the map
function addRestaurantMarkers() {
    for (const restaurant of restaurants) {
        const { id, name, address, city, location } = restaurant;
        const [lon, lat] = location.coordinates;

        if (lat && lon) {
            const marker = L.marker([lat, lon]).addTo(map);
            const popupContent = createPopupContent(id, name, address, city);
            marker.bindPopup(popupContent);
        }
    }
}

// Create popup content for each restaurant marker
function createPopupContent(restaurantId, restaurantName, restaurantAddress, restaurantCity) {
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
        <h3>${restaurantName}</h3>
        <p>${restaurantAddress}, ${restaurantCity}</p>
        <button id="popup-weekly-menu-${restaurantId}" class="popup-button">Viikon ruokalista</button>
        <button id="popup-daily-menu-${restaurantId}" class="popup-button">Päivän ruokalista</button>
    `;

    // Attach event listeners to the buttons
    attachMenuButtonListeners(popupContent, restaurantId);

    return popupContent;
}

// Attach event listeners to the menu buttons inside the popup
function attachMenuButtonListeners(popupContent, restaurantId) {
    const weeklyMenuButton = popupContent.querySelector(`#popup-weekly-menu-${restaurantId}`);
    const dailyMenuButton = popupContent.querySelector(`#popup-daily-menu-${restaurantId}`);

    weeklyMenuButton.addEventListener('click', () => {
        showMenuModal(restaurantId, 'weekly'); // Show weekly menu in modal
    });

    dailyMenuButton.addEventListener('click', () => {
        showMenuModal(restaurantId, 'daily'); // Show daily menu in modal
    });
}

// Main function to fetch restaurant data and add markers to the map
async function main() {
    await getRestaurants();
}

// Call the main function
main();
