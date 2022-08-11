window.onload = function () {
  document.getElementById("createBtn").onclick = createAccount;
};
console.log(document.getElementById("username").value);

async function createAccount() {
  const responce = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      avatar: document.getElementById("avatar").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  //   const data = await responce.json();
  //   console.log(data);
  window.location = "login.html";
}
