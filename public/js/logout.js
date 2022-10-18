
const logoutHandler = async (event) => {
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout');
    }
};

document
    .querySelector('#logout-button')
    .addEventListener('click', logoutHandler);