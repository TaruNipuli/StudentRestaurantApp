import { fetchData } from '../lib/fetchData.js';

// Define the base API URL
const apiUrl = 'https://media2.edu/metropolia.fi/restaurant/api/v1/restaurants';

// Modal-related elements
const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");

// Open the menu modal and fetch data when needed
export async function showDailyMenu(id, lang) {
    const menuContainer = document.querySelector('#modal-content');
    const title = document.querySelector('#modal-title');

    // Set the modal title
    title.textContent = `Ruokalista Päivä: ${id}`;

    try {
        // Fetch the daily menu using the API
        const menuData = await fetchData(`${apiUrl}/daily/${id}/${lang}`);
        console.log('Daily Menu Data:', menuData);  // Log the API response to check the data

        const courses = menuData.courses || [];

        // If we have a valid menu, display it
        if (courses.length > 0) {
            modalTitle.textContent = title.textContent;
            modalContent.innerHTML = courses
                .map(course => `
                    <p><strong>${course.name}</strong> - ${course.price}€</p>
                    <p>Allergeenit: ${course.diets}</p>
                `)
                .join("");  // Display the courses in the modal
            menuModal.style.display = "block";
        } else {
            menuContainer.innerHTML = '<p>Ruokalista ei ole saatavilla.</p>';
            menuModal.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading daily menu:', error);
        menuContainer.innerHTML = `<p>Virhe ladattaessa ruokalistaa: ${error.message}</p>`;
        menuModal.style.display = 'block';
    }
}
