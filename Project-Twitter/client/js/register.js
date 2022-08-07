window.onload = function () {
  document.getElementById("register-button").onclick = checkExist;
};
function checkExist() {
  const usernameInput = document.getElementById("username").value;
  fetch("http://localhost:3000/users/" + usernameInput).then((response) => {
    if (response.status == 201) {
      register();
    } else {
      alert("username already exist");
    }
  });
}
async function register() {
  //event.preventDefault();
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const photoInput = document.getElementById("photo");
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
