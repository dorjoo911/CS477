window.onload = function () {
  greet();
  fetchPosts();
  document.getElementById("logoutBtn").onclick = logOut;
  document.getElementById("postBtn").onclick = postText;
  document.getElementById("showPostBtn").onclick = showMyPosts;
  document
    .getElementById("diplayDateBtn")
    .addEventListener("click", displayDate);
  document.getElementById("editBtn").onclick = editBtn;
  document.getElementById("deleteBtn").onclick = deleteBtn;
};

const username = sessionStorage.getItem("name");
const date = sessionStorage.getItem("date");
const id = sessionStorage.getItem("id");
const avatar = sessionStorage.getItem("avatar");

function logOut() {
  sessionStorage.clear();
  window.location = "login.html";
}

function greet() {
  if (username) {
    document.getElementById("welcomeName").innerHTML = `Welcome ${username} 
    <img src="${avatar}" width="50" height="60">`;
    document.getElementById("joinedDate").innerHTML += date;
    document.getElementById("id").innerHTML += `Your id: ${id}`;
  }
}

async function postText() {
  const responce = await fetch("http://localhost:3000/posts/", {
    method: "POST",
    body: JSON.stringify({
      post: document.getElementById("text").value,
      username: username,
      userAvatar: avatar,
      userId: id,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  alert("Text sent");
}

async function fetchPosts() {
  const responce = await fetch("http://localhost:3000/posts");
  const result = await responce.json();
  showMyPosts(result);
}

function showMyPosts(res) {
  let html;
  res.forEach((post) => {
    if (post.userId === id) {
      html += `
      <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
            src="${post.userAvatar}"
            alt=""
            style="width: 45px; height: 45px"
            class="rounded-circle"
          />
          <div class="md-3">
            <p class="fw-bold mb-1">${post.username}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">${post.post}</p>
      </td>
      <td>
        <button
          id="editBtn"
          type="button"
          class="btn btn-link btn-sm btn-rounded"
        >
          Edit
        </button>
        <button
          id="deleteBtn"
          type="button"
          class="btn btn-link btn-sm btn-rounded"
        >
          Delete
        </button>
      </td>
    </tr>

            `;
      document.getElementById("myPosts").innerHTML = html;
    }
  });
}

function displayDate() {
  return (document.getElementById(
    "diplayDate"
  ).innerHTML = `Today is: ${Date()}`);
}

function editBtn() {}
function deleteBtn() {}
