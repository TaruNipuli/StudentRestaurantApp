import { fetchData } from '../lib/fetchData.js';
import { openMenuOnMain } from './menu.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

let restaurants = [];

// Sort restaurants by name
function sortRestaurants(restaurants) {
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
}

// Display restaurants in the list
function displayRestaurants(restaurants) {
  const restaurantList = document.getElementById('restaurantItems');
  if (!restaurantList) {
    console.error('Restaurant list element not found.');
    return;
  }

  restaurantList.innerHTML = ''; // Clear existing content

  restaurants.forEach((restaurant) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${restaurant.name}:</strong> ${restaurant.address}, ${restaurant.city}
      ${isLoggedInPage() ? `<button class="favorite-btn" data-id="${restaurant.id}">❤️</button>` : ''}
    `;
    restaurantList.appendChild(listItem);

    // Add click event to show the menu and highlight the clicked item
    listItem.addEventListener('click', (event) => {
      if (event.target.classList.contains('favorite-btn')) return; // Prevent favorite button click
      document.querySelectorAll('#restaurantItems li').forEach((item) => {
        item.classList.remove('highlight');
      });
      listItem.classList.add('highlight');
      openMenuOnMain(restaurant);
    });
  });

  // Add functionality to favorite buttons only on loggedin.html
  if (isLoggedInPage()) {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering parent click event
        const restaurantId = button.getAttribute('data-id');
        toggleFavorite(restaurantId);
      });
    });
  }
}

// Check if the current page is loggedin.html
function isLoggedInPage() {
  return window.location.pathname.includes('loggedin.html');
}

// Toggle favorite status
function toggleFavorite(restaurantId) {
  const favoriteList = document.getElementById('favoriteItems');
  const existingFavorite = document.querySelector(`#favoriteItems [data-id="${restaurantId}"]`);

  if (existingFavorite) {
    // Remove from favorites
    existingFavorite.remove();
  } else {
    // Add to favorites
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
      const favoriteItem = document.createElement('li');
      favoriteItem.setAttribute('data-id', restaurantId);
      favoriteItem.textContent = restaurant.name;
      favoriteList.appendChild(favoriteItem);
    }
  }
}

// Populate city filter dropdown
function populateCityFilter(restaurants) {
  const cityFilter = document.getElementById('cityFilter');
  if (!cityFilter) {
    console.error('City filter element not found.');
    return;
  }

  // Get cities
  const cities = [...new Set(restaurants.map((restaurant) => restaurant.city))].sort();

  // Show all restaurants by default
  cityFilter.innerHTML = '<option value="all">Kaikki kaupungit</option>';

  // Add cities to the dropdown
  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });

  // Add event listener for filtering
  cityFilter.addEventListener('change', () => {
    const selectedCity = cityFilter.value;
    const filteredRestaurants =
      selectedCity === 'all'
        ? restaurants
        : restaurants.filter((restaurant) => restaurant.city === selectedCity);
    displayRestaurants(filteredRestaurants);
  });
}

// Fetch restaurants and display them in the list
export async function fetchAndListRestaurants() {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
    sortRestaurants(restaurants);
    populateCityFilter(restaurants); // Populate the city filter dropdown
    displayRestaurants(restaurants); // Display all restaurants initially
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

fetchAndListRestaurants();