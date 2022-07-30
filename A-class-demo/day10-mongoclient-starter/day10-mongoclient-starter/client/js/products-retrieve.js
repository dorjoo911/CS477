window.onload = function () {
  fetchProducts();
};

function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => displayProducts(products))
    .catch((err) => {
      console.log("inside err");
    });
}

function displayProducts(products) {
  const tbody = document.getElementById("products-table");
  let html = "";
  products.forEach((prod) => {
    html += `
            <tr id="tr${prod._id}">
                <th>${prod._id}</th>
                <td>${prod.title}</td>
                <td>${prod.price}</td>
                <td>${prod.description}</td>
                <td>
                    <button type="button" class="btn btn-primary" onClick="deleteProduct(${prod._id});">DELETE</button> 
                    <button type="button" class="btn btn-primary" onClick="editProduct(${prod._id});">EDIT</button>
                </td>
            </tr>
        `;
  });

  tbody.innerHTML = html;
}

function deleteProduct(id) {
  console.log(id);
  fetch("http://localhost:3000/products/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      // location.reload();
      document.getElementById(`tr${id}`).remove();
    })
    .catch((err) => console.log(err));
}

function editProduct(id) {
  window.location = "edit-product.html?id=" + id;
}
