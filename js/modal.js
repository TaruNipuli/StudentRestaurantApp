
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Login Modal
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.loginBtn');
    const loginCloseBtn = loginModal.querySelector('.close');
    const loginForm = loginModal.querySelector('form');

    // Sign Up Modal
    const signUpModal = document.getElementById('signUpModal');
    const signUpBtn = document.querySelector('.signUpBtn');
    const signUpCloseBtn = signUpModal.querySelector('.close');
    const signUpForm = signUpModal.querySelector('form');

    console.log('Elements selected:', { loginModal, loginBtn, loginCloseBtn, loginForm, signUpModal, signUpBtn, signUpCloseBtn, signUpForm });

    // Open the login modal when the login button is clicked
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Login button clicked');
        loginModal.style.display = 'block';
    });

    // Close the login modal when the close button is clicked
    loginCloseBtn.addEventListener('click', () => {
        console.log('Login close button clicked');
        loginModal.style.display = 'none';
    });

    // Open the sign up modal when the sign up button is clicked
    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Sign up button clicked');
        signUpModal.style.display = 'block';
    });

    // Close the sign up modal when the close button is clicked
    signUpCloseBtn.addEventListener('click', () => {
        console.log('Sign up close button clicked');
        signUpModal.style.display = 'none';
    });

    // Close the modals when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            console.log('Clicked outside login modal');
            loginModal.style.display = 'none';
        }
        if (e.target == signUpModal) {
            console.log('Clicked outside sign up modal');
            signUpModal.style.display = 'none';
        }
    });

    // Ensures user moves to the loggedin.html
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Login form submitted');
        window.location.href = 'loggedin.html';
    });

    // Ensures user moves to the loggedin.html
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Sign up form submitted');
        window.location.href = 'loggedin.html';
    });
});
