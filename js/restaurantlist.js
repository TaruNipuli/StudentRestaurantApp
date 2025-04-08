import {fetchData} from '../lib/fetchData.js';
import {openMenuOnMain} from './menu.js'; // Import the menu functionality

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Fetch restaurants and display them as a list
async function fetchAndListRestaurants() {
  try {
    const restaurants = await fetchData(`${apiUrl}/restaurants`);
    sortRestaurants(restaurants);
    displayRestaurants(restaurants);
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

// sort restaurants by name
function sortRestaurants(restaurants) {
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
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

fetchAndListRestaurants();
sortRestaurants();

async function main() {
  try {
    await fetchAndListRestaurants();
  } catch (error) {
    console.error(error);
  }
}

main();
