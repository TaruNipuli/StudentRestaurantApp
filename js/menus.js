import { fetchData } from '../lib/fetchData.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Fetch daily menu for a specific restaurant and language
export async function getDailyMenu(id, lang = 'en') {
    try {
        return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
    } catch (error) {
        console.error('Error fetching daily menu:', error);
        return null;
    }
}

// Show menu in the given container
export function showMenu(menu, container) {
    if (!menu || menu.length === 0) {
        container.innerHTML = '<p>Ruokalista ei ole saatavilla.</p>';
        return;
    }

    let menuHtml = '<h3>Menu</h3>';
    for (const item of menu) {
        menuHtml += `<p>${item.name} - ${item.price}€</p>`;
    }
    container.innerHTML = menuHtml;
}