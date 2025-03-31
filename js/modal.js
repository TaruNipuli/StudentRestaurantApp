// modal.js handles the modal functionalities

// Get login modal elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.loginBtn');
const loginCloseBtn = loginModal.querySelector('.close');
const loginForm = loginModal.querySelector('form');

// Open the login modal when the login button is clicked
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'block';
});

// Close the login modal when the close button is clicked
loginCloseBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Close the login modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

// Redirect user after login form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'loggedin.html';
});

// Get sign-up modal elements
const signUpModal = document.getElementById('signUpModal');
const signUpBtn = document.querySelector('.signUpBtn');
const signUpCloseBtn = signUpModal.querySelector('.close');
const signUpForm = signUpModal.querySelector('form');

// Open the sign-up modal when the sign-up button is clicked
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpModal.style.display = 'block';
});

// Close the sign-up modal when the close button is clicked
signUpCloseBtn.addEventListener('click', () => {
  signUpModal.style.display = 'none';
});

// Close the sign-up modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === signUpModal) {
  }
});

// Redirect user after sign-up form submission
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'loggedin.html';
});
