import {fetchData} from '../lib/fetchData.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Open the restaurant's menu on the main page
export async function openMenuOnMain(restaurant) {
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
      event.preventDefault(); // Prevent default link action

      // Fetch the weekly menu and update the content
      const weekResponse = await getWeeklyMenu(restaurant._id, 'fi');
      if (
        // Check if the response is valid
        !weekResponse ||
        !weekResponse.days ||
        !Array.isArray(weekResponse.days)
      ) {
        menuContainer.innerHTML +=
          '<p>Viikon ruokalista ei ole saatavilla.</p>';
        return;
      }

      const weekHtml = weekResponse.days
        .map(
          (day) => `
        <h3>${day.date}</h3>
        ${createMenuHtml(day.courses)}
      `
        )
        .join(''); // Combine all day HTML strings into a single string

      menuContainer.innerHTML = `<h2>${restaurant.name}</h2><p>${restaurant.address}, ${restaurant.city}</p>`;
      menuContainer.insertAdjacentHTML('beforeend', weekHtml);

      // Add a link to go back to the daily menu
      const dayMenuLink = document.createElement('a');
      dayMenuLink.href = '#';
      dayMenuLink.textContent = 'Päivän Ruokalista'; // Link to show the daily menu
      dayMenuLink.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default link action
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
      (course) =>
        `<article class="course">
      <p><strong>${course.name}</strong>, Price: ${course.price}, Allergens: ${course.diets}</p>
    </article>`
    )
    .join('');
}
