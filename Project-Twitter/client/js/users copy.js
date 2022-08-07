import { HOSTNAME } from "./config.js";

window.onload = function () {
  showUsers();
  document.getElementById("userSearch").onclick = userSearchByName;
};

async function showUsers() {
  let response = await fetch(`${HOSTNAME}/users`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const users = await response.json();
  let html = "";
  if (!users.error) {
    users.forEach((user) => {
      html += `
        <tr>
        <td>
          <div class="d-flex align-items-center">`;

      if (user.photo) {
        html += `<img
            src=${user.photo}
            class="rounded-circle"
            alt=""
            style="width: 45px; height: 45px"
          />`;
      } else {
        html += `<img
            src="https://w7.pngwing.com/pngs/593/679/png-transparent-avatar-blue-avatar-icon-blue-png-material-heroes.png"
            class="rounded-circle"
            alt=""
            style="width: 45px; height: 45px"
          />`;
      }

      html += `<div class="ms-3">
              <p class="fw-bold mb-1">${user.username}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="text-muted mb-0">${user.email}</p>
        </td>
    
        <td>
          <button
            type="button"
            class="btn btn-link btn-rounded btn-sm fw-bold"
            data-mdb-ripple-color="dark"
          >
            Follow
          </button>
          <button
            type="button"
            class="btn btn-link btn-rounded btn-sm fw-bold"
            data-mdb-ripple-color="dark"
          >
            Unfollow
          </button>
        </td>
      </tr>`;
    });

    document.getElementById("userTable").innerHTML = html;
  } else {
    document.getElementById("userTable").innerHTML = result.message;
  }
}

async function userSearchByName() {
  let response = await fetch(`${HOSTNAME}/users`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const users = await response.json();

  users.forEach((user) => {
    const userName = document.getElementById("searchingName").value;
    let html = "";
    if (user.username == userName) {
      html += `
        <tr>
        <td>
          <div class="d-flex align-items-center">`;

      if (user.photo) {
        html += `<img
            src=${user.photo}
            class="rounded-circle"
            alt=""
            style="width: 45px; height: 45px"
          />`;
      } else {
        html += `<img
            src="https://w7.pngwing.com/pngs/593/679/png-transparent-avatar-blue-avatar-icon-blue-png-material-heroes.png"
            class="rounded-circle"
            alt=""
            style="width: 45px; height: 45px"
          />`;
      }

      html += `<div class="ms-3">
              <p class="fw-bold mb-1">${user.username}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="text-muted mb-0">${user.email}</p>
        </td>
    
        <td>
          <button
            type="button"
            class="btn btn-link btn-rounded btn-sm fw-bold"
            data-mdb-ripple-color="dark"
          >
            Follow
          </button>
          <button
            type="button"
            class="btn btn-link btn-rounded btn-sm fw-bold"
            data-mdb-ripple-color="dark"
          >
            Unfollow
          </button>
        </td>
      </tr>`;
      document.getElementById("userTable").innerHTML = html;
    }
    // else {
    //   document.getElementById("userTable").innerHTML = user.message;
    // }
  });
}
