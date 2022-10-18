const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-form').value.trim();
    const body = document.querySelector('#post-text-form').value.trim();
    const response = await fetch('/api/blogposts/', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert(`Post has been created`);
        document.location.reload();
    } else {
        alert('Failed to create post');
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', newPostFormHandler);