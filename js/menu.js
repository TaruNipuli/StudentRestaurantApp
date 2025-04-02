import {fetchData} from '../lib/fetchData.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Open the restaurant's menu on the main page
export async function openMenuOnMain(restaurant) {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.textContent = ''; // Clear previous content

  // Add restaurant name and address
  const restaurantName = document.createElement('h2');
  restaurantName.textContent = restaurant.name;
  menuContainer.appendChild(restaurantName);

  const restaurantAddress = document.createElement('p');
  restaurantAddress.textContent = `${restaurant.address}, ${restaurant.city}`;
  menuContainer.appendChild(restaurantAddress);

  try {
    // Fetch the daily menu by default
    const menuResponse = await fetchData(
      `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
    );

    if (!menuResponse || !menuResponse.courses) {
      const noMenuMessage = document.createElement('p');
      noMenuMessage.textContent = 'No menu available.';
      menuContainer.appendChild(noMenuMessage);
      return;
    }

    // Display the daily menu
    const dailyMenu = createMenuHtml(menuResponse.courses);
    menuContainer.appendChild(dailyMenu);

    // Add a link to show the weekly menu
    const weekMenuLink = document.createElement('a');
    weekMenuLink.href = '#';
    weekMenuLink.textContent = 'Viikon Ruokalista'; // Link to show the weekly menu
    weekMenuLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default link action

      // Fetch the weekly menu and update the content
      const weekResponse = await getWeeklyMenu(restaurant._id, 'fi');
      if (!weekResponse || !weekResponse.days) {
        const noWeekMenuMessage = document.createElement('p');
        noWeekMenuMessage.textContent = 'Viikon ruokalista ei ole saatavilla.';
        menuContainer.appendChild(noWeekMenuMessage);
        return;
      }

      menuContainer.textContent = '';

      // Add restaurant name and address again
      const restaurantName = document.createElement('h2');
      restaurantName.textContent = restaurant.name;
      menuContainer.appendChild(restaurantName);

      const restaurantAddress = document.createElement('p');
      restaurantAddress.textContent = `${restaurant.address}, ${restaurant.city}`;
      menuContainer.appendChild(restaurantAddress);

      for (const day of weekResponse.days) {
        const dayHeading = document.createElement('h3');
        dayHeading.textContent = day.date;
        menuContainer.appendChild(dayHeading);

        const dayMenu = createMenuHtml(day.courses);
        menuContainer.appendChild(dayMenu);
      }

      // Add a link to go back to the daily menu
      const dayMenuLink = document.createElement('a');
      dayMenuLink.href = '#';
      dayMenuLink.textContent = 'Päivän Ruokalista'; // Link to show the daily menu
      dayMenuLink.addEventListener('click', async (event) => {
        event.preventDefault();
        openMenuOnMain(restaurant); // Load the daily menu again
      });

      menuContainer.appendChild(dayMenuLink);
    });

    menuContainer.appendChild(weekMenuLink);
  } catch (error) {
    console.error('Menu Fetch Error:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Menu not available.';
    menuContainer.appendChild(errorMessage);
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
  const container = document.createElement('div');

  for (const course of courses) {
    const courseArticle = document.createElement('article');
    courseArticle.className = 'course';

    const courseInfo = document.createElement('p');
    courseInfo.textContent = `${course.name}, Hinta: ${course.price}, Allergeenit: ${course.diets}`;
    courseArticle.appendChild(courseInfo);

    container.appendChild(courseArticle);
  }

  return container;
}
