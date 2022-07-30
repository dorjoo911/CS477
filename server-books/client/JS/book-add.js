window.onload = function () {
  document.getElementById("add-book").onclick = addBook;
};

async function addBook(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const isbnInput = document.getElementById("ISBN");
  const pubDateInput = document.getElementById("publishedDate");
  const authorInput = document.getElementById("author");
  const responce = await fetch("http://localhost:3000/books", {
    method: "POST",
    body: JSON.stringify({
      title: titleInput.value,
      ISBN: isbnInput.value,
      publishedDate: pubDateInput.value,
      author: authorInput.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await responce.json();
  document.getElementById("book-add-form").reset();
  console.log(data);
  window.location = "index.html";
}
