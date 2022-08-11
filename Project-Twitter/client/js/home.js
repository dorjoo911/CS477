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
  document.getElementById("cancebtn").onclick = cancel;
  document.getElementById("topBtn").onclick = topFunction;
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
  location.reload();
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

async function showTweets10(username, page, limit) {
  // console.log(username);
  const resp = await fetch(`http://localhost:3000/users/` + username);
  const resData = await resp.json();
  // console.log(`*****`, resData[0].photo);
  const response = await fetch(
    `http://localhost:3000/tweetS/${username}/${page}/${limit}`
  );
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
    if (each.username === response[0].username) {
      html += `<img
              class="rounded-circle shadow-1-strong me-3"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyr058kmJ9mzBDDkRlLTr-HSYCoJkA0DHG9w&usqp=CAU"
              alt="avatar"
              width="40"
              height="40"
            />`;
    } else {
      html += `<img
            class="rounded-circle shadow-1-strong me-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyr058kmJ9mzBDDkRlLTr-HSYCoJkA0DHG9w&usqp=CAU"
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

function cancel() {
  document.getElementById("tweetPost").value = "";
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

(function () {
  const quotesEl = document.querySelector(".quotes");
  const loaderEl = document.querySelector(".loader");

  const token = sessionStorage.getItem("accessToken");
  const userData = parseJwt(token);

  // get the quotes from API
  const getQuotes = async (myUsername, page, limit) => {
    // const API_URL = `https://localhost:3000/tweets/?page=${page}&limit=${limit}`;
    // const API_URL = `http://localhost:3000/tweets/${myUsername}`;
    const API_URL = `http://localhost:3000/tweets/${username}/${page}/${limit}`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  // show the quotes  <span>${quote.username})</span>
  const showQuotes = (quotes) => {
    console.log(quotes);
    quotes.forEach((quote) => {
      const quoteEl = document.createElement("blockquote");
      quoteEl.classList.add("quote");

      quoteEl.innerHTML = `
      <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex flex-start">
          <!--insert photo link -->
          <img
            class="rounded-circle shadow-1-strong me-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyr058kmJ9mzBDDkRlLTr-HSYCoJkA0DHG9w&usqp=CAU"
            alt="avatar"
            width="40"
            height="40"
          />
          <div class="w-100">
            <div
              class="d-flex justify-content-between align-items-center mb-3"
            >
              <!--insert user name  and post body-->
              <h6 class="text-primary fw-bold mb-0">
              ${quote.username}
                <span class="text-dark ms-2"
                  >${quote.comment}</span
                >
              </h6>
              <!--insert date published-->
              <p class="mb-0">${quote.date}</p>
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
    </div>
            
            <footer></footer>
        `;

      quotesEl.appendChild(quoteEl);
    });
  };

  const hideLoader = () => {
    loaderEl.classList.remove("show");
  };

  const showLoader = () => {
    loaderEl.classList.add("show");
  };

  const hasMoreQuotes = (page, limit, total) => {
    console.log(page + ", " + limit + ", " + total);
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  // load quotes
  const loadQuotes = async (page, limit) => {
    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
      try {
        // if having more quotes to fetch
        if (hasMoreQuotes(page, limit, total)) {
          // call the API to get quotes
          const response = await getQuotes(userData.username, page, limit);
          // show quotes
          showQuotes(response);
          // update the total
          //total = total + response.length;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 1000);
  };

  // control variables
  let currentPage = 1;
  const limit = 10;
  let total = 32;

  window.addEventListener(
    "scroll",
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        hasMoreQuotes(currentPage, limit, total)
      ) {
        currentPage++;
        console.log(currentPage);
        loadQuotes(currentPage, limit);
      }
    },
    {
      passive: false,
    }
  );

  // initialize
  loadQuotes(currentPage, limit);

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
})();
