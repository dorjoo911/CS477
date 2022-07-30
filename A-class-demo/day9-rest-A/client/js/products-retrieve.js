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
    html += `<tr>
                <th>${prod.id}</th>
                <td>${prod.title}</td>
                <td>${prod.price}</td>
                <td>${prod.description}</td>
                <td>
                <button class="btn btn-primary" onclick="removeItem("${prod.id}")>DELETE</button> 
                <button class="btn btn-primary" onclick="editItem("${prod.id}")>EDIT</button>
                </td>
            </tr>`;
  });

  tbody.innerHTML = html;
}

async function removeItem(id) {
  try {
    await fetch("http://localhost:3000/products/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error.message);
  }
}

function editItem(id) {
  // const response = await fetch('http://localhost:3000/products/:id', {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //         title: titleInput.value,
  //         price: priceInput.value,
  //         description: descriptionInput.value
  //     }),
  //     headers: {
  //         'Content-type': 'application/json'
  //     }
  // });
}
