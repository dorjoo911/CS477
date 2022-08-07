const HOSTNAME = "http://localhost:3000";

window.onload = function () {
  fetchBlogs();
};

async function fetchBlogs() {
  const response = await fetch(`${HOSTNAME}/blogs`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const result = await response.json();

  if (!result.error) {
    let html = "";
    result.data.forEach((blog) => {
      html += `
            <div class="card" style="width: 18rem;">
           
            <div class="card-body">
              <h5 class="card-title">${blog.title}</h5>
              <p class="card-text">${blog.body}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
            `;
    });
    document.getElementById("blogs").innerHTML = html;
  } else {
    document.getElementById("blogs").innerHTML = result.message;
  }
}
