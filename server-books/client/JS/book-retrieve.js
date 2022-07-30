window.onload = function () {
  fetchBooks();
};

// async function fetchBooks() {
//   try {
//     const response = await fetch("http://localhost:3000/books");
//     const data = await response.json();
//     diplayBooks(data);
//   } catch (error) {
//     // window.location = "error.html";
//     console.log(error);
//   }
// }
function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((responce) => responce.json())
    .then((books) => diplayBooks(books))
    .catch((err) => {
      console.log("inside err");
    });
}

function diplayBooks(books) {
  const tbody = document.getElementById("books-table");
  let html = "";
  books.forEach((book) => {
    html += `<tr id="tr${book._id}">
                <th>${book._id}</th>
                <td>${book.title}</td>
                <td>${book.ISBN}</td>
                <td>${book.publishedDate}</td>
                <td>${book.author}</td>
                <td>
                     <button class="btn btn-danger" onclick="removeItem('${book._id}');">DELETE</button> 
                     <button class="btn btn-primary" onclick="editItem('${book._id}');">EDIT</button>
                </td>
            </tr>`;
  });
  tbody.innerHTML = html;
}

function removeItem(id) {
  console.log(id);
  fetch("http://localhost:3000/books/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      console.log(response);
      // location.reload();
      document.getElementById(`tr${id}`).remove();
    })
    .catch((err) => console.log(err));
}

function editItem(id) {
  window.location = "book-edit.html?id=" + id;
}
