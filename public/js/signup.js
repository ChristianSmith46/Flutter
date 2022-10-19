const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordRepeat = document.querySelector('#password-repeat-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();

    const response = await fetch(`/api/users/exists/${username}`, {
      method: 'GET'
    });
    const user = await response.json();
    if (user.isUser){
      alert(`This username already exists`);
      return;
    }

    if (password.length < 6) {
        alert(`Password must be at least 6 characters`);
        return;
    }
    if (password !== passwordRepeat) {
        alert(`Passwords don't match`);
        return;
    }
    if (email && password) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);