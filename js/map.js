import {fetchData} from '../lib/fetchData.js';
import {openMenuOnMain} from './menu.js'; // Import menu functionality

// Set up the API URL and the map
const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const map = L.map('map').setView([60.1699, 24.9384], 13);

// Add tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let restaurants = [];

// Fetch restaurants data from the API for the map markers
async function getRestaurants() {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
    addRestaurantMarkers();
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

// Add restaurant markers to the map
function addRestaurantMarkers() {
  for (const restaurant of restaurants) {
    if (!restaurant.location || !restaurant.location.coordinates) continue;

    const [lon, lat] = restaurant.location.coordinates;
    if (!lat || !lon) continue; // check if lat/lon are valid

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(createPopupContent(restaurant));
    marker.on('click', () => openMenuOnMain(restaurant)); // Call menu.js function
  }
}

// Create content for the popup on the map marker
function createPopupContent(restaurant) {
  return `<div><h3>${restaurant.name}</h3><p>${restaurant.address}, ${restaurant.city}</p></div>`;
}

// Initialize the map and load restaurant data
async function main() {
  await getRestaurants();
}

main();
