window.onload = function () {
  let url = new URL(location.href);
  const bookId = url.searchParams.get("id");

  fetchBookById(bookId);

  document.getElementById("edit-book").onclick = function (event) {
    event.preventDefault();
    editBookById(bookId);
  };
};

function fetchBookById(id) {
  console.log(id);
  fetch("http://localhost:3000/books/" + id)
    .then((response) => response.json())
    .then((book) => {
      document.getElementById("title").value = book.title;
      document.getElementById("ISBN").value = book.ISBN;
      document.getElementById("publishedDate").value = book.publishedDate;
      document.getElementById("author").value = book.author;
    });
}

async function editBookById(id) {
  const response = await fetch("http://localhost:3000/books/" + id, {
    method: "PUT",
    body: JSON.stringify({
      title: document.getElementById("title").value,
      ISBN: document.getElementById("ISBN").value,
      description: document.getElementById("publishedDate").value,
      author: document.getElementById("author").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location = "index.html";
  }
}
