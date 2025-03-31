import {fetchData} from '../lib/fetchData.js';

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

// Fetch restaurants data from the API
async function getRestaurants() {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
    addRestaurantMarkers(); // Add markers for each restaurant
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

// Add restaurant markers to the map
function addRestaurantMarkers() {
  for (const restaurant of restaurants) {
    if (!restaurant.location || !restaurant.location.coordinates) continue;

    const [lon, lat] = restaurant.location.coordinates;
    if (!lat || !lon) continue;

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(createPopupContent(restaurant));
    marker.on('click', () => openMenuOnMain(restaurant));
  }
}

// Create content for the popup on the map marker
function createPopupContent(restaurant) {
  return `<div><h3>${restaurant.name}</h3><p>${restaurant.address}, ${restaurant.city}</p></div>`;
}

// Open the restaurant's menu on the main page
async function openMenuOnMain(restaurant) {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.innerHTML = `<h2>${restaurant.name}</h2><p>${restaurant.address}, ${restaurant.city}</p>`;

  try {
    // Fetch the daily menu by default
    const menuResponse = await fetchData(
      `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
    );

    if (
      !menuResponse ||
      !menuResponse.courses ||
      !Array.isArray(menuResponse.courses)
    ) {
      menuContainer.innerHTML += '<p>No menu available.</p>';
      return;
    }

    // Display the daily menu
    menuContainer.innerHTML += createMenuHtml(menuResponse.courses);

    // Add a link to show the weekly menu
    const weekMenuLink = document.createElement('a');
    weekMenuLink.href = '#';
    weekMenuLink.textContent = 'Viikon Ruokalista'; // Link to show the weekly menu
    weekMenuLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default link action

      // Fetch the weekly menu and update the content
      const weekResponse = await getWeeklyMenu(restaurant._id, 'fi');
      const weekHtml = weekResponse.days
        .map((day) => createMenuHtml(day.courses))
        .join('');
      menuContainer.innerHTML = ''; // Clear the current menu
      menuContainer.innerHTML = `<h2>${restaurant.name}</h2><p>${restaurant.address}, ${restaurant.city}</p>`;
      menuContainer.insertAdjacentHTML('beforeend', weekHtml);

      // Add a link to go back to the daily menu
      const dayMenuLink = document.createElement('a');
      dayMenuLink.href = '#';
      dayMenuLink.textContent = 'Päivän Ruokalista'; // Link to show the daily menu
      dayMenuLink.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent the default link action
        openMenuOnMain(restaurant); // Load the daily menu again
      });
      menuContainer.appendChild(dayMenuLink);
    });

    menuContainer.appendChild(weekMenuLink);
  } catch (error) {
    console.error('Menu Fetch Error:', error);
    menuContainer.innerHTML += '<p>Menu not available.</p>';
  }
}

// Fetch the weekly menu for a restaurant
async function getWeeklyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.error('Weekly Menu Fetch Error:', error);
  }
}

// Generate the HTML for the menu items
function createMenuHtml(courses) {
  return courses
    .map(
      (course) => `
    <article class="course">
      <p><strong>${course.name}</strong>, Price: ${course.price}, Allergens: ${course.diets}</p>
    </article>
  `
    )
    .join('');
}

// Main function to initialize the map and load restaurant data
async function main() {
  await getRestaurants(); // Fetch and display restaurant data
}

main();
