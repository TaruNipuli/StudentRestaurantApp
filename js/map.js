import { fetchData } from '../lib/fetchData.js';

const map = L.map('map').setView([60.1699, 24.9384], 13); // Coordinates for Helsinki, Finland

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
        const { name, location } = restaurant;
        const [lon, lat] = location.coordinates; // Extract longitude and latitude
        if (lat && lon) { // Ensure lat and lon are present
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${name}</b><p>${restaurant.company}</p><p>${restaurant.address}</p><p>${restaurant.city}</p>`);
        }
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