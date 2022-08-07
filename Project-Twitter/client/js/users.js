window.onload = function () {
  // followers(username)
  console.log(getUsernameFromToken());
  displayFollowers(getUsernameFromToken());
  document.getElementById("userSearch").onclick = search;
};

function getUsernameFromToken() {
  const token = sessionStorage.getItem("accessToken");

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload).username;
}

async function getAllFollowers(username) {
  console.log(username);
  const response = await fetch(`http://localhost:3000/users/`);
  const result = await response.json();
  // console.log(result + " in followers");
  let followersArray = result;
  // let followersArray =  result.following.filter(user => user ==username);
  console.log(followersArray + " --- in followers");
  return followersArray;
}

async function followers(username) {
  const response = await fetch(`http://localhost:3000/users/${username}`);
  const result = await response.json();
  let followersArray = result.following;
  return followersArray;
}

async function displayFollowers(username) {
  console.log("---in displayFollowers");
  let followersArray = await getAllFollowers(username);
  const myFollower = followersArray.filter(
    (user) => user.username === username
  );
  let html = "";
  for (let each of followersArray) {
    if (each.username !== username) {
      html += ` <tr>
      <td>
        <div class="d-flex align-items-center">`;

      if (each.photo) {
        html += `<img
              src=${each.photo}
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
            <p class="fw-bold mb-1">${each.username}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="text-muted mb-0">${each.email}</p>
      </td>

      ${
        myFollower[0].following.filter((follower) => follower === each.username)
          .length === 0
          ? `<td>
            <button
              id="followbtn"
              type="button"
              onclick="follow('${each.username}')"
              class="btn btn-link btn-rounded btn-sm fw-bold"
              data-mdb-ripple-color="dark"
            >
              Follow
            </button>
          </td>`
          : `<td>
           <button
             id="unfollowbtn"
             type="button"
             onclick="unfollow('${each.username}')"
             class="btn btn-link btn-rounded btn-sm fw-bold"
             data-mdb-ripple-color="dark"
           >
             Unfollow
           </button>
         </td>`
      }
      
    </tr>`;
    }
  }
  document.getElementById("userTable").innerHTML = html;
}
async function unfollow(user) {
  let followersArray = await followers(getUsernameFromToken());
  console.log(followersArray);
  let index = followersArray.findIndex((name) => name === user);
  followersArray.splice(index, 1);

  const response = await fetch(
    `http://localhost:3000/users/${getUsernameFromToken()}`,
    {
      method: "PUT",
      body: JSON.stringify({
        following: followersArray,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  console.log(result);
  displayFollowers(getUsernameFromToken());
}

async function search() {
  let users = document.getElementById("searchingName").value;
  if (!users) {
    displayFollowers(getUsernameFromToken());
  } else {
    const response = await fetch(`http://localhost:3000/users/${users}`);
    const result = await response.json();

    if (result) {
      let html = ` <tr>
       <td>
         <div class="d-flex align-items-center">
           <img
             src="https://mdbootstrap.com/img/new/avatars/7.jpg"
             class="rounded-circle"
             alt=""
             style="width: 45px; height: 45px"
           />
           <div class="ms-3">
             <p class="fw-bold mb-1">${result.username}</p>
           </div>
         </div>
       </td>
       <td>
         <p class="text-muted mb-0">${result.email}</p>
       </td>
  
       <td>
         <button
           id = "unfollowbtn"
           type="button"
           onclick= "follow('${result.username}')"
           class="btn btn-link btn-rounded btn-sm fw-bold"
           data-mdb-ripple-color="dark"
         >
           follow
         </button>
       </td>
     </tr>`;

      document.getElementById("userTable").innerHTML = html;
    } else {
      alert(" user does not exist");
    }
  }
}

async function follow(users) {
  console.log(users + "--users");
  let followersArray = await followers(getUsernameFromToken());
  console.log(followersArray + "in follow---");

  followersArray.push(users);
  console.log(followersArray + "follllll");
  const response = await fetch(
    `http://localhost:3000/users/${getUsernameFromToken()}`,
    {
      method: "PUT",
      body: JSON.stringify({
        following: followersArray,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  //  console.log(result)
  displayFollowers(getUsernameFromToken());
}
