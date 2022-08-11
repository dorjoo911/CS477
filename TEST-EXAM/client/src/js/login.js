window.onload = function () {
  document.getElementById("loginBtn").onclick = login;
};

async function login() {
  const email = document.getElementById("email").value;
  const password = document.querySelector("#password").value;

  const responce = await fetch("http://localhost:3000/users");
  const result = await responce.json();
  console.log(result);

  result.forEach((user) => {
    if (user.email === email && user.password === password) {
      sessionStorage.setItem("name", user.username);
      sessionStorage.setItem("date", user.joined);
      sessionStorage.setItem("avatar", user.avatar);
      sessionStorage.setItem("id", user._id);
      window.location = "index.html";
    } else {
      console.log("wrong");
    }
  });
}
