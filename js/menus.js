import { fetchData } from '../lib/fetchData.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// fetch daily menu
async function getMenu() {
    try {
        menu = await fetchData(apiUrl + '/daily');
    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
}

export function showMenu(menu) {
    const menuContainer = document.getElementById('menu-container');

}