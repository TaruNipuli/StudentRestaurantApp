import { showMenuModal } from './modal.js';

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

export function createPopupContent(restaurantId, restaurantName, restaurantAddress, restaurantCity) {
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
        <h3>${restaurantName}</h3>
        <p>${restaurantAddress}, ${restaurantCity}</p>
        <button id="popup-weekly-menu-${restaurantId}" class="popup-button">Viikon ruokalista</button>
        <button id="popup-daily-menu-${restaurantId}" class="popup-button">Päivän ruokalista</button>
    `;

    // Attach event listeners to the buttons
    attachMenuButtonListeners(popupContent, restaurantId);

    return popupContent;
}

function attachMenuButtonListeners(popupContent, restaurantId) {
    const weeklyMenuButton = popupContent.querySelector(`#popup-weekly-menu-${restaurantId}`);
    const dailyMenuButton = popupContent.querySelector(`#popup-daily-menu-${restaurantId}`);

    // Attach event listeners to the buttons
    weeklyMenuButton.addEventListener('click', () => {
        showMenuModal(restaurantId, 'weekly'); // Call function from modal.js
    });

    dailyMenuButton.addEventListener('click', () => {
        showMenuModal(restaurantId, 'daily');
    });
}
