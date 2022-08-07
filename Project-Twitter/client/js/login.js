// import { HOSTNAME } from "./config.js";

const HOSTNAME = "http://localhost:3000";

window.onload = function () {
  document.getElementById("signinBtn").onclick = signIn;
};

async function signIn() {
  const response = await fetch(`${HOSTNAME}/login`, {
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
    window.location = "home.html";
  }
}
function checkAccess() {
  if (!sessionStorage.getItem("accessToken")) {
    window.location = "login.html";
  }
}
