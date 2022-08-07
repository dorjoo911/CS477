// import { HOSTNAME } from './config.js';
const HOSTNAME = "http://localhost:3000";

window.onload = function () {
    
    if (sessionStorage.getItem('accessToken')) {
        fetchUser();
    } else {
        window.location = 'index.html';
    }
}

async function fetchUser() {

    const response = await fetch(`${HOSTNAME}/users`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await response.json();


    if (!result.error) {
      
        const user = result.filter(user => user.username === sessionStorage.getItem('username'));
        console.log(user[0].username);
        let html = `<h1>Welcome <a href="displaytweet.html" >${user[0].username}</a></h1>`;
        
        document.getElementById('blogs').innerHTML = html;
    }

}


