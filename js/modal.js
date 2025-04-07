

// Get all modal elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.loginBtn');
const loginCloseBtn = loginModal.querySelector('.close');
const loginForm = loginModal.querySelector('form');

const signUpModal = document.getElementById('signUpModal');
const signUpBtn = document.querySelector('.signUpBtn');
const signUpCloseBtn = signUpModal.querySelector('.close');
const signUpForm = signUpModal.querySelector('form');

// Function to open a modal
function openModal(modal) {
  modal.classList.add('open');
}

// Function to close a modal
function closeModal(modal) {
  modal.classList.remove('open');
}

// Open the login modal
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(loginModal);
});

// Close the login modal
loginCloseBtn.addEventListener('click', () => closeModal(loginModal));

// Close when clicking outside the login modal
window.addEventListener('click', (e) => {
  if (e.target === loginModal) closeModal(loginModal);
});

// Redirect after login form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'loggedin.html';
});

// Open the sign-up modal
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(signUpModal);
});

// Close the sign-up modal
signUpCloseBtn.addEventListener('click', () => closeModal(signUpModal));

// Close when clicking outside the sign-up modal
window.addEventListener('click', (e) => {
  if (e.target === signUpModal) closeModal(signUpModal);
});

// Redirect after sign-up form submission
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'loggedin.html';
});
