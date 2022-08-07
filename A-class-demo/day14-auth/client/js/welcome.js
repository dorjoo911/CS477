import { HOSTNAME } from './config.js';

window.deleteById = deleteById;
window.logout = logout;

window.onload = function () {
    if(sessionStorage.getItem('accessToken')) {
        fetchBlogs();
        document.getElementById("logout").onclick = logout;
    } else {
        window.location = 'index.html';
    }
}

async function fetchBlogs() {

    const response = await fetch(`${HOSTNAME}/blogs`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await response.json();

    if (!result.error) {
        let html = "";
        result.data.forEach(blog => {
            html += `
            <div class="card" style="width: 18rem;" id="${blog._id}">
           
            <div class="card-body">
              <h5 class="card-title">${blog.title}</h5>
              <p class="card-text">${blog.body}</p>
              <button class="btn btn-primary" onclick="deleteById('${blog._id}');">DELETE</button>
            </div>
        </div>
            `
        });
        document.getElementById('blogs').innerHTML = html;
    } else {
        document.getElementById('blogs').innerHTML = result.message;
    }
}

async function deleteById(id){
    console.log(id);
    const response = await fetch(`${HOSTNAME}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await response.json();
    console.log(result);
    if(result.error){
       alert(result.message); 
    } else {
        document.getElementById(id).remove();
    }
}


function logout(){
    sessionStorage.removeItem('accessToken');
    window.location = 'index.html';
}