document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.loginBtn');
    const closeBtn = document.querySelector('.modal .close');

    // Open the modal when the login button is clicked
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});