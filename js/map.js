
// map.js handles the functionality related to the map and restaurant markers.

import { fetchData } from '../lib/fetchData.js';
import { showMenu, createPopupContent } from './menus.js';
import { showMenuModal } from './modal.js';

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
        addRestaurantMarkers(); // Once restaurants are fetched, add markers
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
            const popupContent = createPopupContent(id, name, address, city);
            marker.bindPopup(popupContent);
        }
    }
}

// Main function to fetch data and add markers
async function main() {
    await getRestaurants();
}

// Call the main function
main();
