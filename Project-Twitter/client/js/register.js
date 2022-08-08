window.onload = function () {
  document.getElementById("register-button").onclick = checkExist;
};
function checkExist() {
  const passwordInput = document.getElementById("password").value;
  const usernameInput = document.getElementById("username").value;
  if (!(passwordInput || usernameInput)) {
    alert("please enter username and password");
    return;
  } else {
    fetch("http://localhost:3000/users/" + usernameInput).then((response) => {
      if (response.status == 201) {
        register();
      } else {
        alert("username already exist");
      }
    });
  }
}
async function register() {
  //event.preventDefault();
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const photoInput = document.getElementById("photo");

  if (passwordInput.value.length < 8) {
    alert("password has to be at least 8 character");
    return;
  }
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
      photo: photoInput.value,
      roll: "user",
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  window.location = "login.html";
}
