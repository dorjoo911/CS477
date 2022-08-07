window.onload = function () {
  let username = sessionStorage.getItem("username");
  console.log(sessionStorage.getItem("username"));

  // followers(username)
  displayFollowers(username);
  document.getElementById("searchbtn").onclick = search;
};

async function followers(username) {
  const response = await fetch(`http://localhost:3000/users/${username}`);
  const result = await response.json();
  console.log(result + " in followers");
  let followersArray = result.following;
  // let followersArray =  result.following.filter(user => user ==username);
  console.log(followersArray + " --- in followers");
  return followersArray;
}

async function displayFollowers(username) {
  console.log("---in displayFollowers");
  let followersArray = await followers(username);
  let html = "";
  console.log(followersArray);
  for (let each of followersArray) {
    console.log(each);
    html += ` <tr>
     <td>
       <div class="d-flex align-items-center">
         <img
           src="https://mdbootstrap.com/img/new/avatars/7.jpg"
           class="rounded-circle"
           alt=""
           style="width: 45px; height: 45px"
         />
         <div class="ms-3">
           <p class="fw-bold mb-1">${each}</p>
         </div>
       </div>
     </td>
     <td>
       <p class="text-muted mb-0"></p>
     </td>

     <td>
       <button
         id = "unfollowbtn"
         type="button"
         onclick= "unfollow('${each}')"
         class="btn btn-link btn-rounded btn-sm fw-bold"
         data-mdb-ripple-color="dark"
       >
         Unfollow
       </button>
     </td>
   </tr>`;
  }
  document.getElementById("tbody").innerHTML = html;
}
async function unfollow(user) {
  let followersArray = await followers(sessionStorage.getItem("username"));
  console.log(followersArray);
  let index = followersArray.findIndex((name) => name == user);
  followersArray.splice(index, 1);

  const response = await fetch(
    `http://localhost:3000/users/${sessionStorage.getItem("username")}`,
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
  displayFollowers(sessionStorage.getItem("username"));
}

async function search() {
  let users = document.getElementById("searchinput").value;
  const response = await fetch(`http://localhost:3000/users/${users}`);
  const result = await response.json();
  console.log(result + "in result");
  if (users && result) {
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

    document.getElementById("tbody").innerHTML = html;
  } else {
    alert(" user does not exist");
  }
}

async function follow(users) {
  console.log(users + "--users");
  let followersArray = await followers(sessionStorage.getItem("username"));
  console.log(followersArray + "in follow---");
  // let index = followersArray.findIndex(name => name ==user)
  // followersArray.splice(index,1)

  followersArray.push(users);
  console.log(followersArray + "follllll");
  const response = await fetch(
    `http://localhost:3000/users/${sessionStorage.getItem("username")}`,
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
  displayFollowers(sessionStorage.getItem("username"));
}
