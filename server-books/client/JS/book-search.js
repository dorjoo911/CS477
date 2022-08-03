window.onload = function () {
  document.getElementById("search-book").onclick = function () {
    searchBookById(id);
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

async function searchBookById(id) {
  const idInput = document.getElementById("id").value;
  const container = document.getElementsByClassName("container")[0];
  const tbody = document.getElementById("books-table");
  let html = `
    <div>
        <a href="book-search.html">Search a Book</a>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">ISBN</th>
            <th scope="col">Published Date</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody id="books-table">
        <tr">
            <th>${book._id}</th>
            <td>${book.title}</td>
            <td>${book.ISBN}</td>
            <td>${book.publishedDate}</td>
            <td>${book.author}</td>            
        </tr>
        </tbody>
      </table>
      <div>
        <a href="index.html">Home</a>
      </div>
    `;
  tbody.innerHTML = html;
}
