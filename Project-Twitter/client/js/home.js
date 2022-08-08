import { HOSTNAME } from "./config.js";

window.deleteById = deleteById;
window.logout = logout;

window.onload = function () {
  if (sessionStorage.getItem("accessToken")) {
    fetchBlogs();
    document.getElementById("logout").onclick = logout;
  } else {
    window.location = "login.html";
  }
  document.getElementById("postTweet").onclick = postTweet;

  const token = sessionStorage.getItem("accessToken");
  const username = parseJwt(token).username;
  showTweets10(username);
  document.getElementById("postTweet").onclick = postTweet;
  // document.getElementById("cancebtn").onclick = cancel;
};

async function fetchBlogs() {
  const token = sessionStorage.getItem("accessToken");
  const userData = parseJwt(token);

  const wholeUsers = await fetch(`http://localhost:3000/users/`);
  const arrData = await wholeUsers.json();
  console.log(`arrData`, arrData);
  const count = arrData.filter((i) =>
    i.following.includes(userData.username)
  ).length;

  // TODO - username to id
  const response = await fetch(`${HOSTNAME}/users/${userData.username}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const user = await response.json();

  if (!user.error) {
    let html = "";
    html += `
      <div class="d-flex justify-content-center">      
      <a href="#" class="avatar avatar-xl rounded-circle">`;
    if (user.photo) {
      html += `<img
          alt="..."
          src="${user.photo}"
        />
      </a>`;
    } else {
      html += `<img
          alt="..."
          src="https://w7.pngwing.com/pngs/593/679/png-transparent-avatar-blue-avatar-icon-blue-png-material-heroes.png"
        />
      </a>`;
    }
    html += `</div>
    <div class="text-center my-6">
      <!-- Title -->
      <a href="#" class="d-block h5 mb-0">${user.username}</a>
      <!-- Subtitle -->
      <span class="d-block text-sm text-muted"
        >${user.email}</span
      >
    </div>
    <!-- Stats -->
    <div class="d-flex">
      <div class="col-4 text-center">
        <a href="#" class="h4 font-bolder mb-0" id="numOfPosts">${user.following.length}</a>
        <span class="d-block text-sm">Posts</span>
      </div>
      <div class="col-4 text-center">
        <a href="#" class="h4 font-bolder mb-0">${user.following.length}</a>
        <span class="d-block text-sm">Following</span>
      </div>
      <div class="col-4 text-center">
        <a href="#" class="h4 font-bolder mb-0 id="numOfFollowers"">${count}</a>
        <span class="d-block text-sm">Followers</span>
      </div>
    </div>`;

    document.getElementById("user-profile").innerHTML = html;
  } else {
    document.getElementById("blogs").innerHTML = result.message;
  }
}

async function deleteById(id) {
  const response = await fetch(`${HOSTNAME}/blogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const result = await response.json();
  // console.log(result);
  if (result.error) {
    alert(result.message);
  } else {
    document.getElementById(id).remove();
  }
}

function logout() {
  sessionStorage.removeItem("accessToken");
  window.location = "login.html";
}

function parseJwt(token) {
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

  return JSON.parse(jsonPayload);
}

async function showTweets10(username) {
  // console.log(username);
  const resp = await fetch(`http://localhost:3000/users/`);
  const resData = await resp.json();
  // console.log(`*****`, resData[0].photo);
  const response = await fetch(`http://localhost:3000/tweetS/${username}`);
  const result = await response.json();

  const arr = result.filter((data) => data.username === username);
  document.getElementById("numOfPosts").innerHTML = arr.length;

  let html = "";
  for (let each of result) {
    // console.log("here each:", each);
    html += `   <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-start">
            <!--insert photo link here-->`;
    // for (let user of resData) {
    if (each.username === resData[0].username) {
      html += `<img
              class="rounded-circle shadow-1-strong me-3"
              src="${photo}"
              alt="avatar"
              width="40"
              height="40"
            />`;
    } else {
      html += `<img
            class="rounded-circle shadow-1-strong me-3"
            src="https://9to5mac.com/wp-content/uploads/sites/6/2019/09/Twitter.jpg?quality=82&strip=all&w=1600"
            alt="avatar"
            width="40"
            height="40"
          />`;
    }
    // }
    html += `<div class="w-100">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <!--insert user name  and post body-->
                <h6 class="text-primary fw-bold mb-0">
                  ${each.username} <br/>
                  <span class="text-dark ms-2"
                    > ${each.comment}</span
                  >
                </h6>
                <!--insert date published-->
                 
                <p class="mb-0">${each.date}</p>
              </div>
              <div
                class="d-flex justify-content-between align-items-center"
              >
                <p class="small mb-0" style="color: #aaa">
                  <a href="#!" class="link-grey">Like</a> •
                  <a href="#!" class="link-grey">Dislike</a> •
                </p>
                <div class="d-flex flex-row">
                  <i class="fas fa-star text-warning me-2"></i>
                  <i class="far fa-check-circle" style="color: #aaa"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
  document.getElementById("showTweet").innerHTML = html;
  // console.log("----in display");
}

async function postTweet() {
  // console.log("-----in postTweet");
  const token = sessionStorage.getItem("accessToken");
  const userData = parseJwt(token);

  const response = await fetch("http://localhost:3000/tweetS", {
    method: "POST",
    body: JSON.stringify({
      username: userData.username,
      comment: document.getElementById("tweetPost").value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  const result = await response.json();

  showTweets10(userData.username);
  document.getElementById("tweetPost").value = "";
}

// function cancel() {
//   document.getElementById("tweetPost").value = "";
// }
