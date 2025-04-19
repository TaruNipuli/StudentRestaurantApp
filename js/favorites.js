const favoritesList = document.getElementById('favoritesList');
const restaurantList = document.getElementById('restaurantItems');

// Check if the user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('authToken'); // Check for authToken in localStorage
    return !!token; // Return true if token exists
}

// Add a restaurant to the favorites list
function addFavorite(restaurantName) {
    if (!favoritesList) {
        console.error('Favorites list element not found.');
        return;
    }

    // Check if the restaurant is already in the favorites list
    if (!Array.from(favoritesList.children).some(item => item.textContent === restaurantName)) {
        const favoriteItem = document.createElement('li');
        favoriteItem.textContent = restaurantName;
        favoritesList.appendChild(favoriteItem);
    }
}

// Add heart buttons to the restaurant list
function addHeartButtons() {
    if (!restaurantList) {
        console.error('Restaurant list element not found.');
        return;
    }

    Array.from(restaurantList.children).forEach((listItem) => {
        const restaurantName = listItem.querySelector('strong')?.textContent;

        if (!restaurantName) {
            console.warn('Restaurant name not found in list item:', listItem);
            return;
        }

        const heartButton = document.createElement('button');
        heartButton.classList.add('heart-button');
        heartButton.textContent = '❤️';
        heartButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the parent list item click
            addFavorite(restaurantName);
        });

        listItem.appendChild(heartButton);
    });
}

// Initialize favorites functionality
function initializeFavorites() {
    if (isUserLoggedIn()) {
        console.log('User is logged in. Adding heart buttons...');
        addHeartButtons();
    } else {
        console.log('User is not logged in. Heart buttons will not be added.');
    }
}

// Wait for the restaurant list to be populated
const observer = new MutationObserver(() => {
    if (restaurantList && restaurantList.children.length > 0) {
        observer.disconnect(); // Stop observing once the list is populated
        initializeFavorites();
    }
});

observer.observe(restaurantList, { childList: true });