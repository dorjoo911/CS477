window.onload = function () {
  let url = new URL(location.href);
  const prodId = url.searchParams.get("id");
  fetchProductById(prodId);
  document.getElementById("edit-button").onclick = function (event) {
    event.preventDefault();
    editProductById(prodId);
    // deleteProductById(prodId);
  };
};

// exports.getById = async (req, res, next) => {
//     res.json(await Product.findById(req.params.id).populate("categories"));
//   };
function fetchProductById(id) {
  console.log(id);
  fetch("http://localhost:3000/products/" + id)
    .then((response) => response.json())
    .then((prod) => {
      document.getElementById("title").value = prod.title;
      document.getElementById("price").value = prod.price;
      document.getElementById("description").value = prod.description;
    });
}

// exports.update = async (req, res) => {
//     const result = await Product.updateOne(
//       { _id: new ObjectId(req.params.id) },
//       req.body
//     );
//     res.json(result);
//   };
async function editProductById(id) {
  const response = await fetch("http://localhost:3000/products/" + id, {
    method: "PUT",
    body: JSON.stringify({
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location = "index.html";
  }
}

// async function deleteProductById(id) {
//   const response = await fetch("http://localhost:3000/products/" + id, {
//     method: "DELETE",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   });
//   if (response.ok) {
//     window.location = "index.html";
//   }
// }
