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

// Handle login form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form data
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Prepare data to send in the request
  const loginData = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      alert('Kirjautuminen onnistui!');
      localStorage.setItem('authToken', data.token); // Save the token for future requests
      window.location.href = 'loggedin.html'; // Redirect user after successful login
    } else {
      console.error('Login error:', data.message);
      alert('Virhe kirjautumisessa: ' + data.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Tapahtui virhe kirjautuessa.');
  }
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

// Handle sign-up form submission
signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form data
  const username = document.getElementById('signUpUsername').value;
  const password = document.getElementById('signUpPassword').value;
  const passwordAgain = document.getElementById('signUpPasswordAgain').value;
  const email = document.getElementById('signUpEmail').value;

  // Check if passwords match
  if (password !== passwordAgain) {
    alert('Salasanat eivät täsmää!');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Sähköpostiosoite ei ole kelvollinen!');
    return;
  }

  // Prepare data to send in the request
  const userData = {
    username: username,
    password: password,
    email: email,
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('User created successfully:', data);
      alert('Käyttäjä luotu onnistuneesti!');
      window.location.href = 'loggedin.html'; // Redirect user after successful sign-up
    } else {
      console.error('Error creating user:', data.message);
      alert('Virhe käyttäjän luonnissa: ' + data.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Tapahtui virhe käyttäjää luodessa.');
  }
});
