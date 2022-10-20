const searchUser = async () => {
    const typed = document.querySelector('#search-bar').value.trim();
    if (typed.length > 0){
        try{
            const result = await fetch(`/api/users/similar/${typed}`);
            const jsonResult = await result.json();
            const usernames = jsonResult.map((username) => username.username);
            showResults(usernames);
        } catch (err) {
            console.log(err);
        }
    } else {
        showResults([]);
        document.getElementById("result").innerHTML = '';

    }
}

function showResults(val) {
    const res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = val;
    for (i=0; i<terms.length; i++) {
      list += `<a href="/user/${terms[i]}"><li>${terms[i]}</li></a>`;
    }
    res.innerHTML = '<ul>' + list + '</ul>';
  }

document
    .querySelector('#search-bar')
    .addEventListener('keyup', searchUser);