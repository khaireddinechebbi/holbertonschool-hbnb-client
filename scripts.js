/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          try {
              const response = await fetch('https://your-api-url/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, password })
              });

              if (response.ok) {
                  const data = await response.json();
                  document.cookie = `token=${data.access_token}; path=/`;
                  window.location.href = 'index.html';
              } else {
                  const errorMessage = document.getElementById('error-message');
                  errorMessage.textContent = 'Login failed: ' + response.statusText;
              }
          } catch (error) {
              console.error('Error:', error);
              const errorMessage = document.getElementById('error-message');
              errorMessage.textContent = 'An error occurred. Please try again.';
          }
      });
  }
});
