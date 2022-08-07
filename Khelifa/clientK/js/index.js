import { HOSTNAME } from "./config.js";

window.onload = function () {
  document.getElementById("signinBtn").onclick = signIn;
};

async function signIn() {
  console.log(document.getElementById("floatingInput").value);
  const response = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("floatingInput").value,
      password: document.getElementById("floatingPassword").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (result.error) {
    document.getElementById("error").innerHTML = result.message;
  } else {
    sessionStorage.setItem("accessToken", result.data.accessToken);
    sessionStorage.setItem(
      "username",
      document.getElementById("floatingInput").value
    );
    alert(document.getElementById("floatingInput").value);

    window.location = "home.html";
  }
}
