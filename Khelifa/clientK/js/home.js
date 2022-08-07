window.onload = function () {
  let username = sessionStorage.getItem("username");
  console.log(username);
  displaytweet(sessionStorage.getItem("username"));
  document.getElementById("postbtn").onclick = postTweet;
  document.getElementById("welcome").innerHTML = username;
  // document.getElementById("cancebtn").onclick = cancel
};

async function displaytweet(username) {
  console.log(username);
  const response = await fetch(`http://localhost:3000/tweetS/${username}`);
  const result = await response.json();
  console.log(result);

  let html = "";
  for (let each of result) {
    html += `   <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-start">
            <!--insert photo link -->
            <img
              class="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
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
                  <a href="#!" class="link-grey">Follow</a> •
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
  document.getElementById("mydiv").innerHTML = html;
  console.log("----in display");
}

async function postTweet() {
  console.log("-----in postTweet");
  const response = await fetch("http://localhost:3000/tweetS", {
    method: "POST",
    body: JSON.stringify({
      username: sessionStorage.getItem("username"),
      comment: document.getElementById("textarea").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  console.log(result);
  displaytweet(sessionStorage.getItem("username"));
  document.getElementById("textarea").value = "";
}

function cancel() {
  document.getElementById("textarea").value = "";
}
