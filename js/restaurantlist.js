import { fetchData } from '../lib/fetchData.js';
import { openMenuOnMain } from './menu.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

let restaurants = [];

// Sort restaurants by name
function sortRestaurants(restaurants) {
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
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
    listItem.innerHTML = `<strong>${restaurant.name}:</strong> ${restaurant.address}, ${restaurant.city}`;
    restaurantList.appendChild(listItem);

    // Add click event to show the menu and highlight the clicked item
    listItem.addEventListener('click', () => {
      // Remove highlight from all items
      document.querySelectorAll('#restaurantItems li').forEach((item) => {
        item.classList.remove('highlight');
      });

      // Add highlight to the clicked item
      listItem.classList.add('highlight');
      openMenuOnMain(restaurant); // Call the function from menu.js
    });
  });
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