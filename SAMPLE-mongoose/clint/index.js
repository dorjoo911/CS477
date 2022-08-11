window.onload = function () {
  display();
  document.getElementById("add").onclick = add;
  document.getElementById("tagBtn").onclick = getByTag;
  //   document.getElementById("tagBtn").onclick = editById;
};

async function display() {
  const req = await fetch("http://localhost:4000/products");
  const res = await req.json();
  let count = 0;
  let html;
  await res.forEach((car) => {
    count++;
    html += `
        <tr id="${car._id}">
            <th scope="row">${car._id}</th>
            <td id="car${count}">${car.car}</td>
            <td id="tag${count}">${car.tag}</td>
            <td id="owner${count}">${car.owner}</td>
            <td>
            <button onClick="editById('${car._id}');" type="button" class="btn btn-outline-success">Edit</button>
            <button onClick="deleteById('${car._id}');" type="button" class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        `;
  });
  document.getElementById("insertData").innerHTML = html;
}

async function add() {
  await fetch("http://localhost:4000/products", {
    method: "POST",
    body: JSON.stringify({
      car: document.getElementById("car").value,
      tag: document.getElementById("tag").value,
      owner: document.getElementById("owner").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}

function deleteById(id) {
  fetch("http://localhost:4000/products" + id, {
    method: "DELETE",
  });
  document.getElementById(`${id}`).remove();
}

async function getByTag() {
  const tag = document.getElementById("tagSearch").value;
  const req = await fetch("http://localhost:4000/products");
  const res = await req.json();
  await res.forEach((car) => {
    if (car.tag === tag) {
      const html = `
        <tr id="${car._id}">
            <th scope="row">${car._id}</th>
            <td>${car.car}</td>
            <td>${car.tag}</td>
            <td>${car.owner}</td>
            <td>
            <button onClick="editById('${car._id}');" type="button" class="btn btn-outline-success">Edit</button>
            <button onClick="deleteById('${car._id}');" type="button" class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        `;
      document.getElementById("insertData").innerHTML = html;
    }
  });
}

async function editById(id) {
  await fetch("http://localhost:4000/products" + id, {
    method: "PUT",
    body: JSON.stringify({
      car: document.getElementById(`car${count}`).value,
      tag: document.getElementById(`tag${count}`).value,
      owner: document.getElementById(`owner${count}`).value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  //   console.log(`car${count}`);
}
